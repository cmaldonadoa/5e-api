import { handleFiles, Options, utils } from "./utils";
import rootDir from "app-root-dir";

const root = rootDir.get();

const input = root + "/data/original/feats/";
const output = root + "/data/modified/";
const options: Options = {
  input,
  output,
};

function replaceKey(obj, oldKey, newKey) {
  if (obj.hasOwnProperty(oldKey)) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  return obj;
}

handleFiles(
  {
    feat: (e: any) => ({
      name: e.name,
      source: e.source,
      prerequisite: utils.adapt(e.prerequisite && e.prerequisite[0]),
      ability: utils.adapt(utils.formatObject(e.ability)),
      additionalSpells: utils.adapt(
        e.additionalSpells &&
          e.additionalSpells.map((x: any) => ({
            name: x.name,
            spellcastingAbility: utils.adapt(utils.formatObject(x.ability)),
            spells: [
              ...utils.formatSpells(["_"], x.innate),
              ...utils.formatSpells(["_"], x.known),
            ],
          }))
      ),
      entries: utils.adapt(utils.splitEntries(utils.asArray(e.entries))),
      toolProficiencies: utils.adapt(utils.formatObject(e.toolProficiencies)),
      languageProficiencies: utils.adapt(
        utils.formatObject(e.languageProficiencies)
      ),
      weaponProficiencies: utils.adapt(
        utils.formatObject(e.weaponProficiencies)
      ),
      armorProficiencies: utils.adapt(utils.formatObject(e.armorProficiencies)),
      skillProficiencies: utils.adapt(utils.formatObject(e.skillProficiencies)),
      savingThrowProficiencies: utils.adapt(
        utils.formatObject(e.savingThrowProficiencies)
      ),
      expertise: utils.adapt(utils.formatObject(e.expertise)),
      skillToolLanguageProficiencies: utils.adapt(
        utils.formatObject(e.skillToolLanguageProficiencies)
      ),
      optionalFeatureProgression: utils.adapt(
        utils.asArray(e.optionalfeatureProgression).map((x: any) => ({
          ...x,
          progression: replaceKey(x.progression, "*", "_"),
        }))
      ),
    }),
  },
  options
);
