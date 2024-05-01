import {
  Character,
  CharacterAbilityScore,
  CharacterDataSource,
  CharacterResourceType,
  CharacterSpellSlots,
} from "../../../__generated__/graphql";
import { GraphQLError } from "graphql/error";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { json } from "./index";
import { queries as classQueries } from "../../data/classes";
import converters from "./input";

const getCharacter = (owner: string, name: string) => {
  const characters = json.get(
    "character",
    (e: Character) => e.owner === owner && e.name === name
  );

  if (!characters.length)
    throw new GraphQLError("Character not found", {
      extensions: {
        code: ApolloServerErrorCode.BAD_REQUEST,
        http: { status: 403 },
      },
    });

  return characters[0];
};

const getRefId = (character: Character, name: string) => {
  return character.chosenOptions.find((e) => e.name === name)?.id;
};

const getChosenOptionId = (character: Character, refId: string) => {
  return character.chosenOptions.find((e) => e.refId === refId)?.id;
};

const getFeatureType = (shortFeature: string) => {
  switch (shortFeature) {
    case "AI":
      return "Infusions";
    case "MV:B":
      return "Maneuvers";
    case "AS":
      return "Arcane Shots";
    case "ED":
      return "Elemental Disciplines";
    case "RN":
      return "Runes";
    case "MM":
      return "Metamagic";
    case "EI":
      return "Eldritch Invocations";
    case "PB":
      return "Pact Boons";
    default:
      if (shortFeature.startsWith("FS")) return "Fighting Styles";

      throw new GraphQLError("Invalid feature type", {
        extensions: {
          code: ApolloServerErrorCode.BAD_REQUEST,
          http: { status: 403 },
        },
      });
  }
};

const getAbilityScoreValue = (character: Character, key: string): number => {
  return character.abilityScores[key].reduce(
    (result: number, e: CharacterAbilityScore) => result + e.value,
    0
  );
};

const getSpellcastingSlots = (character: Character): CharacterSpellSlots => {
  const classFactor = (key: string): number => {
    switch (key) {
      case "full":
        return 1;
      case "1/2":
        return 1 / 2;
      case "1/3":
        return 1 / 3;
      case "artificer":
        return 1 / 2;
      default:
        return 0;
    }
  };

  const level = character.classes.reduce((result, e) => {
    const classLevel = e.level;
    const classData = classQueries.class(e.name);
    const subclassData = classQueries.subclass(e.subclassName);
    return (
      result +
      classFactor(classData.multiclassSlotsProgression) * classLevel +
      classFactor(subclassData?.multiclassSlotsProgression) * classLevel
    );
  }, 0);

  const spellSlots = {
    0: {},
    1: { _1: 2 },
    2: { _1: 3 },
    3: { _1: 4, _2: 2 },
    4: { _1: 4, _2: 3 },
    5: { _1: 4, _2: 3, _3: 2 },
    6: { _1: 4, _2: 3, _3: 3 },
    7: { _1: 4, _2: 3, _3: 3, _4: 1 },
    8: { _1: 4, _2: 3, _3: 3, _4: 2 },
    9: { _1: 4, _2: 3, _3: 3, _4: 3, _5: 1 },
    10: { _1: 4, _2: 3, _3: 3, _4: 3, _5: 2 },
    11: { _1: 4, _2: 3, _3: 3, _4: 3, _5: 2, _6: 1 },
    12: { _1: 4, _2: 3, _3: 3, _4: 3, _5: 2, _6: 1 },
    13: { _1: 4, _2: 3, _3: 3, _4: 3, _5: 2, _6: 1, _7: 1 },
    14: { _1: 4, _2: 3, _3: 3, _4: 3, _5: 2, _6: 1, _7: 1 },
    15: { _1: 4, _2: 3, _3: 3, _4: 3, _5: 2, _6: 1, _7: 1, _8: 1 },
    16: { _1: 4, _2: 3, _3: 3, _4: 3, _5: 2, _6: 1, _7: 1, _8: 1 },
    17: { _1: 4, _2: 3, _3: 3, _4: 3, _5: 2, _6: 1, _7: 1, _8: 1, _9: 1 },
    18: { _1: 4, _2: 3, _3: 3, _4: 3, _5: 3, _6: 1, _7: 1, _8: 1, _9: 1 },
    19: { _1: 4, _2: 3, _3: 3, _4: 3, _5: 3, _6: 2, _7: 1, _8: 1, _9: 1 },
    20: { _1: 4, _2: 3, _3: 3, _4: 3, _5: 3, _6: 2, _7: 2, _8: 1, _9: 1 },
  };

  return Object.fromEntries(
    Object.entries(spellSlots[level]).map(
      ([slotLevel, amount]: [string, number]) => [
        slotLevel,
        converters.SpellSlot(
          amount,
          converters.SourceData(CharacterDataSource.Class, "Spellcasting")
        ),
      ]
    )
  );
};

const getPactSlots = (character: Character): CharacterSpellSlots => {
  const level = character.classes.find((e) => e.name === "Warlock")?.level || 0;

  const pactSlots = {
    0: {},
    1: { _1: 1 },
    2: { _1: 2 },
    3: { _2: 2 },
    4: { _2: 2 },
    5: { _3: 2 },
    6: { _3: 2 },
    7: { _4: 2 },
    8: { _4: 2 },
    9: { _5: 2 },
    10: { _5: 2 },
    11: { _5: 3 },
    12: { _5: 3 },
    13: { _5: 3 },
    14: { _5: 3 },
    15: { _5: 3 },
    16: { _5: 3 },
    17: { _5: 4 },
    18: { _5: 4 },
    19: { _5: 4 },
    20: { _5: 4 },
  };

  return Object.fromEntries(
    Object.entries(pactSlots[level]).map(
      ([slotLevel, amount]: [string, number]) => [
        slotLevel,
        converters.SpellSlot(
          amount,
          converters.SourceData(CharacterDataSource.Class, "Pact Magic")
        ),
      ]
    )
  );
};

const getResourceType = (name: string): CharacterResourceType => {
  switch (name) {
    case "Ki":
      return CharacterResourceType.Ki;
    case "Wild Shape":
      return CharacterResourceType.WildShape;
    case "Arcane Shot":
      return CharacterResourceType.ArcaneShot;
    case "Sorcery Points":
      return CharacterResourceType.SorceryPoints;
    case "Channel Divinity":
      return CharacterResourceType.ChannelDivinity;
    case "Psionic Energy Dice":
      return CharacterResourceType.PsionicEnergyDice;
    default:
      return;
  }
};

export default {
  character: getCharacter,
  refId: getRefId,
  chosenOptionId: getChosenOptionId,
  featureType: getFeatureType,
  abilityScoreValue: getAbilityScoreValue,
  spellcastingSlots: getSpellcastingSlots,
  pactSlots: getPactSlots,
  resourceType: getResourceType,
};
