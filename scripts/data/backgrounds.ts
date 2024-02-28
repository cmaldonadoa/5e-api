import { utils, handleFiles } from "./utils";
import rootDir from "app-root-dir";

const root = rootDir.get();

const input = root + "/data/original/backgrounds/";
const output = root + "/data/modified/";
const options = {
    input,
    output
};

handleFiles(
    {
        background: x => ({
            name: x.name,
            source: x.source,
            skillProficiencies: x.skillProficiencies
                ? utils.formatChoose(x.skillProficiencies[0])
                : null,
            languageProficiencies: x.languageProficiencies
                ? utils.formatChoose(x.languageProficiencies[0])
                : null,
            startingEquipment: x.startingEquipment
                ? x.startingEquipment.map(equipmentSet =>
                      Object.keys(equipmentSet).reduce((accum, k) => {
                          let startingGold = 0;
                          accum[k] = equipmentSet[k]
                              .map(item => {
                                  if (typeof item === "string")
                                      return { item: item };

                                  if ("containsValue" in item) {
                                      startingGold =
                                          item["containsValue"] / 100;
                                      delete item["containsValue"];
                                      return item;
                                  }

                                  if ("value" in item) {
                                      startingGold = item["value"];
                                      return;
                                  }
                                  return item;
                              })
                              .filter(item => !!item);

                          if (startingGold > 0) {
                              accum[k].push({ value: startingGold });
                          }

                          return accum;
                      }, {})
                  )
                : null,
            entries: x.entries ? utils.separateEntries(x.entries) : null,
            feats: x.feats ? x.feats[0] : null,
            toolProficiencies: x.toolProficiencies
                ? utils.formatChoose(x.toolProficiencies[0])
                : null,
            additionalSpells: x.additionalSpells
                ? [
                      {
                          expanded: Object.entries(
                              x.additionalSpells[0].expanded
                          ).reduce((acc, [k, v]: [string, any]) => {
                              acc[k] = v.map(e => utils.clearSpellName(e));
                              return acc;
                          }, {})
                      }
                  ]
                : null,
            skillToolLanguageProficiencies: x.skillToolLanguageProficiencies
                ? utils.formatChoose(x.skillToolLanguageProficiencies[0])
                : null
        })
    },
    options
);
