import {
  Character,
  CharacterDataSource,
  CharacterSubraceInput,
  RequireFields,
  Resolvers,
} from "../../__generated__/graphql";
import { authorize } from "../utils";
import { GraphQLError } from "graphql/error";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { queries as raceQueries } from "../data/races";
import { queries as backgroundQueries } from "../data/backgrounds";
import { queries as classQueries } from "../data/classes";
import utils, { addSource, deleteKeys, json, parseFormula } from "./utils";

const { get, add, update, remove, inputs } = utils;

const setSubrace = (
  character: Character,
  args: RequireFields<CharacterSubraceInput, "name" | "source">
): void => {
  remove.subrace(character);
  const subrace = raceQueries.subrace(args.name, args.source);

  const id = add.chosenOption(
    character,
    inputs.ChosenOption(subrace.name, "Subrace")
  );

  const source = inputs.SourceData(
    CharacterDataSource.Race,
    `${args.name} ${character.raceName}`
  );

  character.subraceName = args.name;
  character.subraceSource = args.source;

  add.features(character, inputs.Features(subrace.entries, source), id);

  add.speed(
    character,
    {
      walk: inputs.SpeedValue(subrace.speed?.walk, source),
      fly: inputs.SpeedValue(subrace.speed?.fly, source),
      swim: inputs.SpeedValue(subrace.speed?.swim, source),
    },
    id
  );

  add.abilityScores(
    character,
    inputs.AbilityScoreInput(
      args.abilityScores || subrace.ability.items,
      source
    ),
    id
  );
  add.proficiencies(character, inputs.ProficienciesInput(subrace, source), id);
  add.proficiencies(
    character,
    inputs.ProficienciesInput(args.proficiencies, source),
    id
  );
  add.spells(
    character,
    subrace.additionalSpells.spells
      .filter((spell) => spell.item)
      .map((spell) =>
        inputs.Spell(
          spell.item,
          args.spellcastingAbility ||
            subrace.additionalSpells?.spellcastingAbility?.items[0],
          spell._meta,
          source
        )
      ),
    id
  );
  add.spells(
    character,
    args.spells.map((spell) =>
      inputs.Spell(
        spell.name,
        args.spellcastingAbility ||
          subrace.additionalSpells?.spellcastingAbility?.items[0],
        spell._meta,
        source
      )
    ),
    id
  );
  add.feat(character, args.feat, id);
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
        remove.race(character);
        const race = raceQueries.race(args.race.name, args.race.source);
        const subrace = raceQueries.subrace(
          args.race.subrace.name,
          args.race.subrace.source
        );

        const id = add.chosenOption(
          character,
          inputs.ChosenOption(race.name, "Race")
        );

        const source = inputs.SourceData(
          CharacterDataSource.Race,
          args.race.name
        );
        character.raceName = args.race.name;
        character.raceSource = args.race.source;

        add.features(character, inputs.Features(race.entries, source), id);

        add.speed(
          character,
          deleteKeys(
            {
              walk: inputs.SpeedValue(race.speed?.walk, source),
              fly: inputs.SpeedValue(race.speed?.fly, source),
              climb: inputs.SpeedValue(race.speed?.climb, source),
              swim: inputs.SpeedValue(race.speed?.swim, source),
            },
            ...Object.keys(subrace.speed)
          ),
          id
        );

        // Handle race traits
        add.abilityScores(
          character,
          subrace.overwrite?.ability
            ? {}
            : inputs.AbilityScoreInput(
                args.race.abilityScores || race.ability.items,
                source
              ),
          id
        );
        add.proficiencies(
          character,
          deleteKeys(
            inputs.ProficienciesInput(race, source),
            subrace.overwrite?.languageProficiencies ? "language" : "",
            subrace.overwrite?.skillProficiencies ? "skill" : ""
          ),
          id
        );
        add.proficiencies(
          character,
          inputs.ProficienciesInput(args.race.proficiencies, source),
          id
        );
        add.spells(
          character,
          race.additionalSpells.spells
            .filter((spell) => spell.item)
            .map((spell) =>
              inputs.Spell(
                spell.item,
                args.race.spellcastingAbility ||
                  race.additionalSpells?.spellcastingAbility?.items[0],
                spell._meta,
                source
              )
            ),
          id
        );
        add.spells(
          character,
          args.race.spells.map((spell) =>
            inputs.Spell(
              spell.name,
              args.race.spellcastingAbility ||
                race.additionalSpells?.spellcastingAbility?.items[0],
              spell._meta,
              source
            )
          ),
          id
        );
        add.feat(character, args.race.feat, id);
        setSubrace(character, args.race.subrace);
        return character;
      });
    },
    setCharacterSubrace: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        setSubrace(character, args.subrace);
        return character;
      });
    },
    setCharacterBackground: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        remove.background(character);
        const background = backgroundQueries.background(args.background.name);
        const defaultItems = background.startingEquipment.find((itemSet) =>
          itemSet.hasOwnProperty("_")
        )._;

        const id = add.chosenOption(
          character,
          inputs.ChosenOption(background.name, "Background")
        );

        const source = inputs.SourceData(
          CharacterDataSource.Background,
          args.background.name
        );

        character.backgroundName = args.background.name;
        add.proficiencies(
          character,
          inputs.ProficienciesInput(background, source),
          id
        );
        add.proficiencies(
          character,
          inputs.ProficienciesInput(args.background.proficiencies, source),
          id
        );
        add.items(
          character,
          defaultItems
            .filter(
              (item) =>
                !item.hasOwnProperty("tool") || !item.hasOwnProperty("value")
            )
            .map((item) =>
              inputs.Item(
                item.item || item.special,
                item.quantity,
                item.displayName,
                item.worthValue,
                source
              )
            ),
          id
        );
        add.items(
          character,
          args.background.items.map((item) =>
            inputs.Item(
              item.name,
              item.quantity,
              item.displayName,
              item.worthValue,
              source
            )
          ),
          id
        );
        add.features(
          character,
          inputs.Features(background.entries, source, true),
          id
        );
        add.feat(character, args.background.feat, id);
        add.coins(character, {
          gp: defaultItems.find((item) => item.hasOwnProperty("value")).value,
        });
        return character;
      });
    },
    addFeat: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        add.feat(character, args.feat);
        return character;
      });
    },
    deleteFeat: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        remove.feat(character, args.id);
        return character;
      });
    },
    addOptionalFeature: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        add.optionalFeature(character, args.feature);
        return character;
      });
    },
    deleteOptionalFeature: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        remove.optionalFeature(character, args.id);
        return character;
      });
    },
    addCharacterClass: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        const classes = character.classes;
        if (classes.find((e) => e.name === args.class.name))
          throw new GraphQLError("Class already exists", {
            extensions: {
              code: ApolloServerErrorCode.BAD_REQUEST,
              http: { status: 400 },
            },
          });

        const classData = classQueries.class(args.class.name);

        const isMulticlass = classes.length > 0;
        if (isMulticlass) {
          const meetsRequirement = (key: string, value: number): boolean =>
            !value || get.abilityScoreValue(character, key) >= value;
          const { str, dex, wis, cha, int, or } =
            classData.multiclassing.requirements;

          if (
            !meetsRequirement("str", str) ||
            !meetsRequirement("dex", dex) ||
            !meetsRequirement("wis", wis) ||
            !meetsRequirement("cha", cha) ||
            !meetsRequirement("int", int) ||
            (or &&
              !meetsRequirement("dex", or[0].dex) &&
              !meetsRequirement("str", or[0].str))
          )
            throw new GraphQLError("Character doesn't meet requirements", {
              extensions: {
                code: ApolloServerErrorCode.BAD_REQUEST,
                http: { status: 400 },
              },
            });
        }

        const source = inputs.SourceData(
          CharacterDataSource.Class,
          classData.name
        );

        character.classes = [
          ...classes,
          {
            name: args.class.name,
            level: 0,
            maxHitDice: 0,
            usedHitDice: 0,
            spellcastingAbility: classData.spellcastingAbility,
          },
        ];

        add.proficiencies(
          character,
          inputs.ProficienciesInput(
            isMulticlass
              ? classData.multiclassing.proficienciesGained
              : classData,
            source
          ),
          args.class.name
        );

        add.proficiencies(
          character,
          inputs.ProficienciesInput(args.class.proficiencies, source),
          args.class.name
        );

        add.items(
          character,
          args.class.startingEquipment.map((item) =>
            inputs.Item(
              item.name,
              item.quantity,
              item.displayName,
              item.worthValue,
              source
            )
          ),
          args.class.name
        );

        return character;
      });
    },
    deleteCharacterClass: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        remove.class(character, args.name);
        return character;
      });
    },
    setCharacterSubclass: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        const classes = character.classes;
        const characterClass = classes.find(
          (e) => e.name === args.subclass.className
        );
        const characterClassIndex = classes.findIndex(
          (e) => e.name === args.subclass.className
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
        characterClass.subclassName = args.subclass.name;
        character.classes[characterClassIndex] = characterClass;
        return character;
      });
    },
    addAbilityScores: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        add.abilityScores(character, args.abilityScores);
        return character;
      });
    },
    updateAbilityScore: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        update.abilityScore(character, args.abilityScore);
        return character;
      });
    },
    deleteAbilityScore: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        remove.abilityScore(character, args.id);
        return character;
      });
    },
    addProficiencies: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        add.proficiencies(character, args.proficiencies);
        return character;
      });
    },
    updateProficiency: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        update.proficiency(character, args.proficiency);
        return character;
      });
    },
    deleteProficiency: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        remove.proficiency(character, args.id);
        return character;
      });
    },
    addExpertises: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        add.expertises(character, args.expertises);
        return character;
      });
    },
    updateExpertise: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        update.expertise(character, args.expertise);
        return character;
      });
    },
    deleteExpertise: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        remove.expertise(character, args.id);
        return character;
      });
    },
    addSpells: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        add.spells(character, args.spells);
        return character;
      });
    },
    updateSpell: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        update.spell(character, args.spell);
        return character;
      });
    },
    deleteSpell: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        remove.spell(character, args.id);
        return character;
      });
    },
    addItems: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        add.items(character, args.items);
        return character;
      });
    },
    updateItem: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        update.item(character, args.item);
        return character;
      });
    },
    deleteItem: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        remove.item(character, args.id);
        return character;
      });
    },
    addResource: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        add.resource(character, args.resource);
        return character;
      });
    },
    updateResource: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        update.resource(character, args.resource);
        return character;
      });
    },
    deleteResource: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        remove.resource(character, args.id);
        return character;
      });
    },
    addSpellcastingSlots: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        add.spellcastingSlots(character, args.slots);
        return character;
      });
    },
    updateSpellcastingSlot: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        update.spellcastingSlot(character, args.slot);
        return character;
      });
    },
    deleteSpellcastingSlot: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        remove.spellcastingSlot(character, args.id);
        return character;
      });
    },
    addPactSlots: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        add.pactMagicSlots(character, args.slots);
        return character;
      });
    },
    updatePactSlot: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        update.pactMagicSlot(character, args.slot);
        return character;
      });
    },
    deletePactSlot: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        remove.pactMagicSlot(character, args.id);
        return character;
      });
    },
    addFeatures: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        add.features(character, args.features);
        return character;
      });
    },
    updateFeature: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        update.feature(character, args.feature);
        return character;
      });
    },
    deleteFeature: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        remove.feature(character, args.id);
        return character;
      });
    },
    updateCoins: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        update.coins(character, args.coins);
        return character;
      });
    },
    updateSpeed: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        update.speedValue(character, args.speed);
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
    levelUp: (_parent, args, context) => {
      return update.character(context, args.characterName, (character) => {
        const classes = character.classes;
        const characterClass = classes.find(
          (e) => e.name === args.options.className
        );
        const characterClassIndex = classes.findIndex(
          (e) => e.name === args.options.className
        );

        if (!characterClass)
          throw new GraphQLError("Class does not exist", {
            extensions: {
              code: ApolloServerErrorCode.BAD_REQUEST,
              http: { status: 400 },
            },
          });

        const classData = classQueries.class(args.options.className);

        const level = characterClass.level++;
        character.classes[characterClassIndex].level = level;
        character.classes[characterClassIndex].maxHitDice++;
        character.classes[characterClassIndex].preparedSpells = parseFormula(
          classData.preparedSpellsFormula,
          character,
          args.options.className
        );
        character.classes[characterClassIndex].cantripsKnown =
          classData.cantripProgression["_" + level];
        character.classes[characterClassIndex].spellsKnown =
          classData.spellsKnownProgression["_" + level];

        const source = inputs.SourceData(
          CharacterDataSource.Class,
          args.options.className + " Level " + level
        );

        const classFeatures = classData.classFeatures.filter(
          (e) => e.level === level
        );

        classFeatures.forEach((e) => {
          const featureData = classQueries.classFeature(e.featureName);
          add.features(
            character,
            inputs.Features(featureData.entries, source),
            args.options.className
          );
        });

        args.options.removedSpells.forEach((e) => remove.spell(character, e));
        add.spells(
          character,
          args.options.addedSpells.map((e) =>
            inputs.Spell(
              e.name,
              characterClass.spellcastingAbility,
              e._meta,
              source
            )
          ),
          args.options.className
        );

        args.options.removedOptionalFeatures.forEach((e) =>
          remove.optionalFeature(character, e)
        );
        args.options.addedOptionalFeatures.forEach((e) =>
          add.optionalFeature(
            character,
            addSource(e, source),
            args.options.className
          )
        );

        add.abilityScores(
          character,
          addSource(args.options.abilityScores, source),
          args.options.className
        );

        add.feat(
          character,
          addSource(args.options.feat, source),
          args.options.className
        );

        args.options.removedProficiencies.map((e) =>
          remove.proficiency(character, e)
        );
        add.proficiencies(
          character,
          inputs.ProficienciesInput(args.options.addedProficiencies, source),
          args.options.className
        );

        remove.spellcastingSlots(character, (e) => e.refId === "Spellcasting");
        remove.pactMagicSlots(character, (e) => e.refId === "Pact Magic");

        add.spellcastingSlots(
          character,
          get.spellcastingSlots(character),
          "Spellcasting"
        );
        add.pactMagicSlots(character, get.pactSlots(character), "Pact Magic");

        return character;
      });
    },
  },
} satisfies Resolvers;
