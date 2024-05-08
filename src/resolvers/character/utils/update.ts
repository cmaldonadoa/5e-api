import { ResolverContext } from "../../../context";
import {
  Character,
  CharacterAbilityScore,
  CharacterAbilityScoreInput,
  CharacterCoinsInput,
  CharacterEntries,
  CharacterFeatureInput,
  CharacterItemInput,
  CharacterProficiency,
  CharacterProficiencyInput,
  CharacterResourceInput,
  CharacterSpeedValue,
  CharacterSpeedValueInput,
  CharacterSpellInput,
  CharacterSpellSlot,
  CharacterSpellSlotInput,
  Class,
} from "../../../__generated__/graphql";
import { authorize } from "../../utils";
import { queries as itemQueries } from "../../data/items";
import {
  AbilityScoreKey,
  CoinKey,
  json,
  parseFormula,
  ProficiencyKey,
  SlotKey,
  SpeedKey,
} from "./index";
import get from "./get";
import { v4 as uuid } from "uuid";
import { queries as classQueries } from "../../data/classes";

const updateCharacter = (
  context: ResolverContext,
  characterName: string,
  updater: (character: Character) => Character
): Character => {
  authorize(context);
  let { item: character, index } = get.character(
    context.username as string,
    characterName
  );
  character = updater(character);
  json.update("character", index, character);
  json.save();
  return character;
};

