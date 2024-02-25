import minimist, { ParsedArgs } from "minimist";
import fs from "fs";
import path from "path";

const argv: ParsedArgs = minimist(process.argv.slice(2), { "--": true });

if (!("_" in argv) || argv._.length !== 2)
    throw new Error(
        "command usage: json2graphql.js INPUT_FOLDER OUTPUT_FOLDER (-- EXCLUDED_FILES)"
    );

const input = argv._[0];
const output = argv._[1];
const excluded = argv["--"];

enum WarningTypeEnum {
    IGNORE_FIELD,
    LOG
}

const warn = (message: string, type: WarningTypeEnum = WarningTypeEnum.LOG) =>
    warnings.add(
        `\x1b[0;30m\x1b[43m ! WARNING ! ${
            type === WarningTypeEnum.LOG ? "INFO" : "IGNORED FIELD"
        } ! ${message} \x1b[0m`
    );

const types = {};
const warnings = new Set();

const toPascalCase = (string: string) =>
    string
        // Look for long acronyms and filter out the last letter
        .replace(/([A-Z]+)([A-Z][a-z])/g, " $1 $2")
        // Look for lower-case letters followed by upper-case letters
        .replace(/([a-z\d])([A-Z])/g, "$1 $2")
        // Look for lower-case letters followed by numbers
        .replace(/([a-zA-Z])(\d)/g, "$1 $2")
        .replace(/^./, function (str) {
            return str.toUpperCase();
        })
        // Remove any white space left around the word
        .replace(/\s/g, "")
        .trim();

class Parser {
    private object: any;
    public basename: string;
    public type: string;
    public typeName: string;
    private typeData: any;
    public isParsed: boolean;
    private silent: boolean;

    constructor(object: any, basename: string) {
        this.object = object;
        this.basename = toPascalCase(basename);
        this.isParsed = false;
        this.typeData = {};
        this.setName();
    }

    public parse() {
        if (this.isScalar()) this.parseScalar();
        else if (this.isArray()) this.parseArray();
        else this.parseObject();
    }

    public setName(name?: string) {
        if (name) this.typeName = this.basename + toPascalCase(name);
        else this.typeName = this.basename;
    }

    public silence() {
        this.silent = true;
    }

    public isScalar() {
        return ["string", "number", "boolean"].includes(typeof this.object);
    }

    public isArray() {
        return Array.isArray(this.object);
    }

    private addType() {
        if (this.typeName in types) {
            const oldType = types[this.typeName];
            Object.entries(this.typeData).forEach(([key, value]) => {
                if (key in oldType) {
                    if (value !== oldType[key]) {
                        delete oldType[key];
                        warn(
                            `${this.typeName}.${key} has inconsistent types`,
                            WarningTypeEnum.IGNORE_FIELD
                        );
                    }
                } else oldType[key] = value;
            });
        } else types[this.typeName] = this.typeData;
    }

    private parseScalar() {
        switch (typeof this.object) {
            case "number":
                this.type = Number.isInteger(this.object) ? "Int" : "Float";
                this.isParsed = true;
                break;

            case "string":
                this.type = "String";
                this.isParsed = true;
                break;

            case "boolean":
                this.type = "Boolean";
                this.isParsed = true;
                break;
        }
    }

    private parseObject() {
        if (this.object === null) {
            this.isParsed = false;
            return;
        }

        const parsers = Object.entries(this.object).map(([key, value]) => {
            const parser = new Parser(value, this.typeName);
            parser.setName(key);
            return parser;
        });

        parsers.forEach(parser => parser.parse());

        this.typeData = Object.keys(this.object).reduce(
            (accumulator, key, index) => {
                if (!parsers[index].isParsed) {
                    return accumulator;
                }

                accumulator[`${isNaN(+key) ? key : "_" + key}`] =
                    parsers[index].type;
                return accumulator;
            },
            {}
        );

        if (Object.keys(this.typeData).length === 0) {
            this.isParsed = false;
            warn(
                `${this.typeName} object has no valid fields`,
                WarningTypeEnum.IGNORE_FIELD
            );
            return;
        }

        this.type = this.typeName;
        this.isParsed = true;

        if (!this.silent) this.addType();
    }

