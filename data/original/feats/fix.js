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
  if (typeof name !== "string") console.log(name);
  return name.split("#")[0];
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

    let newData = {
      feat: oldData.feat.map((e) => {
        keys._total += 1;

        const property = "toolProficiencies";
        const enableTests1 = true;
        const enableTests2 = false;

        if (!enableTests1 && !enableTests2)
          Object.keys(e).forEach((k) => add(k));

        if (e[property] && enableTests1) {
          let value = e[property];

          // Count occurrences
          add("_subtotal");

          // Test neighbor properties
          //Object.keys(e).forEach((k) => k !== property && add("NEIGHBOR-" + k));

          // Test property types
          add("TYPE-" + ((Array.isArray(value) && "array") || typeof value));

          // Test property array length
          if (value.length) add("LENGTH-" + value.length);

          // Test long arrays
          if (value.length && value.length > 1)
            add(`ITEM-LENGTH-${value.length}-` + e.name);

          // Test property array keys
          if (Array.isArray(value))
            value.forEach((v) => Object.keys(v).forEach((k) => add(k)));

          // Test property array value types
          if (Array.isArray(value))
            value.forEach((v) =>
              Object.keys(v).forEach((k) =>
                add(
                  `TYPE-${k}-` +
                    ((Array.isArray(v[k]) && "array") || typeof v[k]),
                ),
              ),
            );
        }

        if (e[property] && enableTests2) {
          let value = e[property];

          value.forEach((v) => {
            let target = v.known || {};

            function objectDeepKeys(obj) {
              if (Array.isArray(obj)) return [];

              return Object.keys(obj)
                .filter((key) => obj[key] instanceof Object)
                .map((key) =>
                  objectDeepKeys(obj[key]).map((k) => `${key}.${k}`),
                )
                .reduce((x, y) => x.concat(y), Object.keys(obj));
            }

            objectDeepKeys(target).forEach((z) => add(z));
          });
        }

        return {
          name: e.name,
          source: e.source,
          prerequisite: e.prerequisite ? e.prerequisite[0] : null,
          ability: e.ability ? formatChoose(e.ability[0]) : null,
          additionalSpells: e.additionalSpells
            ? e.additionalSpells.map((x) => ({
                name: x.name,
                spellcastingAbility: x.ability ? formatChoose(x.ability) : null,
                spells: [...formatSpells(x.innate), ...formatSpells(x.known)],
              }))
            : null,
          entries: e.entries ? separateEntries(e.entries) : null,
          toolProficiencies: e.toolProficiencies
            ? formatChoose(e.toolProficiencies[0])
            : null,
          languageProficiencies: e.languageProficiencies
            ? formatChoose(e.languageProficiencies[0])
            : null,
          weaponProficiencies: e.weaponProficiencies
            ? formatChoose(e.weaponProficiencies[0])
            : null,
          armorProficiencies: e.armorProficiencies
            ? formatChoose(e.armorProficiencies[0])
            : null,
          skillProficiencies: e.skillProficiencies
            ? formatChoose(e.skillProficiencies[0])
            : null,
          savingThrowProficiencies: e.savingThrowProficiencies
            ? formatChoose(e.savingThrowProficiencies[0])
            : null,
          expertise: e.expertise ? formatChoose(e.expertise[0]) : null,
          skillToolLanguageProficiencies: e.skillToolLanguageProficiencies
            ? formatChoose(e.skillToolLanguageProficiencies[0])
            : null,
          optionalfeatureProgression: e.optionalfeatureProgression,
        };
      }),
    };

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
