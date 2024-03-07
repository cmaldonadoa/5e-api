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
  },
};
