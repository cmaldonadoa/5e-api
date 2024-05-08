import {
  BackgroundEntries,
  BackgroundStartingEquipment_,
  Character,
  CharacterDataSource,
  CharacterSpellInput,
  CharacterSubraceInput,
  ClassMulticlassing,
  ClassMulticlassingRequirements,
  RaceAdditionalSpellsSpells,
  RaceAdditionalSpellsSpells_Meta,
  RaceEntries,
  RequireFields,
  Resolvers,
  SubraceAdditionalSpellsSpells,
  SubraceEntries,
} from "../../__generated__/graphql";
import { authorize } from "../utils";
import { GraphQLError } from "graphql/error";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { queries as raceQueries } from "../data/races";
import { queries as backgroundQueries } from "../data/backgrounds";
import { queries as classQueries } from "../data/classes";
import utils, {
  AbilityScoreKey,
  addSource,
  ClassLevelKey,
  ClassNameKey,
  deleteKeys,
  json,
  parseFormula,
} from "./utils";
import classHandlers from "./classHandlers";

const { get, add, update, remove, inputs } = utils;

const setSubrace = (
  character: Character,
  args: RequireFields<CharacterSubraceInput, "name" | "source">
): void => {
  remove.subrace(character);
  const subrace = raceQueries.subrace(args.name, args.source);
  if (!subrace)
    throw new GraphQLError("Subrace not found", {
      extensions: {
        code: ApolloServerErrorCode.BAD_REQUEST,
        http: { status: 400 },
      },
    });

  const id = add.chosenOption(
    character,
    inputs.ChosenOption(subrace.name as string, "Subrace", null)
  );

  const source = inputs.SourceData(
    CharacterDataSource.Race,
    `${args.name} ${character.raceName}`
  );

  character.subraceName = args.name;
  character.subraceSource = args.source;

  add.features(
    character,
    inputs.Features(subrace.entries as SubraceEntries[], source, null),
    id
  );

  add.speed(
    character,
    {
      ...(subrace.speed?.hasOwnProperty("walk") && {
        walk: inputs.SpeedValue(subrace.speed?.walk as number, source),
      }),
      ...(subrace.speed?.hasOwnProperty("fly") && {
        walk: inputs.SpeedValue(subrace.speed?.fly as number, source),
      }),
      ...(subrace.speed?.hasOwnProperty("swim") && {
        walk: inputs.SpeedValue(subrace.speed?.swim as number, source),
      }),
    },
    id
  );

  if (args.abilityScores || subrace.ability?.items)
    add.abilityScores(
      character,
      inputs.AbilityScoreInput(
        args.abilityScores || (subrace.ability?.items as AbilityScoreKey[]),
        source
      ),
      id
    );
  add.proficiencies(character, inputs.ProficienciesInput(subrace, source), id);
  if (args.proficiencies)
    add.proficiencies(
      character,
      inputs.ProficienciesInput(args.proficiencies, source),
      id
    );
  if (subrace.additionalSpells)
    add.spells(
      character,
      (subrace.additionalSpells.spells as SubraceAdditionalSpellsSpells[])
        .filter((spell) => spell.item)
        .map((spell) =>
          inputs.SpellOfficial(
            spell.item as string,
            args.spellcastingAbility ||
              subrace.additionalSpells?.spellcastingAbility?.items?.at(0) ||
              "int",
            spell._meta || {},
            source
          )
        ),
      id
    );

  if (args.spells)
    add.spells(
      character,
      args.spells.map((spell) =>
        inputs.SpellOfficial(
          spell.name as string,
          args.spellcastingAbility ||
            subrace.additionalSpells?.spellcastingAbility?.items?.at(0) ||
            "int",
          spell._meta || {},
          source
        )
      ),
      id
    );

  if (args.feat) add.feat(character, args.feat, id);
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
        owner: context.username as string,
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
        expertises: {
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
        chosenOptions: [],
        resources: [],
        spellcastingSlots: {},
        pactMagicSlots: {},
        speed: {},
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
        const subrace = args.race.subrace
          ? raceQueries.subrace(
              args.race.subrace.name,
              args.race.subrace.source
            )
          : null;

        if (!race)
          throw new GraphQLError("Race not found", {
            extensions: {
              code: ApolloServerErrorCode.BAD_REQUEST,
              http: { status: 400 },
            },
          });

        const id = add.chosenOption(
          character,
          inputs.ChosenOption(args.race.name, "Race", null)
        );

        const source = inputs.SourceData(
          CharacterDataSource.Race,
          args.race.name
        );
        character.raceName = args.race.name;
        character.raceSource = args.race.source;

        add.features(
          character,
          inputs.Features(race.entries as RaceEntries[], source, null),
          id
        );

        add.speed(
          character,
          deleteKeys(
            {
              ...(race.speed?.hasOwnProperty("walk") && {
                walk: inputs.SpeedValue(race.speed?.walk as number, source),
              }),
              ...(race.speed?.hasOwnProperty("fly") && {
                walk: inputs.SpeedValue(race.speed?.fly as number, source),
              }),
              ...(race.speed?.hasOwnProperty("climb") && {
                walk: inputs.SpeedValue(race.speed?.climb as number, source),
              }),
              ...(race.speed?.hasOwnProperty("swim") && {
                walk: inputs.SpeedValue(race.speed?.swim as number, source),
              }),
            },
            ...Object.keys(subrace?.speed || {})
          ),
          id
        );

        // Handle race traits
        add.abilityScores(
          character,
          subrace?.overwrite?.ability
            ? {}
            : inputs.AbilityScoreInput(
                args.race.abilityScores ||
                  ((race.ability?.items || []) as AbilityScoreKey[]),
                source
              ),
          id
        );
        add.proficiencies(
          character,
          deleteKeys(
            inputs.ProficienciesInput(race, source),
            subrace?.overwrite?.languageProficiencies ? "language" : "",
            subrace?.overwrite?.skillProficiencies ? "skill" : ""
          ),
          id
        );
        add.proficiencies(
          character,
          inputs.ProficienciesInput(args.race.proficiencies || {}, source),
          id
        );
        add.spells(
          character,
          (
            (race.additionalSpells?.spells ||
              []) as RaceAdditionalSpellsSpells[]
          )
            .filter((spell) => spell.item)
            .map((spell) =>
              inputs.SpellOfficial(
                spell.item as string,
                args.race.spellcastingAbility ||
                  race.additionalSpells?.spellcastingAbility?.items?.at(0) ||
                  "int",
                spell._meta as RaceAdditionalSpellsSpells_Meta,
                source
              )
            ),
          id
        );
        add.spells(
          character,
          ((args.race.spells || []) as CharacterSpellInput[]).map((spell) =>
            inputs.SpellOfficial(
              spell.name || "",
              args.race.spellcastingAbility ||
                race.additionalSpells?.spellcastingAbility?.items?.at(0) ||
                "int",
              spell._meta || {},
              source
            )
          ),
          id
        );
        if (args.race.feat) add.feat(character, args.race.feat, id);
        if (args.race.subrace) setSubrace(character, args.race.subrace);
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
        if (!background)
          throw new GraphQLError("Background not found", {
            extensions: {
              code: ApolloServerErrorCode.BAD_REQUEST,
              http: { status: 400 },
            },
          });

        const defaultItems = (background.startingEquipment?.find((itemSet) =>
          (itemSet || {}).hasOwnProperty("_")
        )?._ || []) as BackgroundStartingEquipment_[];

        const id = add.chosenOption(
          character,
          inputs.ChosenOption(args.background.name, "Background", null)
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
          inputs.ProficienciesInput(
            args.background.proficiencies || {},
            source
          ),
          id
        );
        if (defaultItems)
          add.items(
            character,
            defaultItems
              .filter(
                (item) =>
                  !item.hasOwnProperty("tool") || !item.hasOwnProperty("value")
              )
              .map((item) =>
                inputs.Item(
                  (item.item || item.special) as string,
                  item.quantity || 1,
                  item.displayName || ((item.item || item.special) as string),
                  item.worthValue || undefined,
                  source
                )
              ),
            id
          );
        add.items(
          character,
          args.background.items
            ?.filter((item) => item.name)
            .map((item) =>
              inputs.Item(
                item.name as string,
                item.quantity ?? 1,
                item.displayName || (item.name as string),
                item.worthValue ?? undefined,
                source
              )
            ) || [],
          id
        );
        add.features(
          character,
          inputs.Features(
            background.entries as BackgroundEntries[],
            source,
            null,
            true
          ),
          id
        );
        if (args.background.feat) add.feat(character, args.background.feat, id);
        add.coins(character, {
          gp: defaultItems.find((item) => item.hasOwnProperty("value"))?.value,
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
        if (!classData)
          throw new GraphQLError("Class not found", {
            extensions: {
              code: ApolloServerErrorCode.BAD_REQUEST,
              http: { status: 400 },
            },
          });

        const isMulticlass = classes.length > 0;
        if (isMulticlass) {
          const meetsRequirement = (key: string, value: number): boolean =>
            !value || get.abilityScoreValue(character, key) >= value;
          const { str, dex, wis, cha, int, or } = (
            classData.multiclassing as ClassMulticlassing
          ).requirements as ClassMulticlassingRequirements;

          if (
            !meetsRequirement("str", str || 0) ||
            !meetsRequirement("dex", dex || 0) ||
            !meetsRequirement("wis", wis || 0) ||
            !meetsRequirement("cha", cha || 0) ||
            !meetsRequirement("int", int || 0) ||
            (or &&
              !meetsRequirement("dex", or?.at(0)?.dex || 0) &&
              !meetsRequirement("str", or?.at(0)?.str || 0))
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
          args.class.name
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
              ? (classData.multiclassing as ClassMulticlassing)
                  .proficienciesGained || {}
              : classData,
            source
          ),
          args.class.name
        );

        add.proficiencies(
          character,
          inputs.ProficienciesInput(args.class.proficiencies || {}, source),
          args.class.name
        );

        add.items(
          character,
          (args.class.startingEquipment || [])
            .filter((item) => item.name)
            .map((item) =>
              inputs.Item(
                item.name as string,
                item.quantity ?? 1,
                item.displayName || (item.name as string),
                item.worthValue ?? undefined,
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
        const subclassData = classQueries.subclass(
          characterClass.subclassName || args.options.subclassName || ""
        );

        if (!classData)
          throw new GraphQLError("Class does not exist", {
            extensions: {
              code: ApolloServerErrorCode.BAD_REQUEST,
              http: { status: 400 },
            },
          });

        if (subclassData)
          character.classes[characterClassIndex].subclassName =
            character.classes[characterClassIndex].subclassName ||
            args.options.subclassName;

        const level = characterClass.level++;
        character.classes[characterClassIndex].level = level;
        character.classes[characterClassIndex].maxHitDice =
          (character.classes[characterClassIndex].maxHitDice || 0) + 1;
        character.classes[characterClassIndex].spellcastingAbility =
          character.classes[characterClassIndex].spellcastingAbility ||
          args.options.spellcastingAbility ||
          classData.spellcastingAbility ||
          subclassData?.spellcastingAbility;
        character.classes[characterClassIndex].preparedSpells = parseFormula(
          classData.preparedSpellsFormula || "",
          character,
          args.options.className
        );
        character.classes[characterClassIndex].cantripsKnown =
          (classData.cantripProgression ||
            subclassData?.cantripProgression ||
            {})[("_" + level) as ClassLevelKey] ?? 0;
        character.classes[characterClassIndex].spellsKnown =
          (classData.spellsKnownProgression ||
            subclassData?.spellsKnownProgression ||
            [])[level] ?? 0;
        character.proficiencyBonus = get.proficiencyBonus(character);

        const source = inputs.SourceData(
          CharacterDataSource.Class,
          args.options.className + " Level " + level
        );

        args.options.removedSpells?.forEach((e) => remove.spell(character, e));
        add.spells(
          character,
          (args.options.addedSpells || [])
            .filter((e) => e.name)
            .map((e) =>
              inputs.SpellOfficial(
                e.name as string,
                character.classes[characterClassIndex].spellcastingAbility ||
                  "int",
                e._meta || {},
                source
              )
            ),
          args.options.className
        );

        args.options.removedOptionalFeatures?.forEach((e) =>
          remove.optionalFeature(character, e)
        );
        args.options.addedOptionalFeatures?.forEach((e) =>
          add.optionalFeature(
            character,
            addSource(e, source),
            args.options.className
          )
        );

        if (args.options.abilityScores)
          add.abilityScores(
            character,
            addSource(args.options.abilityScores, source),
            args.options.className
          );

        if (args.options.feat)
          add.feat(
            character,
            addSource(args.options.feat, source),
            args.options.className
          );

        args.options.removedProficiencies?.map((e) =>
          remove.proficiency(character, e)
        );
        add.proficiencies(
          character,
          inputs.ProficienciesInput(
            args.options.addedProficiencies || {},
            source
          ),
          args.options.className
        );

        remove.spellcastingSlots(character, (e) => e.refId === "Spellcasting");

        add.spellcastingSlots(
          character,
          get.spellcastingSlots(character),
          "Spellcasting"
        );

        classHandlers[args.options.className as ClassNameKey](
          character,
          source,
          args.options.gainedFeatureNames || []
        );

        return character;
      });
    },
  },
} satisfies Resolvers;
