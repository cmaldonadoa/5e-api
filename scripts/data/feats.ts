import { utils, handleFiles } from "./utils";
import rootDir from "app-root-dir";

const root = rootDir.get();

const input = root + "/data/original/feats/";
const output = root + "/data/modified/";
const options = {
    input,
    output,
    enableInternalTests: { enabled: false, property: "entries", key: "feat" },
    enableCustomTests: {
        enabled: false,
        tests: e => {
            e.entries.forEach(x => {
                x.items && console.log(x.items);
            });
        }
    }
};

handleFiles(
    {
        feat: e => ({
            name: e.name,
            source: e.source,
            prerequisite: e.prerequisite ? e.prerequisite[0] : null,
            ability: e.ability ? utils.formatChoose(e.ability[0]) : null,
            additionalSpells: e.additionalSpells
                ? e.additionalSpells.map(x => ({
                      name: x.name,
                      spellcastingAbility: x.ability
                          ? utils.formatChoose(x.ability)
                          : null,
                      spells: [
                          ...utils.formatSpells(x.innate, ["_"]),
                          ...utils.formatSpells(x.known, ["_"])
                      ]
                  }))
                : null,
            entries: e.entries ? utils.separateEntries(e.entries) : null,
            toolProficiencies: e.toolProficiencies
                ? utils.formatChoose(e.toolProficiencies[0])
                : null,
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
            savingThrowProficiencies: e.savingThrowProficiencies
                ? utils.formatChoose(e.savingThrowProficiencies[0])
                : null,
            expertise: e.expertise ? utils.formatChoose(e.expertise[0]) : null,
            skillToolLanguageProficiencies: e.skillToolLanguageProficiencies
                ? utils.formatChoose(e.skillToolLanguageProficiencies[0])
                : null,
            optionalfeatureProgression: e.optionalfeatureProgression
        })
    },
    options
);
