import fs from "fs";
import rootDir from "app-root-dir";
import { spawnSync } from "child_process";

const root = rootDir.get();
const path = root + "/storage/data/original/";

const folders = fs.readdirSync(path);

for (const name of folders) {
  console.log("---", name);
  const { stdout, stderr } = spawnSync("npx", [
    process.env.TS_EXEC,
    "--experimental-specifier-resolution=node",
    root + "/scripts/json2graphql.ts",
    root + "/storage/data/modified/" + name,
    root + "/schemas/",
    "--",
    "foundry.json",
  ]);
  console.log(stdout.toString());

  if (stderr.toString()) {
    console.log(stderr.toString());
    break;
  }
}
