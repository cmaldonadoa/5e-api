import {
  Character,
  CharacterSpeedInput,
  Class,
  ClassClassTableGroupsRows,
  ClassFeature,
  ClassFeatureEntries,
  ClassFeatureEntriesClassFeature,
  SubclassFeature,
  SubclassFeatureEntries,
  SubclassFeatureEntriesSubclassFeature,
} from "../../__generated__/graphql";
import utils, {
  IndexKey4,
  parseFormula,
  SourceDataType,
  SpeedKey,
} from "./utils";
import { queries as classQueries } from "../data/classes";

const { get, add, inputs, remove } = utils;

const updateResource = (
  character: Character,
  className: string,
  resourceName: string,
  resourceAmount: number,
  source: SourceDataType
) => {
  remove.resources(character, (e) => e.refId === className, resourceName);
  add.resource(
    character,
    inputs.Resource(resourceName, 0, [
      inputs.ResourceItem(resourceAmount, source),
    ]),
    className
  );
};

const getRefs = (
  entries: (ClassFeatureEntries | SubclassFeatureEntries | null)[]
): (ClassFeature | SubclassFeature)[] => {
  const refs: (ClassFeature | SubclassFeature)[] = [];
  entries.forEach((entry) => {
    if (!entry) return;
    const type = entry.type as string;
    if (type === "refClassFeature") {
      return refs.push(
        classQueries.classFeature(
          (entry as ClassFeatureEntriesClassFeature).featureName as string,
          (entry as ClassFeatureEntriesClassFeature).level as number
        ) as ClassFeature
      );
    } else if (type === "refSubclassFeature") {
      return refs.push(
        classQueries.subclassFeature(
          (entry as SubclassFeatureEntriesSubclassFeature)
            .featureName as string,
          (entry as SubclassFeatureEntriesSubclassFeature).level as number
        ) as SubclassFeature
      );
    } else if (type === "entries") {
      return refs.push(
        ...getRefs(entries.filter((e) => e && e.parentId === entry.internalId))
      );
    }
  });
  return refs;
};

const handleClass = (
  character: Character,
  className: string,
  gainedFeatures: string[],
  source: SourceDataType
) => {
  const handleFeature = (feature: ClassFeature | SubclassFeature) => {
    if (feature.name === "Unarmored Defense") {
      const resource = character.resources.find(
        (resource) => resource.type === feature.name
      );
      if (resource?.items.length) return;
    }

    add.features(
      character,
      inputs.Features(
        feature.entries as ClassFeatureEntries[],
        source,
        feature.consumes
          ? inputs.ConsumeData(
              feature.consumes.name as string,
              feature.consumes.amount || 1
            )
          : null
      ),
      className
    );

    if (feature.name === "Channel Divinity") return;

    if (feature.usesFormula)
      updateResource(
        character,
        className,
        feature.name as string,
        parseFormula(feature.usesFormula, character, className),
        source
      );
  };

  const level = get.level(character, className);

  gainedFeatures.forEach((name) => {
    const classFeature = classQueries.classFeature(name, level);
    const subclassFeature = classQueries.subclassFeature(name, level);
    const feature = classFeature || subclassFeature;

    if (!feature) return;
    handleFeature(feature);

    const refs = feature.entries ? getRefs(feature.entries) : [];
    refs.forEach((ref) => handleFeature(ref));
  });
};

const handleArtificer = (
  character: Character,
  source: SourceDataType,
  gainedFeatures: string[]
) => {
  const className = "Artificer";
  handleClass(character, className, gainedFeatures, source);
};

const handleBarbarian = (
  character: Character,
  source: SourceDataType,
  gainedFeatures: string[]
) => {
  const className = "Barbarian";
  handleClass(character, className, gainedFeatures, source);

  const classData = classQueries.class(className) as Class;
  const level = get.level(character, className);
  const i = classData.classTableGroups
    ?.at(0)
    ?.colLabels?.findIndex((e) => e === "Rages") as number;
  const rages = (
    classData.classTableGroups
      ?.at(0)
      ?.rows?.at(level - 1) as ClassClassTableGroupsRows
  )[("_" + i) as IndexKey4]?.value as string;

  updateResource(
    character,
    className,
    "Rages",
    rages === "Unlimited" ? -1 : +rages,
    source
  );
};

const handleBard = (
  character: Character,
  source: SourceDataType,
  gainedFeatures: string[]
) => {
  const className = "Bard";
  handleClass(character, className, gainedFeatures, source);
};

const handleCleric = (
  character: Character,
  source: SourceDataType,
  gainedFeatures: string[]
) => {
  const className = "Cleric";
  handleClass(character, className, gainedFeatures, source);

  const level = get.level(character, className);

  if (level === 2) {
    remove.resources(
      character,
      (e) => e.refId === "Paladin",
      "Channel Divinity"
    );
    updateResource(character, className, "Channel Divinity", 1, source);
  }
  if (level === 6)
    updateResource(character, className, "Channel Divinity", 2, source);
  if (level === 18)
    updateResource(character, className, "Channel Divinity", 3, source);
};

