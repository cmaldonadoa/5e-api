import {
  Character,
  CharacterAbilityScoresInput,
  CharacterDataSource,
  CharacterDataValue,
  CharacterEntries,
  CharacterFeature,
  CharacterProficienciesInput,
  CharacterSpellInput,
  Resolvers,
} from "../../__generated__/graphql";
import { authorize, JSONMutator } from "../utils";
import { GraphQLError } from "graphql/error";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { ResolverContext } from "../../context";
import { queries as raceQueries } from "../data/races";

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

const getFeatures = (
  entries: any[],
  sourceType: CharacterDataSource,
  sourceText: string
): CharacterFeature[] => {
  const features = (entries as CharacterEntries[]).filter(
    (entry) => !entry.hasOwnProperty("parentId")
  );
  return features.map((feature) => ({
    entries: [
      feature,
      ...(entries as CharacterEntries[]).filter(
        (entry) => entry.parentId === feature.id
      ),
    ],
    sourceType: sourceType,
    sourceText: sourceText,
  }));
};

const addAbilityScores = (
  character: Character,
  abilityScores: CharacterAbilityScoresInput
) =>
  Object.keys(character.abilityScores).reduce((characterAbilityScores, key) => {
    characterAbilityScores[key] += (abilityScores || {})[key] || 0;
    return characterAbilityScores;
  }, character.abilityScores);

const addProficiencies = (
  character: Character,
  proficiencies: CharacterProficienciesInput,
  handle: (e: string) => CharacterDataValue
) =>
  Object.keys(character.proficiencies).reduce((characterProficiencies, key) => {
    characterProficiencies[key] = [
      ...characterProficiencies[key],
      ...((proficiencies || {})[key] || []).map(handle),
    ];
    return characterProficiencies;
  }, character.proficiencies);

const addSpells = (
  character: Character,
  spells: CharacterSpellInput[],
  spellcastingAbility: string,
  handle: (e: string) => CharacterDataValue
) => [
  ...character.spells,
  ...spells.map((spell) => ({
    spell: handle(spell.spell),
    spellcastingAbility,
    _meta: spell._meta,
  })),
];

const toDataValue = (
  value: string,
  type: CharacterDataSource,
  text?: string
): CharacterDataValue => ({
  item: value,
  sourceType: type,
  sourceText: text,
});

const deleteKeys = (object: any, ...keys: string[]) => {
  keys.forEach((key) => delete object[key]);
  return object;
};

