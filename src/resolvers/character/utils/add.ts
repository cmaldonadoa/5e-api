import {
  Character,
  CharacterAbilityScoresInput,
  CharacterChosenOptionInput,
  CharacterCoinsInput,
  CharacterDataSource,
  CharacterEntries,
  CharacterFeatInput,
  CharacterFeature,
  CharacterFeatureInput,
  CharacterItem,
  CharacterItemInput,
  CharacterOptionalFeatureInput,
  CharacterProficienciesInput,
  CharacterProficiency,
  CharacterProficiencyInput,
  CharacterResourceInput,
  CharacterResourceItem,
  CharacterSpeedInput,
  CharacterSpell,
  CharacterSpellInput,
  CharacterSpellSlot,
  CharacterSpellSlotInput,
  CharacterSpellSlotsInput,
} from "../../../__generated__/graphql";
import { v4 as uuid } from "uuid";
import { queries as itemQueries } from "../../data/items";
import { queries as featQueries } from "../../data/feats";
import converters from "./input";
import { queries as classQueries } from "../../data/classes";
import { addSource, parseFormula } from "./index";
import get from "./get";

type AbilityScoresIds = {
  str?: string;
  dex?: string;
  con?: string;
  int?: string;
  wis?: string;
  cha?: string;
};

const addAbilityScores = (
  character: Character,
  abilityScores: CharacterAbilityScoresInput,
  refId?: string
): AbilityScoresIds => {
  const ids = {};
  character.abilityScores = Object.keys(character.abilityScores).reduce(
    (characterAbilityScores, key) => {
      const id = key in abilityScores ? uuid() : null;
      if (id) ids[key] = id;
      characterAbilityScores[key] = [
        ...characterAbilityScores[key],
        ...(key in abilityScores
          ? [
              {
                id: id,
                value: abilityScores[key].value,
                sourceType: abilityScores[key].sourceType,
                sourceText: abilityScores[key].sourceText,
                ...(refId && { refId }),
              },
            ]
          : []),
      ];
      return characterAbilityScores;
    },
    character.abilityScores
  );
  character.classes = character.classes.map((e) => {
    const classData = classQueries.class(e.name);
    return {
      ...e,
      preparedSpells: parseFormula(
        classData.preparedSpellsFormula,
        character,
        e.name
      ),
    };
  });
  return ids;
};

type ProficienciesIds = {
  armor?: string[];
  weapon?: string[];
  language?: string[];
  tool?: string[];
  savingThrow?: string[];
  skill?: string[];
};

const addProficiencies = (
  character: Character,
  proficiencies: CharacterProficienciesInput,
  refId?: string
): ProficienciesIds => {
  const ids = {};
  character.proficiencies = Object.keys(character.proficiencies).reduce(
    (characterProficiencies, key) => {
      characterProficiencies[key] = [
        ...characterProficiencies[key],
        ...(
          ((proficiencies || {})[key] || []) as CharacterProficiencyInput[]
        ).map((e) => {
          const id = uuid();
          if (!(key in ids)) ids[key] = [];
          ids[key].push(id);
          return {
            id: id,
            ...(refId && { refId }),
            sourceText: e.sourceText,
            sourceType: e.sourceType,
            name: e.name,
          } satisfies CharacterProficiency;
        }),
      ];
      return characterProficiencies;
    },
    character.proficiencies
  );
  return ids;
};

const addExpertises = (
  character: Character,
  expertises: CharacterProficienciesInput,
  refId?: string
): ProficienciesIds => {
  const ids = {};
  character.expertises = Object.keys(character.expertises).reduce(
    (characterExpertises, key) => {
      characterExpertises[key] = [
        ...characterExpertises[key],
        ...(((expertises || {})[key] || []) as CharacterProficiencyInput[]).map(
          (e) => {
            const id = uuid();
            if (!(key in ids)) ids[key] = [];
            ids[key].push(id);
            return {
              id: id,
              ...(refId && { refId }),
              sourceText: e.sourceText,
              sourceType: e.sourceType,
              name: e.name,
            } satisfies CharacterProficiency;
          }
        ),
      ];
      return characterExpertises;
    },
    character.expertises
  );
  return ids;
};

const addSpells = (
  character: Character,
  spells: CharacterSpellInput[],
  refId?: string
): string[] => {
  const ids: string[] = [];
  character.spells = [
    ...character.spells,
    ...spells.map((spell) => {
      const id = uuid();
      ids.push(id);
      return {
        id: id,
        ...(refId && { refId }),
        name: spell.name,
        sourceType: spell.sourceType,
        sourceText: spell.sourceText,
        spellcastingAbility: spell.spellcastingAbility,
        _meta: spell._meta,
      } satisfies CharacterSpell;
    }),
  ];
  return ids;
};

