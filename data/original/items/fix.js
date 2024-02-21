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
    const items = JSON.parse(data).item;

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
    const entries = Array.isArray(copy._mod.entries) || [copy._mod.entries];

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
      baseItem: oldData.baseitem.map((e) => {
        return {
          name: e.name,
          source: e.source,
          types: [e.type],
          rarity: e.rarity,
          properties: e.property,
          weaponCategory: e.weaponCategory,
          range: e.range,
          isWeapon: e.weapon,
          isFirearm: e.firearm,
          reload: e.reload,
          ammoType: e.ammoType,
          damageType: e.dmgType,
          packContents: e.packContents
            ? e.packContents.map((x) =>
                typeof x === "string"
                  ? { item: x, quantity: 1, special: false }
                  : {
                      item: x.item || x.special,
                      quantity: x.quantity || 1,
                      special: !!x.special,
                    },
              )
            : null,
          damage: {
            1: e.dmg1 || null,
            2: e.dmg2 || null,
          },
          armorClass: e.ac,
          isArmor: e.armor,
          entries: e.entries ? separateEntries(e.entries) : null,
          strength: e.strength,
          stealth: e.stealth,
        };
      }),
      itemProperty: oldData.itemProperty.map((e) => {
        return {
          abbreviation: e.abbreviation,
          source: e.source,
          name: e.name || e.entries[0].name,
          entries: e.name ? null : separateEntries(e.entries[0].entries),
        };
      }),
      itemType: oldData.itemType.map((e) => {
        return {
          abbreviation: e.abbreviation,
          source: e.source,
          name: e.name || e.entries[0].name,
          entries: e.name
            ? separateEntries(e.entries)
            : separateEntries(e.entries[0].entries),
        };
      }),
      item: oldData.item.map((e) => {
        keys._total += 1;

        const property = "entries";
        const enableTests1 = false;
        const enableTests2 = true;

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

          if (typeof value === "string") {
            if (value.length < 6) add("VALUE-" + value);
          }

          if (Array.isArray(value)) {
            // Test property array keys
            value.forEach(
              (v) =>
                typeof v !== "string" && Object.keys(v).forEach((k) => add(k)),
            );

            // Test property array length
            if (value.length) add("LENGTH-" + value.length);

            // Test long arrays
            if (value.length && value.length > 1)
              add(`ITEM-LENGTH-${value.length}-` + e.name);

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

        if (e[property] && enableTests2) {
          let value = e[property];

          if (e.type) add("TYPED-WDR-" + e.name);
          else add("NON-TYPED-WDR");
        }

        const copy = constructCopy(e._copy);

        const getProp = (property) => e[property] || copy[property];

        return {
          name: getProp("name"),
          source: getProp("source"),
          rarity: getProp("rarity"),
          attuned: !!getProp("reqAttune"),
          attunedBy: getProp("reqAttuneTags"),
          bonusSpellAttack: getProp("bonusSpellAttack"),
          bonusSpellSaveDC: getProp("bonusSpellSaveDc"),
          entries: getProp("entries")
            ? getProp("additionalEntries")
              ? separateEntries([
                  ...getProp("entries"),
                  ...getProp("additionalEntries"),
                ])
              : separateEntries(renderEntries(e) || getProp("entries"))
            : getProp("additionalEntries")
              ? separateEntries(getProp("additionalEntries"))
              : null,
          baseItem: getProp("baseItem"),
          types: getProp("type")
            ? getProp("typeAlt")
              ? [getProp("type"), getProp("typeAlt")]
              : getProp("wondrous")
                ? [getProp("type"), "WDR"]
                : [getProp("type")]
            : getProp("staff")
              ? ["ST"]
              : getProp("wondrous")
                ? ["WDR"]
                : null,
          weaponCategory: getProp("weaponCategory"),
          properties: getProp("property"),
          damage: {
            1: getProp("dmg1") || null,
            2: getProp("dmg2") || null,
          },
          damageType: getProp("damageType"),
          bonusWeapon: getProp("bonusWeapon"),
          bonusWeaponDamage: getProp("bonusWeaponDamage"),
          isWeapon: getProp("weapon") || getProp("staff"),
          grantsProficiency: getProp("grantsProficiency"),
          crew: getProp("crew"),
          vehicleArmorClass: getProp("vehAc"),
          vehicleHealth: getProp("vehHp"),
          vehicleSpeed: getProp("vehSpeed"),
          vehicleMaxPassengers: getProp("capPassenger"),
          vehicleMaxCargo: getProp("capCargo"),
          vehicleThreshold: getProp("vehDmgThresh"),
          vehicleSeeAlso: getProp("seeAlsoVehicle")
            ? getProp("seeAlsoVehicle")[0]
            : null,
          attachedSpells: getProp("attachedSpells"),
          modifySpeed: getProp("modifySpeed"),
          modifyAbility: getProp("ability"),
          armorClass: getProp("ac"),
          range: getProp("range"),
          strength: getProp("strength"),
          stealth: getProp("stealth"),
          isCursed: getProp("curse"),
          bonusAC: getProp("bonusAc"),
          isPoison: getProp("poison"),
          poisonTypes: getProp("poisonTypes"),
          packContents: getProp("packContents")
            ? getProp("packContents").map((x) =>
                typeof x === "string"
                  ? { item: x, quantity: 1, special: false }
                  : {
                      item: x.item || x.special,
                      quantity: x.quantity || 1,
                      special: true,
                    },
              )
            : null,
          carryingCapacity: getProp("carryingCapacity"),
          mountSpeed: getProp("speed"),
          deckSeeAlso: getProp("seeAlsoDeck")
            ? getProp("seeAlsoDeck")[0]
            : null,
          ammoType: getProp("ammoType"),
          bonusProficiencyBonus: getProp("bonusProficiencyBonus"),
          minCrew: getProp("crewMin"),
          maxCrew: getProp("crewMax"),
          bonusAbilityCheck: getProp("bonusAbilityCheck"),
          bonusSavingThrow: getProp("bonusSavingThrow"),
          isFirearm: getProp("firearm"),
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
