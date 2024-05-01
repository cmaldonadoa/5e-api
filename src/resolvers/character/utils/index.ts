import { JSONMutator } from "../../utils";
import {
  Character,
  CharacterDataSource,
  CharacterResourceType,
} from "../../../__generated__/graphql";
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
  consumeType: CharacterResourceType;
  consumeAmount: number;
};

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

export const parseFormula = (
  formula: string,
  character: Character,
  className: string
) => {
  const replacements = {
    level: character.classes.find((e) => e.name === className).level,
    str_mod: get.abilityScoreValue(character, "str"),
    dex_mod: get.abilityScoreValue(character, "dex"),
    con_mod: get.abilityScoreValue(character, "con"),
    int_mod: get.abilityScoreValue(character, "int"),
    wis_mod: get.abilityScoreValue(character, "wis"),
    cha_mod: get.abilityScoreValue(character, "cha"),
  };

  return eval(
    formula.replace(/<\$([^<>]+)\$>/g, (match, word) => {
      if (replacements.hasOwnProperty(word)) return replacements[word];
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
