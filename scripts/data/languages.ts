import { utils, handleFiles } from "./utils.js";
import rootDir from "app-root-dir";

const root = rootDir.get();

const input = root + "/data/original/languages/";
const output = root + "/data/modified/";
const options = {
    input,
    output
};

handleFiles(
    {
        language: (e) => ({
        name: e.name,
        source: e.source,
        type: e.type,
        script: e.script,
      })
    },
    options
);
