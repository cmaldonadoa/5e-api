import "dotenv/config";
import fs from "fs";
import rootDir from "app-root-dir";
import { spawnSync } from "child_process";

const root = rootDir.get();
const path = root + "/scripts/data/";

const files = fs.readdirSync(path).filter((e) => /\.ts$/.test(e));

for (const filename of files) {
  console.log("---", filename);
  const { stdout, stderr } = spawnSync("npx", [
    process.env.TS_EXEC,
    "--experimental-specifier-resolution=node",
    path + filename,
  ]);
  console.log(stdout.toString());

  if (stderr.toString()) {
    console.log(stderr.toString());
    break;
  }
}
