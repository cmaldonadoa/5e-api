import { handleFiles, Options } from "./utils";
import rootDir from "app-root-dir";

const root = rootDir.get();

const input = root + "/storage/data/original/languages/";
const output = root + "/storage/data/modified/";
const options: Options = {
  input,
  output,
};

handleFiles(
  {
    language: (e: any) => ({
      name: e.name,
      source: e.source,
      type: e.type,
      script: e.script,
    }),
  },
  options
);
