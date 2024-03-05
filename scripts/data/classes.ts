import { handleFiles, Options, utils } from "./utils";
import rootDir from "app-root-dir";

const root = rootDir.get();

const input = root + "/data/original/classes/";
const output = root + "/data/modified/";
const options: Options = {
  input,
  output,
  peek: {
    enabled: true,
    key: "subclassFeature",
    peek: (e) => {
      e.entries.map((entry) => {
        if (entry.rows) {
          entry.rows.map((row) => {
            if (
              row.some((x) => typeof x === "string") &&
              row.some((x) => typeof x === "number")
            )
              console.log(entry);
          });
        }
      });
    },
  },
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
    class: (e: any) => ({
      name: e.name,
      source: e.source,
      hitDie: e.hd,
      savingThrowProficiencies: e.proficiency,
      spellcastingAbility: utils.adapt(e.spellcastingAbility),
      multiclassSlotsProgression: utils.adapt(e.casterProgression),
      preparedSpellsFormula: utils.adapt(e.preparedSpells),
      cantripProgression: utils.adapt(utils.asArray(e.cantripProgression)),
      optionalFeatureProgression: utils.adapt(
        utils.asArray(e.optionalfeatureProgression).map((x) => ({
          ...x,
          progression: Array.isArray(x.progression)
            ? Object.fromEntries(
                Object.entries(utils.asObject(x.progression)).map(
                  ([key, value]) => [parseInt(key) + 1, value]
                )
              )
            : x.progression,
        }))
      ),
      armorProficiencies: utils.adapt(
        utils.formatObject(utils.asArray(e.startingProficiencies.armor))
      ),
      weaponProficiencies: utils.adapt(
        utils.formatObject(utils.asArray(e.startingProficiencies.weapons))
      ),
      toolProficiencies: utils.adapt(
        utils.formatObject(utils.asArray(e.startingProficiencies.tools))
      ),
      skillProficiencies: utils.adapt(
        utils.formatObject(utils.asArray(e.startingProficiencies.skills))
      ),
      startingEquipment: utils.adapt(
        utils.asArray(e.startingEquipment.defaultData).map((equipmentSet) =>
          Object.keys(equipmentSet).reduce((accum, k) => {
            accum[k] = equipmentSet[k].map((item: any) => {
              if (typeof item === "string")
                return { item: utils.clearName(item) };

              return {
                ...item,
                ...(item.item && {
                  item: utils.clearName(item.item),
                }),
              };
            });
            return accum;
          }, {})
        )
      ),
      multiclassing: utils.adapt({
        requirements: utils.adapt(utils.asObject(e.multiclassing).requirements),
        proficienciesGained: utils.adapt(
          Object.entries(
            utils.asObject(utils.asObject(e.multiclassing).proficienciesGained)
          ).reduce((accum, [k, v]) => {
            accum[k] = utils.adapt(utils.formatObject(v));
            return accum;
          }, {})
        ),
      }),
      classTableGroups: utils.adapt(
        utils.asArray(e.classTableGroups).map((table) => ({
          ...table,
          rows: utils.adapt(
            utils.asArray(table.rows).map((row) => row.map((x) => "" + x))
          ),
        }))
      ),
      classFeatures: e.classFeatures.map((feature) => {
        const [featureName, className, _, level, source] =
          typeof feature === "string"
            ? feature.split("|")
            : feature.classFeature.split("|");
        return {
          featureName,
          className,
          level: +level,
          source: utils.adapt(source),
        };
      }),
      subclassTitle: e.subclassTitle,
      spellsKnownProgression: utils.adapt(e.spellsKnownProgression),
      additionalSpells:
        utils.adapt(
          utils.asArray(e.additionalSpells).map((spellsSet) => ({
            name: utils.adapt(spellsSet.name),
            spellcastingAbility: utils.adapt(e.spellcastingAbility),
            spells: utils.adapt(
              utils.formatSpells(
                [...Array(20).keys()].map((k) => "" + (k + 1)),
                spellsSet.known
              )
            ),
          }))
        ) ||
        utils.adapt(
          e.spellsKnownProgressionFixedByLevel &&
            utils.asArray({
              name: "Mystic Arcanum",
              spellcastingAbility: utils.adapt(e.spellcastingAbility),
              spells: utils.adapt(
                utils.formatSpells(
                  [...Array(20).keys()].map((k) => "" + (k + 1)),
                  {
                    "11": [{ choose: "level=6", count: 1 }],
                    "13": [{ choose: "level=7", count: 1 }],
                    "15": [{ choose: "level=8", count: 1 }],
                    "16": [{ choose: "level=9", count: 1 }],
                  }
                )
              ),
            })
        ),
    }),
    subclass: (e: any) => ({
      name: e.name,
      source: e.source,
      shortName: e.shortName,
      className: e.className,
      classSource: e.classSource,
      subclassFeatures: e.subclassFeatures.map((feature) => {
        const [featureName, className, _, subclassName, source, level] =
          typeof feature === "string"
            ? feature.split("|")
            : feature.subclassFeature.split("|");
        return {
          featureName,
          className,
          subclassName,
          level: +level,
          source: utils.adapt(source),
        };
      }),
      spellcastingAbility: utils.adapt(e.spellcastingAbility),
      multiclassSlotsProgression: utils.adapt(e.casterProgression),
      cantripProgression: utils.adapt(utils.asArray(e.cantripProgression)),
      spellsKnownProgression: utils.adapt(e.spellsKnownProgression),
      subclassTableGroups: utils.adapt(
        utils.asArray(e.subclassTableGroups).map((table) => ({
          ...table,
          rows: utils.adapt(
            utils.asArray(table.rows).map((row) => row.map((x) => "" + x))
          ),
        }))
      ),
      optionalFeatureProgression: utils.adapt(
        utils.asArray(e.optionalfeatureProgression).map((x) => ({
          ...x,
          progression: Array.isArray(x.progression)
            ? Object.fromEntries(
                Object.entries(utils.asObject(x.progression)).map(
                  ([key, value]) => [parseInt(key) + 1, value]
                )
              )
            : x.progression,
        }))
      ),
      additionalSpells: utils.adapt(
        utils.asArray(e.additionalSpells).map((spellSet) =>
          utils.adapt({
            name: utils.adapt(spellSet.name),
            spellcastingAbility: utils.adapt(
              spellSet.ability || e.spellcastingAbility
            ),
            expanded: utils.adapt(
              Object.entries(
                utils.asObject(spellSet.expanded || spellSet.expandedFilter)
              ).reduce((acc, [k, v]: [string, any]) => {
                acc[k] = v.map((x: any) =>
                  typeof x === "string" ? { item: utils.clearName(x) } : x
                );
                return acc;
              }, {})
            ),
            spells: utils.adapt([
              ...utils.formatSpells(
                ["_", ...Array(20).keys()].map((k, i) =>
                  i > 0 ? "" + ((k as number) + 1) : (k as string)
                ),
                spellSet.innate
              ),
              ...utils.formatSpells(
                ["_", ...Array(20).keys()].map((k, i) =>
                  i > 0 ? "" + ((k as number) + 1) : (k as string)
                ),
                spellSet.known
              ),
            ]),

            prepared: utils.adapt(
              Object.entries(utils.asObject(e.prepared)).reduce(
                (accum, [k, v]) => {
                  accum[k] = utils.formatObject(v);
                  return accum;
                },
                {}
              )
            ),
          })
        )
      ),
    }),
    classFeature: (e: any) => ({
      name: e.name,
      source: e.name,
      className: e.className,
      classSource: e.classSource,
      level: e.level,
      entries: utils.splitEntries(utils.asArray(e.entries)),
      isClassFeatureVariant: e.isClassFeatureVariant,
      consumes: utils.adapt({
        name: utils.asObject(e.consumes).name,
        amount: utils.asObject(e.consumes).amount || (e.consumes && 1),
      }),
    }),
    subclassFeature: (e: any) => ({
      name: e.name,
      source: e.name,
      className: e.className,
      classSource: e.classSource,
      subclassShortName: e.subclassShortName,
      subclassSource: e.subclassSource,
      level: e.level,
      entries: utils.splitEntries(utils.asArray(e.entries)).map((entry) => ({
        ...entry,
        rows: utils.adapt(
          utils.asArray(entry.rows).map((row) => row.map((x) => "" + x))
        ),
      })),
      isClassFeatureVariant: e.isClassFeatureVariant,
      consumes: utils.adapt({
        name: utils.asObject(e.consumes).name,
        amount: utils.asObject(e.consumes).amount || (e.consumes && 1),
      }),
      type: e.type,
    }),
  },
  options
);
