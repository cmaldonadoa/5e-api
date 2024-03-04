import fs from "fs";
import path from "path";
import { utils } from "./utils";

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

type OptionsCustomTestsEnabled = {
  enabled: true;
  tests: Function;
  property: string;
  key: string;
};

type OptionsCustomTestsDisabled = {
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
  enableCustomTests?: OptionsCustomTestsEnabled | OptionsCustomTestsDisabled;
  peek?: OptionsPeekEnabled | OptionsPeekDisabled;
};

export const handleFiles = (handlers: any, options: Options) => {
  const files = fs.readdirSync(options.input);
  const jsonFiles = files.filter(
    (item) =>
      /.json$/.test(item) && !/^foundry/.test(item) && !/^optional/.test(item)
  );

  const keys = {};

  const add = (key: string) => {
    if (key in keys) keys[key] += 1;
    else keys[key] = 1;
    return true;
  };

  const displayProperties = (element: any) =>
    Object.keys(element).forEach((k) => add(k));

  const runInternalTests = (element: any) => {
    add("_total");
    const property = options.enableInternalTests?.property;

    if (element[property]) {
      let value = element[property];

      // Count occurrences
      add("_subtotal");

      // Test property types
      add("PROP_TYPE_" + ((Array.isArray(value) && "array") || typeof value));

      if (typeof value === "string")
        value.length < 6 && add("STRING_VALUE_" + value);

      if (!Array.isArray(value))
        // Test object keys
        Object.keys(value).forEach((k) => add(k));

      if (Array.isArray(value)) {
        // Test property array elements types
        value.forEach((v) =>
          typeof v !== "string"
            ? add("ARRAY_OBJECT") &&
              Object.keys(v).forEach((k) =>
                add(
                  `ARRAY_OBJECT_KEY_${k}_` +
                    ((Array.isArray(v[k]) && "array") || typeof v[k])
                )
              )
            : add("ARRAY_STRING")
        );

        // Test property array length
        if (value.length) add("ARRAY_LENGTH_" + value.length);
      }
    }
  };

  const peek = (element: any, key: string) => {
    if (options.peek?.enabled && options.peek?.key === key)
      options.peek?.peek(element);
    return element;
  };

  const runCustomTests = (element: any) => {
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
      accumulator[key] = oldData[key].map((element: any) => {
        const handle = (x: any) => {
          const copy = utils.getCopy(oldData[key], x._copy);

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
            !options.enableCustomTests?.enabled &&
            !options.peek?.enabled
          )
            displayProperties(copy || x);

          const result = handlers[key](copy || x);
          return peek(result, key);
        };

        const versions = utils.getVersions(element);
        if (versions.length > 1) {
          additional[key] = [
            ...(additional[key] || []),
            ...versions.map((version) => handle(version)),
          ];
        } else return handle(element);
      });
      return accumulator;
    }, {});

    Object.keys(newData).forEach(
      (k) => (newData[k] = newData[k].filter(Boolean))
    );

    Object.keys(additional).forEach(
      (k) => (newData[k] = [...newData[k], ...additional[k]])
    );

    const output = `${options.output}/${path.basename(options.input)}/`;

    fs.mkdirSync(output, { recursive: true });
    fs.writeFileSync(output + filename, JSON.stringify(newData));
  }

  console.log(keys);
};
