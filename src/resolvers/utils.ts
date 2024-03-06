import rootDir from "app-root-dir";
import fs from "fs";

const root = rootDir.get();

export const loadFilesSync = <T>(dirname: string): T[] => {
  const files = fs
    .readdirSync(root + dirname)
    .filter((file) => /\.json$/.test(file));
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

export class JSONMutator<T> {
  private readonly file: T;
  private readonly path: string;

  constructor(path: string) {
    this.path = path;
    this.file = JSON.parse(fs.readFileSync(root + path, "utf-8"));
  }

  add<T>(to: string, object: T) {
    this.file[to].push(object);
  }

  get<T>(from: string, where: (e: T) => boolean) {
    return (this.file[from] as T[])
      .map((item, index) => ({ item, index }))
      .filter((element) => where(element.item));
  }

  update<T>(from: string, index: number, object: T) {
    (this.file[from] as T[])[index] = object;
  }

  delete<T>(from: string, object: T) {
    const index = (this.file[from] as T[]).indexOf(object);
    this.file[from] = (this.file[from] as T[]).splice(index, 1);
  }

  save() {
    fs.writeFileSync(root + this.path, JSON.stringify(this.file));
  }
}