    private parseArray() {
        if (this.object.length === 0) {
            this.isParsed = false;
            warn(`${this.typeName} has length 0`, WarningTypeEnum.IGNORE_FIELD);
            return;
        }

        const isParsedArray = () =>
            parsers.every((parser: Parser) => parser.isParsed);

        const handleNonParsedArray = () => {
            this.isParsed = false;
            warn(
                `${this.typeName} has non parsed elements`,
                WarningTypeEnum.IGNORE_FIELD
            );
        };

        let parsers = this.object.map(item => {
            const parser = new Parser(item, this.typeName);
            parser.silence();
            return parser;
        });

        if (parsers.every((parser: Parser) => parser.isScalar())) {
            parsers.forEach(parser => parser.parse());
            if (!isParsedArray()) return handleNonParsedArray();

            const type = parsers[0].type;

            if (parsers.some((parser: Parser) => parser.type !== type)) {
                this.isParsed = false;
                warn(
                    `${this.typeName} has inconsistent scalar types`,
                    WarningTypeEnum.IGNORE_FIELD
                );
                return;
            }

            this.isParsed = true;
            this.type = `[${type}]`;
        } else if (parsers.every((parser: Parser) => !parser.isScalar())) {
            let enableParsing = false;

            if (parsers.every((parser: Parser) => parser.isArray())) {
                parsers = this.object.map(list => {
                    const transformedItem = list.reduce(
                        (accumulator, item, index) => {
                            accumulator[index] = item;
                            return accumulator;
                        },
                        {}
                    );
                    const parser = new Parser(transformedItem, this.typeName);
                    parser.setName("List");
                    parser.silence();
                    return parser;
                });
                enableParsing = true;
            } else if (parsers.every((parser: Parser) => !parser.isArray())) {
                enableParsing = true;
            }

            if (enableParsing) {
                parsers.forEach(parser => parser.parse());
                if (!isParsedArray()) return handleNonParsedArray();

                const type = parsers[0].typeName;

                this.typeData = parsers.reduce((accumulator, parser) => {
                    if (!parser.isParsed) return accumulator;

                    Object.entries(parser.typeData).forEach(([key, value]) => {
                        if (key in accumulator) {
                            if (accumulator[key] !== value) {
                                if (Array.isArray(accumulator[key]))
                                    accumulator[key] = [
                                        ...accumulator[key],
                                        value
                                    ];
                                else
                                    accumulator[key] = [
                                        accumulator[key],
                                        value
                                    ];
                            }
                        } else {
                            accumulator[key] = value;
                        }
                    });

                    return accumulator;
                }, {});

                let ignoredFields = [];
                Object.entries(this.typeData).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        ignoredFields.push(key);
                    }
                });
                ignoredFields.forEach(field => {
                    warn(
                        `${this.typeName}.${field} has inconsistent types`,
                        WarningTypeEnum.IGNORE_FIELD
                    );
                    delete this.typeData[field];
                });

                if (Object.keys(this.typeData).length === 0) {
                    this.isParsed = false;
                    warn(
                        `${this.typeName} array object has no valid fields`,
                        WarningTypeEnum.IGNORE_FIELD
                    );
                    return;
                }

                this.type = `[${type}]`;
                this.isParsed = true;

                if (!this.silent) this.addType();
            } else {
                this.isParsed = false;
                warn(
                    `${this.typeName} has inconsistent types`,
                    WarningTypeEnum.IGNORE_FIELD
                );
            }
        } else {
            this.isParsed = false;
            warn(
                `${this.typeName} has inconsistent types`,
                WarningTypeEnum.IGNORE_FIELD
            );
        }
    }
}

const filenames = fs.readdirSync(input, "utf-8");
for (let filename of filenames) {
    if (!/.json$/.test(filename) || excluded.includes(filename)) continue;

    const file = fs.readFileSync(`${input}/${filename}`, "utf-8");
    new Parser(JSON.parse(file), path.basename(input)).parse();
}

Array.from(warnings)
    .reverse()
    .forEach((w: string) => console.warn(w));

fs.writeFileSync(
    `${output}/${path.basename(input)}.graphql`,
    Object.entries(types)
        .map(
            ([typeName, typeData]) =>
                `type ${typeName} {\n${Object.entries(typeData)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join("\n")}\n}`
        )
        .join("\n\n")
);

console.log(`Created schema ${path.basename(input)}.graphql`);