const handleDruid = (
  character: Character,
  source: SourceDataType,
  gainedFeatures: string[]
) => {
  const className = "Druid";
  handleClass(character, className, gainedFeatures, source);

  const level = get.level(character, className);

  if (level === 2)
    updateResource(character, className, "Wild Shape", 2, source);
  if (level === 20)
    updateResource(character, className, "Wild Shape", -1, source);
};

const handleFighter = (
  character: Character,
  source: SourceDataType,
  gainedFeatures: string[]
) => {
  const className = "Fighter";
  handleClass(character, className, gainedFeatures, source);
};

const handleMonk = (
  character: Character,
  source: SourceDataType,
  gainedFeatures: string[]
) => {
  const className = "Monk";
  handleClass(character, className, gainedFeatures, source);

  const classData = classQueries.class(className) as Class;

  const level = get.level(character, className);
  const i = classData.classTableGroups
    ?.at(0)
    ?.colLabels?.findIndex((e) => e === "Ki Points") as number;
  const ki = (
    classData.classTableGroups
      ?.at(0)
      ?.rows?.at(level - 1) as ClassClassTableGroupsRows
  )[("_" + i) as IndexKey4]?.value as string;
  updateResource(character, className, "Ki", +ki, source);

  const j = classData.classTableGroups
    ?.at(0)
    ?.colLabels?.findIndex((e) => e === "Unarmored Movement") as number;
  const movement = (
    classData.classTableGroups
      ?.at(0)
      ?.rows?.at(level - 1) as ClassClassTableGroupsRows
  )[("_" + j) as IndexKey4]?.value as string;

  const speed = Object.keys(character.speed).reduce((obj, key) => {
    obj[key as SpeedKey] = inputs.SpeedValue(+movement, source);
    return obj;
  }, {} as CharacterSpeedInput);
  remove.speed(character, (e) => e.refId === "Monk");
  add.speed(character, speed, "Monk");
};

const handlePaladin = (
  character: Character,
  source: SourceDataType,
  gainedFeatures: string[]
) => {
  const className = "Paladin";
  handleClass(character, className, gainedFeatures, source);

  const level = get.level(character, className);

  if (level === 3) {
    const cleric = character.classes.find((c) => c.name === "Cleric");
    if (cleric && cleric.level < 3)
      updateResource(character, className, "Channel Divinity", 1, source);
  }

  updateResource(character, className, "Lay on Hands", level * 5, source);
};

const handleRanger = (
  character: Character,
  source: SourceDataType,
  gainedFeatures: string[]
) => {
  const className = "Ranger";
  handleClass(character, className, gainedFeatures, source);
};

const handleRogue = (
  character: Character,
  source: SourceDataType,
  gainedFeatures: string[]
) => {
  const className = "Rogue";
  handleClass(character, className, gainedFeatures, source);
};

const handleSorcerer = (
  character: Character,
  source: SourceDataType,
  gainedFeatures: string[]
) => {
  const className = "Sorcerer";
  handleClass(character, className, gainedFeatures, source);

  const classData = classQueries.class("Sorcerer") as Class;

  const level = get.level(character, className);
  const i = classData.classTableGroups
    ?.at(0)
    ?.colLabels?.findIndex((e) => e === "Sorcery Points") as number;
  const points = (
    classData.classTableGroups
      ?.at(0)
      ?.rows?.at(level - 1) as ClassClassTableGroupsRows
  )[("_" + i) as IndexKey4]?.value as string;

  updateResource(character, className, "Sorcery Points", +points, source);
};

const handleWarlock = (
  character: Character,
  source: SourceDataType,
  gainedFeatures: string[]
) => {
  const className = "Warlock";
  handleClass(character, className, gainedFeatures, source);

  remove.pactMagicSlots(character, (e) => e.refId === "Pact Magic");
  add.pactMagicSlots(character, get.pactSlots(character), "Pact Magic");
};

const handleWizard = (
  character: Character,
  source: SourceDataType,
  gainedFeatures: string[]
) => {
  const className = "Wizard";
  handleClass(character, className, gainedFeatures, source);
};

export default {
  Artificer: handleArtificer,
  Barbarian: handleBarbarian,
  Bard: handleBard,
  Cleric: handleCleric,
  Druid: handleDruid,
  Fighter: handleFighter,
  Monk: handleMonk,
  Paladin: handlePaladin,
  Ranger: handleRanger,
  Rogue: handleRogue,
  Sorcerer: handleSorcerer,
  Warlock: handleWarlock,
  Wizard: handleWizard,
};
