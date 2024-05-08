import { JSONMutator } from "../../utils";
import { Character, CharacterDataSource } from "../../../__generated__/graphql";
import get from "./get";
import add from "./add";
import update from "./update";
import remove from "./delete";
import inputs from "./input";

type Characters = {
  character: Character;
};

export type SourceDataType = {
  sourceType: CharacterDataSource;
  sourceText?: string;
};

export type ConsumeDataType = {
  consumeType: string;
  consumeAmount: number;
};

export type AbilityScoreKey = "str" | "con" | "int" | "wis" | "cha" | "dex";

export type ProficiencyKey =
  | "armor"
  | "weapon"
  | "language"
  | "tool"
  | "savingThrow"
  | "skill";

export type CoinKey = "cp" | "sp" | "gp" | "ep" | "pp";

export type SpeedKey = "walk" | "fly" | "swim" | "climb";

export type SlotKey =
  | "_1"
  | "_2"
  | "_3"
  | "_4"
  | "_5"
  | "_6"
  | "_7"
  | "_8"
  | "_9";

export type ClassLevelKey =
  | "_1"
  | "_2"
  | "_3"
  | "_4"
  | "_5"
  | "_6"
  | "_7"
  | "_8"
  | "_9"
  | "_10"
  | "_11"
  | "_12"
  | "_13"
  | "_14"
  | "_15"
  | "_16"
  | "_17"
  | "_18"
  | "_19"
  | "_20";

export type IndexKey4 = "_0" | "_1" | "_2" | "_3" | "_4";

export type ClassLevel =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;

export type ClassNameKey =
  | "Artificer"
  | "Barbarian"
  | "Bard"
  | "Cleric"
  | "Druid"
  | "Fighter"
  | "Monk"
  | "Paladin"
  | "Ranger"
  | "Rogue"
  | "Sorcerer"
  | "Warlock"
  | "Wizard";

export const json = new JSONMutator<Characters>(
  "/storage/characters/characters.json"
);

export const deleteKeys = (object: any, ...keys: string[]) => {
  keys.forEach((key) => delete object[key]);
  return object;
};

export const addSource = <T>(data: T, source: SourceDataType): T => ({
  ...data,
  ...source,
});

type ReplacementsKey =
  | "level"
  | "str_mod"
  | "int_mod"
  | "dex_mod"
  | "con_mod"
  | "wis_mod"
  | "cha_mod";

export const parseFormula = (
  formula: string,
  character: Character,
  className: string
) => {
  const replacements = {
    level: character.classes.find((e) => e.name === className)?.level || 0,
    str_mod: get.modifier(get.abilityScoreValue(character, "str")),
    dex_mod: get.modifier(get.abilityScoreValue(character, "dex")),
    con_mod: get.modifier(get.abilityScoreValue(character, "con")),
    int_mod: get.modifier(get.abilityScoreValue(character, "int")),
    wis_mod: get.modifier(get.abilityScoreValue(character, "wis")),
    cha_mod: get.modifier(get.abilityScoreValue(character, "cha")),
    proficiency_bonus: character.proficiencyBonus,
  };

  return eval(
    formula.replace(/<\$([^<>]+)\$>/g, (match, word) => {
      if (replacements.hasOwnProperty(word))
        return "" + replacements[word as ReplacementsKey];
      return match;
    })
  );
};

export default {
  get,
  add,
  update,
  remove,
  inputs,
};
