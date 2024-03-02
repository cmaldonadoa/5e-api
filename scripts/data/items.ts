import { utils, handleFiles } from "./utils";
import rootDir from "app-root-dir";
import fs from "fs";

const root = rootDir.get();

const input = root + "/data/original/items/";
const output = root + "/data/modified/";
const options = {
  input,
  output,
};

const itemEntries = JSON.parse(
  fs.readFileSync(input + "items.json", "utf-8")
).itemEntry;

handleFiles(
  {
    baseItem: (e: any) => ({
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
      packContents: utils.adapt(
        utils.asArray(e.packContents).map((x) =>
          typeof x === "string"
            ? { item: x, quantity: 1, special: false }
            : {
                item: x.item || x.special,
                quantity: x.quantity || 1,
                special: !!x.special,
              }
        )
      ),
      damage: utils.adapt({
        1: e.dmg1,
        2: e.dmg2,
      }),
      armorClass: e.ac,
      isArmor: e.armor,
      entries: utils.adapt(utils.splitEntries(utils.asArray(e.entries))),
      strength: e.strength,
      stealth: e.stealth,
    }),
    itemProperty: (e: any) => ({
      abbreviation: e.abbreviation,
      source: e.source,
      name: e.name || e.entries[0].name,
      entries: utils.adapt(
        utils.splitEntries(
          utils.asArray(e.name ? e.entries : e.entries[0].entries)
        )
      ),
    }),
    itemType: (e: any) => ({
      abbreviation: e.abbreviation,
      source: e.source,
      name: e.name || e.entries[0].name,
      entries: utils.adapt(
        utils.splitEntries(
          utils.asArray(e.name ? e.entries : e.entries[0].entries)
        )
      ),
    }),
    item: (e: any) => ({
      name: e.name,
      source: e.source,
      rarity: e.rarity,
      attuned: !!e.reqAttune,
      attunedBy: e.reqAttuneTags,
      bonusSpellAttack: e.bonusSpellAttack,
      bonusSpellSaveDC: e.bonusSpellSaveDc,
      entries: e.entries
        ? e.additionalEntries
          ? utils.splitEntries([
              ...utils.asArray(e.entries).map((entry) =>
                entry.type === "table"
                  ? {
                      ...entry,
                      rows: entry.rows.map((row: any) =>
                        row.map((cell: any) =>
                          typeof cell === "string" ? cell : cell.entry
                        )
                      ),
                    }
                  : entry
              ),
              ...e.additionalEntries,
            ])
          : utils.adapt(
              utils.splitEntries(
                utils.asArray(utils.renderItemEntries(e, itemEntries)) ||
                  utils.asArray(e.entries).map((entry) =>
                    entry.type === "table"
                      ? {
                          ...entry,
                          rows: entry.rows.map((row: any) =>
                            row.map((cell: any) =>
                              typeof cell === "string" ? cell : cell.entry
                            )
                          ),
                        }
                      : entry
                  )
              )
            )
        : utils.adapt(utils.splitEntries(utils.asArray(e.additionalEntries))),
      baseItem: e.baseItem,
      types: e.type
        ? e.typeAlt
          ? [e.type, e.typeAlt]
          : e.wondrous
            ? [e.type, "WDR"]
            : [e.type]
        : e.staff
          ? ["ST"]
          : e.wondrous
            ? ["WDR"]
            : undefined,
      weaponCategory: e.weaponCategory,
      properties: e.property,
      damage: utils.adapt({
        1: e.dmg1,
        2: e.dmg2,
      }),
      damageType: e.damageType,
      bonusWeapon: e.bonusWeapon,
      bonusWeaponDamage: e.bonusWeaponDamage,
      isWeapon: e.weapon || e.staff,
      grantsProficiency: e.grantsProficiency,
      crew: e.crew,
      vehicleArmorClass: e.vehAc,
      vehicleHealth: e.vehHp,
      vehicleSpeed: e.vehSpeed,
      vehicleMaxPassengers: e.capPassenger,
      vehicleMaxCargo: e.capCargo,
      vehicleThreshold: e.vehDmgThresh,
      vehicleSeeAlso: utils.adapt(e.seeAlsoVehicle),
      attachedSpells: e.attachedSpells,
      modifySpeed: e.modifySpeed,
      modifyAbility: e.ability,
      armorClass: e.ac,
      range: e.range,
      strength: e.strength,
      stealth: e.stealth,
      isCursed: e.curse,
      bonusAC: e.bonusAc,
      isPoison: e.poison,
      poisonTypes: e.poisonTypes,
      packContents: utils.adapt(
        utils.asArray(e.packContents).map((x) =>
          typeof x === "string"
            ? { item: x, quantity: 1, special: false }
            : {
                item: x.item || x.special,
                quantity: x.quantity || 1,
                special: true,
              }
        )
      ),
      carryingCapacity: e.carryingCapacity,
      mountSpeed: e.speed,
      deckSeeAlso: utils.adapt(e.seeAlsoDeck),
      ammoType: e.ammoType,
      bonusProficiencyBonus: e.bonusProficiencyBonus,
      minCrew: e.crewMin,
      maxCrew: e.crewMax,
      bonusAbilityCheck: e.bonusAbilityCheck,
      bonusSavingThrow: e.bonusSavingThrow,
      isFirearm: e.firearm,
    }),
  },
  options
);
