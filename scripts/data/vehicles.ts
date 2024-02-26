import { utils, handleFiles } from "./utils.js";
import rootDir from "app-root-dir";

const root = rootDir.get();

const input = root + "/data/original/vehicles/";
const output = root + "/data/modified/";
const options = {
    input,
    output
};

handleFiles(
    {
        vehicle: e => ({
            name: e.name,
            source: e.source,
            size: e.size,
            dimensions: e.dimensions,
            maxCrew: e.capCrew,
            maxCrewNote: e.capCrewNote,
            maxPassengers: e.capPassenger,
            maxCargo: e.capCargo,
            armorClass: e.ac,
            speed: e.speed,
            health: e.hp,
            damageImmunities: e.immune,
            conditionImmunities: e.conditionImmune,
            entries: utils.separateEntries(e.entries),
            pace: e.pace
                ? Number.isInteger(e.pace)
                    ? {
                          ...(e.terrain.includes("air") && {
                              fly: "" + e.pace
                          }),
                          ...(e.terrain.includes("land") && {
                              walk: "" + e.pace
                          }),
                          ...(e.terrain.includes("sea") && {
                              swim: "" + e.pace
                          })
                      }
                    : {
                          ...(e.terrain.includes("air") && {
                              fly: "" + e.pace.fly
                          }),
                          ...(e.terrain.includes("land") && {
                              walk: "" + e.pace.walk
                          }),
                          ...(e.terrain.includes("sea") && {
                              swim: "" + e.pace.swim
                          })
                      }
                : null,
            ability: {
                str: e.str,
                dex: e.dex,
                con: e.con,
                int: e.int,
                wis: e.wis,
                cha: e.cha
            },
            weapons: e.weapon
                ? e.weapon.map(w => {
                      const result = {
                          ...w,
                          armorClass: w.ac,
                          health: w.hp,
                          entries: utils.separateEntries(w.entries),
                          actions: w.action
                              ? w.action.map(a => ({
                                    ...a,
                                    entries: utils.separateEntries(a.entries)
                                }))
                              : null
                      };

                      delete result.ac;
                      delete result.hp;
                      delete result.costs;
                      delete result.action;

                      return result;
                  })
                : null,
            controls: e.control
                ? e.control.map(c => {
                      const result = {
                          ...c,
                          armorClass: c.ac,
                          health: c.hp,
                          entries: utils.separateEntries(c.entries)
                      };
                      delete result.ac;
                      delete result.hp;
                      return result;
                  })
                : null,
            movements: e.movement
                ? e.movement.map(c => {
                      const result = {
                          ...c,
                          armorClass: c.ac,
                          health: c.hp,
                          healthNote: c.hpNote,
                          speed: c.speed.map(s => ({
                              ...s,
                              entries: utils.separateEntries(s.entries)
                          }))
                      };
                      delete result.ac;
                      delete result.hp;
                      delete result.hpNote;
                      return result;
                  })
                : null,
            actions: utils.separateEntries(e.action)
        })
    },
    options
);
