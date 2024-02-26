import { utils, handleFiles } from "./utils.js";
import rootDir from "app-root-dir";
import fs from "fs";

const root = rootDir.get();

const input = root + "/data/original/items/";
const output = root + "/data/modified/";
const options = {
    input,
    output
};

const data = JSON.parse(
    fs.readFileSync(input + "items.json", "utf-8")
).itemEntry;

handleFiles(
    {
        baseItem: e => ({
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
                ? e.packContents.map(x =>
                      typeof x === "string"
                          ? { item: x, quantity: 1, special: false }
                          : {
                                item: x.item || x.special,
                                quantity: x.quantity || 1,
                                special: !!x.special
                            }
                  )
                : null,
            damage: {
                1: e.dmg1 || null,
                2: e.dmg2 || null
            },
            armorClass: e.ac,
            isArmor: e.armor,
            entries: e.entries ? utils.separateEntries(e.entries) : null,
            strength: e.strength,
            stealth: e.stealth
        }),
        itemProperty: e => ({
            abbreviation: e.abbreviation,
            source: e.source,
            name: e.name || e.entries[0].name,
            entries: e.name ? null : utils.separateEntries(e.entries[0].entries)
        }),
        itemType: e => ({
            abbreviation: e.abbreviation,
            source: e.source,
            name: e.name || e.entries[0].name,
            entries: e.name
                ? utils.separateEntries(e.entries)
                : utils.separateEntries(e.entries[0].entries)
        }),
        item: e => ({
            name: e.name,
            source: e.source,
            rarity: e.rarity,
            attuned: !!e.reqAttune,
            attunedBy: e.reqAttuneTags,
            bonusSpellAttack: e.bonusSpellAttack,
            bonusSpellSaveDC: e.bonusSpellSaveDc,
            entries: e.entries
                ? e.additionalEntries
                    ? utils.separateEntries([
                          ...e.entries,
                          ...e.additionalEntries
                      ])
                    : utils.separateEntries(
                          utils.renderEntries(e, data) || e.entries
                      )
                : e.additionalEntries
                ? utils.separateEntries(e.additionalEntries)
                : null,
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
                : null,
            weaponCategory: e.weaponCategory,
            properties: e.property,
            damage: {
                1: e.dmg1 || null,
                2: e.dmg2 || null
            },
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
            vehicleSeeAlso: e.seeAlsoVehicle ? e.seeAlsoVehicle[0] : null,
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
            packContents: e.packContents
                ? e.packContents.map(x =>
                      typeof x === "string"
                          ? { item: x, quantity: 1, special: false }
                          : {
                                item: x.item || x.special,
                                quantity: x.quantity || 1,
                                special: true
                            }
                  )
                : null,
            carryingCapacity: e.carryingCapacity,
            mountSpeed: e.speed,
            deckSeeAlso: e.seeAlsoDeck ? e.seeAlsoDeck[0] : null,
            ammoType: e.ammoType,
            bonusProficiencyBonus: e.bonusProficiencyBonus,
            minCrew: e.crewMin,
            maxCrew: e.crewMax,
            bonusAbilityCheck: e.bonusAbilityCheck,
            bonusSavingThrow: e.bonusSavingThrow,
            isFirearm: e.firearm
        })
    },
    options
);
