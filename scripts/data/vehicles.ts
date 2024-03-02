import { utils, handleFiles } from "./utils";
import rootDir from "app-root-dir";

const root = rootDir.get();

const input = root + "/data/original/vehicles/";
const output = root + "/data/modified/";
const options = {
  input,
  output,
};

handleFiles(
  {
    vehicle: (e: any) => ({
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
      entries: utils.adapt(utils.splitEntries(utils.asArray(e.entries))),
      pace: utils.adapt(
        e.pace &&
          (Number.isInteger(e.pace)
            ? {
                ...(e.terrain.includes("air") && {
                  fly: "" + e.pace,
                }),
                ...(e.terrain.includes("land") && {
                  walk: "" + e.pace,
                }),
                ...(e.terrain.includes("sea") && {
                  swim: "" + e.pace,
                }),
                ...(e.terrain.includes("space") && {
                  fly: "" + e.pace,
                }),
              }
            : {
                ...(e.terrain.includes("air") && {
                  fly: "" + e.pace.fly,
                }),
                ...(e.terrain.includes("land") && {
                  walk: "" + e.pace.walk,
                }),
                ...(e.terrain.includes("sea") && {
                  swim: "" + (e.pace.swim || e.pace.fly),
                }),
                ...(e.terrain.includes("space") && {
                  fly: "" + e.pace.fly,
                }),
              })
      ),
      ability: utils.adapt({
        str: e.str,
        dex: e.dex,
        con: e.con,
        int: e.int,
        wis: e.wis,
        cha: e.cha,
      }),
      weapons: utils.adapt(
        utils.asArray(e.weapon).map((w) => {
          const result = {
            ...w,
            armorClass: w.ac,
            health: w.hp,
            entries: utils.adapt(utils.splitEntries(utils.asArray(w.entries))),
            actions: utils.adapt(
              utils.asArray(w.action).map((a) => ({
                ...a,
                entries: utils.adapt(
                  utils.splitEntries(utils.asArray(a.entries))
                ),
              }))
            ),
          };
          delete result.ac;
          delete result.hp;
          delete result.costs;
          delete result.action;
          return result;
        })
      ),
      controls: utils.adapt(
        utils.asArray(e.control).map((c) => {
          const result = {
            ...c,
            armorClass: c.ac,
            health: c.hp,
            entries: utils.adapt(utils.splitEntries(utils.asArray(c.entries))),
          };
          delete result.ac;
          delete result.hp;
          return result;
        })
      ),
      movements: utils.adapt(
        utils.asArray(e.movement).map((c) => {
          const result = {
            ...c,
            armorClass: c.ac,
            health: c.hp,
            healthNote: c.hpNote,
            speed: c.speed.map((s: any) => ({
              ...s,
              entries: utils.adapt(
                utils.splitEntries(utils.asArray(s.entries))
              ),
            })),
          };
          delete result.ac;
          delete result.hp;
          delete result.hpNote;
          return result;
        })
      ),
      actions: utils.adapt(utils.splitEntries(utils.asArray(e.entries))),
    }),
  },
  options
);
