import fs from "fs";
import path from "path";

export const utils = {
    formatEntries: entries => {
        if (!Array.isArray(entries)) entries = [entries];

        return entries.map(entry =>
            typeof entry === "string"
                ? { type: "text", entry }
                : entry.type === "list"
                ? { ...entry, items: utils.formatEntries(entry.items) }
                : {
                      ...entry,
                      ...(entry.entries && {
                          entries: utils.formatEntries(entry.entries)
                      })
                  }
        );
    },
    renderEntries: (item, data) => {
        if (!item.entries) return false;

        if (
            typeof item.entries[0] !== "string" ||
            item.entries[0].search("#itemEntry") === -1
        )
            return false;

        const [name] = item.entries[0].match(/{#itemEntry (.*)}/)[1].split("|");

        function replaceVariables(entries) {
            return entries.map(entry => {
                if (typeof entry === "string") {
                    const matches = entry.match(/{{item.(\w*)}}/g);
                    if (matches) {
                        const variables = matches.map(
                            m => m.match(/{{item.(.*)}}/)[1]
                        );
                        return variables.reduce(
                            (acc, v) =>
                                acc.replace(
                                    new RegExp(`{{item\\.${v}}}`, "g"),
                                    item[v]
                                ),
                            entry
                        );
                    } else {
                        return entry;
                    }
                } else {
                    return {
                        ...entry,
                        entries: replaceVariables(entry.entries)
                    };
                }
            });
        }

        const itemEntry = data.find(e => e.name === name);
        return replaceVariables(itemEntry.entriesTemplate);
    },

    separateEntries: (entries, nextId = 0, parentId = null) => {
        if (!entries) return null;

        let result = [];
        utils.formatEntries(entries).forEach(entry => {
            const id = nextId;
            const descendantNodes =
                utils.separateEntries(entry.entries, id + 1, id) || [];
            delete entry.entries;
            result = [
                ...result,
                {
                    ...entry,
                    id,
                    children:
                        descendantNodes.length > 0
                            ? descendantNodes
                                  .filter(e => e.parentId === id)
                                  .map(e => e.id)
                            : null,
                    parentId
                },
                ...descendantNodes
            ];
            nextId = id + 1 + descendantNodes.length;
        });
        return result;
    },

    constructCopy: (copy, data) => {
        if (!copy) return null;

        let base = {
            ...data.find(e => e.name === copy.name && e.source === copy.source)
        };

        if (base._copy) base = utils.constructCopy(base._copy, data);

        delete base.name;
        delete base.source;

        if (copy._mod) {
            const entries = Array.isArray(copy._mod.entries)
                ? copy._mod.entries
                : [copy._mod.entries];
            entries.forEach(entry => {
                if (entry.mode === "removeArr")
                    base.entries = base.entries.filter(
                        e => e.name !== entry.names
                    );
                else if (entry.mode === "replaceArr")
                    base.entries[
                        base.entries.findIndex(e => e.name === entry.replace)
                    ] = entry.items;
                else if (entry.mode === "insertArr")
                    base.entries.splice(entry.index, 0, entry.items);
            });
        }

        return base;
    },

    formatSpells: (spells, keys) => {
        if (!spells) return [];

        //const keys = [...Array(20).keys()].map(k => "" + (k + 1));
        let spellList = [];

        keys.forEach(k => {
            const obj = spells[k];
            
            if (!obj) return;

            if (Array.isArray(obj)) {
                let s = obj.map(o => ({
                    item: utils.formatChoose(o),
                    ...(Number.isInteger(k) && {
                        _meta: {
                            level: +k
                        }
                    })
                }));
                spellList = [...spellList, ...s];
            }

            if ("will" in obj) {
                let s = obj.will.map(o => ({
                    item: utils.formatChoose(o),
                    _meta: {
                        ...(Number.isInteger(k) && { level: +k }),
                        will: true
                    }
                }));
                spellList = [...spellList, ...s];
            }
            if ("ritual" in obj) {
                let s = obj.ritual.map(o => ({
                    item: utils.formatChoose(o),
                    _meta: {
                        ...(Number.isInteger(k) && { level: +k }),
                        ritual: true
                    }
                }));
                spellList = [...spellList, ...s];
            }
            if ("daily" in obj) {
                let s = obj.daily["1"].map(o => ({
                    item: utils.formatChoose(o),
                    _meta: {
                        ...(Number.isInteger(k) && { level: +k }),
                        longRest: 1
                    }
                }));
                spellList = [...spellList, ...s];
            }
            if ("rest" in obj) {
                let s = obj.rest["1"].map(o => ({
                    item: utils.formatChoose(o),
                    _meta: {
                        ...(Number.isInteger(k) && { level: +k }),
                        shortRest: 1
                    }
                }));
                spellList = [...spellList, ...s];
            }
            if ("resource" in obj) {
                let s = obj.resource["2"].map(o => ({
                    item: utils.formatChoose(o),

                    ...(Number.isInteger(k) && {
                        _meta: {
                            level: +k
                        }
                    })
                }));
                spellList = [...spellList, ...s];
            }
        });

        return spellList;
    },

    formatChoose: obj => {
        if (typeof obj === "string")
            return { [utils.clearSpellName(obj)]: true };

        if ("choose" in obj) {
            if (typeof obj.choose === "string")
                return {
                    choose: {
                        from: null,
                        fromFilter: obj.choose,
                        count: obj.count || 1
                    }
                };
            else if ("from" in obj.choose)
                return {
                    choose: {
                        from: Array.isArray(obj.choose.from)
                            ? obj.choose.from.map(n => utils.clearSpellName(n))
                            : null,
                        fromFilter: Array.isArray(obj.choose.from)
                            ? null
                            : obj.choose.from,
                        count: obj.choose.count || 1
                    }
                };
            else
                return {
                    choose: {
                        from: Array.isArray(obj.choose)
                            ? obj.choose.map(n => utils.clearSpellName(n))
                            : null,
                        fromFilter: Array.isArray(obj.choose)
                            ? null
                            : obj.choose.fromFilter || obj.choose,
                        count: obj.count || 1
                    }
                };
        }
        return obj;
    },

    clearSpellName: name => {
        return name.split("#")[0];
    },

    constructVersions: obj => {
        if (!("_versions" in obj)) return [];

        let versions = obj._versions;
        delete obj._versions;

        if (versions.length === 1) {
            const template = versions[0]._template;
            const implementations = versions[0]._implementations;

            const replaceVars = (text, vars) => {
                const regexp = new RegExp(
                    "{{(" + Object.keys(vars).join("|") + ")}}",
                    "g"
                );
                return text.replace(regexp, (m, $1) => vars[$1] || m);
            };

            versions = implementations.map(i => {
                const variables = i._variables;
                delete i._variables;

                return {
                    ...template,
                    ...i,
                    name: replaceVars(template.name, variables),
                    ...(template._mod && {
                        _mod: {
                            entries: template._mod.entries.map(entry => ({
                                ...entry,
                                items: entry.items
                                    ? {
                                          ...entry.items,
                                          entries: entry.items.entries.map(e =>
                                              replaceVars(e, variables)
                                          )
                                      }
                                    : null
                            }))
                        }
                    })
                };
            });
        }

        return versions.map(version => {
            let entries = obj.entries;

            if (entries && version._mod) {
                let entriesMod = Array.isArray(version._mod.entries)
                    ? version._mod.entries
                    : [version._mod.entries];
                delete version._mod;

                entriesMod.forEach(entry => {
                    if (entry.mode === "removeArr")
                        entries = entries.filter(e => e.name !== entry.names);
                    else if (entry.mode === "replaceArr")
                        entries[
                            entries.findIndex(e => e.name === entry.replace)
                        ] = entry.items;
                    else if (entry.mode === "insertArr")
                        entries.splice(entry.index, 0, entry.items);
                });
            }

            return {
                ...obj,
                ...version,
                entries
            };
        });
    }
};

type OptionsTestsEnabled = {
    enabled: true;
    property: string;
    key: string;
};

type OptionsTestsDisabled = {
    enabled: false;
    property?: string;
    key?: string;
};

type OptionsCurstomTestsEnabled = {
    enabled: true;
    tests: Function;
    property: string;
    key: string;
};

type OptionsCurstomTestsDisabled = {
    enabled: false;
    tests?: Function;
    key?: string;
    property?: string;
};

type OptionsPeekEnabled = {
    enabled: true;
    peek: Function;
    key: string;
};

type OptionsPeekDisabled = {
    enabled: false;
    peek?: Function;
    key?: string;
};

type Options = {
    input: string;
    output: string;
    enableInternalTests?: OptionsTestsEnabled | OptionsTestsDisabled;
    enableCustomTests?:
        | OptionsCurstomTestsEnabled
        | OptionsCurstomTestsDisabled;
    peek?: OptionsPeekEnabled | OptionsPeekDisabled;
};

export const handleFiles = (handlers: any, options: Options) => {
    const files = fs.readdirSync(options.input);
    const jsonFiles = files.filter(
        item =>
            /.json$/.test(item) &&
            !/^foundry/.test(item) &&
            !/^optional/.test(item)
    );

    const keys = {};

    const add = key => {
        if (key in keys) keys[key] += 1;
        else keys[key] = 1;
        return true;
    };

    const displayProperties = element =>
        Object.keys(element).forEach(k => add(k));

    const runInternalTests = element => {
        add("_total");
        const property = options.enableInternalTests?.property;

        if (element[property]) {
            let value = element[property];

            // Count occurrences
            add("_subtotal");

            // Test property types
            add(
                "PROP_TYPE_" +
                    ((Array.isArray(value) && "array") || typeof value)
            );

            if (typeof value === "string")
                value.length < 6 && add("STRING_VALUE_" + value);

            if (!Array.isArray(value))
                // Test object keys
                Object.keys(value).forEach(k => add(k));

            if (Array.isArray(value)) {
                // Test property array elements types
                value.forEach(v =>
                    typeof v !== "string"
                        ? add("ARRAY_OBJECT") &&
                          Object.keys(v).forEach(k =>
                              add(
                                  `ARRAY_OBJECT_KEY_${k}_` +
                                      ((Array.isArray(v[k]) && "array") ||
                                          typeof v[k])
                              )
                          )
                        : add("ARRAY_STRING")
                );

                // Test property array length
                if (value.length) add("ARRAY_LENGTH_" + value.length);
            }
        }
    };

    const peek = (element, key: string) => {
        if (options.peek?.enabled && options.peek?.key === key)
            options.peek?.peek(element);
        return element;
    };

    const runCustomTests = element => {
        const property = options.enableCustomTests?.property;

        if (element[property]) {
            options.enableCustomTests?.tests(element);
        }
    };

    for (let filename of jsonFiles) {
        const data = fs.readFileSync(options.input + "/" + filename, "utf8");
        const oldData = JSON.parse(data);
        const additional = {};
        const newData = Object.keys(handlers).reduce((accumulator, key) => {
            accumulator[key] = oldData[key].map(element => {
                const handle = x => {
                    const copy = utils.constructCopy(x._copy, oldData[key]);

                    if (
                        options.enableInternalTests?.enabled &&
                        options.enableInternalTests?.key === key
                    )
                        runInternalTests(copy || x);

                    if (
                        options.enableCustomTests?.enabled &&
                        options.enableCustomTests?.key === key
                    )
                        runCustomTests(copy || x);

                    if (
                        !options.enableInternalTests?.enabled &&
                        !options.enableCustomTests?.enabled && !options.peek?.enabled
                    )
                        displayProperties(copy || x);

                    const result = handlers[key](copy || x);
                    return peek(result, key);
                };

                const versions = utils.constructVersions(element);
                if (versions.length > 1) {
                    additional[key] = [
                        ...(additional[key] || []),
                        ...versions.map(version => handle(version))
                    ];
                } else return handle(element);
            });
            return accumulator;
        }, {});

        Object.keys(newData).forEach(
            k => (newData[k] = newData[k].filter(Boolean))
        );

        Object.keys(additional).forEach(
            k => (newData[k] = [...newData[k], ...additional[k]])
        );

        const output = `${options.output}/${path.basename(options.input)}/`;

        fs.mkdirSync(output, { recursive: true });
        fs.writeFileSync(output + filename, JSON.stringify(newData));
    }

    console.log(keys);
};
