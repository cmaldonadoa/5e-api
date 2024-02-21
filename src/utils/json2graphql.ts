type ParserData = {
  fieldName?: string;
  parentName?: string;
  rootName: string;
  silent?: boolean;
};

enum WarningTypeEnum {
  IGNORE_FIELD,
  LOG,
}
const warn = (message: string, type: WarningTypeEnum = WarningTypeEnum.LOG) =>
  warnings.add(
    `\x1b[0;30m\x1b[43m ! WARNING ! ${type === WarningTypeEnum.LOG ? "INFO" : "IGNORED FIELD"} ! ${message} \x1b[0m`,
  );

const types = new Set();
const warnings = new Set();

const parser = {
  getName: (string?: string) =>
    string
      ? `${string}`
          .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
          .toLowerCase()
          .replace(new RegExp(/[-.]+/, "g"), " ")
          .replace(new RegExp(/[^\w\s]/, "g"), "")
          .replace(
            new RegExp(/\s+(.)(\w*)/, "g"),
            ($1, $2, $3) => `${$2.toUpperCase() + $3}`,
          )
          .replace(new RegExp(/\w/), (s) => s.toUpperCase())
      : "",
  isScalar: (object: any) =>
    ["string", "number", "boolean"].includes(typeof object),
  isArray: (object: any) => Array.isArray(object),
  parseScalar: (object: any) => {
    let type: string;

    switch (typeof object) {
      case "number":
        type = Number.isInteger(object) ? "Int" : "Float";
        break;

      case "string":
        type = "String";
        break;

      case "boolean":
        type = "Boolean";
        break;
    }

    return type;
  },
  parseArray: (object: any[], data?: ParserData) => {
    const name = data?.parentName
      ? data?.parentName + "." + data?.fieldName
      : data?.fieldName || data?.rootName;
    const displayName = name || data?.rootName;

    if (object.length === 0) {
      warn(`${displayName} has length 0`, WarningTypeEnum.IGNORE_FIELD);
      return null;
    }

    if (object.every((item: any) => parser.isScalar(item))) {
      const type = parser.parseScalar(object[0]);

      if (!object.every((item: any) => parser.parseScalar(item) === type)) {
        warn(
          `${displayName} has inconsistent scalar types`,
          WarningTypeEnum.IGNORE_FIELD,
        );
        return null;
      }

      return `[${type}]`;
    }

    if (object.every((item: any) => !parser.isScalar(item))) {
      const rootName = parser.getName(data?.rootName) || "";

      const [typeName, type] = parser.parseObject(object[0], {
        ...data,
        rootName,
        silent: true,
      });

      if (
        !object.every(
          (item: any) =>
            parser.parseObject(item, {
              ...data,
              rootName,
              silent: true,
            })[1] === type,
        )
      ) {
        warn(
          `${displayName} has inconsistent object types`,
          WarningTypeEnum.IGNORE_FIELD,
        );
        return null;
      }

      object.forEach((item: any) =>
        parser.parseObject(item, { ...data, rootName, silent: false }),
      );

      return `[${typeName}]`;
    }

    !data.silent &&
      warn(
        `${displayName} has inconsistent types`,
        WarningTypeEnum.IGNORE_FIELD,
      );
    return null;
  },
  parseObject: (object: any, data: ParserData) => {
    if (parser.isScalar(object)) return [parser.parseScalar(object), null];
    if (parser.isArray(object)) return [parser.parseArray(object, data), null];

    const name = data.parentName
      ? data.parentName + "." + data.fieldName
      : data.rootName;
    const displayName = name || data?.rootName;

    if (object === null) return [null, null];

    const results = Object.entries(object).map(
      ([key, value]) =>
        parser.parseObject(value, {
          fieldName: key,
          parentName: name,
          rootName:
            parser.getName(data.rootName) +
            parser.getName(isNaN(+key) ? key : "_" + key),
          silent: parser.isArray(value) ? true : data.silent,
        })[0],
    );

    const typeName = parser.getName(data.rootName);
    const typeContent = Object.keys(object)
      .map((key, index) =>
        results[index]
          ? `${isNaN(+key) ? key : "_" + key}: ${results[index]}`
          : null,
      )
      .filter(Boolean);
    const type = `type ${typeName} {\n${typeContent.join("\n")}\n}`;

    if (typeContent.length === 0) {
      warn(`${displayName} has problems`);
      return [null, null];
    }

    if (!data.silent) types.add(type);

    return [typeName, type];
  },
};

Array.from(warnings)
  .reverse()
  .forEach((w: string) => console.warn(w));

const parse = (object: any, name: string) => {
  parser.parseObject(object, { rootName: name });
  return Array.from(types).reverse().join("\n\n");
};

export { parse };
