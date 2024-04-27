import {
  Character,
  CharacterAbilityScoreValueType,
  CharacterDataSource,
  Resolvers,
} from "../../__generated__/graphql";
import { authorize } from "../utils";
import { GraphQLError } from "graphql/error";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { queries as raceQueries } from "../data/races";
import { queries as backgroundQueries } from "../data/backgrounds";
import { queries as featQueries } from "../data/feats";
import { queries as classQueries } from "../data/classes";
import utils, { deleteKeys, json } from "./utils";

const { add, update, converters } = utils;

export default {
  Mutation: {
    createCharacter: (_parent, args, context) => {
      authorize(context);
      const characters = json.get(
        "character",
        (e: Character) => e.owner === context.username && e.name === args.name
      );
      if (characters.length)
        throw new GraphQLError("Character already exists", {
          extensions: {
            code: ApolloServerErrorCode.BAD_REQUEST,
            http: { status: 400 },
          },
        });

      const character: Character = {
        owner: context.username,
        name: args.name,
        abilityScores: {
          str: [],
          dex: [],
          con: [],
          int: [],
          wis: [],
          cha: [],
        },
        classes: [],
        features: [],
        items: [],
        spells: [],
        proficiencies: {
          armor: [],
          weapon: [],
          tool: [],
          language: [],
          savingThrow: [],
          skill: [],
        },
        coins: {
          gp: 0,
          sp: 0,
          cp: 0,
          pp: 0,
          ep: 0,
        },
      };
      json.add("character", character);
      json.save();
      return character;
    },
    setCharacterName: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        character.name = args.name;
        return character;
      });
    },
    setCharacterRace: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        const race = raceQueries.race(args.raceName, args.raceSource);
        const subrace = raceQueries.subrace(
          args.subraceName,
          args.subraceSource
        );

        const raceHandlerDV = (e: string) =>
          converters.DataValue(e, CharacterDataSource.Race, args.raceName);
        const subraceHandlerDV = (e: string) =>
          converters.DataValue(
            e,
            CharacterDataSource.Race,
            `${args.subraceName} ${args.raceName}`
          );

        const raceHandlerASV = (e: number) =>
          converters.AbilityScoreValue(
            e,
            CharacterAbilityScoreValueType.Add,
            CharacterDataSource.Race,
            args.raceName
          );
        const subraceHandlerASV = (e: number) =>
          converters.AbilityScoreValue(
            e,
            CharacterAbilityScoreValueType.Add,
            CharacterDataSource.Race,
            `${args.subraceName} ${args.raceName}`
          );

        character.raceName = args.raceName;
        character.raceSource = args.raceSource;
        character.subraceName = args.subraceName;
        character.subraceSource = args.subraceSource;
        character.features = [
          ...character.features,
          ...converters.Features(
            race.entries,
            CharacterDataSource.Race,
            args.raceName
          ),
          ...converters.Features(
            subrace.entries,
            CharacterDataSource.Race,
            `${args.subraceName} ${args.raceName}`
          ),
        ];
        character.speed = {
          walk: subrace.speed?.walk || race.speed?.walk,
          fly: subrace.speed?.fly || race.speed?.fly,
          climb: race.speed?.climb,
          swim: subrace.speed?.swim || race.speed?.swim,
        };

        // Handle race traits
        character.abilityScores = add.abilityScores(
          character,
          subrace.overwrite?.ability
            ? {}
            : args.raceAbilityScores ||
                converters.AbilityScoreInput(race.ability.items),
          raceHandlerASV
        );
        character.proficiencies = add.proficiencies(
          character,
          deleteKeys(
            converters.ProficienciesInput(race),
            subrace.overwrite?.languageProficiencies ? "language" : "",
            subrace.overwrite?.skillProficiencies ? "skill" : ""
          ),
          raceHandlerDV
        );
        character.proficiencies = add.proficiencies(
          character,
          args.raceProficiencies,
          raceHandlerDV
        );
        character.spells = add.spells(
          character,
          race.additionalSpells.spells.filter((spell) => spell.item),
          args.raceSpellcastingAbility ||
            race.additionalSpells?.spellcastingAbility?.items[0],
          raceHandlerDV
        );
        character.spells = add.spells(
          character,
          args.raceSpells,
          args.raceSpellcastingAbility ||
            race.additionalSpells?.spellcastingAbility?.items[0],
          raceHandlerDV
        );

        // Handle subrace traits
        character.abilityScores = add.abilityScores(
          character,
          args.subraceAbilityScores ||
            converters.AbilityScoreInput(subrace.ability.items),
          subraceHandlerASV
        );
        character.proficiencies = add.proficiencies(
          character,
          converters.ProficienciesInput(subrace),
          subraceHandlerDV
        );
        character.proficiencies = add.proficiencies(
          character,
          args.subraceProficiencies,
          subraceHandlerDV
        );
        character.spells = add.spells(
          character,
          subrace.additionalSpells.spells.filter((spell) => spell.item),
          args.subraceSpellcastingAbility ||
            subrace.additionalSpells?.spellcastingAbility?.items[0],
          subraceHandlerDV
        );
        character.spells = add.spells(
          character,
          args.subraceSpells,
          args.subraceSpellcastingAbility ||
            subrace.additionalSpells?.spellcastingAbility?.items[0],
          subraceHandlerDV
        );
        return character;
      });
    },
    setCharacterBackground: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        const background = backgroundQueries.background(args.name);
        const defaultItems = background.startingEquipment.find((itemSet) =>
          itemSet.hasOwnProperty("_")
        )._;

        const handler = (e: string) =>
          converters.DataValue(e, CharacterDataSource.Background, args.name);

        character.backgroundName = args.name;
        character.proficiencies = add.proficiencies(
          character,
          converters.ProficienciesInput(background),
          handler
        );
        character.proficiencies = add.proficiencies(
          character,
          args.proficiencies,
          handler
        );
        character.items = add.items(
          character,
          defaultItems
            .filter(
              (item) =>
                !item.hasOwnProperty("tool") || !item.hasOwnProperty("value")
            )
            .map((item) => ({
              item: item.item || item.special,
              quantity: item.quantity,
              worthValue: item.worthValue,
              displayName: item.displayName,
            })),
          handler
        );
        character.items = add.items(character, args.items, handler);
        character.features = [
          ...character.features,
          ...converters.Features(
            background.entries,
            CharacterDataSource.Background,
            args.name,
            true
          ),
        ];
        character.coins = add.coins(character, {
          gp: defaultItems.find((item) => item.hasOwnProperty("value")).value,
        });
        return character;
      });
    },
    addFeat: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        const feat = featQueries.feat(args.name);

        const handlerDV = (e: string) =>
          converters.DataValue(e, CharacterDataSource.Feat, args.name);
        const handlerASV = (e: number) =>
          converters.AbilityScoreValue(
            e,
            CharacterAbilityScoreValueType.Add,
            CharacterDataSource.Feat,
            args.name
          );

        character.features = [
          ...character.features,
          ...converters.Features(
            feat.entries,
            CharacterDataSource.Feat,
            args.name
          ),
        ];
        character.abilityScores = add.abilityScores(
          character,
          args.abilityScores ||
            converters.AbilityScoreInput(feat.ability?.items || []),
          handlerASV
        );
        character.proficiencies = add.proficiencies(
          character,
          converters.ProficienciesInput(feat),
          handlerDV
        );
        character.proficiencies = add.proficiencies(
          character,
          args.proficiencies,
          handlerDV
        );
        character.expertises = add.expertises(
          character,
          args.expertises,
          handlerDV
        );

        if (feat.additionalSpells?.length === 1)
          character.spells = add.spells(
            character,
            feat.additionalSpells[0].spells.filter((spell) => spell.item),
            args.spellcastingAbility ||
              feat.additionalSpells[0].spellcastingAbility?.items[0],
            handlerDV
          );
        character.spells = add.spells(
          character,
          args.spells,
          args.spellcastingAbility ||
            feat.additionalSpells?.at(0).spellcastingAbility?.items[0],
          handlerDV
        );
        return character;
      });
    },
    addOptionalFeature: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        const feature = classQueries.optionalFeature(args.name);

        let sourceText: string;

        switch (args.sourceType) {
          case CharacterDataSource.Background:
            sourceText = character.backgroundName;
            break;
          case CharacterDataSource.Class:
            sourceText = character.classes.at(0)?.name;
            break;
          case CharacterDataSource.Race:
            sourceText = character.raceName;
            break;
          default:
            sourceText = "";
        }

        const handler = (e: string) =>
          converters.DataValue(
            e,
            args.sourceType,
            args.sourceText || sourceText
          );

        character.features = [
          ...character.features,
          ...converters.Features(
            feature.entries,
            args.sourceType,
            args.sourceText || sourceText
          ),
        ];
        character.proficiencies = add.proficiencies(
          character,
          converters.ProficienciesInput(feature),
          handler
        );

        if (feature.additionalSpells)
          character.spells = add.spells(
            character,
            feature.additionalSpells[0].spells.filter((spell) => spell.item),
            args.spellcastingAbility ||
              feature.additionalSpells[0].spellcastingAbility?.items[0],
            handler
          );
        character.spells = add.spells(
          character,
          args.spells,
          args.spellcastingAbility ||
            feature.additionalSpells?.at(0).spellcastingAbility?.items[0],
          handler
        );

        return character;
      });
    },
    addCharacterClass: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        const classes = character.classes;
        if (classes.find((e) => e.name === args.name))
          throw new GraphQLError("Class already exists", {
            extensions: {
              code: ApolloServerErrorCode.BAD_REQUEST,
              http: { status: 400 },
            },
          });
        character.classes = [
          ...classes,
          {
            name: args.name,
            level: 1,
          },
        ];
        return character;
      });
    },
    setCharacterSubclass: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        const classes = character.classes;
        const characterClass = classes.find((e) => e.name === args.className);
        const characterClassIndex = classes.findIndex(
          (e) => e.name === args.className
        );

        if (!characterClass)
          throw new GraphQLError("Class does not exist", {
            extensions: {
              code: ApolloServerErrorCode.BAD_REQUEST,
              http: { status: 400 },
            },
          });

        if (characterClass.subclassName)
          throw new GraphQLError("Subclass already set", {
            extensions: {
              code: ApolloServerErrorCode.BAD_REQUEST,
              http: { status: 400 },
            },
          });
        characterClass.subclassName = args.name;
        character.classes[characterClassIndex] = characterClass;
        return character;
      });
    },
    setAbilityScores: (_parent, args, context) => {
      const handler = (e: number) =>
        converters.AbilityScoreValue(
          e,
          CharacterAbilityScoreValueType.Set,
          CharacterDataSource.Other,
          args.source
        );

      return update.character(context, args.characterName, (character) => {
        character.abilityScores = add.abilityScores(
          character,
          args.abilityScores,
          handler
        );
        return character;
      });
    },
    addAbilityScores: (_parent, args, context) => {
      const handler = (e: number) =>
        converters.AbilityScoreValue(
          e,
          CharacterAbilityScoreValueType.Add,
          CharacterDataSource.Other,
          args.source
        );
      return update.character(context, args.characterName, (character) => {
        character.abilityScores = add.abilityScores(
          character,
          args.abilityScores,
          handler
        );
        return character;
      });
    },
    addProficiencies: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        const handler = (e: string) =>
          converters.DataValue(e, CharacterDataSource.Other, args.source);
        character.proficiencies = add.proficiencies(
          character,
          converters.ProficienciesInput(args.proficiencies),
          handler
        );
        return character;
      });
    },
    setHitPointMaximum: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        character.hitPointMaximum = args.hitPoint;
        return character;
      });
    },
    setHitPointCurrent: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        character.hitPointCurrent = args.hitPoint;
        return character;
      });
    },
    addItem: (_parent, args, context) => {
      const handler = (e: string) =>
        converters.DataValue(e, CharacterDataSource.Other, args.item.source);
      return update.character(context, args.characterName, (character) => {
        character.items = add.items(character, [args.item], handler);
        return character;
      });
    },
    updateItem: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        character.items = update.item(character, args.item);
        return character;
      });
    },
    updateCoins: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        character.coins = update.coins(character, args.coins);
        return character;
      });
    },
    addFeature: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        character.features = [
          ...character.features,
          ...converters.Features(
            args.feature.entries,
            args.feature.sourceType,
            args.feature.sourceText
          ),
        ];
        return character;
      });
    },
    updateFeature: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        const index = character.features.findIndex(
          (e) => e.id === args.feature.id
        );
        if (index === -1) return character;

        character.features[index] = converters.Features(
          args.feature.entries,
          args.feature.sourceType,
          args.feature.sourceText
        )[0];
        return character;
      });
    },
    removeFeature: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        const index = character.features.findIndex((e) => e.id === args.id);
        if (index === -1) return character;

        character.features.splice(index, 1);
        return character;
      });
    },
  },
} satisfies Resolvers;
