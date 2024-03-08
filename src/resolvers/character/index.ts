import { Character, Resolvers } from "../../__generated__/graphql";
import { authorize, JSONMutator } from "../utils";
import { GraphQLError } from "graphql/error";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { ResolverContext } from "../../context";

type Characters = {
  character: Character;
};

const json = new JSONMutator<Characters>("/storage/characters/characters.json");

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

const updateCharacter = (
  context: ResolverContext,
  characterName: string,
  updater: (character: Character) => Character
) => {
  authorize(context);
  let { item: character, index } = getCharacter(
    context.username,
    characterName
  );
  character = updater(character);
  json.update("character", index, character);
  json.save();
  return character;
};

export const resolvers: Resolvers = {
  Mutation: {
    createCharacter: (parent, args, context) => {
      authorize(context);
      const character = {
        owner: context.username,
        name: args.name,
      };
      json.add("character", character);
      json.save();
      return character;
    },
    setCharacterName: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.name = args.name;
        return character;
      });
    },
    setCharacterRace: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.raceName = args.name;
        character.raceSource = args.source;
        return character;
      });
    },
    setCharacterSubrace: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.subraceName = args.name;
        character.subraceSource = args.source;
        return character;
      });
    },
    addCharacterClass: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        const classes = character.classes || [];
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
    setCharacterSubclass: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        const classes = character.classes || [];
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
    setCharacterBackground: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.backgroundName = args.name;
        return character;
      });
    },
    setAbilityScores: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.ability = { ...character.ability, ...args.abilities };
        return character;
      });
    },
    setProficiencies: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.proficiencies = {
          armor: [
            ...character.proficiencies?.armor,
            ...args.proficiencies?.armor,
          ],
          weapon: [
            ...character.proficiencies?.weapon,
            ...args.proficiencies?.weapon,
          ],
          language: [
            ...character.proficiencies?.language,
            ...args.proficiencies?.language,
          ],
          tool: [...character.proficiencies?.tool, ...args.proficiencies?.tool],
          savingThrow: [
            ...character.proficiencies?.savingThrow,
            ...args.proficiencies?.savingThrow,
          ],
        };
        return character;
      });
    },
    setHitPointMaximum: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.hitPointMaximum = args.hitPoint;
        return character;
      });
    },
    setHitPointCurrent: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.hitPointCurrent = args.hitPoint;
        return character;
      });
    },
    addItem: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        return character;
      });
    },
    removeItem: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        return character;
      });
    },
    setCoins: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.coins = { ...character.coins, ...args.coins };
        return character;
      });
    },
    addFeature: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.features = [
          ...character.features,
          {
            entries: args.entries,
          },
        ];
        return character;
      });
    },
    updateFeature: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.features[args.index] = {
          entries: args.entries,
        };
        return character;
      });
    },
    removeFeature: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.features[args.index] = {
          entries: [],
        };
        return character;
      });
    },
    levelUp: (parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        return character;
      });
    },
  },
};
