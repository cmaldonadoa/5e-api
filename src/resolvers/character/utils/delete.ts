import {
  Character,
  CharacterAbilityScore,
  CharacterDataSource,
  CharacterFeature,
  CharacterItem,
  CharacterProficiency,
  CharacterResourceItem,
  CharacterSpeedValue,
  CharacterSpell,
  CharacterSpellSlot,
} from "../../../__generated__/graphql";
import get from "./get";
import { queries as classQueries } from "../../data/classes";
import { parseFormula } from "./index";

const deleteAbilityScores = (
  character: Character,
  handle: (e: CharacterAbilityScore) => void
): void => {
  character.abilityScores = Object.keys(character.abilityScores).reduce(
    (characterAbilityScores, key) => {
      characterAbilityScores[key] = characterAbilityScores[key].filter(handle);
      return characterAbilityScores;
    },
    character.abilityScores
  );

  character.classes = character.classes.map((e) => {
    const classData = classQueries.class(e.name);
    return {
      ...e,
      preparedSpells: parseFormula(
        classData.preparedSpellsFormula,
        character,
        e.name
      ),
    };
  });
};
const deleteAbilityScore = (character: Character, id: string): void => {
  deleteAbilityScores(character, (e) => e.id === id);
};

const deleteProficiencies = (
  character: Character,
  handle: (e: CharacterProficiency) => void
): void => {
  character.proficiencies = Object.keys(character.proficiencies).reduce(
    (characterProficiencies, key) => {
      characterProficiencies[key] = characterProficiencies[key].filter(handle);
      return characterProficiencies;
    },
    character.proficiencies
  );
};
const deleteProficiency = (character: Character, id: string): void => {
  deleteProficiencies(character, (e) => e.id === id);
};

const deleteExpertises = (
  character: Character,
  handle: (e: CharacterProficiency) => void
): void => {
  character.expertises = Object.keys(character.expertises).reduce(
    (characterExpertises, key) => {
      characterExpertises[key] = characterExpertises[key].filter(handle);
      return characterExpertises;
    },
    character.expertises
  );
};
const deleteExpertise = (character: Character, id: string): void => {
  deleteExpertises(character, (e) => e.id === id);
};

const deleteSpells = (
  character: Character,
  handle: (e: CharacterSpell) => void
): void => {
  character.spells = character.spells.filter(handle);
};
const deleteSpell = (character: Character, id: string): void => {
  deleteSpells(character, (e) => e.id === id);
};

const deleteItems = (
  character: Character,
  handle: (e: CharacterItem) => void
): void => {
  character.items = character.items.filter(handle);
};
const deleteItem = (character: Character, id: string): void => {
  deleteItems(character, (e) => e.id === id);
};

const deleteFeatures = (
  character: Character,
  handle: (e: CharacterFeature) => void
): void => {
  character.features = character.features.filter(handle);
};
const deleteFeature = (character: Character, id: string): void => {
  deleteFeatures(character, (e) => e.id === id);
};

const deleteSpeed = (
  character: Character,
  handle: (e: CharacterSpeedValue) => void
): void => {
  character.speed = Object.keys(character.speed).reduce(
    (characterSpeed, key) => {
      characterSpeed[key] = characterSpeed[key].filter(handle);
      return characterSpeed;
    },
    character.speed
  );
};

const deleteSpellcastingSlots = (
  character: Character,
  handle: (e: CharacterSpellSlot) => void
): void => {
  character.spellcastingSlots = Object.keys(character.spellcastingSlots).reduce(
    (characterSpellcastingSlots, key) => {
      characterSpellcastingSlots[key] =
        characterSpellcastingSlots[key].filter(handle);
      return characterSpellcastingSlots;
    },
    character.spellcastingSlots
  );
};
const deleteSpellcastingSlot = (character: Character, id: string): void => {
  deleteSpellcastingSlots(character, (e) => e.id === id);
};

const deletePactSlots = (
  character: Character,
  handle: (e: CharacterSpellSlot) => void
): void => {
  character.pactMagicSlots = Object.keys(character.pactMagicSlots).reduce(
    (characterPactSlots, key) => {
      characterPactSlots[key] = characterPactSlots[key].filter(handle);
      return characterPactSlots;
    },
    character.pactMagicSlots
  );
};
const deletePactSlot = (character: Character, id: string): void => {
  deletePactSlots(character, (e) => e.id === id);
};

