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
  CharacterResourceInput,
  CharacterResourceItemInput,
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
import {
  AbilityScoreKey,
  addSource,
  ConsumeDataType,
  SourceDataType,
} from "./index";
import { queries as spellQueries } from "../../data/spells";
import { GraphQLError } from "graphql/error";
import { ApolloServerErrorCode } from "@apollo/server/errors";

const SourceData = (
  sourceType: CharacterDataSource,
  sourceText?: string
): SourceDataType => ({
  sourceType: sourceType,
  sourceText: sourceText,
});

const ConsumeData = (
  consumeType: string,
  consumeAmount: number
): ConsumeDataType => ({
  consumeType: consumeType,
  consumeAmount: consumeAmount,
});

const AbilityScoreInput = (
  abilities: AbilityScoreKey[] | CharacterAbilityScoresInput,
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
    if (Array.isArray(abilities) && abilityScores[key as AbilityScoreKey] === 0)
      return scores;

    scores[key as AbilityScoreKey] = {
      value: Array.isArray(abilities)
        ? abilityScores[key as AbilityScoreKey]
        : (abilities[key as AbilityScoreKey] as CharacterAbilityScoreInput)
            .value,
      sourceType: source.sourceType,
      sourceText: source.sourceText,
    } satisfies CharacterAbilityScoreInput;
    return scores;
  }, {} as CharacterAbilityScoresInput);
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
        ? object.armorProficiencies?.items?.map((e) => ({
            name: e,
            sourceType: source.sourceType,
            sourceText: source.sourceText,
          }))
        : "armor" in object
          ? object.armor?.map((e) => addSource(e, source))
          : [],
    weapon:
      "weaponProficiencies" in object
        ? object.weaponProficiencies?.items?.map((e) => ({
            name: e,
            sourceType: source.sourceType,
            sourceText: source.sourceText,
          }))
        : "weapon" in object
          ? object.weapon?.map((e) => addSource(e, source))
          : [],
    tool:
      "toolProficiencies" in object
        ? object.toolProficiencies?.items?.map((e) => ({
            name: e,
            sourceType: source.sourceType,
            sourceText: source.sourceText,
          }))
        : "tool" in object
          ? object.tool?.map((e) => addSource(e, source))
          : [],
    language:
      "languageProficiencies" in object
        ? object.languageProficiencies?.items?.map((e) => ({
            name: e,
            sourceType: source.sourceType,
            sourceText: source.sourceText,
          }))
        : "language" in object
          ? object.language?.map((e) => addSource(e, source))
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
          ? object.savingThrow?.map((e) => addSource(e, source))
          : [],
    skill:
      "skillProficiencies" in object
        ? (object.skillProficiencies &&
            "items" in object.skillProficiencies &&
            object.skillProficiencies.items?.map((e) => ({
              name: e,
              sourceType: source.sourceType,
              sourceText: source.sourceText,
            }))) ||
          undefined
        : "skill" in object
          ? object.skill?.map((e) => addSource(e, source))
          : [],
  };
};

const SpellOfficial = (
  name: string,
  spellcastingAbility: string,
  meta: CharacterSpellMetaInput,
  source: SourceDataType
): CharacterSpellInput => {
  const spellData = spellQueries.spell(name);
  if (!spellData)
    throw new GraphQLError("Invalid spell name", {
      extensions: {
        code: ApolloServerErrorCode.BAD_REQUEST,
        http: { status: 400 },
      },
    });

  return {
    ...spellData,
    entries: spellData.entries as CharacterEntriesInput[],
    higherLevel: spellData.higherLevel as CharacterEntriesInput[],
    sourceText: source.sourceText,
    sourceType: source.sourceType,
    spellcastingAbility: spellcastingAbility,
    _meta: meta,
  };
};

const SpellCustom = (
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
  worthValue: number | undefined,
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
  consume: ConsumeDataType | null,
  hasFeaturesMarked?: boolean
): CharacterFeatureInput[] => {
  const features = entries.filter(
    (entry) =>
      !entry.hasOwnProperty("parentId") ||
      (hasFeaturesMarked &&
        "data" in entry &&
        entry.data &&
        "isFeature" in entry.data &&
        entry.data.isFeature)
  );

  return features.map((feature) => ({
    entries: [
      feature as CharacterEntriesInput,
      ...(entries as CharacterEntriesInput[]).filter(
        (entry) => entry.parentId === feature.internalId
      ),
    ],
    consumeType: consume?.consumeType,
    consumeAmount: consume?.consumeAmount,
    sourceType: source.sourceType,
    sourceText: source.sourceText,
  }));
};

const NamedEntries = (
  name: string,
  entries: OptionalFeatureEntries[]
): CharacterEntriesInput[] => {
  const newEntries = entries.map(
    (entry) =>
      ({
        parentId: 0,
        ...entry,
        internalId: entry.internalId + 1,
      }) satisfies CharacterEntriesInput
  );
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
  return {
    amount: amount,
    sourceType: source.sourceType,
    sourceText: source.sourceText,
  };
};

const ChosenOption = (
  name: string,
  category: string,
  consume: ConsumeDataType | null
): CharacterChosenOptionInput => {
  return {
    name: name,
    category: category,
    consumeType: consume?.consumeType,
    consumeAmount: consume?.consumeAmount,
  };
};

const Resource = (
  type: string,
  used: number,
  items: CharacterResourceItemInput[]
): CharacterResourceInput => {
  return {
    type: type,
    used: used,
    items: items,
  };
};

const ResourceItem = (
  amount: number,
  source: SourceDataType
): CharacterResourceItemInput => {
  return {
    amount: amount,
    sourceType: source.sourceType,
    sourceText: source.sourceText,
  };
};

export default {
  SourceData,
  ConsumeData,
  AbilityScoreInput,
  ProficienciesInput,
  Features,
  SpellOfficial,
  Item,
  NamedEntries,
  SpeedValue,
  SpellSlot,
  ChosenOption,
  Resource,
  ResourceItem,
};
