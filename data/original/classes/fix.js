const fs = require("fs");
const { render } = require("react-dom");
const basename = require("path").basename;

const files = fs.readdirSync(__dirname);
const jsonFiles = files.filter(
  (item) =>
    /.json$/.test(item) && !/^foundry/.test(item) && !/^optional/.test(item),
);

function formatEntries(entries) {
  if (!Array.isArray(entries)) console.log({ entries });

  return entries.map((entry) =>
    typeof entry === "string"
      ? { type: "text", entry }
      : entry.type === "entries"
        ? { ...entry, entries: formatEntries(entry.entries) }
        : entry,
  );
}

function renderEntries(item) {
  if (!item.entries) return false;

  if (
    typeof item.entries[0] !== "string" ||
    item.entries[0].search("#itemEntry") === -1
  )
    return false;

  const [name] = item.entries[0].match(/{#itemEntry (.*)}/)[1].split("|");

  function replaceVariables(entries) {
    return entries.map((entry) => {
      if (typeof entry === "string") {
        const matches = entry.match(/{{item.(\w*)}}/g);
        if (matches) {
          const variables = matches.map((m) => m.match(/{{item.(.*)}}/)[1]);
          return variables.reduce(
            (acc, v) => acc.replaceAll(`{{item.${v}}}`, item[v]),
            entry,
          );
        } else {
          return entry;
        }
      } else {
        return { ...entry, entries: replaceVariables(entry.entries) };
      }
    });
  }

  const filename = jsonFiles[0];
  const data = fs.readFileSync(filename, "utf8");
  const itemEntries = JSON.parse(data).itemEntry;
  const itemEntry = itemEntries.find((e) => e.name === name);
  return replaceVariables(itemEntry.entriesTemplate);
}

function separateEntries(entries, nextId = 0, parentId = null) {
  if (!entries) return [];

  let result = [];
  formatEntries(entries).forEach((entry) => {
    const id = nextId;
    const descendantNodes = separateEntries(entry.entries, id + 1, id);
    delete entry.entries;
    result = [
      ...result,
      {
        ...entry,
        id,
        children:
          descendantNodes.length > 0
            ? descendantNodes.filter((e) => e.parentId === id).map((e) => e.id)
            : [],
        parentId,
      },
      ...descendantNodes,
    ];
    nextId = id + 1 + descendantNodes.length;
  });
  return result;
}

function constructCopy(copy) {
  if (!copy) return {};

  let base = null;
  let search = true;

  for (const filename of jsonFiles) {
    if (!search) return;

    const data = fs.readFileSync(filename, "utf8");
    const items = JSON.parse(data).race;

    const item = items.find(
      (e) => e.name === copy.name && e.source === copy.source,
    );

    if (item) {
      base = item;
      search = false;
    }
  }

  if (base._copy) base = constructCopy(base._copy);

  delete base.name;
  delete base.source;

  if (copy._mod) {
    const entries = Array.isArray(copy._mod.entries)
      ? copy._mod.entries
      : [copy._mod.entries];
    entries.forEach((entry) => {
      if (entry.mode === "removeArr")
        base.entries = base.entries.filter((e) => e.name !== entry.names);
      else if (entry.mode === "replaceArr")
        base.entries[base.entries.findIndex((e) => e.name === entry.replace)] =
          entry.items;
      else if (entry.mode === "insertArr")
        base.entries.splice(entry.index, 0, entry.items);
    });
  }

  return base;
}

function formatSpells(spells) {
  if (!spells) return [];

  const keys = [...Array(20).keys()].map((k) => "" + (k + 1));
  let spellList = [];

  keys.forEach((k) => {
    const obj = spells[k];

    if (!obj) return;

    if (Array.isArray(obj)) {
      let s = obj.map((o) => ({
        item: formatChoose(o),
        _meta: {
          level: +k,
        },
      }));
      spellList = [...spellList, ...s];
    }

    if ("will" in obj) {
      let s = obj.will.map((o) => ({
        item: formatChoose(o),
        _meta: {
          level: +k,
          will: true,
        },
      }));
      spellList = [...spellList, ...s];
    }
    if ("ritual" in obj) {
      let s = obj.ritual.map((o) => ({
        item: formatChoose(o),
        _meta: {
          level: +k,
          ritual: true,
        },
      }));
      spellList = [...spellList, ...s];
    }
    if ("daily" in obj) {
      let s = obj.daily["1"].map((o) => ({
        item: formatChoose(o),
        _meta: {
          level: +k,
          longRest: 1,
        },
      }));
      spellList = [...spellList, ...s];
    }
    if ("rest" in obj) {
      let s = obj.rest["1"].map((o) => ({
        item: formatChoose(o),
        _meta: {
          level: +k,
          shortRest: 1,
        },
      }));
      spellList = [...spellList, ...s];
    }
    if ("resource" in obj) {
      let s = obj.resource["2"].map((o) => ({
        item: formatChoose(o),
        _meta: {
          level: +k,
        },
      }));
      spellList = [...spellList, ...s];
    }
  });

  return spellList;
}

function formatChoose(obj) {
  if (typeof obj === "string") return { [clearSpellName(obj)]: true };

  if ("choose" in obj) {
    if (typeof obj.choose === "string")
      return {
        choose: {
          from: null,
          fromFilter: obj.choose,
          count: obj.count || 1,
        },
      };
    else if ("from" in obj.choose)
      return {
        choose: {
          from: Array.isArray(obj.choose.from)
            ? obj.choose.from.map((n) => clearSpellName(n))
            : null,
          fromFilter: Array.isArray(obj.choose.from) ? null : obj.choose.from,
          count: obj.choose.count || 1,
        },
      };
    else
      return {
        choose: {
          from: Array.isArray(obj.choose)
            ? obj.choose.map((n) => clearSpellName(n))
            : null,
          fromFilter: Array.isArray(obj.choose)
            ? null
            : obj.choose.fromFilter || obj.choose,
          count: obj.count || 1,
        },
      };
  }
  return obj;
}

function clearSpellName(name) {
  return name.split("#")[0];
}

function constructVersions(obj) {
  if (!("_versions" in obj)) return [];

  let versions = obj._versions;
  delete obj._versions;

  if (versions.length === 1) {
    const template = versions[0]._template;
    const implementations = versions[0]._implementations;

    const replaceVars = (text, vars) => {
      const regexp = new RegExp(
        "{{(" + Object.keys(vars).join("|") + ")}}",
        "g",
      );
      return text.replace(regexp, (m, $1) => vars[$1] || m);
    };

    versions = implementations.map((i) => {
      const variables = i._variables;
      delete i._variables;

      return {
        ...template,
        ...i,
        name: replaceVars(template.name, variables),
        _mod: {
          entries: template._mod.entries.map((entry) => ({
            ...entry,
            items: entry.items
              ? {
                  ...entry.items,
                  entries: entry.items.entries.map((e) =>
                    replaceVars(e, variables),
                  ),
                }
              : null,
          })),
        },
      };
    });
  }

  return versions.map((version) => {
    let entries = obj.entries;

    if (entries) {
      let entriesMod = Array.isArray(version._mod.entries)
        ? version._mod.entries
        : [version._mod.entries];
      delete version._mod;

      entriesMod.forEach((entry) => {
        if (entry.mode === "removeArr")
          entries = entries.filter((e) => e.name !== entry.names);
        else if (entry.mode === "replaceArr")
          entries[entries.findIndex((e) => e.name === entry.replace)] =
            entry.items;
        else if (entry.mode === "insertArr")
          entries.splice(entry.index, 0, entry.items);
      });
    }

    return {
      ...obj,
      ...version,
      entries,
    };
  });
}

let keys = {
  _total: 0,
};

const add = (key) => {
  if (key in keys) {
    keys[key] += 1;
  } else {
    keys[key] = 1;
  }
  return true;
};

for (let filename of jsonFiles) {
  const data = fs.readFileSync(filename, "utf8");

  let oldData = JSON.parse(data);

  let additional = {};

  let newData = {
    class: oldData.class.map((e) => {
      const handle = (x) => {
        return {
          name: x.name,
          source: x.source,
          hitDie: "d" + x.hd.faces,
          savingThrowProficiencies: x.proficiency,
          spellcastingAbility: x.spellcastingAbility,
          casterProgression: x.casterProgression,
          preparedSpellsFormula: x.preparedSpells,
          cantripsKnownProgression: x.cantripProgression,
          optionalfeatureProgression: x.optionalfeatureProgression
            ? x.optionalfeatureProgression.map((p) => ({
                name: p.name,
                featureType: p.featureType,
                progression: Array.isArray(p.progression)
                  ? p.progression.reduce((accum, level, index) => {
                      accum["" + (index + 1)] = level;
                      return accum;
                    }, {})
                  : p.progression,
              }))
            : null,
          startingProficiencies: x.startingProficiencies,
          startingEquipment: x.startingEquipment.defaultData.map(
            (equipmentSet) =>
              Object.keys(equipmentSet).reduce((accum, k) => {
                let startingGold = 0;
                accum[k] = equipmentSet[k]
                  .map((item) => {
                    if (typeof item === "string") return { item: item };

                    if ("containsValue" in item) {
                      startingGold = item["containsValue"] / 100;
                      delete item["containsValue"];
                      return item;
                    }

                    if ("value" in item) {
                      startingGold = item["value"];
                      return;
                    }
                    return item;
                  })
                  .filter((item) => !!item);

                if (startingGold > 0) {
                  accum[k].push({ value: startingGold });
                }

                return accum;
              }, {}),
          ),
          multiclassing: x.multiclassing,
          classTableGroups: x.classTableGroups
            ? x.classTableGroups.map((group) => ({
                title: group.title,
                colLabels: group.colLabels,
                rows: (group.rows || group.rowsSpellProgression).map((row) =>
                  row.map((i) =>
                    Number.isInteger(i)
                      ? "" + i
                      : typeof i === "string"
                        ? i
                        : i.type === "bonus"
                          ? "+" + i.value
                          : i.type === "dice"
                            ? i.toRoll[0].number + "d" + i.toRoll[0].faces
                            : i.type === "bonusSpeed"
                              ? "+" + i.value + " ft."
                              : null,
                  ),
                ),
              }))
            : null,
          classFeatures: x.classFeatures.map((feature) => ({
            classFeature: feature.classFeature || feature,
            tableDisplayName: feature.tableDisplayName || null,
          })),
          subclassTitle: x.subclassTitle,
          spellsKnownProgression: x.spellsKnownProgression,
          additionalSpells: x.additionalSpells
            ? x.additionalSpells.map((s) => ({
                name: s.name,
                spells: [...formatSpells(s.innate), ...formatSpells(s.known)],
              }))
            : null,
          spellsKnownProgressionFixedByLevel:
            x.spellsKnownProgressionFixedByLevel,
        };
      };
      return handle(e);
    }),
    subclass: oldData.subclass.map((e) => {
      const handle = (x) => {
        keys._total += 1;

        const property = "subclassTableGroups";
        const enableTests1 = true;
        const enableTests2 = false;

        if (!enableTests1 && !enableTests2)
          Object.keys(x).forEach((k) => add(k));

        if (x[property] && enableTests1) {
          let value = x[property];

          // Count occurrences
          add("_subtotal");

          // Test neighbor properties
          //Object.keys(e).forEach((k) => k !== property && add("NEIGHBOR-" + k));

          // Test property types
          add("TYPE-" + ((Array.isArray(value) && "array") || typeof value));

          if (typeof value === "string") {
            if (value.length < 6) add("VALUE-" + value);
          }

          if (!Array.isArray(value))
            // Test object keys
            Object.keys(value).forEach((k) => add(k));

          if (Array.isArray(value)) {
            // Test property array keys
            value.forEach((v) =>
              typeof v !== "string"
                ? add("_object") && Object.keys(v).forEach((k) => add(k))
                : add("_string"),
            );

            // Test property array length
            if (value.length) add("LENGTH-" + value.length);

            // Test long arrays
            // if (value.length && value.length > 1)
            //   add(`ITEM-LENGTH-${value.length}-` + x.name);

            // Test property array value types
            value.forEach(
              (v) =>
                typeof v !== "string" &&
                Object.keys(v).forEach((k) =>
                  add(
                    `TYPE-${k}-` +
                      ((Array.isArray(v[k]) && "array") || typeof v[k]),
                  ),
                ),
            );
          }
        }

        if (x[property] && enableTests2) {
          let value = x[property];

          value.forEach((v) => console.log(x.name, v.progression));
        }

        return {
          name: x.name,
          source: x.source,
          shortName: x.shortName,
          className: x.className,
          classSource: x.classSource,
          additionalSpells: x.additionalSpells
            ? Array.isArray(x.additionalSpells)
              ? x.additionalSpells.map((s) => ({
                  name: s.name,
                  spells: [...formatSpells(s.innate), ...formatSpells(s.known)],
                  expanded: s.expanded
                    ? Object.entries(s.expanded).reduce((acc, [k, v]) => {
                        acc[k] = v.map((spell) => clearSpellName(spell));
                        return acc;
                      }, {})
                    : null,
                  expandedFilter: s.expandedFilter
                    ? Object.entries(s.expandedFilter).reduce((acc, [k, v]) => {
                        acc[k] = v.map((spell) => clearSpellName(spell.all));
                        return acc;
                      }, {})
                    : null,
                  prepared: s.prepared
                    ? Object.entries(s.prepared).reduce((acc, [k, v]) => {
                        acc[k] = v.map((spell) => clearSpellName(spell));
                        return acc;
                      }, {})
                    : null,
                }))
              : [x.additionalSpells].map((s) => ({
                  name: s.name,
                  spells: [...formatSpells(s.innate), ...formatSpells(s.known)],
                }))
            : null,
          subclassFeatures: x.subclassFeatures,
          spellcastingAbility: x.spellcastingAbility,
          optionalfeatureProgression: x.optionalfeatureProgression
            ? x.optionalfeatureProgression.map((p) => ({
                name: p.name,
                featureType: p.featureType,
                progression: Array.isArray(p.progression)
                  ? p.progression.reduce((accum, level, index) => {
                      accum["" + (index + 1)] = level;
                      return accum;
                    }, {})
                  : p.progression,
              }))
            : null,
          casterProgression: x.casterProgression,
          cantripsKnownProgression: x.cantripProgression,
          spellsKnownProgression: x.spellsKnownProgression,
          subclassTableGroups: x.subclassTableGroups
            ? x.subclassTableGroups.map((group) => ({
                title: group.title,
                colLabels: group.colLabels,
                rows: (group.rows || group.rowsSpellProgression).map((row) =>
                  row.map((i) =>
                    Number.isInteger(i)
                      ? "" + i
                      : typeof i === "string"
                        ? i
                        : i.type === "bonus"
                          ? "+" + i.value
                          : i.type === "dice"
                            ? i.toRoll[0].number + "d" + i.toRoll[0].faces
                            : i.type === "bonusSpeed"
                              ? "+" + i.value + " ft."
                              : null,
                  ),
                ),
              }))
            : null,
        };
      };
      return handle(e);
    }),
  };

  Object.keys(newData).forEach(
    (k) => (newData[k] = newData[k].filter((e) => !!e)),
  );

  Object.keys(additional).forEach(
    (k) => (newData[k] = [...newData[k], ...additional[k]]),
  );
  const path = `../../modified/${basename(__dirname)}/`;

  fs.mkdirSync(path, { recursive: true });
  fs.writeFileSync(path + filename, JSON.stringify(newData));
}

console.log(keys);
