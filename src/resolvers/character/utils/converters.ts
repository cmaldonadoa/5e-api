import {
  CharacterAbilityScoresInput,
  CharacterAbilityScoreValue,
  CharacterAbilityScoreValueType,
  CharacterDataSource,
  CharacterDataValue,
  CharacterEntries,
  CharacterFeature,
  CharacterProficienciesInput,
} from "../../../__generated__/graphql";
import { v4 as uuid } from "uuid";

const DataValue = (
  value: string,
  type: CharacterDataSource,
  text?: string
): CharacterDataValue => ({
  item: value,
  sourceType: type,
  sourceText: text,
});

const AbilityScoreValue = (
  value: number,
  operation: CharacterAbilityScoreValueType,
  type: CharacterDataSource,
  text?: string
): CharacterAbilityScoreValue => ({
  item: value,
  operation: operation,
  sourceType: type,
  sourceText: text,
});

const AbilityScoreInput = (
  abilities: string[]
): CharacterAbilityScoresInput => {
  const abilityScores = {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  };
  abilities.forEach((key) => (abilityScores[key] += 1));
  return abilityScores;
};

const ProficienciesInput = (object: any): CharacterProficienciesInput => {
  return {
    armor: object.armorProficiencies?.items || [],
    weapon: object.weaponProficiencies?.items || [],
    tool: object.toolProficiencies?.items || [],
    language: object.languageProficiencies?.items || [],
    savingThrow: object.savingThrowProficiencies?.items || [],
    skill: object.skillProficiencies?.items || [],
  };
};

const Features = (
  entries: any[],
  sourceType: CharacterDataSource,
  sourceText: string,
  hasFeaturesMarked?: boolean
): CharacterFeature[] => {
  const features = (entries as CharacterEntries[]).filter(
    (entry) =>
      !entry.hasOwnProperty("parentId") ||
      (hasFeaturesMarked ? entry.data?.isFeature : true)
  );
  return features.map((feature) => ({
    id: uuid(),
    entries: [
      feature,
      ...(entries as CharacterEntries[]).filter(
        (entry) => entry.parentId === feature.internalId
      ),
    ],
    sourceType: sourceType,
    sourceText: sourceText,
  }));
};

export default {
  DataValue,
  AbilityScoreValue,
  AbilityScoreInput,
  ProficienciesInput,
  Features,
};
