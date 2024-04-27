import { ResolverContext } from "../../../context";
import {
  Character,
  CharacterCoinsInput,
  CharacterItemInput,
} from "../../../__generated__/graphql";
import { authorize } from "../../utils";
import { queries as itemQueries } from "../../data/items";
import { json } from "./index";
import get from "./get";

const updateCharacter = (
  context: ResolverContext,
  characterName: string,
  updater: (character: Character) => Character
) => {
  authorize(context);
  let { item: character, index } = get.character(
    context.username,
    characterName
  );
  character = updater(character);
  json.update("character", index, character);
  json.save();
  return character;
};

const updateItem = (character: Character, item: CharacterItemInput) => {
  const index = character.items.findIndex((e) => e.id === item.id);
  if (index === -1) return character.items;

  const {
    item: name,
    source,
    customDescription,
    quantity,
    displayName,
    worthValue,
  } = item;

  if (name) {
    character.items[index].item.item = name;
    character.items[index].isBaseItem = Boolean(itemQueries.baseItem(name));
  }
  if (source) character.items[index].item.sourceText = source;
  if (customDescription)
    character.items[index].customDescription = customDescription;
  if (displayName) character.items[index].displayName = displayName;
  if (quantity) character.items[index].quantity = quantity;
  if (worthValue) character.items[index].worthValue = worthValue;

  return character.items;
};

const updateCoins = (character: Character, coins: CharacterCoinsInput) =>
  Object.keys(character.coins).reduce((characterCoins, key) => {
    characterCoins[key] = (coins || {})[key] || characterCoins[key];
    return characterCoins;
  }, character.coins);

export default {
  character: updateCharacter,
  item: updateItem,
  coins: updateCoins,
};
