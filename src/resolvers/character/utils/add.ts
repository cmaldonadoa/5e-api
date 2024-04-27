import {
  Character,
  CharacterAbilityScoresInput,
  CharacterAbilityScoreValue,
  CharacterCoinsInput,
  CharacterDataValue,
  CharacterItemInput,
  CharacterProficienciesInput,
  CharacterSpellInput,
} from "../../../__generated__/graphql";
import { v4 as uuid } from "uuid";
import { queries as itemQueries } from "../../data/items";

const addAbilityScores = (
  character: Character,
  abilityScores: CharacterAbilityScoresInput,
  handle: (e: number) => CharacterAbilityScoreValue
) =>
  Object.keys(character.abilityScores).reduce((characterAbilityScores, key) => {
    characterAbilityScores[key] = [
      ...characterAbilityScores[key],
      ...((abilityScores || {})[key] || []).map(handle),
    ];
    return characterAbilityScores;
  }, character.abilityScores);

const addProficiencies = (
  character: Character,
  proficiencies: CharacterProficienciesInput,
  handle: (e: string) => CharacterDataValue
) =>
  Object.keys(character.proficiencies).reduce((characterProficiencies, key) => {
    characterProficiencies[key] = [
      ...characterProficiencies[key],
      ...((proficiencies || {})[key] || []).map(handle),
    ];
    return characterProficiencies;
  }, character.proficiencies);

const addExpertises = (
  character: Character,
  expertises: CharacterProficienciesInput,
  handle: (e: string) => CharacterDataValue
) =>
  Object.keys(character.expertises).reduce((characterExpertises, key) => {
    characterExpertises[key] = [
      ...characterExpertises[key],
      ...((expertises || {})[key] || []).map(handle),
    ];
    return characterExpertises;
  }, character.expertises);

const addSpells = (
  character: Character,
  spells: CharacterSpellInput[],
  spellcastingAbility: string,
  handle: (e: string) => CharacterDataValue
) => [
  ...character.spells,
  ...spells.map((spell) => ({
    spell: handle(spell.spell),
    spellcastingAbility,
    _meta: spell._meta,
  })),
];

const addItems = (
  character: Character,
  items: CharacterItemInput[],
  handle: (e: string) => CharacterDataValue
) => [
  ...character.items,
  ...items.map((item) => ({
    id: uuid(),
    item: handle(item.item),
    isBaseItem: Boolean(itemQueries.baseItem(item.item)),
    quantity: item.quantity,
    displayName: item.displayName,
    worthValue: item.worthValue,
  })),
];

const addCoins = (character: Character, coins: CharacterCoinsInput) =>
  Object.keys(character.coins).reduce((characterCoins, key) => {
    characterCoins[key] = characterCoins[key] + ((coins || {})[key] || 0);
    return characterCoins;
  }, character.coins);

export default {
  abilityScores: addAbilityScores,
  proficiencies: addProficiencies,
  expertises: addExpertises,
  spells: addSpells,
  items: addItems,
  coins: addCoins,
};
