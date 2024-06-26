import { handleFiles, Options, utils } from "./utils";
import rootDir from "app-root-dir";

const root = rootDir.get();

const input = root + "/storage/data/original/races/";
const output = root + "/storage/data/modified/";
const options: Options = {
  input,
  output,
};

handleFiles(
  {
    race: (e: any) => ({
      name: e.name,
      source: e.source,
      size: e.size,
      speed: utils.adapt(
        e.speed &&
          (Number.isInteger(e.speed)
            ? { walk: e.speed }
            : {
                walk: e.speed.walk,
                fly: utils.adapt(
                  e.speed.fly &&
                    (Number.isInteger(e.speed.fly) ? e.speed.fly : e.speed.walk)
                ),
                climb: utils.adapt(
                  e.speed.climb &&
                    (Number.isInteger(e.speed.climb)
                      ? e.speed.climb
                      : e.speed.walk)
                ),
                swim: utils.adapt(
                  e.speed.swim &&
                    (Number.isInteger(e.speed.swim)
                      ? e.speed.swim
                      : e.speed.walk)
                ),
              })
      ),
      ability: utils.adapt(utils.formatObject(e.ability)),
      toolProficiencies: utils.adapt(utils.formatObject(e.toolProficiencies)),
      languageProficiencies: utils.adapt(
        utils.formatObject(e.languageProficiencies)
      ),
      weaponProficiencies: utils.adapt(
        utils.formatObject(e.weaponProficiencies)
      ),
      armorProficiencies: utils.adapt(utils.formatObject(e.armorProficiencies)),
      skillProficiencies: utils.adapt(utils.formatObject(e.skillProficiencies)),
      entries: utils.adapt(utils.splitEntries(utils.asArray(e.entries))),
      feats: utils.adapt(utils.formatObject(e.feats)),
      additionalSpells: utils.adapt({
        spellcastingAbility: utils.adapt(
          utils.formatObject(utils.asObject(e.additionalSpells).ability)
        ),
        spells: utils.adapt([
          ...utils.formatSpells(
            ["1", "3", "5"],
            utils.asObject(e.additionalSpells).innate
          ),
          ...utils.formatSpells(
            ["1", "3", "5"],
            utils.asObject(e.additionalSpells).known
          ),
        ]),
      }),
    }),
    subrace: (x: any) => ({
      name: x.name,
      source: x.source,
      raceName: x.raceName,
      raceSource: x.raceSource,
      speed: utils.adapt(
        x.speed &&
          (Number.isInteger(x.speed)
            ? { walk: x.speed }
            : {
                walk: x.speed.walk,
                fly: utils.adapt(
                  x.speed.fly &&
                    (Number.isInteger(x.speed.fly) ? x.speed.fly : x.speed.walk)
                ),
                climb: utils.adapt(
                  x.speed.climb &&
                    (Number.isInteger(x.speed.climb)
                      ? x.speed.climb
                      : x.speed.walk)
                ),
                swim: utils.adapt(
                  x.speed.swim &&
                    (Number.isInteger(x.speed.swim)
                      ? x.speed.swim
                      : x.speed.walk)
                ),
              })
      ),
      ability: utils.adapt(utils.formatObject(x.ability)),
      toolProficiencies: utils.adapt(utils.formatObject(x.toolProficiencies)),
      languageProficiencies: utils.adapt(
        utils.formatObject(x.languageProficiencies)
      ),
      weaponProficiencies: utils.adapt(
        utils.formatObject(x.weaponProficiencies)
      ),
      armorProficiencies: utils.adapt(utils.formatObject(x.armorProficiencies)),
      skillProficiencies: utils.adapt(utils.formatObject(x.skillProficiencies)),
      skillToolLanguageProficiencies: utils.adapt(
        utils.formatObject(x.skillToolLanguageProficiencies)
      ),
      entries: utils.adapt(utils.splitEntries(utils.asArray(x.entries))),
      feats: utils.adapt(utils.formatObject(x.feats)),
      additionalSpells: utils.adapt({
        spellcastingAbility: utils.adapt(
          utils.formatObject(utils.asObject(x.additionalSpells).ability)
        ),
        spells: utils.adapt([
          ...utils.formatSpells(
            ["1", "3", "5"],
            utils.asObject(x.additionalSpells).innate
          ),
          ...utils.formatSpells(
            ["1", "3", "5"],
            utils.asObject(x.additionalSpells).known
          ),
        ]),
      }),
      overwrite: x.overwrite,
    }),
  },
  options
);
