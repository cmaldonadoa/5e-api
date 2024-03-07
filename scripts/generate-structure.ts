import fs from "fs";
import rootDir from "app-root-dir";

const root = rootDir.get();

try {
  fs.mkdirSync(root + "/storage/authentication/", { recursive: true });
  fs.writeFileSync(
    root + "/storage/authentication/users.json",
    JSON.stringify({
      user: [],
    }),
    { flag: "wx" }
  );
} catch (e) {
  console.log("Ignoring generation of /storage/authentication/users.json");
}

try {
  fs.mkdirSync(root + "/storage/characters/", { recursive: true });
  fs.writeFileSync(
    root + "/storage/characters/characters.json",
    JSON.stringify({
      character: [],
    }),
    { flag: "wx" }
  );
} catch (e) {
  console.log("Ignoring generation of /storage/authentication/characters.json");
}
