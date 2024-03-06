import rootDir from "app-root-dir";
import fs from "fs";

const root = rootDir.get();

export const loadFilesSync = <T>(dirname: string): T[] => {
  const files = fs.readdirSync(dirname).filter((file) => /\.json$/.test(file));
  return files.map((file) =>
    JSON.parse(fs.readFileSync(root + `${dirname}/${file}`, "utf-8"))
  );
};

export const getQueries = <V>(
  data: Record<string, V>
): { [k: string]: () => V } =>
  Object.entries(data).reduce((queries, [key, value]) => {
    queries[key] = () => value;
    return queries;
  }, {});
