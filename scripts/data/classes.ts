import { handleFiles, Options, utils } from "./utils";
import rootDir from "app-root-dir";

const root = rootDir.get();
const input = root + "/storage/data/original/classes/";
const output = root + "/storage/data/modified/";
const options: Options = {
  input,
  output,
};

function replaceKey(obj, oldKey, newKey) {
  if (!obj) return;
  if (obj.hasOwnProperty(oldKey)) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  return obj;
}

function replaceKeys(obj, oldKeys, newKeys) {
  for (let i = 0; i < oldKeys.length; i++) {
    obj = replaceKey(obj, oldKeys[i], newKeys[i]);
  }
  return obj;
}

function asResource(entries) {
  const processEntry = <T>(
    entry,
    fn: (text: string) => T,
    reducer: (list: T[]) => T
  ): T => {
    if (typeof entry === "string") {
      return fn(entry);
    } else {
      const type = entry.type;
      if (type === "list") {
        return reducer(
          entry.items.map((item) => processEntry(item, fn, reducer))
        );
      }
      if (type === "entries") {
        return reducer(
          entry.entries.map((item) => processEntry(item, fn, reducer))
        );
      }
    }
  };

  const parseUses = (text: string) => {
    const allowedModifiers = [
      "Charisma",
      "Wisdom",
      "Strength",
      "Constitution",
      "Dexterity",
      "Intelligence",
      "proficiency bonus",
    ];

    const shortName = {
      Charisma: "<$cha_mod$>",
      Wisdom: "<$wis_mod$>",
      Strength: "<$str_mod$>",
      Constitution: "<$con_mod$>",
      Dexterity: "<$dex_mod$>",
      Intelligence: "<$int_mod$>",
      "proficiency bonus": "<$proficiency_bonus$>",
    };

    const regex = new RegExp(`\\b(${allowedModifiers.join("|")})\\b`);
    const match = text.match(regex);
    return match
      ? text.startsWith("1")
        ? "1 + " + shortName[match[1]]
        : shortName[match[1]]
      : "1";
  };

  let isTrackable = entries.some((entry) =>
    processEntry(
      entry,
      (text) => text.search(/finish a [\w\s]+rest/) !== -1,
      (list) => list.reduce((acc, e) => acc && e, true)
    )
  );

  if (isTrackable) {
    let numberOfUses = entries.reduce((acc, entry) => {
      const processedEntry = processEntry(
        entry,
        (text) =>
          text.match(/a number of times equal to\s*(.*?)[.,]/)
            ? text.match(/a number of times equal to\s*(.*?)[.,]/)[1]
            : "",
        (list) => list.reduce((acc, e) => (e ? e : acc), "")
      );
      return processedEntry ? processedEntry : acc;
    }, "");
    return parseUses(numberOfUses);
  }
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
      cantripProgression: utils.adapt(
        Object.fromEntries(
          Object.entries(utils.asObject(e.cantripProgression)).map(
            ([key, value]) => ["_" + (parseInt(key) + 1), value]
          )
        )
      ),
      optionalFeatureProgression: utils.adapt(
        utils.asArray(e.optionalfeatureProgression).map((x) => ({
          ...x,
          progression: Array.isArray(x.progression)
            ? Object.fromEntries(
                Object.entries(utils.asObject(x.progression)).map(
                  ([key, value]) => ["_" + (parseInt(key) + 1), value]
                )
              )
            : Object.fromEntries(
                Object.entries(x.progression).map(([key, value]) => [
                  isNaN(+key) ? key : "_" + key,
                  value,
                ])
              ),
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
            utils.asObject(
              utils.asObject(
                replaceKeys(
                  e.multiclassing.proficienciesGained,
                  ["armor", "weapons", "skills", "tools"],
                  [
                    "armorProficiencies",
                    "weaponProficiencies",
                    "skillProficiencies",
                    "toolProficiencies",
                  ]
                )
              )
            )
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
            utils.asArray(table.rows).map((row) =>
              row.map((x) =>
                typeof x === "object"
                  ? { ...x, value: "" + x.value }
                  : {
                      type: "value",
                      value: "" + x,
                    }
              )
            )
          ),
        }))
      ),
      classFeatures: e.classFeatures.map((feature) => {
        const [featureName, className, _, level, source] =
          typeof feature === "string"
            ? feature.split("|")
            : feature.classFeature.split("|");
        const gainSubclassFeature = feature.gainSubclassFeature;
        const gainSubclassFeatureHasContent =
          feature.gainSubclassFeatureHasContent;
        return {
          featureName,
          className,
          level: +level,
          source: utils.adapt(source),
          gainSubclassFeature,
          gainSubclassFeatureHasContent,
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
      cantripProgression: utils.adapt(
        Object.fromEntries(
          Object.entries(utils.asObject(e.cantripProgression)).map(
            ([key, value]) => ["_" + (parseInt(key) + 1), value]
          )
        )
      ),
      spellsKnownProgression: utils.adapt(e.spellsKnownProgression),
      subclassTableGroups: utils.adapt(
        utils.asArray(e.subclassTableGroups).map((table) => ({
          ...table,
          rows: utils.adapt(
            utils.asArray(table.rows).map((row) =>
              row.map((x) =>
                typeof x === "object"
                  ? { ...x, value: "" + x.value }
                  : {
                      type: "value",
                      value: "" + x,
                    }
              )
            )
          ),
        }))
      ),
      optionalFeatureProgression: utils.adapt(
        utils.asArray(e.optionalfeatureProgression).map((x) => ({
          ...x,
          progression: Array.isArray(x.progression)
            ? Object.fromEntries(
                Object.entries(utils.asObject(x.progression)).map(
                  ([key, value]) => ["_" + (parseInt(key) + 1), value]
                )
              )
            : Object.fromEntries(
                Object.entries(x.progression).map(([key, value]) => [
                  isNaN(+key) ? key : "_" + key,
                  value,
                ])
              ),
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
      source: e.source,
      className: e.className,
      classSource: e.classSource,
      level: e.level,
      entries: utils
        .splitEntries(utils.asArray(e.entries))
        .map((entry) =>
          replaceKey(entry, "optionalfeature", "optionalFeature")
        ),
      isClassFeatureVariant: e.isClassFeatureVariant,
      consumes: utils.adapt({
        name: utils.asObject(e.consumes).name,
        amount: utils.asObject(e.consumes).amount || (e.consumes && 1),
      }),
      usesFormula: utils.adapt(asResource(e.entries)),
    }),
    subclassFeature: (e: any) => ({
      name: e.name,
      source: e.source,
      className: e.className,
      classSource: e.classSource,
      subclassShortName: e.subclassShortName,
      subclassSource: e.subclassSource,
      level: e.level,
      entries: utils.splitEntries(utils.asArray(e.entries)).map((entry) => ({
        ...replaceKey(entry, "optionalfeature", "optionalFeature"),
        rows: utils.adapt(
          utils
            .asArray(entry.rows)
            .map((row) => row.map((x) => (typeof x === "object" ? x : "" + x)))
        ),
      })),
      isClassFeatureVariant: e.isClassFeatureVariant,
      consumes: utils.adapt({
        name: utils.asObject(e.consumes).name,
        amount: utils.asObject(e.consumes).amount || (e.consumes && 1),
      }),
      type: e.type,
      usesFormula: utils.adapt(asResource(e.entries)),
    }),
    optionalFeature: (e: any) => ({
      name: e.name,
      source: e.source,
      featureType: e.featureType,
      prerequisite: utils.adapt(
        e.prerequisite && {
          level: utils.adapt(utils.asObject(e.prerequisite[0].level).level),
          class: utils.adapt(
            utils.asObject(utils.asObject(e.prerequisite[0].level).class).name
          ),
          subclass: utils.adapt(
            utils.asObject(utils.asObject(e.prerequisite[0].level).subclass)
              .name
          ),
          item: utils.adapt(e.prerequisite[0].item),
          spell: utils.adapt(
            utils
              .asArray(e.prerequisite[0].spell)
              .map((x) => utils.clearName(x))
          ),
          pact: utils.adapt(e.prerequisite[0].pact),
        }
      ),
      entries: utils.splitEntries(utils.asArray(e.entries)).map((entry) => ({
        ...entry,
        rows: utils.adapt(
          utils
            .asArray(entry.rows)
            .map((row) => row.map((x) => (typeof x === "object" ? x : "" + x)))
        ),
      })),
      skillProficiencies: utils.adapt(utils.formatObject(e.skillProficiencies)),
      isClassFeatureVariant: e.isClassFeatureVariant,
      consumes: utils.adapt({
        name: utils.asObject(e.consumes).name,
        amount: utils.asObject(e.consumes).amount || (e.consumes && 1),
      }),
      optionalFeatureProgression: utils.adapt(
        utils.asArray(e.optionalfeatureProgression).map((x) => ({
          ...x,
          progression: replaceKey(x.progression, "*", "_"),
        }))
      ),
      additionalSpells: utils.adapt(
        e.additionalSpells &&
          e.additionalSpells.map((x: any) => ({
            spellcastingAbility: utils.adapt(utils.formatObject(x.ability)),
            spells: [
              ...utils.formatSpells(["_"], x.innate),
              ...utils.formatSpells(["_"], x.known),
            ],
            resource: utils.adapt(x.resourceName),
          }))
      ),
      usesFormula: utils.adapt(asResource(e.entries)),
    }),
  },
  options
);
