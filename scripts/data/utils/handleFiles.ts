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
  run: (element: any) => void;
  property: string;
  key: string;
};

type OptionsCustomTestsDisabled = {
  enabled: false;
  run?: Function;
  key?: string;
  property?: string;
};

type OptionsPeekEnabled = {
  enabled: true;
  run: (element: any, count: (element: any, key: string) => void) => void;
  key?: string;
};

type OptionsPeekDisabled = {
  enabled: false;
  peek?: Function;
  key?: string;
};

export type Options = {
  input: string;
  output: string;
  count?: boolean;
  enableInternalTests?: OptionsTestsEnabled | OptionsTestsDisabled;
  enableCustomTests?: OptionsCustomTestsEnabled | OptionsCustomTestsDisabled;
  peek?: OptionsPeekEnabled | OptionsPeekDisabled;
};

export const handleFiles = (handlers: any, options: Options) => {
  const files = fs.readdirSync(options.input);
  const jsonFiles = files.filter(
    (item) => /.json$/.test(item) && !/^foundry/.test(item)
  );

  const keys = {};
  const peekKeys = {};

  const countKeys = (key: string, parent?: string) => {
    if (parent) {
      if (!keys.hasOwnProperty(parent)) keys[parent] = {};
      if (keys[parent].hasOwnProperty(key)) keys[parent][key] += 1;
      else keys[parent][key] = 1;
      return true;
    }

    if (keys.hasOwnProperty(key)) keys[key] += 1;
    else keys[key] = 1;
    return true;
  };

  const saveProperties = (element: any, key: string) =>
    Object.keys(element).forEach((k) => countKeys(k, key));

  const runInternalTests = (element: any) => {
    countKeys("_total");
    const properties = options.enableInternalTests?.property.split(".");

    function accessNestedProperty(obj, keys) {
      return keys.reduce((acc, key) => {
        if (Array.isArray(acc)) {
          return acc
            .map((item) =>
              item && item[key] !== undefined ? item[key] : undefined
            )
            .filter((val) => val !== undefined);
        }
        return acc && acc[key] !== undefined ? acc[key] : undefined;
      }, obj);
    }

    const value = accessNestedProperty(element, properties);

    if (value) {
      // Count occurrences
      countKeys("_subtotal");

      // Test property types
      countKeys(
        "PROP_TYPE_" + ((Array.isArray(value) && "array") || typeof value)
      );

      if (typeof value === "string") countKeys("STRING_VALUE_" + value);

      if (!Array.isArray(value))
        // Test object keys
        Object.keys(value).forEach((k) => countKeys(k));

      if (Array.isArray(value)) {
        function countArray(val, nestLevel = 1) {
          val.forEach((v) =>
            typeof v !== "string" && typeof v !== "number"
              ? countKeys("ARRAY_".repeat(nestLevel) + "OBJECT") &&
                (Array.isArray(v)
                  ? countArray(v, nestLevel + 1)
                  : Object.keys(v).forEach((k) =>
                      countKeys(
                        `${"ARRAY_".repeat(nestLevel)}OBJECT_KEY_${k}_` +
                          ((Array.isArray(v[k]) && "array") ||
                            typeof v[k] + "_" + v[k])
                      )
                    ))
              : typeof v === "string"
                ? countKeys("ARRAY_".repeat(nestLevel) + "STRING_VALUE_" + v)
                : countKeys("ARRAY_".repeat(nestLevel) + "NUMBER")
          );
        }

        // Test property array elements types
        countArray(value);

        // Test property array length
        if (value.length) countKeys("ARRAY_LENGTH_" + value.length);
      }
    }
  };

  const countPeekKeys = (obj: any, key: string) => {
    // Helper function to recursively count properties
    const countPropertiesRecursive = (obj: any, countsObj: any) => {
      for (let key in obj) {
        // If the property is an array, process its elements
        if (Array.isArray(obj[key])) {
          if (!countsObj[key]) {
            countsObj[key] = { _count: 0 };
          }
          countsObj[key]._count++;

          obj[key].forEach((item) => {
            if (typeof item === "object" && item !== null) {
              for (let subKey in item) {
                if (typeof item[subKey] === "undefined") continue;
                if (!countsObj[key][subKey]) {
                  countsObj[key][subKey] = 0;
                }
                countsObj[key][subKey]++;
              }
            }
          });
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          // If the property is an object, recursively count its properties
          if (!countsObj[key]) {
            countsObj[key] = { _count: 0 };
          }
          countsObj[key]._count++;
          countPropertiesRecursive(obj[key], countsObj[key]);
        } else {
          if (typeof obj[key] === "undefined") continue;
          if (!countsObj[key]) {
            // Increment the count for other types of properties
            countsObj[key] = 0;
          }
          countsObj[key]++;
        }
      }
    };

    countPropertiesRecursive(obj, peekKeys[key]);
  };

  const transformNestedArrays = (element: any) => {
    if (Array.isArray(element)) {
      if (element.every((e) => Array.isArray(e))) {
        return element.map((e: any[]) =>
          e.reduce((acc, obj, index) => {
            acc["_" + index] = transformNestedArrays(obj);
            return acc;
          }, {})
        );
      }

      return element.map((e) => transformNestedArrays(e));
    }
    if (typeof element === "object") {
      return Object.keys(element).reduce((acc, key) => {
        acc[key] = transformNestedArrays(element[key]);
        return acc;
      }, {});
    }
    return element;
  };

  const peek = (element: any, key: string) => {
    if (
      options.peek?.enabled &&
      (options.peek?.key === key || !options.peek?.key)
    ) {
      options.peek?.run(element, (e: any, key: string) => {
        if (!peekKeys[key]) peekKeys[key] = {};
        countPeekKeys(e, key);
      });
    }
    return element;
  };

  const runCustomTests = (element: any) => {
    const property = options.enableCustomTests?.property;

    if (element[property]) {
      options.enableCustomTests?.run(element);
    }
  };

  for (let filename of jsonFiles) {
    const data = fs.readFileSync(options.input + "/" + filename, "utf8");
    const oldData = JSON.parse(data);
    const additional = {};
    const newData = Object.keys(handlers).reduce((accumulator, key) => {
      accumulator[key] = utils.asArray(oldData[key]).map((element: any) => {
        const handle = (x: any) => {
          const copy = utils.getCopy(oldData[key], x);

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

          if (options.count) saveProperties(copy || x, key);

          const result = handlers[key](copy || x);
          return peek(transformNestedArrays(result), key);
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
      (k) => (newData[k] = utils.adapt(newData[k].filter(Boolean)))
    );

    Object.keys(additional).forEach(
      (k) => (newData[k] = [...newData[k], ...additional[k]])
    );

    const output = `${options.output}/${path.basename(options.input)}/`;

    fs.mkdirSync(output, { recursive: true });
    fs.writeFileSync(output + filename, JSON.stringify(newData));
    console.log("Successfully created", filename);
  }

  Object.keys(keys).length > 0 && console.log(keys);
  Object.keys(peekKeys).length > 0 && console.log(peekKeys);
};
