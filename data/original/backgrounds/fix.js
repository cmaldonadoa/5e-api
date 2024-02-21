const fs = require("fs");
const basename = require("path").basename;

const files = fs.readdirSync(__dirname);
const jsonFiles = files.filter(
  (item) =>
    /.json$/.test(item) && !/^foundry/.test(item) && !/^optional/.test(item),
);

function formatEntries(entries) {
  return entries.map((entry) =>
    typeof entry === "string"
      ? { type: "text", entry }
      : entry.type === "entries"
        ? { ...entry, entries: formatEntries(entry.entries) }
        : entry,
  );
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
    const items = JSON.parse(data).background;

    const item = items.find(
      (e) => e.name === copy.name && e.source === copy.source,
    );

    if (item) {
      search = false;
      base = item;
    }
  }

  delete base.name;
  delete base.source;

  if (copy._mod) {
    copy._mod.entries.forEach((entry) => {
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

  // _.daily.1 => longRest: 1
  // _.rest.1 => shortRest: 1
  // _.will => will: true
  // _.ritual => ritual: true
  // _

  const obj = spells._;
  let spellList = [];

  if (Array.isArray(obj)) return obj.map((o) => ({ item: formatChoose(o) }));

  if ("will" in obj) {
    let s = obj.will.map((o) => ({
      item: formatChoose(o),
      _meta: {
        will: true,
      },
    }));
    spellList = [...spellList, ...s];
  }
  if ("ritual" in obj) {
    let s = obj.ritual.map((o) => ({
      item: formatChoose(o),
      _meta: {
        ritual: true,
      },
    }));
    spellList = [...spellList, ...s];
  }
  if ("daily" in obj) {
    let s = obj.daily["1"].map((o) => ({
      item: formatChoose(o),
      _meta: {
        longRest: 1,
      },
    }));
    spellList = [...spellList, ...s];
  }
  if ("rest" in obj) {
    let s = obj.rest["1"].map((o) => ({
      item: formatChoose(o),
      _meta: {
        shortRest: 1,
      },
    }));
    spellList = [...spellList, ...s];
  }

  return spellList;
}

function formatChoose(obj) {
  if (typeof obj === "string") return { [clearSpellName(obj)]: true };

  if ("choose" in obj) {
    if (typeof obj.choose === "string")
      return {
        choose: {
          from: Array.isArray(obj.choose)
            ? obj.choose.map((n) => clearSpellName(n))
            : null,
          fromFilter: Array.isArray(obj.choose) ? null : obj.choose,
          count: obj.count || 1,
        },
      };
    else
      return {
        choose: {
          from: Array.isArray(obj.choose.from)
            ? obj.choose.from.map((n) => clearSpellName(n))
            : null,
          fromFilter: Array.isArray(obj.choose.from) ? null : obj.choose.from,
          count: obj.choose.count || 1,
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
        _mod: template._mod
          ? {
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
            }
          : null,
      };
    });
  }

  return versions.map((version) => {
    let entries = obj.entries;

    if (entries && version._mod) {
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
      background: [],
    };

    let newData = {
      background: oldData.background.map((e) => {
        const handle = (x) => {
          keys._total += 1;
          //Object.keys(e).forEach((k) => add(k));

          const property = "entries";
          const enableTests1 = false;
          const enableTests2 = true;

          if (x[property] && enableTests1) {
            let value = x[property];

            // Test neighbor properties
            Object.keys(x).forEach(
              (k) => k !== property && add("NEIGHBOR-" + k),
            );

            // Test property types
            add("TYPE-" + ((Array.isArray(value) && "array") || typeof value));

            // Test property array length
            if (value.length) add("LENGTH-" + value.length);

            // Test long arrays
            if (value.length && value.length > 1) add("LONG-ITEM-" + x.name);

            // Test property array keys
            if (Array.isArray(value))
              value.forEach((v) => Object.keys(v).forEach((k) => add(k)));
          }

          if (x[property] && enableTests2) {
            let value = x[property];

            value.forEach(
              (v) =>
                v.type === "list" &&
                v.items.forEach((i) =>
                  Object.keys(i).forEach(
                    (k) => k !== "type" && add("ITEMS-" + k),
                  ),
                ),
            );
          }

          const copy = constructCopy(x._copy);

          const getProp = (property) => x[property] || copy[property];

          return {
            name: x.name,
            source: x.source,
            skillProficiencies: getProp("skillProficiencies")
              ? formatChoose(getProp("skillProficiencies")[0])
              : null,
            languageProficiencies: getProp("languageProficiencies")
              ? formatChoose(getProp("languageProficiencies")[0])
              : null,
            startingEquipment: getProp("startingEquipment")
              ? getProp("startingEquipment").map((equipmentSet) =>
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
                )
              : null,
            entries: getProp("entries")
              ? separateEntries(getProp("entries"))
              : null,
            feats: getProp("feats") ? getProp("feats")[0] : null,
            toolProficiencies: getProp("toolProficiencies")
              ? formatChoose(getProp("toolProficiencies")[0])
              : null,
            additionalSpells: getProp("additionalSpells")
              ? [
                  {
                    expanded: Object.entries(
                      getProp("additionalSpells")[0].expanded,
                    ).reduce((acc, [k, v]) => {
                      acc[k] = v.map((x) => clearSpellName(x));
                      return acc;
                    }, {}),
                  },
                ]
              : null,
            skillToolLanguageProficiencies: getProp(
              "skillToolLanguageProficiencies",
            )
              ? formatChoose(getProp("skillToolLanguageProficiencies")[0])
              : null,
            _versions: getProp("_versions"),
          };
        };
        const versions = constructVersions(e);
        if (versions.length > 1) {
          additional.background = [
            ...additional.background,
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