const updateAbilityScore = (
  character: Character,
  abilityScore: CharacterAbilityScoreInput
): boolean => {
  let updated = false;
  character.abilityScores = Object.keys(character.abilityScores).reduce(
    (characterAbilityScores, key) => {
      const scores: CharacterAbilityScore[] =
        characterAbilityScores[key as AbilityScoreKey];
      const index = scores.findIndex((e) => e.id === abilityScore.id);
      if (index === -1) return characterAbilityScores;

      const { value, sourceType, sourceText } = abilityScore;

      if (abilityScore.hasOwnProperty("value") && value)
        scores[index].value = value;
      if (abilityScore.hasOwnProperty("sourceType"))
        scores[index].sourceType = sourceType;
      if (abilityScore.hasOwnProperty("sourceText"))
        scores[index].sourceText = sourceText;

      characterAbilityScores[key as AbilityScoreKey] = scores;
      updated = true;
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
  return updated;
};

const updateProficiency = (
  character: Character,
  proficiency: CharacterProficiencyInput
): boolean => {
  let updated = false;
  Object.keys(character.proficiencies).reduce((characterProficiencies, key) => {
    const proficiencies: CharacterProficiency[] =
      characterProficiencies[key as ProficiencyKey];
    const index = proficiencies.findIndex((e) => e.id === proficiency.id);
    if (index === -1) return characterProficiencies;

    const { name, sourceType, sourceText } = proficiency;

    if (proficiency.hasOwnProperty("name") && name)
      proficiencies[index].name = name;
    if (proficiency.hasOwnProperty("sourceType"))
      proficiencies[index].sourceType = sourceType;
    if (proficiency.hasOwnProperty("sourceText"))
      proficiencies[index].sourceText = sourceText;

    characterProficiencies[key as ProficiencyKey] = proficiencies;
    updated = true;
    return characterProficiencies;
  }, character.proficiencies);
  return updated;
};

const updateExpertise = (
  character: Character,
  expertise: CharacterProficiencyInput
): boolean => {
  let updated = false;
  Object.keys(character.expertises).reduce((characterExpertises, key) => {
    const expertises: CharacterProficiency[] =
      characterExpertises[key as ProficiencyKey];
    const index = expertises.findIndex((e) => e.id === expertise.id);
    if (index === -1) return characterExpertises;

    const { name, sourceType, sourceText } = expertise;

    if (expertise.hasOwnProperty("name") && name) expertises[index].name = name;
    if (expertise.hasOwnProperty("sourceType"))
      expertises[index].sourceType = sourceType;
    if (expertise.hasOwnProperty("sourceText"))
      expertises[index].sourceText = sourceText;

    characterExpertises[key as ProficiencyKey] = expertises;
    updated = true;
    return characterExpertises;
  }, character.expertises);
  return updated;
};

const updateSpell = (
  character: Character,
  spell: CharacterSpellInput
): boolean => {
  const index = character.spells.findIndex((e) => e.id === spell.id);
  if (index === -1) return false;

  const {
    name,
    level,
    school,
    time,
    components,
    duration,
    entries,
    higherLevel,
    ritual,
    prepared,
    sourceType,
    sourceText,
    spellcastingAbility,
    _meta: meta,
  } = spell;

  if (spell.hasOwnProperty("name") && name) character.spells[index].name = name;
  if (spell.hasOwnProperty("level") && typeof level === "number" && level >= 0)
    character.spells[index].level = level;
  if (spell.hasOwnProperty("school")) character.spells[index].school = school;
  if (spell.hasOwnProperty("time")) character.spells[index].time = time;
  if (spell.hasOwnProperty("components"))
    character.spells[index].components = components;
  if (spell.hasOwnProperty("duration"))
    character.spells[index].duration = duration;
  if (spell.hasOwnProperty("entries"))
    character.spells[index].entries =
      entries?.map(
        (entry) => ({ ...entry, id: uuid() }) satisfies CharacterEntries
      ) || [];
  if (spell.hasOwnProperty("higherLevel"))
    character.spells[index].higherLevel =
      higherLevel?.map(
        (entry) => ({ ...entry, id: uuid() }) satisfies CharacterEntries
      ) || [];
  if (spell.hasOwnProperty("ritual")) character.spells[index].ritual = ritual;
  if (spell.hasOwnProperty("prepared"))
    character.spells[index].prepared = prepared;
  if (spell.hasOwnProperty("sourceType"))
    character.spells[index].sourceType = sourceType;
  if (spell.hasOwnProperty("sourceText"))
    character.spells[index].sourceText = sourceText;
  if (spell.hasOwnProperty("spellcastingAbility"))
    character.spells[index].spellcastingAbility = spellcastingAbility;
  if (spell.hasOwnProperty("_meta")) character.spells[index]._meta = meta;

  return true;
};

const updateItem = (
  character: Character,
  item: CharacterItemInput
): boolean => {
  const index = character.items.findIndex((e) => e.id === item.id);
  if (index === -1) return false;

  const {
    name,
    sourceType,
    sourceText,
    customDescription,
    quantity,
    displayName,
    worthValue,
  } = item;

  if (item.hasOwnProperty("name") && name) {
    character.items[index].name = name;
    character.items[index].isBaseItem = Boolean(itemQueries.baseItem(name));
  }
  if (item.hasOwnProperty("sourceType"))
    character.items[index].sourceType = sourceType;
  if (item.hasOwnProperty("sourceText"))
    character.items[index].sourceText = sourceText;
  if (item.hasOwnProperty("customDescription"))
    character.items[index].customDescription = customDescription;
  if (item.hasOwnProperty("displayName"))
    character.items[index].displayName = displayName;
  if (
    item.hasOwnProperty("quantity") &&
    typeof quantity === "number" &&
    quantity >= 0
  )
    character.items[index].quantity = quantity;
  if (
    item.hasOwnProperty("worthValue") &&
    typeof worthValue === "number" &&
    worthValue >= 0
  )
    character.items[index].worthValue = worthValue;

  return true;
};

const updateFeature = (
  character: Character,
  feature: CharacterFeatureInput
): boolean => {
  if (!character.features) return false;

  const index = character.features?.findIndex((e) => e.id === feature.id);
  if (index === -1) return false;

  const { consumeType, consumeAmount, entries, sourceText, sourceType } =
    feature;

  if (feature.hasOwnProperty("consumeType"))
    character.features[index].consumeType = consumeType;
  if (feature.hasOwnProperty("consumeAmount"))
    character.features[index].consumeAmount = consumeAmount;
  if (feature.hasOwnProperty("entries"))
    character.features[index].entries =
      entries?.map(
        (entry) => ({ ...entry, id: uuid() }) satisfies CharacterEntries
      ) || [];
  if (feature.hasOwnProperty("sourceText"))
    character.features[index].sourceText = sourceText;
  if (feature.hasOwnProperty("sourceType"))
    character.features[index].sourceType = sourceType;

  return true;
};

const updateCoins = (
  character: Character,
  coins: CharacterCoinsInput
): boolean => {
  Object.keys(character.coins).reduce((characterCoins, key) => {
    characterCoins[key as CoinKey] =
      (coins || {})[key as CoinKey] ?? characterCoins[key as CoinKey];
    return characterCoins;
  }, character.coins);
  return true;
};

const updateSpeedValue = (
  character: Character,
  speedValue: CharacterSpeedValueInput,
  refId?: string
): boolean => {
  let updated = false;
  character.speed = Object.keys(character.speed).reduce(
    (characterSpeed, key) => {
      const speed = characterSpeed[key as SpeedKey] as CharacterSpeedValue[];
      const index = speed.findIndex((e) => e.id === speedValue.id);
      if (index === -1) return characterSpeed;

      const { value, sourceType, sourceText } = speedValue;

      if (
        speedValue.hasOwnProperty("value") &&
        typeof value === "number" &&
        value >= 0
      )
        speed[index].value = value;
      if (speedValue.hasOwnProperty("sourceType"))
        speed[index].sourceType = sourceType;
      if (speedValue.hasOwnProperty("sourceText"))
        speed[index].sourceText = sourceText;
      if (speedValue.hasOwnProperty("refId")) speed[index].refId = refId;

      characterSpeed[key as SpeedKey] = speed;
      updated = true;
      return characterSpeed;
    },
    character.speed
  );
  return updated;
};

const updateSpellcastingSlot = (
  character: Character,
  slot: CharacterSpellSlotInput
): boolean => {
  let updated = false;
  Object.keys(character.spellcastingSlots).reduce(
    (characterSpellcastingSlots, key) => {
      const spellcastingSlots = characterSpellcastingSlots[
        key as SlotKey
      ] as CharacterSpellSlot[];
      const index = spellcastingSlots.findIndex((e) => e.id === slot.id);
      if (index === -1) return characterSpellcastingSlots;

      const { amount, sourceType, sourceText } = slot;

      if (
        slot.hasOwnProperty("amount") &&
        typeof amount === "number" &&
        amount >= 0
      )
        spellcastingSlots[index].amount = amount;
      if (slot.hasOwnProperty("sourceType"))
        spellcastingSlots[index].sourceType = sourceType;
      if (slot.hasOwnProperty("sourceText"))
        spellcastingSlots[index].sourceText = sourceText;

      characterSpellcastingSlots[key as SlotKey] = spellcastingSlots;
      updated = true;
      return characterSpellcastingSlots;
    },
    character.spellcastingSlots
  );
  return updated;
};

const updatePactSlot = (
  character: Character,
  slot: CharacterSpellSlotInput
): boolean => {
  let updated = false;
  Object.keys(character.pactMagicSlots).reduce((characterPactSlots, key) => {
    const pactSlots = characterPactSlots[
      key as SlotKey
    ] as CharacterSpellSlot[];
    const index = pactSlots.findIndex((e) => e.id === slot.id);
    if (index === -1) return characterPactSlots;

    const { amount, sourceType, sourceText } = slot;

    if (
      slot.hasOwnProperty("amount") &&
      typeof amount === "number" &&
      amount >= 0
    )
      pactSlots[index].amount = amount;
    if (slot.hasOwnProperty("sourceType"))
      pactSlots[index].sourceType = sourceType;
    if (slot.hasOwnProperty("sourceText"))
      pactSlots[index].sourceText = sourceText;

    characterPactSlots[key as SlotKey] = pactSlots;
    updated = true;
    return characterPactSlots;
  }, character.pactMagicSlots);
  return updated;
};

const updateResource = (
  character: Character,
  resource: CharacterResourceInput
): boolean => {
  const index = character.resources.findIndex((e) => e.type === resource.type);
  if (index === -1) return false;

  const { items, used } = resource;

  if (resource.hasOwnProperty("used")) character.resources[index].used = used;
  if (resource.hasOwnProperty("items")) {
    if (
      items?.every((item) =>
        character.resources[index].items.find((e) => e.id === item.id)
      )
    )
      items.forEach((item) => {
        const itemIndex = character.resources[index].items.findIndex(
          (e) => e.id === item.id
        );

        const { amount, sourceType, sourceText } = item;

        if (
          item.hasOwnProperty("amount") &&
          typeof amount === "number" &&
          amount >= 0
        )
          character.resources[index].items[itemIndex].amount = amount;
        if (item.hasOwnProperty("sourceType"))
          character.resources[index].items[itemIndex].sourceType = sourceType;
        if (item.hasOwnProperty("sourceText"))
          character.resources[index].items[itemIndex].sourceText = sourceText;
      });
    else return false;
  }

  return true;
};
export default {
  character: updateCharacter,
  item: updateItem,
  coins: updateCoins,
  abilityScore: updateAbilityScore,
  proficiency: updateProficiency,
  expertise: updateExpertise,
  spell: updateSpell,
  feature: updateFeature,
  speedValue: updateSpeedValue,
  spellcastingSlot: updateSpellcastingSlot,
  pactMagicSlot: updatePactSlot,
  resource: updateResource,
};
