import fs from "fs";
import rootDir from "app-root-dir";

const root = rootDir.get();

fs.mkdirSync(root + "/storage/authorization/", { recursive: true });
fs.writeFileSync(
  root + "/storage/authorization/users.json",
  JSON.stringify({
    user: [],
  }),
  { flag: "wx" }
);

fs.mkdirSync(root + "/storage/characters/", { recursive: true });
fs.writeFileSync(
  root + "/storage/authorization/characters.json",
  JSON.stringify({
    character: [],
  }),
  { flag: "wx" }
);
