import fs from "fs";
import rootDir from "app-root-dir";
import { spawnSync } from "child_process";
import { basename } from "path";

const root = rootDir.get();
const path = root + "/data/original/";

const folders = fs.readdirSync(path);

for (const name of folders) {
    console.log("---", name);
    const { stdout, stderr } = spawnSync("npm", [
        "run",
        "generate-schema",
        "--",
        root + "/data/modified/" + name,
        root + "/schemas/",
        "--",
        "foundry.json",
        "optionalfeatures.json"
    ]);
    console.log(stdout.toString());

    if (stderr.toString()) {
        console.log(stderr.toString());
        break;
    }
}