const StringArrayAbilityScoreAdapter = (
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

const ObjectProficienciesAdapter = (
  object: any
): CharacterProficienciesInput => {
  return {
    armor: object.armorProficiencies?.items || [],
    weapon: object.weaponProficiencies?.items || [],
    tool: object.toolProficiencies?.items || [],
    language: object.languageProficiencies?.items || [],
    savingThrow: object.savingThrowProficiencies?.items || [],
    skill: object.skillProficiencies?.items || [],
  };
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
          str: 0,
          dex: 0,
          con: 0,
          int: 0,
          wis: 0,
          cha: 0,
        },
        classes: [],
        features: [],
        items: [],
        baseItems: [],
        spells: [],
        proficiencies: {
          armor: [],
          weapon: [],
          tool: [],
          language: [],
          savingThrow: [],
          skill: [],
        },
      };
      json.add("character", character);
      json.save();
      return character;
    },
    setCharacterName: (_parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.name = args.name;
        return character;
      });
    },
    setCharacterRace: (_parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        const race = raceQueries.race(args.raceName, args.raceSource);
        const subrace = raceQueries.subrace(
          args.subraceName,
          args.subraceSource
        );

        const raceHandler = (e: string) =>
          toDataValue(e, CharacterDataSource.Race, args.raceName);
        const subraceHandler = (e: string) =>
          toDataValue(
            e,
            CharacterDataSource.Race,
            `${args.subraceName} ${args.raceName}`
          );

        character.raceName = args.raceName;
        character.raceSource = args.raceSource;
        character.subraceName = args.subraceName;
        character.subraceSource = args.subraceSource;
        character.features = [
          ...character.features,
          ...getFeatures(
            race.entries,
            CharacterDataSource.Race,
            character.raceName
          ),
          ...getFeatures(
            subrace.entries,
            CharacterDataSource.Race,
            `${character.subraceName} ${character.raceName}`
          ),
        ];
        character.speed = { ...race.speed, ...subrace.speed };

        // Handle race traits
        character.abilityScores = addAbilityScores(
          character,
          subrace.overwrite?.ability
            ? {}
            : args.raceAbilityScores ||
                StringArrayAbilityScoreAdapter(race.ability.items)
        );
        character.proficiencies = addProficiencies(
          character,
          deleteKeys(
            ObjectProficienciesAdapter(race),
            subrace.overwrite?.languageProficiencies ? "language" : "",
            subrace.overwrite?.skillProficiencies ? "skill" : ""
          ),
          raceHandler
        );
        character.proficiencies = addProficiencies(
          character,
          args.raceProficiencies,
          raceHandler
        );
        character.spells = addSpells(
          character,
          race.additionalSpells.spells.filter((spell) => spell.item),
          args.raceSpellcastingAbility ||
            race.additionalSpells?.spellcastingAbility?.items[0],
          raceHandler
        );
        character.spells = addSpells(
          character,
          args.raceSpells,
          args.raceSpellcastingAbility ||
            race.additionalSpells?.spellcastingAbility?.items[0],
          raceHandler
        );

        // Handle subrace traits
        character.abilityScores = addAbilityScores(
          character,
          args.subraceAbilityScores ||
            StringArrayAbilityScoreAdapter(subrace.ability.items)
        );
        character.proficiencies = addProficiencies(
          character,
          ObjectProficienciesAdapter(subrace),
          subraceHandler
        );
        character.proficiencies = addProficiencies(
          character,
          args.subraceProficiencies,
          subraceHandler
        );
        character.spells = addSpells(
          character,
          subrace.additionalSpells.spells.filter((spell) => spell.item),
          args.subraceSpellcastingAbility ||
            subrace.additionalSpells?.spellcastingAbility?.items[0],
          subraceHandler
        );
        character.spells = addSpells(
          character,
          args.subraceSpells,
          args.subraceSpellcastingAbility ||
            subrace.additionalSpells?.spellcastingAbility?.items[0],
          subraceHandler
        );
        return character;
      });
    },
    addCharacterClass: (_parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
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
      return updateCharacter(context, args.characterName, (character) => {
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
    setCharacterBackground: (_parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.backgroundName = args.name;
        return character;
      });
    },
    setAbilityScores: (_parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.abilityScores = {
          ...character.abilityScores,
          ...args.abilityScores,
        };
        return character;
      });
    },
    setProficiencies: (_parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.proficiencies = {
          armor: [
            ...args.proficiencies.armor.map((proficiency) => ({
              item: proficiency,
              sourceType: CharacterDataSource.Other,
            })),
          ],
          weapon: [
            ...args.proficiencies.weapon.map((proficiency) => ({
              item: proficiency,
              sourceType: CharacterDataSource.Other,
            })),
          ],
          language: [
            ...args.proficiencies.language.map((proficiency) => ({
              item: proficiency,
              sourceType: CharacterDataSource.Other,
            })),
          ],
          tool: [
            ...args.proficiencies.tool.map((proficiency) => ({
              item: proficiency,
              sourceType: CharacterDataSource.Other,
            })),
          ],
          savingThrow: [
            ...args.proficiencies.savingThrow.map((proficiency) => ({
              item: proficiency,
              sourceType: CharacterDataSource.Other,
            })),
          ],
          skill: [
            ...args.proficiencies.skill.map((proficiency) => ({
              item: proficiency,
              sourceType: CharacterDataSource.Other,
            })),
          ],
        };
        return character;
      });
    },
    setHitPointMaximum: (_parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.hitPointMaximum = args.hitPoint;
        return character;
      });
    },
    setHitPointCurrent: (_parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.hitPointCurrent = args.hitPoint;
        return character;
      });
    },
    addItem: (_parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        return character;
      });
    },
    removeItem: (_parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        return character;
      });
    },
    setCoins: (_parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.coins = { ...character.coins, ...args.coins };
        return character;
      });
    },
    addFeature: (_parent, args, context) => {
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
    updateFeature: (_parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.features[args.index] = {
          entries: args.entries,
        };
        return character;
      });
    },
    removeFeature: (_parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        character.features[args.index] = {
          entries: [],
        };
        return character;
      });
    },
    levelUp: (_parent, args, context) => {
      return updateCharacter(context, args.characterName, (character) => {
        return character;
      });
    },
  },
} satisfies Resolvers;