// ! EXPERIMENTAL ! FINISH UP AFTER LEVEL UP CODE //
const deleteClass = (character: Character, className: string): void => {
  const subclassName = character.classes.find(
    (e) => e.name === className
  ).subclassName;

  const classHandler = (e: any) =>
    e.sourceType === CharacterDataSource.Class && e.sourceText === className;
  const subclassHandler = (e: any) =>
    e.sourceType === CharacterDataSource.Class &&
    e.sourceText === `${subclassName} ${className} `;

  character.classes = character.classes.filter((e) => e.name !== className);
  deleteFeatures(character, classHandler);
  deleteFeatures(character, subclassHandler);
};

const deleteRace = (character: Character): void => {
  deleteSubrace(character);

  const id = get.refId(character, character.raceName);
  const handler = (e: any) => e.refId === id;

  delete character.raceName;
  delete character.raceSource;

  deleteFeatures(character, handler);
  deleteSpeed(character, handler);
  deleteAbilityScores(character, handler);
  deleteProficiencies(character, handler);
  deleteSpells(character, handler);
  deleteFeat(character, get.chosenOptionId(character, id));
  deleteChosenOption(character, id);
};

const deleteSubrace = (character: Character): void => {
  const id = get.refId(character, character.subraceName);
  const handler = (e: any) => e.refId === id;

  delete character.subraceName;
  delete character.subraceSource;

  deleteFeatures(character, handler);
  deleteSpeed(character, handler);
  deleteAbilityScores(character, handler);
  deleteProficiencies(character, handler);
  deleteSpells(character, handler);
  deleteFeat(character, get.chosenOptionId(character, id));
  deleteChosenOption(character, id);
};

const deleteBackground = (character: Character): void => {
  const id = get.refId(character, character.backgroundName);
  const handler = (e: any) => e.refId === id;

  delete character.backgroundName;
  deleteFeatures(character, handler);
  deleteProficiencies(character, handler);
  deleteItems(character, handler);
  deleteFeat(character, get.chosenOptionId(character, id));
  deleteChosenOption(character, id);
};

const deleteFeat = (character: Character, id: string): void => {
  const handler = (e: any) => e.refId === id;

  deleteFeatures(character, handler);
  deleteAbilityScores(character, handler);
  deleteProficiencies(character, handler);
  deleteExpertises(character, handler);
  deleteSpells(character, handler);
  deleteChosenOption(character, id);
};

const deleteOptionalFeature = (character: Character, id: string): Character => {
  const handler = (e: any) => e.refId === id;

  deleteFeatures(character, handler);
  deleteProficiencies(character, handler);
  deleteSpells(character, handler);
  deleteChosenOption(character, id);
  return character;
};

const deleteChosenOption = (character: Character, id: string): void => {
  character.chosenOptions = character.chosenOptions.filter((e) => e.id !== id);
};

const deleteResources = (
  character: Character,
  handler: (e: CharacterResourceItem) => void
): void => {
  character.resources = character.resources.map((resource) => ({
    ...resource,
    items: resource.items.filter(handler),
  }));
};
const deleteResource = (character: Character, id: string): void =>
  deleteResources(character, (e) => e.id !== id);

export default {
  abilityScores: deleteAbilityScores,
  abilityScore: deleteAbilityScore,
  proficiencies: deleteProficiencies,
  proficiency: deleteProficiency,
  expertises: deleteExpertises,
  expertise: deleteExpertise,
  spells: deleteSpells,
  spell: deleteSpell,
  items: deleteItems,
  item: deleteItem,
  features: deleteFeatures,
  feature: deleteFeature,
  class: deleteClass,
  race: deleteRace,
  subrace: deleteSubrace,
  background: deleteBackground,
  feat: deleteFeat,
  optionalFeature: deleteOptionalFeature,
  spellcastingSlots: deleteSpellcastingSlots,
  spellcastingSlot: deleteSpellcastingSlot,
  pactMagicSlots: deletePactSlots,
  pactMagicSlot: deletePactSlot,
  resources: deleteResources,
  resource: deleteResource,
};
