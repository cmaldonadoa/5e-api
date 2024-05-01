import {
  Background,
  BackgroundEntries,
  CharacterAbilityScoreInput,
  CharacterAbilityScoresInput,
  CharacterChosenOptionInput,
  CharacterDataSource,
  CharacterEntriesInput,
  CharacterFeatureInput,
  CharacterItemInput,
  CharacterProficienciesInput,
  CharacterResourceType,
  CharacterSpeedValueInput,
  CharacterSpellInput,
  CharacterSpellMetaInput,
  CharacterSpellSlotInput,
  Class,
  ClassFeatureEntries,
  ClassMulticlassingProficienciesGained,
  Feat,
  FeatEntries,
  OptionalFeature,
  OptionalFeatureEntries,
  Race,
  RaceEntries,
  SubclassFeatureEntries,
  Subrace,
  SubraceEntries,
} from "../../../__generated__/graphql";
import { addSource, ConsumeDataType, SourceDataType } from "./index";

const SourceData = (
  sourceType: CharacterDataSource,
  sourceText?: string
): SourceDataType => ({
  sourceType: sourceType,
  sourceText: sourceText,
});

const ConsumeData = (
  consumeType: CharacterResourceType,
  consumeAmount: number
): ConsumeDataType => ({
  consumeType: consumeType,
  consumeAmount: consumeAmount,
});

const AbilityScoreInput = (
  abilities: string[] | CharacterAbilityScoresInput,
  source: SourceDataType
): CharacterAbilityScoresInput => {
  const abilityScores = {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  };
  if (Array.isArray(abilities))
    abilities.forEach((key) => (abilityScores[key] += 1));
  return Object.keys(abilityScores).reduce((scores, key) => {
    scores[key] = {
      value: Array.isArray(abilities)
        ? abilityScores[key]
        : (abilities[key] as CharacterAbilityScoreInput).value,
      sourceType: source.sourceType,
      sourceText: source.sourceText,
    } satisfies CharacterAbilityScoreInput;
    return scores;
  }, abilityScores) as CharacterAbilityScoresInput;
};

const ProficienciesInput = (
  object:
    | Class
    | Race
    | Subrace
    | Background
    | OptionalFeature
    | Feat
    | ClassMulticlassingProficienciesGained
    | CharacterProficienciesInput,
  source: SourceDataType
): CharacterProficienciesInput => {
  return {
    armor:
      "armorProficiencies" in object
        ? object.armorProficiencies.items.map((e) => ({
            name: e,
            sourceType: source.sourceType,
            sourceText: source.sourceText,
          }))
        : "armor" in object
          ? object.armor.map((e) => addSource(e, source))
          : [],
    weapon:
      "weaponProficiencies" in object
        ? object.weaponProficiencies.items.map((e) => ({
            name: e,
            sourceType: source.sourceType,
            sourceText: source.sourceText,
          }))
        : "weapon" in object
          ? object.weapon.map((e) => addSource(e, source))
          : [],
    tool:
      "toolProficiencies" in object
        ? object.toolProficiencies.items.map((e) => ({
            name: e,
            sourceType: source.sourceType,
            sourceText: source.sourceText,
          }))
        : "tool" in object
          ? object.tool.map((e) => addSource(e, source))
          : [],
    language:
      "languageProficiencies" in object
        ? object.languageProficiencies.items.map((e) => ({
            name: e,
            sourceType: source.sourceType,
            sourceText: source.sourceText,
          }))
        : "language" in object
          ? object.language.map((e) => addSource(e, source))
          : [],
    savingThrow:
      "savingThrowProficiencies" in object
        ? Array.isArray(object.savingThrowProficiencies)
          ? object.savingThrowProficiencies.map((e) => ({
              name: e,
              sourceType: source.sourceType,
              sourceText: source.sourceText,
            }))
          : []
        : "savingThrow" in object
          ? object.savingThrow.map((e) => addSource(e, source))
          : [],
    skill:
      "skillProficiencies" in object
        ? "items" in object.skillProficiencies &&
          object.skillProficiencies.items.map((e) => ({
            name: e,
            sourceType: source.sourceType,
            sourceText: source.sourceText,
          }))
        : "skill" in object
          ? object.skill.map((e) => addSource(e, source))
          : [],
  };
};

const Spell = (
  name: string,
  spellcastingAbility: string,
  meta: CharacterSpellMetaInput,
  source: SourceDataType
): CharacterSpellInput => {
  return {
    name: name,
    sourceText: source.sourceText,
    sourceType: source.sourceType,
    spellcastingAbility: spellcastingAbility,
    _meta: meta,
  };
};

const Item = (
  name: string,
  quantity: number,
  displayName: string,
  worthValue: number,
  source: SourceDataType
): CharacterItemInput => {
  return {
    name: name,
    sourceText: source.sourceText,
    sourceType: source.sourceType,
    quantity: quantity,
    displayName: displayName,
    worthValue: worthValue,
  };
};

const Features = (
  entries:
    | RaceEntries[]
    | SubraceEntries[]
    | BackgroundEntries[]
    | FeatEntries[]
    | ClassFeatureEntries[]
    | SubclassFeatureEntries[]
    | CharacterEntriesInput[],
  source: SourceDataType,
  hasFeaturesMarked?: boolean
): CharacterFeatureInput[] => {
  const features = entries.filter(
    (entry) =>
      !entry.hasOwnProperty("parentId") ||
      (hasFeaturesMarked &&
        "data" in entry &&
        "isFeature" in entry.data &&
        entry.data.isFeature)
  );

  return features.map((feature) => ({
    entries: [
      <CharacterFeatureInput>feature,
      ...(<CharacterFeatureInput[]>(
        entries.filter((entry) => entry.parentId === feature.internalId)
      )),
    ],
    sourceType: source.sourceType,
    sourceText: source.sourceText,
  }));
};

const NamedEntries = (
  name: string,
  entries: OptionalFeatureEntries[]
): CharacterEntriesInput[] => {
  const newEntries = entries.map((entry) => ({
    parentId: 0,
    ...entry,
    internalId: entry.internalId + 1,
  }));
  return [
    {
      internalId: 0,
      type: "entries",
      name: name,
      children: newEntries.map((entry) => entry.internalId),
    },
    ...newEntries,
  ];
};

const SpeedValue = (
  value: number,
  source: SourceDataType
): CharacterSpeedValueInput => {
  if (typeof value === "undefined") return;
  return {
    value: value,
    sourceType: source.sourceType,
    sourceText: source.sourceText,
  };
};

const SpellSlot = (
  amount: number,
  source: SourceDataType
): CharacterSpellSlotInput => {
  if (typeof amount === "undefined") return;
  return {
    amount: amount,
    sourceType: source.sourceType,
    sourceText: source.sourceText,
  };
};

const ChosenOption = (
  name: string,
  category: string,
  consume?: ConsumeDataType
): CharacterChosenOptionInput => {
  return {
    name: name,
    category: category,
    consumeType: consume.consumeType,
    consumeAmount: consume.consumeAmount,
  };
};

export default {
  SourceData,
  ConsumeData,
  AbilityScoreInput,
  ProficienciesInput,
  Features,
  Spell,
  Item,
  NamedEntries,
  SpeedValue,
  SpellSlot,
  ChosenOption,
};
