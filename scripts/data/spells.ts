import { utils, handleFiles } from "./utils";
import rootDir from "app-root-dir";

const root = rootDir.get();

const input = root + "/data/original/spells/";
const output = root + "/data/modified/";
const options = {
    input,
    output
};

handleFiles(
    {
        spell: x => ({
            name: x.name,
            source: x.source,
            level: x.level,
            school: x.school,
            time:
                x.time.length === 1
                    ? `${x.time[0].number} ${x.time[0].unit}${
                          x.time[0].number > 1 ? "s" : ""
                      }`
                    : null,
            range: {
                type: x.range.type,
                distance: x.range.distance
                    ? {
                          type: x.range.distance.type || null,
                          distance: x.range.distance.amount || null
                      }
                    : null
            },
            components: {
                v: x.components.v || null,
                s: x.components.s || null,
                m: x.components.m
                    ? typeof x.components.m === "string"
                        ? x.components.m
                        : x.components.m.text
                    : null
            },
            duration:
                x.duration.length === 1
                    ? {
                          type: x.duration[0].type,
                          concentration: x.duration[0].concentration || null,
                          duration: x.duration[0].duration
                              ? `${x.duration[0].duration.amount} ${
                                    x.duration[0].duration.type
                                }${
                                    x.duration[0].duration.amount > 1 ? "s" : ""
                                }`
                              : null
                      }
                    : null,
            classes: x.class,
            ritual: (x.meta && x.meta.ritual) || null,
            entries: utils.separateEntries(x.entries),
            higherLevel: x.entriesHigherLevel
                ? utils.separateEntries(x.entriesHigherLevel)
                : null
        })
    },
    options
);
