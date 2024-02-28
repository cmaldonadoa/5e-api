import { utils, handleFiles } from "./utils";
import rootDir from "app-root-dir";

const root = rootDir.get();

const input = root + "/data/original/books/";
const output = root + "/data/modified/";
const options = {
    input,
    output
};

handleFiles(
    {
        book: e =>
            ["core", "supplement", "setting"].includes(e.group) && {
                id: e.id,
                name: e.name,
                group: e.group
            }
    },
    options
);
