import { JSONMutator } from "../../utils";
import { Character } from "../../../__generated__/graphql";
import get from "./get";
import add from "./add";
import update from "./update";
import converters from "./converters";

type Characters = {
  character: Character;
};
export const json = new JSONMutator<Characters>(
  "/storage/characters/characters.json"
);

export const deleteKeys = (object: any, ...keys: string[]) => {
  keys.forEach((key) => delete object[key]);
  return object;
};

export default {
  get,
  add,
  update,
  converters,
};
