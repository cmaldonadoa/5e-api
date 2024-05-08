import {
  Character,
  CharacterAbilityScoresInput,
  CharacterChosenOptionInput,
  CharacterCoinsInput,
  CharacterDataSource,
  CharacterEntries,
  CharacterEntriesInput,
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
  Class,
  FeatAdditionalSpells,
  FeatAdditionalSpellsSpells,
  FeatAdditionalSpellsSpells_Meta,
  OptionalFeatureAdditionalSpellsSpells,
  OptionalFeatureAdditionalSpellsSpells_Meta,
  OptionalFeatureEntries,
} from "../../../__generated__/graphql";
import { v4 as uuid } from "uuid";
import { queries as itemQueries } from "../../data/items";
import { queries as featQueries } from "../../data/feats";
import converters from "./input";
import { queries as classQueries } from "../../data/classes";
import {
  AbilityScoreKey,
  addSource,
  CoinKey,
  parseFormula,
  ProficiencyKey,
  SlotKey,
  SpeedKey,
} from "./index";
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
  const ids: AbilityScoresIds = {};
  character.abilityScores = Object.keys(character.abilityScores).reduce(
    (characterAbilityScores, key) => {
      const id = key in abilityScores ? uuid() : null;
      if (id) {
        ids[key as AbilityScoreKey] = id;
        characterAbilityScores[key as AbilityScoreKey] = [
          ...characterAbilityScores[key as AbilityScoreKey],
          ...(key in abilityScores
            ? [
                {
                  id: id,
                  value: abilityScores[key as AbilityScoreKey]?.value || 0,
                  sourceType: abilityScores[key as AbilityScoreKey]?.sourceType,
                  sourceText: abilityScores[key as AbilityScoreKey]?.sourceText,
                  refId: refId,
                },
              ]
            : []),
        ];
      }
      return characterAbilityScores;
    },
    character.abilityScores
  );
  character.classes = character.classes.map((e) => {
    const classData = classQueries.class(e.name) as Class;
    return {
      ...e,
      preparedSpells: parseFormula(
        classData.preparedSpellsFormula || "",
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

const handleProficiency = (
  e: CharacterProficiencyInput,
  ids: ProficienciesIds,
  key: string,
  refId?: string
) => {
  const id = uuid();
  if (!(key in ids)) ids[key as ProficiencyKey] = [];
  (ids[key as ProficiencyKey] as string[]).push(id);
  return {
    id: id,
    refId: refId,
    sourceText: e.sourceText,
    sourceType: e.sourceType,
    name: e.name || "",
  } satisfies CharacterProficiency;
};

const addProficiencies = (
  character: Character,
  proficiencies: CharacterProficienciesInput,
  refId?: string
): ProficienciesIds => {
  const ids: ProficienciesIds = {};
  character.proficiencies = Object.keys(character.proficiencies).reduce(
    (characterProficiencies, key) => {
      characterProficiencies[key as ProficiencyKey] = [
        ...characterProficiencies[key as ProficiencyKey],
        ...(
          ((proficiencies || {})[key as ProficiencyKey] ||
            []) as CharacterProficiencyInput[]
        ).map((e) => {
          return handleProficiency(e, ids, key, refId);
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
  const ids: ProficienciesIds = {};
  character.expertises = Object.keys(character.expertises).reduce(
    (characterExpertises, key) => {
      characterExpertises[key as ProficiencyKey] = [
        ...characterExpertises[key as ProficiencyKey],
        ...(
          ((expertises || {})[key as ProficiencyKey] ||
            []) as CharacterProficiencyInput[]
        ).map((e) => {
          return handleProficiency(e, ids, key, refId);
        }),
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
        ...spell,
        id: id,
        refId: refId,
        name: spell.name || "",
        entries: (spell.entries || []).map(
          (entry) =>
            ({ ...entry, id: uuid(), refId: id }) satisfies CharacterEntries
        ),
        higherLevel: (spell.higherLevel || []).map(
          (entry) =>
            ({ ...entry, id: uuid(), refId: id }) satisfies CharacterEntries
        ),
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
        refId: refId,
        name: item.name || "",
        sourceText: item.sourceText,
        sourceType: item.sourceType,
        isBaseItem: Boolean(item.name && itemQueries.baseItem(item.name)),
        quantity: item.quantity || 0,
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
      items: (resource.items || []).map((item) => {
        const id = uuid();
        ids.push(id);
        return {
          id: id,
          refId: refId,
          sourceText: item.sourceText,
          sourceType: item.sourceType,
          amount: item.amount || 0,
        } satisfies CharacterResourceItem;
      }),
    });
  } else {
    character.resources[index].items = [
      ...character.resources[index].items,
      ...(resource.items || []).map((item) => {
        const id = uuid();
        ids.push(id);
        return {
          id: id,
          refId: refId,
          sourceText: item.sourceText,
          sourceType: item.sourceType,
          amount: item.amount || 0,
        } satisfies CharacterResourceItem;
      }),
    ];
  }

  return ids;
};

const addCoins = (character: Character, coins: CharacterCoinsInput): void => {
  character.coins = Object.keys(character.coins).reduce(
    (characterCoins, key) => {
      characterCoins[key as CoinKey] =
        (characterCoins[key as CoinKey] || 0) +
        ((coins || {})[key as CoinKey] || 0);
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
    ...(character.features || []),
    ...features.map((feature) => {
      const id = uuid();
      ids.push(id);
      return {
        id: id,
        refId: refId,
        consumeType: feature.consumeType,
        consumeAmount: feature.consumeAmount,
        sourceText: feature.sourceText,
        sourceType: feature.sourceType,
        entries: (feature.entries || []).map(
          (entry) =>
            ({ ...entry, id: uuid(), refId: id }) satisfies CharacterEntries
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
  const ids: SpeedIds = {};
  character.speed = Object.keys(character.speed).reduce(
    (characterSpeed, key) => {
      const id = key in speed ? uuid() : null;
      if (id) {
        ids[key as SpeedKey] = id;
        characterSpeed[key as SpeedKey] = [
          ...(characterSpeed[key as SpeedKey] || []),
          ...(key in speed
            ? [
                {
                  id: id,
                  value: speed[key as SpeedKey]?.value || 0,
                  sourceType: speed[key as SpeedKey]?.sourceType,
                  sourceText: speed[key as SpeedKey]?.sourceText,
                  refId: refId,
                },
              ]
            : []),
        ];
      }
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

const handleSlot = (
  e: CharacterSpellSlotInput,
  ids: SlotsIds,
  key: string,
  refId?: string
) => {
  const id = uuid();
  if (!(key in ids)) ids[key as SlotKey] = [];
  (ids[key as SlotKey] as string[]).push(id);
  return {
    id: id,
    refId: refId,
    sourceText: e.sourceText,
    sourceType: e.sourceType,
    amount: e.amount || 0,
  } satisfies CharacterSpellSlot;
};

const addSpellcastingSlots = (
  character: Character,
  spellcastingSlots: CharacterSpellSlotsInput,
  refId?: string
): SlotsIds => {
  const ids: SlotsIds = {};
  character.spellcastingSlots = Object.keys(character.spellcastingSlots).reduce(
    (characterSpellcastingSlots, key) => {
      characterSpellcastingSlots[key as SlotKey] = [
        ...(characterSpellcastingSlots[key as SlotKey] || []),
        ...(
          ((spellcastingSlots || {})[key as SlotKey] ||
            []) as CharacterSpellSlotInput[]
        ).map((e) => {
          return handleSlot(e, ids, key, refId);
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
  const ids: SlotsIds = {};
  character.pactMagicSlots = Object.keys(character.pactMagicSlots).reduce(
    (characterPactSlots, key) => {
      characterPactSlots[key as SlotKey] = [
        ...(characterPactSlots[key as SlotKey] || []),
        ...(
          ((pactSlots || {})[key as SlotKey] || []) as CharacterSpellSlotInput[]
        ).map((e) => {
          return handleSlot(e, ids, key, refId);
        }),
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
      refId: refId,
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
  if (!feat) return;

  const id = addChosenOption(
    character,
    converters.ChosenOption(feat.name as string, "Feats", null),
    refId
  );

  const source = converters.SourceData(
    CharacterDataSource.Feat,
    inputFeat.name
  );

  addFeatures(
    character,
    converters.Features(feat.entries as CharacterEntriesInput[], source, null),
    id
  );
  addAbilityScores(
    character,
    converters.AbilityScoreInput(
      inputFeat.abilityScores ||
        (feat.ability?.items as AbilityScoreKey[]) ||
        [],
      source
    ),
    id
  );
  addProficiencies(character, converters.ProficienciesInput(feat, source), id);
  addProficiencies(
    character,
    converters.ProficienciesInput(
      (inputFeat.proficiencies || {}) as CharacterProficienciesInput,
      source
    ),
    id
  );
  addExpertises(
    character,
    converters.ProficienciesInput(
      (inputFeat.expertises || {}) as CharacterProficienciesInput,
      source
    ),
    id
  );

  if (feat.additionalSpells?.length === 1)
    addSpells(
      character,
      (
        (feat.additionalSpells as FeatAdditionalSpells[])[0]
          .spells as FeatAdditionalSpellsSpells[]
      )
        .filter((spell) => spell.item)
        .map((spell) =>
          converters.SpellOfficial(
            spell.item as string,
            inputFeat.spellcastingAbility ||
              feat.additionalSpells?.at(0)?.spellcastingAbility?.items?.at(0) ||
              "int",
            spell._meta as FeatAdditionalSpellsSpells_Meta,
            source
          )
        ),
      id
    );
  addSpells(
    character,
    (inputFeat.spells || []).map((spell) =>
      converters.SpellOfficial(
        spell.name || "",
        inputFeat.spellcastingAbility ||
          feat.additionalSpells?.at(0)?.spellcastingAbility?.items?.at(0) ||
          "int",
        spell._meta || {},
        source
      )
    ),
    id
  );

  inputFeat.optionalFeatures?.forEach((feature) =>
    addOptionalFeature(character, addSource(feature, source), id)
  );
};

const addOptionalFeature = (
  character: Character,
  inputFeature: CharacterOptionalFeatureInput,
  refId?: string
) => {
  const feature = classQueries.optionalFeature(inputFeature.name);
  if (!feature) return;

  const consume = feature.consumes
    ? converters.ConsumeData(
        feature.consumes.name as string,
        feature.consumes.amount || 1
      )
    : null;

  const id = addChosenOption(
    character,
    converters.ChosenOption(
      feature.name as string,
      get.featureType((feature.featureType as string[])[0]),
      consume
    ),
    refId
  );

  let sourceText: string;

  switch (inputFeature.sourceType) {
    case CharacterDataSource.Background:
      sourceText = character.backgroundName || "";
      break;
    case CharacterDataSource.Class:
      sourceText = character.classes.at(0)?.name || "";
      break;
    case CharacterDataSource.Race:
      sourceText = character.raceName || "";
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
      converters.NamedEntries(
        feature.name as string,
        feature.entries as OptionalFeatureEntries[]
      ),
      source,
      consume
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
      (
        feature.additionalSpells.at(0)
          ?.spells as OptionalFeatureAdditionalSpellsSpells[]
      )
        .filter((spell) => spell.item)
        .map((spell) =>
          converters.SpellOfficial(
            spell.item as string,
            inputFeature.spellcastingAbility ||
              feature.additionalSpells
                ?.at(0)
                ?.spellcastingAbility?.items?.at(0) ||
              "int",
            spell._meta as OptionalFeatureAdditionalSpellsSpells_Meta,
            source
          )
        ),
      id
    );
  addSpells(
    character,
    (inputFeature.spells || []).map((spell) =>
      converters.SpellOfficial(
        spell.name as string,
        inputFeature.spellcastingAbility ||
          feature.additionalSpells?.at(0)?.spellcastingAbility?.items?.at(0) ||
          "int",
        spell._meta || {},
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
