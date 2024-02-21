const fs = require("fs");
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

  // x
  // x.daily.1 => longRest: 1

  const keys = ["1", "3", "5"];
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

jsonFiles.forEach((filename) => {
  fs.readFile(filename, (err, data) => {
    if (err) throw err;

    let oldData = JSON.parse(data);

    let keys = {
      _total: 0,
    };

    const add = (key) => {
      if (key in keys) {
        keys[key] += 1;
      } else {
        keys[key] = 1;
      }
    };

    let additional = {
      race: [],
      subrace: [],
    };

    let newData = {
      race: oldData.race.map((e) => {
        const handle = (x) => {
          const copy = constructCopy(x._copy);
          const getProp = (property) => x[property] || copy[property];

          return {
            name: getProp("name"),
            source: getProp("source"),
            size: getProp("size"),
            speed: getProp("speed")
              ? Number.isInteger(getProp("speed"))
                ? { walk: getProp("speed") }
                : {
                    walk: getProp("speed").walk,
                    fly: getProp("speed").fly
                      ? Number.isInteger(getProp("speed").fly)
                        ? getProp("speed").fly
                        : getProp("speed").walk
                      : null,
                    climb: getProp("speed").climb
                      ? Number.isInteger(getProp("speed").climb)
                        ? getProp("speed").climb
                        : getProp("speed").walk
                      : null,
                    swim: getProp("speed").swim
                      ? Number.isInteger(getProp("speed").swim)
                        ? getProp("speed").swim
                        : getProp("speed").walk
                      : null,
                  }
              : null,
            ability: getProp("ability")
              ? formatChoose(getProp("ability")[0])
              : null,
            languageProficiencies: getProp("languageProficiencies")
              ? formatChoose(getProp("languageProficiencies")[0])
              : null,
            weaponProficiencies: getProp("weaponProficiencies")
              ? formatChoose(getProp("weaponProficiencies")[0])
              : null,
            armorProficiencies: getProp("armorProficiencies")
              ? formatChoose(getProp("armorProficiencies")[0])
              : null,
            skillProficiencies: getProp("skillProficiencies")
              ? formatChoose(getProp("skillProficiencies")[0])
              : null,
            toolProficiencies: getProp("toolProficiencies")
              ? formatChoose(getProp("toolProficiencies")[0])
              : null,
            entries: separateEntries(getProp("entries")),
            feats: getProp("feats") ? getProp("feats")[0] : null,
            additionalSpells: getProp("additionalSpells")
              ? {
                  spellcastingAbility: getProp("additionalSpells").ability
                    ? formatChoose(getProp("additionalSpells").ability)
                    : null,
                  spells: [
                    ...formatSpells(getProp("additionalSpells").innate),
                    ...formatSpells(getProp("additionalSpells").known),
                  ],
                }
              : null,
            _versions: getProp("_versions"),
          };
        };
        const versions = constructVersions(e);
        if (versions.length > 1) {
          additional.race = [
            ...additional.race,
            ...versions.map((v) => handle(v)),
          ];
        } else {
          return handle(e);
        }
      }),
      subrace: oldData.subrace.map((e) => {
        const handle = (x) => {
          keys._total += 1;

          const property = "_versions";
          const enableTests1 = false;
          const enableTests2 = true;

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

            // Test object keys
            Object.keys(value).forEach((k) => add(k));

            if (Array.isArray(value)) {
              // Test property array keys
              value.forEach(
                (v) =>
                  typeof v !== "string" &&
                  Object.keys(v).forEach((k) => add(k)),
              );

              // Test property array length
              if (value.length) add("LENGTH-" + value.length);

              // Test long arrays
              if (value.length && value.length > 1)
                add(`ITEM-LENGTH-${value.length}-` + x.name);

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

            // value.forEach((v) => {
            //   let target = v.known || {};
            //
            //   function objectDeepKeys(obj) {
            //     if (Array.isArray(obj)) return [];
            //
            //     return Object.keys(obj)
            //       .filter((key) => obj[key] instanceof Object)
            //       .map((key) =>
            //         objectDeepKeys(obj[key]).map((k) => `${key}.${k}`),
            //       )
            //       .reduce((x, y) => x.concat(y), Object.keys(obj));
            //   }
            //
            //   objectDeepKeys(target).forEach((z) => add(z));
            // });

            if (value.length > 1) {
              value.forEach((v) => Object.keys(v._mod).forEach((k) => add(k)));
            }
          }

          return {
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
                      : null,
                  }
              : null,
            ability: x.ability ? formatChoose(x.ability[0]) : null,
            languageProficiencies: x.languageProficiencies
              ? formatChoose(x.languageProficiencies[0])
              : null,
            weaponProficiencies: x.weaponProficiencies
              ? formatChoose(x.weaponProficiencies[0])
              : null,
            armorProficiencies: x.armorProficiencies
              ? formatChoose(x.armorProficiencies[0])
              : null,
            skillProficiencies: x.skillProficiencies
              ? formatChoose(x.skillProficiencies[0])
              : null,
            toolProficiencies: x.toolProficiencies
              ? formatChoose(x.toolProficiencies[0])
              : null,
            skillToolLanguageProficiencies: x.skillToolLanguageProficiencies
              ? formatChoose(x.skillToolLanguageProficiencies[0])
              : null,
            entries: separateEntries(x.entries),
            feats: x.feats ? x.feats[0] : null,
            additionalSpells: x.additionalSpells
              ? {
                  spellcastingAbility: x.additionalSpells.ability
                    ? formatChoose(x.additionalSpells.ability)
                    : null,
                  spells: [
                    ...formatSpells(x.additionalSpells.innate),
                    ...formatSpells(x.additionalSpells.known),
                  ],
                }
              : null,
            overwrite: x.overwrite,
          };
        };
        const versions = constructVersions(e);
        if (versions.length > 1) {
          additional.subrace = [
            ...additional.subrace,
            ...versions.map((v) => handle(v)),
          ];
        } else {
          return handle(e);
        }
      }),
    };

    Object.keys(newData).forEach(
      (k) => (newData[k] = newData[k].filter((e) => !!e)),
    );

    Object.keys(additional).forEach(
      (k) => (newData[k] = [...newData[k], ...additional[k]]),
    );

    console.log(keys);

    const path = `../../modified/${basename(__dirname)}/`;

    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        console.log("ERROR CREATING DIRECTORY");
        throw err;
      }

      fs.writeFile(path + filename, JSON.stringify(newData), (err) => {
        if (err) {
          console.log("ERROR WRITING FILE:", filename);
          throw err;
        }
      });
    });
  });
});