const addItems = (
  character: Character,
  items: CharacterItemInput[],
  refId?: string
): string[] => {
  const ids: string[] = [];
  character.items = [
    ...character.items,
    ...items.map((item) => {
      const id = uuid();
      ids.push(id);
      return {
        id: id,
        ...(refId && { refId }),
        name: item.name,
        sourceText: item.sourceText,
        sourceType: item.sourceType,
        isBaseItem: Boolean(itemQueries.baseItem(item.name)),
        quantity: item.quantity,
        displayName: item.displayName,
        worthValue: item.worthValue,
      } satisfies CharacterItem;
    }),
  ];
  return ids;
};

const addResource = (
  character: Character,
  resource: CharacterResourceInput,
  refId?: string
): string[] => {
  const ids: string[] = [];
  const index = character.resources.findIndex((e) => e.type === resource.type);

  if (index === -1) {
    character.resources.push({
      type: resource.type,
      used: resource.used,
      items: resource.items.map((item) => {
        const id = uuid();
        ids.push(id);
        return {
          id: id,
          ...(refId && { refId }),
          sourceText: item.sourceText,
          sourceType: item.sourceType,
          amount: item.amount,
        } satisfies CharacterResourceItem;
      }),
    });
  } else {
    character.resources[index].items = [
      ...character.resources[index].items,
      ...resource.items.map((item) => {
        const id = uuid();
        ids.push(id);
        return {
          id: id,
          ...(refId && { refId }),
          sourceText: item.sourceText,
          sourceType: item.sourceType,
          amount: item.amount,
        } satisfies CharacterResourceItem;
      }),
    ];
  }

  return ids;
};

const addCoins = (character: Character, coins: CharacterCoinsInput): void => {
  character.coins = Object.keys(character.coins).reduce(
    (characterCoins, key) => {
      characterCoins[key] = characterCoins[key] + ((coins || {})[key] || 0);
      return characterCoins;
    },
    character.coins
  );
};

const addFeatures = (
  character: Character,
  features: CharacterFeatureInput[],
  refId?: string
): string[] => {
  const ids: string[] = [];
  character.features = [
    ...character.features,
    ...features.map((feature) => {
      const id = uuid();
      ids.push(id);
      return {
        id: id,
        ...(refId && { refId }),
        sourceText: feature.sourceText,
        sourceType: feature.sourceType,
        entries: feature.entries.map(
          (entry) => ({ id: uuid(), ...entry }) satisfies CharacterEntries
        ),
      } satisfies CharacterFeature;
    }),
  ];
  return ids;
};

type SpeedIds = {
  walk?: string;
  fly?: string;
  swim?: string;
  climb?: string;
};

const addSpeed = (
  character: Character,
  speed: CharacterSpeedInput,
  refId?: string
): SpeedIds => {
  const ids = {};
  character.speed = Object.keys(character.speed).reduce(
    (characterSpeed, key) => {
      const id = key in speed ? uuid() : null;
      if (id) ids[key] = id;
      characterSpeed[key] = [
        ...characterSpeed[key],
        ...(key in speed
          ? [
              {
                id: id,
                value: speed[key].value,
                sourceType: speed[key].sourceType,
                sourceText: speed[key].sourceText,
                ...(refId && { refId }),
              },
            ]
          : []),
      ];
      return characterSpeed;
    },
    character.speed
  );
  return ids;
};

type SlotsIds = {
  _1?: string[];
  _2?: string[];
  _3?: string[];
  _4?: string[];
  _5?: string[];
  _6?: string[];
  _7?: string[];
  _8?: string[];
  _9?: string[];
};

const addSpellcastingSlots = (
  character: Character,
  spellcastingSlots: CharacterSpellSlotsInput,
  refId?: string
): SlotsIds => {
  const ids = {};
  character.spellcastingSlots = Object.keys(character.spellcastingSlots).reduce(
    (characterSpellcastingSlots, key) => {
      characterSpellcastingSlots[key] = [
        ...characterSpellcastingSlots[key],
        ...(
          ((spellcastingSlots || {})[key] || []) as CharacterSpellSlotInput[]
        ).map((e) => {
          const id = uuid();
          if (!(key in ids)) ids[key] = [];
          ids[key].push(id);
          return {
            id: id,
            ...(refId && { refId }),
            sourceText: e.sourceText,
            sourceType: e.sourceType,
            amount: e.amount,
          } satisfies CharacterSpellSlot;
        }),
      ];
      return characterSpellcastingSlots;
    },
    character.spellcastingSlots
  );
  return ids;
};

