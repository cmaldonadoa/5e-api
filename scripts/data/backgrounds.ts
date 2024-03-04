import { handleFiles, utils } from "./utils";
import rootDir from "app-root-dir";

const root = rootDir.get();

const input = root + "/data/original/backgrounds/";
const output = root + "/data/modified/";
const options = {
  input,
  output,
};

handleFiles(
  {
    background: (x: any) => ({
      name: x.name,
      source: x.source,
      skillProficiencies: utils.adapt(utils.formatObject(x.skillProficiencies)),
      languageProficiencies: utils.adapt(
        utils.formatObject(x.languageProficiencies)
      ),
      startingEquipment: utils.adapt(
        utils.asArray(x.startingEquipment).map((equipmentSet) =>
          Object.keys(equipmentSet).reduce((accum, k) => {
            let startingGold = 0;
            accum[k] = equipmentSet[k]
              .map((item: any) => {
                if (typeof item === "string")
                  return { item: utils.clearName(item) };

                if ("containsValue" in item) {
                  startingGold = item["containsValue"] / 100;
                  delete item["containsValue"];
                  return {
                    ...item,
                    ...(item.item && { item: utils.clearName(item.item) }),
                  };
                }

                if ("value" in item) {
                  startingGold = item["value"];
                  return;
                }

                return {
                  ...item,
                  ...(item.item && { item: utils.clearName(item.item) }),
                };
              })
              .filter(Boolean);

            if (startingGold > 0) {
              accum[k].push({ value: startingGold });
            }

            return accum;
          }, {})
        )
      ),
      entries: utils.adapt(utils.splitEntries(utils.asArray(x.entries))),
      feats: utils.adapt(utils.formatObject(x.feats)),
      toolProficiencies: utils.adapt(utils.formatObject(x.toolProficiencies)),
      additionalSpells: utils.adapt(
        x.additionalSpells && {
          expanded: Object.entries(x.additionalSpells[0].expanded).reduce(
            (acc, [k, v]: [string, any]) => {
              acc[k] = v.map((e: string) => utils.clearName(e));
              return acc;
            },
            {}
          ),
        }
      ),
      skillToolLanguageProficiencies: utils.adapt(
        utils.formatObject(x.skillToolLanguageProficiencies)
      ),
    }),
  },
  options
);
