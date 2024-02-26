import { utils, handleFiles } from "./utils.js";
import rootDir from "app-root-dir";

const root = rootDir.get();

const input = root + "/data/original/races/";
const output = root + "/data/modified/";
const options = {
    input,
    output
};

handleFiles(
    {
        race: e => ({
            name: e.name,
            source: e.source,
            size: e.size,
            speed: e.speed
                ? Number.isInteger(e.speed)
                    ? { walk: e.speed }
                    : {
                          walk: e.speed.walk,
                          fly: e.speed.fly
                              ? Number.isInteger(e.speed.fly)
                                  ? e.speed.fly
                                  : e.speed.walk
                              : null,
                          climb: e.speed.climb
                              ? Number.isInteger(e.speed.climb)
                                  ? e.speed.climb
                                  : e.speed.walk
                              : null,
                          swim: e.speed.swim
                              ? Number.isInteger(e.speed.swim)
                                  ? e.speed.swim
                                  : e.speed.walk
                              : null
                      }
                : null,
            ability: e.ability ? utils.formatChoose(e.ability[0]) : null,
            languageProficiencies: e.languageProficiencies
                ? utils.formatChoose(e.languageProficiencies[0])
                : null,
            weaponProficiencies: e.weaponProficiencies
                ? utils.formatChoose(e.weaponProficiencies[0])
                : null,
            armorProficiencies: e.armorProficiencies
                ? utils.formatChoose(e.armorProficiencies[0])
                : null,
            skillProficiencies: e.skillProficiencies
                ? utils.formatChoose(e.skillProficiencies[0])
                : null,
            toolProficiencies: e.toolProficiencies
                ? utils.formatChoose(e.toolProficiencies[0])
                : null,
            entries: utils.separateEntries(e.entries),
            feats: e.feats ? e.feats[0] : null,
            additionalSpells: e.additionalSpells
                ? {
                      spellcastingAbility: e.additionalSpells.ability
                          ? utils.formatChoose(e.additionalSpells.ability)
                          : null,
                      spells: [
                          ...utils.formatSpells(e.additionalSpells.innate, [
                              "1",
                              "3",
                              "5"
                          ]),
                          ...utils.formatSpells(e.additionalSpells.known, [
                              "1",
                              "3",
                              "5"
                          ])
                      ]
                  }
                : null
        }),
        subrace: x => ({
            name: x.name,
            source: x.source,
            raceName: x.raceName,
            raceSource: x.raceSource,
            speed: x.speed
                ? Number.isInteger(x.speed)
                    ? { walk: x.speed }
                    : {
                          walk: x.speed.walk,
                          fly: x.speed.fly
                              ? Number.isInteger(x.speed.fly)
                                  ? x.speed.fly
                                  : x.speed.walk
                              : null,
                          climb: x.speed.climb
                              ? Number.isInteger(x.speed.climb)
                                  ? x.speed.climb
                                  : x.speed.walk
                              : null,
                          swim: x.speed.swim
                              ? Number.isInteger(x.speed.swim)
                                  ? x.speed.swim
                                  : x.speed.walk
                              : null
                      }
                : null,
            ability: x.ability ? utils.formatChoose(x.ability[0]) : null,
            languageProficiencies: x.languageProficiencies
                ? utils.formatChoose(x.languageProficiencies[0])
                : null,
            weaponProficiencies: x.weaponProficiencies
                ? utils.formatChoose(x.weaponProficiencies[0])
                : null,
            armorProficiencies: x.armorProficiencies
                ? utils.formatChoose(x.armorProficiencies[0])
                : null,
            skillProficiencies: x.skillProficiencies
                ? utils.formatChoose(x.skillProficiencies[0])
                : null,
            toolProficiencies: x.toolProficiencies
                ? utils.formatChoose(x.toolProficiencies[0])
                : null,
            skillToolLanguageProficiencies: x.skillToolLanguageProficiencies
                ? utils.formatChoose(x.skillToolLanguageProficiencies[0])
                : null,
            entries: utils.separateEntries(x.entries),
            feats: x.feats ? x.feats[0] : null,
            additionalSpells: x.additionalSpells
                ? {
                      spellcastingAbility: x.additionalSpells.ability
                          ? utils.formatChoose(x.additionalSpells.ability)
                          : null,
                      spells: [
                          ...utils.formatSpells(x.additionalSpells.innate, [
                              "1",
                              "3",
                              "5"
                          ]),
                          ...utils.formatSpells(x.additionalSpells.known, [
                              "1",
                              "3",
                              "5"
                          ])
                      ]
                  }
                : null,
            overwrite: x.overwrite
        })
    },
    options
);
