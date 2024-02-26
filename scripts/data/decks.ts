import { utils, handleFiles } from "./utils.js";
import rootDir from "app-root-dir";

const root = rootDir.get();

const input = root + "/data/original/decks/";
const output = root + "/data/modified/";
const options = {
    input,
    output
};

handleFiles(
    {
        deck: e => ({
            name: e.name,
            source: e.source,
            cards: e.cards.map(x => (typeof x === "string" ? x : x.uid)),
            entries: utils.separateEntries(e.entries)
        }),
        card: e => ({
            name: e.name,
            source: e.source,
            set: e.set,
            entries: utils.separateEntries(e.entries)
        })
    },
    options
);