const addPactSlots = (
  character: Character,
  pactSlots: CharacterSpellSlotsInput,
  refId?: string
): SlotsIds => {
  const ids = {};
  character.pactMagicSlots = Object.keys(character.pactMagicSlots).reduce(
    (characterPactSlots, key) => {
      characterPactSlots[key] = [
        ...characterPactSlots[key],
        ...(((pactSlots || {})[key] || []) as CharacterSpellSlotInput[]).map(
          (e) => {
            const id = uuid();
            if (!(key in ids)) ids[key] = [];
            ids[key].push(id);
            return {
              id: id,
              ...(refId && { refId }),
              sourceText: e.sourceText,
              sourceType: e.sourceType,
              amount: e.amount,
            } satisfies CharacterSpellSlot;
          }
        ),
      ];
      return characterPactSlots;
    },
    character.pactMagicSlots
  );
  return ids;
};

const addChosenOption = (
  character: Character,
  option: CharacterChosenOptionInput,
  refId?: string
): string => {
  const id = uuid();
  character.chosenOptions = [
    ...character.chosenOptions,
    {
      id: id,
      ...(refId && { refId }),
      name: option.name,
      category: option.category,
    },
  ];
  return id;
};

const addFeat = (
  character: Character,
  inputFeat: CharacterFeatInput,
  refId?: string
) => {
  const feat = featQueries.feat(inputFeat.name);

  const id = addChosenOption(
    character,
    converters.ChosenOption(feat.name, "Feats"),
    refId
  );

  const source = converters.SourceData(
    CharacterDataSource.Feat,
    inputFeat.name
  );

  addFeatures(character, converters.Features(feat.entries, source), id);
  addAbilityScores(
    character,
    converters.AbilityScoreInput(
      inputFeat.abilityScores || feat.ability?.items || [],
      source
    ),
    id
  );
  addProficiencies(character, converters.ProficienciesInput(feat, source), id);
  addProficiencies(
    character,
    converters.ProficienciesInput(inputFeat.proficiencies, source),
    id
  );
  addExpertises(
    character,
    converters.ProficienciesInput(inputFeat.expertises, source),
    id
  );

  if (feat.additionalSpells?.length === 1)
    addSpells(
      character,
      feat.additionalSpells[0].spells
        .filter((spell) => spell.item)
        .map((spell) =>
          converters.Spell(
            spell.item,
            inputFeat.spellcastingAbility ||
              feat.additionalSpells[0].spellcastingAbility?.items[0],
            spell._meta,
            source
          )
        ),
      id
    );
  addSpells(
    character,
    inputFeat.spells.map((spell) =>
      converters.Spell(
        spell.name,
        inputFeat.spellcastingAbility ||
          feat.additionalSpells?.at(0).spellcastingAbility?.items[0],
        spell._meta,
        source
      )
    ),
    id
  );

  inputFeat.optionalFeatures.forEach((feature) =>
    addOptionalFeature(character, addSource(feature, source), id)
  );
};

const addOptionalFeature = (
  character: Character,
  inputFeature: CharacterOptionalFeatureInput,
  refId?: string
) => {
  const feature = classQueries.optionalFeature(inputFeature.name);

  const id = addChosenOption(
    character,
    converters.ChosenOption(
      feature.name,
      get.featureType(feature.featureType[0]),
      converters.ConsumeData(
        get.resourceType(feature.consumes.name),
        feature.consumes.amount || 1
      )
    ),
    refId
  );

  let sourceText: string;

  switch (inputFeature.sourceType) {
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

  const source = converters.SourceData(
    inputFeature.sourceType || CharacterDataSource.Other,
    inputFeature.sourceText || sourceText + " " + inputFeature.name
  );

  addFeatures(
    character,
    converters.Features(
      converters.NamedEntries(feature.name, feature.entries),
      source
    ),
    id
  );
  addProficiencies(
    character,
    converters.ProficienciesInput(feature, source),
    id
  );

  if (feature.additionalSpells)
    addSpells(
      character,
      feature.additionalSpells[0].spells
        .filter((spell) => spell.item)
        .map((spell) =>
          converters.Spell(
            spell.item,
            inputFeature.spellcastingAbility ||
              feature.additionalSpells[0].spellcastingAbility?.items[0],
            spell._meta,
            source
          )
        ),
      id
    );
  addSpells(
    character,
    inputFeature.spells.map((spell) =>
      converters.Spell(
        spell.name,
        inputFeature.spellcastingAbility ||
          feature.additionalSpells?.at(0).spellcastingAbility?.items[0],
        spell._meta,
        source
      )
    ),
    id
  );
};

export default {
  abilityScores: addAbilityScores,
  proficiencies: addProficiencies,
  expertises: addExpertises,
  spells: addSpells,
  items: addItems,
  coins: addCoins,
  features: addFeatures,
  chosenOption: addChosenOption,
  speed: addSpeed,
  feat: addFeat,
  optionalFeature: addOptionalFeature,
  spellcastingSlots: addSpellcastingSlots,
  pactMagicSlots: addPactSlots,
  resource: addResource,
};
