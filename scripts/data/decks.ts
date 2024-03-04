import { handleFiles, utils } from "./utils";
import rootDir from "app-root-dir";

const root = rootDir.get();

const input = root + "/data/original/decks/";
const output = root + "/data/modified/";
const options = {
  input,
  output,
};

handleFiles(
  {
    deck: (e: any) => ({
      name: e.name,
      source: e.source,
      cards: e.cards.map((x: any) => (typeof x === "string" ? x : x.uid)),
      entries: utils.adapt(utils.splitEntries(utils.asArray(e.entries))),
    }),
    card: (e: any) => ({
      name: e.name,
      source: e.source,
      set: e.set,
      entries: utils.adapt(utils.splitEntries(utils.asArray(e.entries))),
    }),
  },
  options
);
