import { utils, handleFiles } from "./utils";
import rootDir from "app-root-dir";

const root = rootDir.get();

const input = root + "/data/original/spells/";
const output = root + "/data/modified/";
const options = {
  input,
  output,
  enableInternalTests: {
    enabled: true,
    property: "time",
    key: "spell",
  },
};

handleFiles(
  {
    spell: (x: any) => ({
      name: x.name,
      source: x.source,
      level: x.level,
      school: x.school,
      time: utils.adapt(x.time.length === 1 && x.time),
      range: {
        type: x.range.type,
        distance: utils.adapt(
          x.range.distance && {
            type: utils.adapt(x.range.distance.type),
            distance: utils.adapt(x.range.distance.amount),
          }
        ),
      },
      components: {
        v: utils.adapt(x.components.v),
        s: utils.adapt(x.components.s),
        m: utils.adapt(
          x.components.m &&
            (typeof x.components.m === "string"
              ? x.components.m
              : x.components.m.text)
        ),
      },
      duration: utils.adapt(
        x.duration.length === 1 && {
          type: x.duration[0].type,
          concentration: utils.adapt(x.duration[0].concentration),
          duration: utils.adapt(
            x.duration[0].duration &&
              `${x.duration[0].duration.amount} ${
                x.duration[0].duration.type
              }${x.duration[0].duration.amount > 1 ? "s" : ""}`
          ),
        }
      ),
      classes: x.class,
      ritual: utils.adapt(x.meta && x.meta.ritual),
      entries: utils.adapt(utils.splitEntries(utils.asArray(x.entries))),
      higherLevel: utils.adapt(
        utils.splitEntries(utils.asArray(x.entriesHigherLevel))
      ),
    }),
  },
  options
);
