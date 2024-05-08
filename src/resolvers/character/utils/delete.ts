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
  Class,
} from "../../../__generated__/graphql";
import get from "./get";
import { queries as classQueries } from "../../data/classes";
import {
  AbilityScoreKey,
  parseFormula,
  ProficiencyKey,
  SlotKey,
  SpeedKey,
} from "./index";

const deleteAbilityScores = (
  character: Character,
  handle: (e: CharacterAbilityScore) => void
): void => {
  character.abilityScores = Object.keys(character.abilityScores).reduce(
    (characterAbilityScores, key) => {
      characterAbilityScores[key as AbilityScoreKey] =
        characterAbilityScores[key as AbilityScoreKey].filter(handle);
      return characterAbilityScores;
    },
    character.abilityScores
  );

  character.classes = character.classes.map((e) => {
    const classData = classQueries.class(e.name) as Class;
    return {
      ...e,
      preparedSpells: parseFormula(
        classData.preparedSpellsFormula || "",
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
      characterProficiencies[key as ProficiencyKey] =
        characterProficiencies[key as ProficiencyKey].filter(handle);
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
      characterExpertises[key as ProficiencyKey] =
        characterExpertises[key as ProficiencyKey].filter(handle);
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
  character.features = character.features?.filter(handle);
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
      characterSpeed[key as SpeedKey] =
        characterSpeed[key as SpeedKey]?.filter(handle);
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
      characterSpellcastingSlots[key as SlotKey] =
        characterSpellcastingSlots[key as SlotKey]?.filter(handle);
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
      characterPactSlots[key as SlotKey] =
        characterPactSlots[key as SlotKey]?.filter(handle);
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
  )?.subclassName;

  if (!subclassName) return;

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
  if (!character.raceName) return;

  deleteSubrace(character);

  const id = get.refId(character, character.raceName) as string;
  const handler = (e: any) => e.refId === id;

  delete character.raceName;
  delete character.raceSource;

  deleteFeatures(character, handler);
  deleteSpeed(character, handler);
  deleteAbilityScores(character, handler);
  deleteProficiencies(character, handler);
  deleteSpells(character, handler);
  get
    .chosenOptionsIds(character, id)
    .forEach((chosenId) => deleteFeat(character, chosenId));
  deleteChosenOption(character, id);
};

const deleteSubrace = (character: Character): void => {
  if (!character.subraceName) return;

  const id = get.refId(character, character.subraceName) as string;
  const handler = (e: any) => e.refId === id;

  delete character.subraceName;
  delete character.subraceSource;

  deleteFeatures(character, handler);
  deleteSpeed(character, handler);
  deleteAbilityScores(character, handler);
  deleteProficiencies(character, handler);
  deleteSpells(character, handler);
  get
    .chosenOptionsIds(character, id)
    .forEach((chosenId) => deleteFeat(character, chosenId));
  deleteChosenOption(character, id);
};

const deleteBackground = (character: Character): void => {
  if (!character.backgroundName) return;

  const id = get.refId(character, character.backgroundName) as string;
  const handler = (e: any) => e.refId === id;

  delete character.backgroundName;
  deleteFeatures(character, handler);
  deleteProficiencies(character, handler);
  deleteItems(character, handler);
  get
    .chosenOptionsIds(character, id)
    .forEach((chosenId) => deleteFeat(character, chosenId));
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

const deleteOptionalFeature = (character: Character, id: string): void => {
  const handler = (e: any) => e.refId === id;

  deleteFeatures(character, handler);
  deleteProficiencies(character, handler);
  deleteSpells(character, handler);
  deleteChosenOption(character, id);
};

const deleteChosenOption = (character: Character, id: string): void => {
  character.chosenOptions = character.chosenOptions.filter((e) => e.id !== id);
};

const deleteResources = (
  character: Character,
  handler: (e: CharacterResourceItem) => void,
  fromType?: string
): void => {
  character.resources = character.resources.map((resource) =>
    !fromType || resource.type === fromType
      ? {
          ...resource,
          items: resource.items.filter(handler),
        }
      : resource
  );
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
  speed: deleteSpeed,
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
