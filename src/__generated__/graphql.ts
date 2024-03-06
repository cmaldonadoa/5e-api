import { GraphQLResolveInfo } from "graphql";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Background = {
  __typename?: "Background";
  additionalSpells?: Maybe<Array<Maybe<BackgroundAdditionalSpells>>>;
  entries?: Maybe<Array<Maybe<BackgroundEntries>>>;
  feats?: Maybe<BackgroundFeats>;
  languageProficiencies?: Maybe<BackgroundLanguageProficiencies>;
  name?: Maybe<Scalars["String"]["output"]>;
  skillProficiencies?: Maybe<BackgroundSkillProficiencies>;
  source?: Maybe<Scalars["String"]["output"]>;
  startingEquipment?: Maybe<Array<Maybe<BackgroundStartingEquipment>>>;
  toolProficiencies?: Maybe<BackgroundToolProficiencies>;
};

export type BackgroundAdditionalSpells = {
  __typename?: "BackgroundAdditionalSpells";
  expanded?: Maybe<BackgroundAdditionalSpellsExpanded>;
};

export type BackgroundAdditionalSpellsExpanded = {
  __typename?: "BackgroundAdditionalSpellsExpanded";
  s0?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  s1?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  s2?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  s3?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  s4?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  s5?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type BackgroundEntries = {
  __typename?: "BackgroundEntries";
  caption?: Maybe<Scalars["String"]["output"]>;
  children?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  colLabels?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  colStyles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  data?: Maybe<BackgroundEntriesData>;
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  items?: Maybe<Array<Maybe<BackgroundEntriesItems>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  parentId?: Maybe<Scalars["Int"]["output"]>;
  rows?: Maybe<Array<Maybe<BackgroundEntriesRowsList>>>;
  style?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type BackgroundEntriesData = {
  __typename?: "BackgroundEntriesData";
  isFeature?: Maybe<Scalars["Boolean"]["output"]>;
  tableInclude?: Maybe<Scalars["Boolean"]["output"]>;
};

export type BackgroundEntriesItems = {
  __typename?: "BackgroundEntriesItems";
  entry?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type BackgroundEntriesRows = {
  __typename?: "BackgroundEntriesRows";
  _0?: Maybe<Scalars["String"]["output"]>;
  _1?: Maybe<Scalars["String"]["output"]>;
};

export type BackgroundEntriesRowsList = {
  __typename?: "BackgroundEntriesRowsList";
  items?: Maybe<Array<Maybe<BackgroundEntriesRows>>>;
};

export type BackgroundFeats = {
  __typename?: "BackgroundFeats";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type BackgroundLanguageProficiencies = {
  __typename?: "BackgroundLanguageProficiencies";
  choose?: Maybe<BackgroundLanguageProficienciesChoose>;
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type BackgroundLanguageProficienciesChoose = {
  __typename?: "BackgroundLanguageProficienciesChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type BackgroundSkillProficiencies = {
  __typename?: "BackgroundSkillProficiencies";
  choose?: Maybe<BackgroundSkillProficienciesChoose>;
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type BackgroundSkillProficienciesChoose = {
  __typename?: "BackgroundSkillProficienciesChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type BackgroundStartingEquipment = {
  __typename?: "BackgroundStartingEquipment";
  _?: Maybe<Array<Maybe<BackgroundStartingEquipment_>>>;
  a?: Maybe<Array<Maybe<BackgroundStartingEquipmentA>>>;
  b?: Maybe<Array<Maybe<BackgroundStartingEquipmentB>>>;
  c?: Maybe<Array<Maybe<BackgroundStartingEquipmentC>>>;
  d?: Maybe<Array<Maybe<BackgroundStartingEquipmentD>>>;
};

export type BackgroundStartingEquipmentA = {
  __typename?: "BackgroundStartingEquipmentA";
  displayName?: Maybe<Scalars["String"]["output"]>;
  item?: Maybe<Scalars["String"]["output"]>;
  quantity?: Maybe<Scalars["Int"]["output"]>;
  special?: Maybe<Scalars["String"]["output"]>;
  tool?: Maybe<Scalars["String"]["output"]>;
};

export type BackgroundStartingEquipmentB = {
  __typename?: "BackgroundStartingEquipmentB";
  item?: Maybe<Scalars["String"]["output"]>;
  special?: Maybe<Scalars["String"]["output"]>;
  tool?: Maybe<Scalars["String"]["output"]>;
};

export type BackgroundStartingEquipmentC = {
  __typename?: "BackgroundStartingEquipmentC";
  special?: Maybe<Scalars["String"]["output"]>;
};

export type BackgroundStartingEquipmentD = {
  __typename?: "BackgroundStartingEquipmentD";
  special?: Maybe<Scalars["String"]["output"]>;
};

export type BackgroundStartingEquipment_ = {
  __typename?: "BackgroundStartingEquipment_";
  displayName?: Maybe<Scalars["String"]["output"]>;
  item?: Maybe<Scalars["String"]["output"]>;
  quantity?: Maybe<Scalars["Int"]["output"]>;
  special?: Maybe<Scalars["String"]["output"]>;
  tool?: Maybe<Scalars["String"]["output"]>;
  value?: Maybe<Scalars["Int"]["output"]>;
  worthValue?: Maybe<Scalars["Int"]["output"]>;
};

export type BackgroundToolProficiencies = {
  __typename?: "BackgroundToolProficiencies";
  choose?: Maybe<BackgroundToolProficienciesChoose>;
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type BackgroundToolProficienciesChoose = {
  __typename?: "BackgroundToolProficienciesChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type BaseItem = {
  __typename?: "BaseItem";
  ammoType?: Maybe<Scalars["String"]["output"]>;
  armorClass?: Maybe<Scalars["Int"]["output"]>;
  damage?: Maybe<BaseItemDamage>;
  damageType?: Maybe<Scalars["String"]["output"]>;
  entries?: Maybe<Array<Maybe<BaseItemEntries>>>;
  isArmor?: Maybe<Scalars["Boolean"]["output"]>;
  isFirearm?: Maybe<Scalars["Boolean"]["output"]>;
  isWeapon?: Maybe<Scalars["Boolean"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  packContents?: Maybe<Array<Maybe<BaseItemPackContents>>>;
  properties?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  range?: Maybe<Scalars["String"]["output"]>;
  rarity?: Maybe<Scalars["String"]["output"]>;
  reload?: Maybe<Scalars["Int"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
  stealth?: Maybe<Scalars["Boolean"]["output"]>;
  strength?: Maybe<Scalars["String"]["output"]>;
  types?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  weaponCategory?: Maybe<Scalars["String"]["output"]>;
};

export type BaseItemDamage = {
  __typename?: "BaseItemDamage";
  _1?: Maybe<Scalars["String"]["output"]>;
  _2?: Maybe<Scalars["String"]["output"]>;
};

export type BaseItemEntries = {
  __typename?: "BaseItemEntries";
  children?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  parentId?: Maybe<Scalars["Int"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type BaseItemPackContents = {
  __typename?: "BaseItemPackContents";
  item?: Maybe<Scalars["String"]["output"]>;
  quantity?: Maybe<Scalars["Int"]["output"]>;
  special?: Maybe<Scalars["Boolean"]["output"]>;
};

export type Book = {
  __typename?: "Book";
  group?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type Card = {
  __typename?: "Card";
  entries?: Maybe<Array<Maybe<CardEntries>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  set?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
};

export type CardEntries = {
  __typename?: "CardEntries";
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
  style?: Maybe<Scalars["String"]["output"]>;
  tag?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type Class = {
  __typename?: "Class";
  additionalSpells?: Maybe<Array<Maybe<ClassAdditionalSpells>>>;
  armorProficiencies?: Maybe<ClassArmorProficiencies>;
  cantripProgression?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  classFeatures?: Maybe<Array<Maybe<ClassClassFeatures>>>;
  classTableGroups?: Maybe<Array<Maybe<ClassClassTableGroups>>>;
  hitDie?: Maybe<ClassHitDie>;
  multiclassSlotsProgression?: Maybe<Scalars["String"]["output"]>;
  multiclassing?: Maybe<ClassMulticlassing>;
  name?: Maybe<Scalars["String"]["output"]>;
  optionalFeatureProgression?: Maybe<
    Array<Maybe<ClassOptionalFeatureProgression>>
  >;
  preparedSpellsFormula?: Maybe<Scalars["String"]["output"]>;
  savingThrowProficiencies?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  skillProficiencies?: Maybe<ClassSkillProficiencies>;
  source?: Maybe<Scalars["String"]["output"]>;
  spellcastingAbility?: Maybe<Scalars["String"]["output"]>;
  spellsKnownProgression?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  startingEquipment?: Maybe<Array<Maybe<ClassStartingEquipment>>>;
  subclassTitle?: Maybe<Scalars["String"]["output"]>;
  toolProficiencies?: Maybe<ClassToolProficiencies>;
  weaponProficiencies?: Maybe<ClassWeaponProficiencies>;
};

export type ClassAdditionalSpells = {
  __typename?: "ClassAdditionalSpells";
  name?: Maybe<Scalars["String"]["output"]>;
  spellcastingAbility?: Maybe<Scalars["String"]["output"]>;
  spells?: Maybe<Array<Maybe<ClassAdditionalSpellsSpells>>>;
};

export type ClassAdditionalSpellsSpells = {
  __typename?: "ClassAdditionalSpellsSpells";
  _meta?: Maybe<ClassAdditionalSpellsSpells_Meta>;
  choose?: Maybe<ClassAdditionalSpellsSpellsChoose>;
};

export type ClassAdditionalSpellsSpellsChoose = {
  __typename?: "ClassAdditionalSpellsSpellsChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  fromFilter?: Maybe<Scalars["String"]["output"]>;
};

export type ClassAdditionalSpellsSpells_Meta = {
  __typename?: "ClassAdditionalSpellsSpells_meta";
  level?: Maybe<Scalars["Int"]["output"]>;
};

export type ClassArmorProficiencies = {
  __typename?: "ClassArmorProficiencies";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type ClassClassFeatures = {
  __typename?: "ClassClassFeatures";
  className?: Maybe<Scalars["String"]["output"]>;
  featureName?: Maybe<Scalars["String"]["output"]>;
  level?: Maybe<Scalars["Int"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
};

export type ClassClassTableGroups = {
  __typename?: "ClassClassTableGroups";
  colLabels?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  rows?: Maybe<Array<Maybe<ClassClassTableGroupsRowsList>>>;
  rowsSpellProgression?: Maybe<
    Array<Maybe<ClassClassTableGroupsRowsSpellProgressionList>>
  >;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type ClassClassTableGroupsRows = {
  __typename?: "ClassClassTableGroupsRows";
  _0?: Maybe<Scalars["String"]["output"]>;
  _1?: Maybe<Scalars["String"]["output"]>;
  _2?: Maybe<Scalars["String"]["output"]>;
  _3?: Maybe<Scalars["String"]["output"]>;
  _4?: Maybe<Scalars["String"]["output"]>;
};

export type ClassClassTableGroupsRowsList = {
  __typename?: "ClassClassTableGroupsRowsList";
  items?: Maybe<Array<Maybe<ClassClassTableGroupsRows>>>;
};

export type ClassClassTableGroupsRowsSpellProgression = {
  __typename?: "ClassClassTableGroupsRowsSpellProgression";
  _0?: Maybe<Scalars["Int"]["output"]>;
  _1?: Maybe<Scalars["Int"]["output"]>;
  _2?: Maybe<Scalars["Int"]["output"]>;
  _3?: Maybe<Scalars["Int"]["output"]>;
  _4?: Maybe<Scalars["Int"]["output"]>;
  _5?: Maybe<Scalars["Int"]["output"]>;
  _6?: Maybe<Scalars["Int"]["output"]>;
  _7?: Maybe<Scalars["Int"]["output"]>;
  _8?: Maybe<Scalars["Int"]["output"]>;
};

export type ClassClassTableGroupsRowsSpellProgressionList = {
  __typename?: "ClassClassTableGroupsRowsSpellProgressionList";
  items?: Maybe<Array<Maybe<ClassClassTableGroupsRowsSpellProgression>>>;
};

export type ClassFeature = {
  __typename?: "ClassFeature";
  className?: Maybe<Scalars["String"]["output"]>;
  classSource?: Maybe<Scalars["String"]["output"]>;
  consumes?: Maybe<ClassFeatureConsumes>;
  entries?: Maybe<Array<Maybe<ClassFeatureEntries>>>;
  isClassFeatureVariant?: Maybe<Scalars["Boolean"]["output"]>;
  level?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
};

export type ClassFeatureConsumes = {
  __typename?: "ClassFeatureConsumes";
  amount?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type ClassFeatureEntries = {
  __typename?: "ClassFeatureEntries";
  attributes?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  caption?: Maybe<Scalars["String"]["output"]>;
  children?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  classFeature?: Maybe<Scalars["String"]["output"]>;
  colLabels?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  colStyles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  count?: Maybe<Scalars["Int"]["output"]>;
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  items?: Maybe<Array<Maybe<ClassFeatureEntriesItems>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  optionalfeature?: Maybe<Scalars["String"]["output"]>;
  page?: Maybe<Scalars["Int"]["output"]>;
  parentId?: Maybe<Scalars["Int"]["output"]>;
  rows?: Maybe<Array<Maybe<ClassFeatureEntriesRowsList>>>;
  source?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type ClassFeatureEntriesItems = {
  __typename?: "ClassFeatureEntriesItems";
  entry?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type ClassFeatureEntriesRows = {
  __typename?: "ClassFeatureEntriesRows";
  _0?: Maybe<Scalars["String"]["output"]>;
  _1?: Maybe<Scalars["String"]["output"]>;
  _2?: Maybe<Scalars["String"]["output"]>;
  _3?: Maybe<Scalars["String"]["output"]>;
};

export type ClassFeatureEntriesRowsList = {
  __typename?: "ClassFeatureEntriesRowsList";
  items?: Maybe<Array<Maybe<ClassFeatureEntriesRows>>>;
};

export type ClassHitDie = {
  __typename?: "ClassHitDie";
  faces?: Maybe<Scalars["Int"]["output"]>;
  number?: Maybe<Scalars["Int"]["output"]>;
};

export type ClassMulticlassing = {
  __typename?: "ClassMulticlassing";
  proficienciesGained?: Maybe<ClassMulticlassingProficienciesGained>;
  requirements?: Maybe<ClassMulticlassingRequirements>;
};

export type ClassMulticlassingProficienciesGained = {
  __typename?: "ClassMulticlassingProficienciesGained";
  armor?: Maybe<ClassMulticlassingProficienciesGainedArmor>;
  skills?: Maybe<ClassMulticlassingProficienciesGainedSkills>;
  tools?: Maybe<ClassMulticlassingProficienciesGainedTools>;
  weapons?: Maybe<ClassMulticlassingProficienciesGainedWeapons>;
};

export type ClassMulticlassingProficienciesGainedArmor = {
  __typename?: "ClassMulticlassingProficienciesGainedArmor";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type ClassMulticlassingProficienciesGainedSkills = {
  __typename?: "ClassMulticlassingProficienciesGainedSkills";
  choose?: Maybe<ClassMulticlassingProficienciesGainedSkillsChoose>;
};

export type ClassMulticlassingProficienciesGainedSkillsChoose = {
  __typename?: "ClassMulticlassingProficienciesGainedSkillsChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type ClassMulticlassingProficienciesGainedTools = {
  __typename?: "ClassMulticlassingProficienciesGainedTools";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type ClassMulticlassingProficienciesGainedWeapons = {
  __typename?: "ClassMulticlassingProficienciesGainedWeapons";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type ClassMulticlassingRequirements = {
  __typename?: "ClassMulticlassingRequirements";
  cha?: Maybe<Scalars["Int"]["output"]>;
  dex?: Maybe<Scalars["Int"]["output"]>;
  int?: Maybe<Scalars["Int"]["output"]>;
  or?: Maybe<Array<Maybe<ClassMulticlassingRequirementsOr>>>;
  str?: Maybe<Scalars["Int"]["output"]>;
  wis?: Maybe<Scalars["Int"]["output"]>;
};

export type ClassMulticlassingRequirementsOr = {
  __typename?: "ClassMulticlassingRequirementsOr";
  dex?: Maybe<Scalars["Int"]["output"]>;
  str?: Maybe<Scalars["Int"]["output"]>;
};

export type ClassOptionalFeatureProgression = {
  __typename?: "ClassOptionalFeatureProgression";
  featureType?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  progression?: Maybe<ClassOptionalFeatureProgressionProgression>;
};

export type ClassOptionalFeatureProgressionProgression = {
  __typename?: "ClassOptionalFeatureProgressionProgression";
  _1?: Maybe<Scalars["Int"]["output"]>;
  _2?: Maybe<Scalars["Int"]["output"]>;
  _3?: Maybe<Scalars["Int"]["output"]>;
  _4?: Maybe<Scalars["Int"]["output"]>;
  _5?: Maybe<Scalars["Int"]["output"]>;
  _6?: Maybe<Scalars["Int"]["output"]>;
  _7?: Maybe<Scalars["Int"]["output"]>;
  _8?: Maybe<Scalars["Int"]["output"]>;
  _9?: Maybe<Scalars["Int"]["output"]>;
  _10?: Maybe<Scalars["Int"]["output"]>;
  _11?: Maybe<Scalars["Int"]["output"]>;
  _12?: Maybe<Scalars["Int"]["output"]>;
  _13?: Maybe<Scalars["Int"]["output"]>;
  _14?: Maybe<Scalars["Int"]["output"]>;
  _15?: Maybe<Scalars["Int"]["output"]>;
  _16?: Maybe<Scalars["Int"]["output"]>;
  _17?: Maybe<Scalars["Int"]["output"]>;
  _18?: Maybe<Scalars["Int"]["output"]>;
  _19?: Maybe<Scalars["Int"]["output"]>;
  _20?: Maybe<Scalars["Int"]["output"]>;
};

export type ClassSkillProficiencies = {
  __typename?: "ClassSkillProficiencies";
  choose?: Maybe<ClassSkillProficienciesChoose>;
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type ClassSkillProficienciesChoose = {
  __typename?: "ClassSkillProficienciesChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type ClassStartingEquipment = {
  __typename?: "ClassStartingEquipment";
  _?: Maybe<Array<Maybe<ClassStartingEquipment_>>>;
  a?: Maybe<Array<Maybe<ClassStartingEquipmentA>>>;
  b?: Maybe<Array<Maybe<ClassStartingEquipmentB>>>;
  c?: Maybe<Array<Maybe<ClassStartingEquipmentC>>>;
};

export type ClassStartingEquipmentA = {
  __typename?: "ClassStartingEquipmentA";
  filter?: Maybe<Scalars["String"]["output"]>;
  item?: Maybe<Scalars["String"]["output"]>;
  quantity?: Maybe<Scalars["Int"]["output"]>;
};

export type ClassStartingEquipmentB = {
  __typename?: "ClassStartingEquipmentB";
  filter?: Maybe<Scalars["String"]["output"]>;
  item?: Maybe<Scalars["String"]["output"]>;
  quantity?: Maybe<Scalars["Int"]["output"]>;
};

export type ClassStartingEquipmentC = {
  __typename?: "ClassStartingEquipmentC";
  filter?: Maybe<Scalars["String"]["output"]>;
  item?: Maybe<Scalars["String"]["output"]>;
};

export type ClassStartingEquipment_ = {
  __typename?: "ClassStartingEquipment_";
  filter?: Maybe<Scalars["String"]["output"]>;
  item?: Maybe<Scalars["String"]["output"]>;
  quantity?: Maybe<Scalars["Int"]["output"]>;
};

export type ClassToolProficiencies = {
  __typename?: "ClassToolProficiencies";
  choose?: Maybe<ClassToolProficienciesChoose>;
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type ClassToolProficienciesChoose = {
  __typename?: "ClassToolProficienciesChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type ClassWeaponProficiencies = {
  __typename?: "ClassWeaponProficiencies";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type Deck = {
  __typename?: "Deck";
  cards?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  entries?: Maybe<Array<Maybe<DeckEntries>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
};

export type DeckEntries = {
  __typename?: "DeckEntries";
  children?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  colLabels?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  colStyles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  entry?: Maybe<Scalars["String"]["output"]>;
  footnotes?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  page?: Maybe<Scalars["Int"]["output"]>;
  parentId?: Maybe<Scalars["Int"]["output"]>;
  rows?: Maybe<Array<Maybe<DeckEntriesRowsList>>>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type DeckEntriesRows = {
  __typename?: "DeckEntriesRows";
  _0?: Maybe<DeckEntriesRowsList0>;
  _1?: Maybe<Scalars["String"]["output"]>;
};

export type DeckEntriesRowsList = {
  __typename?: "DeckEntriesRowsList";
  items?: Maybe<Array<Maybe<DeckEntriesRows>>>;
};

export type DeckEntriesRowsList0 = {
  __typename?: "DeckEntriesRowsList0";
  entry?: Maybe<Scalars["String"]["output"]>;
  roll?: Maybe<DeckEntriesRowsList0Roll>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type DeckEntriesRowsList0Roll = {
  __typename?: "DeckEntriesRowsList0Roll";
  exact?: Maybe<Scalars["Int"]["output"]>;
  max?: Maybe<Scalars["Int"]["output"]>;
  min?: Maybe<Scalars["Int"]["output"]>;
};

export type Feat = {
  __typename?: "Feat";
  ability?: Maybe<FeatAbility>;
  additionalSpells?: Maybe<Array<Maybe<FeatAdditionalSpells>>>;
  armorProficiencies?: Maybe<FeatArmorProficiencies>;
  entries?: Maybe<Array<Maybe<FeatEntries>>>;
  expertise?: Maybe<FeatExpertise>;
  languageProficiencies?: Maybe<FeatLanguageProficiencies>;
  name?: Maybe<Scalars["String"]["output"]>;
  optionalFeatureProgression?: Maybe<
    Array<Maybe<FeatOptionalFeatureProgression>>
  >;
  prerequisite?: Maybe<FeatPrerequisite>;
  savingThrowProficiencies?: Maybe<FeatSavingThrowProficiencies>;
  skillProficiencies?: Maybe<FeatSkillProficiencies>;
  skillToolLanguageProficiencies?: Maybe<FeatSkillToolLanguageProficiencies>;
  source?: Maybe<Scalars["String"]["output"]>;
  toolProficiencies?: Maybe<FeatToolProficiencies>;
  weaponProficiencies?: Maybe<FeatWeaponProficiencies>;
};

export type FeatAbility = {
  __typename?: "FeatAbility";
  choose?: Maybe<FeatAbilityChoose>;
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type FeatAbilityChoose = {
  __typename?: "FeatAbilityChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type FeatAdditionalSpells = {
  __typename?: "FeatAdditionalSpells";
  name?: Maybe<Scalars["String"]["output"]>;
  spellcastingAbility?: Maybe<FeatAdditionalSpellsSpellcastingAbility>;
  spells?: Maybe<Array<Maybe<FeatAdditionalSpellsSpells>>>;
};

export type FeatAdditionalSpellsSpellcastingAbility = {
  __typename?: "FeatAdditionalSpellsSpellcastingAbility";
  choose?: Maybe<FeatAdditionalSpellsSpellcastingAbilityChoose>;
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type FeatAdditionalSpellsSpellcastingAbilityChoose = {
  __typename?: "FeatAdditionalSpellsSpellcastingAbilityChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type FeatAdditionalSpellsSpells = {
  __typename?: "FeatAdditionalSpellsSpells";
  _meta?: Maybe<FeatAdditionalSpellsSpells_Meta>;
  choose?: Maybe<FeatAdditionalSpellsSpellsChoose>;
  item?: Maybe<Scalars["String"]["output"]>;
};

export type FeatAdditionalSpellsSpellsChoose = {
  __typename?: "FeatAdditionalSpellsSpellsChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  fromFilter?: Maybe<Scalars["String"]["output"]>;
};

export type FeatAdditionalSpellsSpells_Meta = {
  __typename?: "FeatAdditionalSpellsSpells_meta";
  longRest?: Maybe<Scalars["Int"]["output"]>;
  ritual?: Maybe<Scalars["Boolean"]["output"]>;
  shortRest?: Maybe<Scalars["Int"]["output"]>;
  will?: Maybe<Scalars["Boolean"]["output"]>;
};

export type FeatArmorProficiencies = {
  __typename?: "FeatArmorProficiencies";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type FeatEntries = {
  __typename?: "FeatEntries";
  caption?: Maybe<Scalars["String"]["output"]>;
  children?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  colLabels?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  colStyles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  items?: Maybe<Array<Maybe<FeatEntriesItems>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  parentId?: Maybe<Scalars["Int"]["output"]>;
  rows?: Maybe<Array<Maybe<FeatEntriesRowsList>>>;
  style?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type FeatEntriesItems = {
  __typename?: "FeatEntriesItems";
  entries?: Maybe<Array<Maybe<FeatEntriesItemsEntries>>>;
  entry?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type FeatEntriesItemsEntries = {
  __typename?: "FeatEntriesItemsEntries";
  entry?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type FeatEntriesRows = {
  __typename?: "FeatEntriesRows";
  _0?: Maybe<Scalars["String"]["output"]>;
  _1?: Maybe<Scalars["String"]["output"]>;
  _2?: Maybe<Scalars["String"]["output"]>;
};

export type FeatEntriesRowsList = {
  __typename?: "FeatEntriesRowsList";
  items?: Maybe<Array<Maybe<FeatEntriesRows>>>;
};

export type FeatExpertise = {
  __typename?: "FeatExpertise";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type FeatLanguageProficiencies = {
  __typename?: "FeatLanguageProficiencies";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type FeatOptionalFeatureProgression = {
  __typename?: "FeatOptionalFeatureProgression";
  featureType?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  progression?: Maybe<FeatOptionalFeatureProgressionProgression>;
};

export type FeatOptionalFeatureProgressionProgression = {
  __typename?: "FeatOptionalFeatureProgressionProgression";
  _?: Maybe<Scalars["Int"]["output"]>;
};

export type FeatPrerequisite = {
  __typename?: "FeatPrerequisite";
  ability?: Maybe<Array<Maybe<FeatPrerequisiteAbility>>>;
  feat?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  level?: Maybe<Scalars["Int"]["output"]>;
  other?: Maybe<Scalars["String"]["output"]>;
  proficiency?: Maybe<Array<Maybe<FeatPrerequisiteProficiency>>>;
  race?: Maybe<Array<Maybe<FeatPrerequisiteRace>>>;
  spellcasting?: Maybe<Scalars["Boolean"]["output"]>;
  spellcasting2020?: Maybe<Scalars["Boolean"]["output"]>;
};

export type FeatPrerequisiteAbility = {
  __typename?: "FeatPrerequisiteAbility";
  cha?: Maybe<Scalars["Int"]["output"]>;
  dex?: Maybe<Scalars["Int"]["output"]>;
  int?: Maybe<Scalars["Int"]["output"]>;
  str?: Maybe<Scalars["Int"]["output"]>;
  wis?: Maybe<Scalars["Int"]["output"]>;
};

export type FeatPrerequisiteProficiency = {
  __typename?: "FeatPrerequisiteProficiency";
  armor?: Maybe<Scalars["String"]["output"]>;
  weapon?: Maybe<Scalars["String"]["output"]>;
};

export type FeatPrerequisiteRace = {
  __typename?: "FeatPrerequisiteRace";
  displayEntry?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  subrace?: Maybe<Scalars["String"]["output"]>;
};

export type FeatSavingThrowProficiencies = {
  __typename?: "FeatSavingThrowProficiencies";
  choose?: Maybe<FeatSavingThrowProficienciesChoose>;
};

export type FeatSavingThrowProficienciesChoose = {
  __typename?: "FeatSavingThrowProficienciesChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type FeatSkillProficiencies = {
  __typename?: "FeatSkillProficiencies";
  choose?: Maybe<FeatSkillProficienciesChoose>;
};

export type FeatSkillProficienciesChoose = {
  __typename?: "FeatSkillProficienciesChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type FeatSkillToolLanguageProficiencies = {
  __typename?: "FeatSkillToolLanguageProficiencies";
  choose?: Maybe<FeatSkillToolLanguageProficienciesChoose>;
};

export type FeatSkillToolLanguageProficienciesChoose = {
  __typename?: "FeatSkillToolLanguageProficienciesChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type FeatToolProficiencies = {
  __typename?: "FeatToolProficiencies";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type FeatWeaponProficiencies = {
  __typename?: "FeatWeaponProficiencies";
  choose?: Maybe<FeatWeaponProficienciesChoose>;
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type FeatWeaponProficienciesChoose = {
  __typename?: "FeatWeaponProficienciesChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  fromFilter?: Maybe<Scalars["String"]["output"]>;
};

export type Item = {
  __typename?: "Item";
  ammoType?: Maybe<Scalars["String"]["output"]>;
  armorClass?: Maybe<Scalars["Int"]["output"]>;
  attachedSpells?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  attuned?: Maybe<Scalars["Boolean"]["output"]>;
  attunedBy?: Maybe<Array<Maybe<ItemAttunedBy>>>;
  baseItem?: Maybe<Scalars["String"]["output"]>;
  bonusAC?: Maybe<Scalars["String"]["output"]>;
  bonusAbilityCheck?: Maybe<Scalars["String"]["output"]>;
  bonusProficiencyBonus?: Maybe<Scalars["String"]["output"]>;
  bonusSavingThrow?: Maybe<ItemBonusSavingThrow>;
  bonusSpellAttack?: Maybe<Scalars["String"]["output"]>;
  bonusSpellSaveDC?: Maybe<Scalars["String"]["output"]>;
  bonusWeapon?: Maybe<Scalars["String"]["output"]>;
  bonusWeaponDamage?: Maybe<Scalars["String"]["output"]>;
  carryingCapacity?: Maybe<Scalars["Int"]["output"]>;
  crew?: Maybe<Scalars["Int"]["output"]>;
  damage?: Maybe<ItemDamage>;
  deckSeeAlso?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  entries?: Maybe<Array<Maybe<ItemEntries>>>;
  grantsProficiency?: Maybe<Scalars["Boolean"]["output"]>;
  isCursed?: Maybe<Scalars["Boolean"]["output"]>;
  isFirearm?: Maybe<Scalars["Boolean"]["output"]>;
  isPoison?: Maybe<Scalars["Boolean"]["output"]>;
  isWeapon?: Maybe<Scalars["Boolean"]["output"]>;
  maxCrew?: Maybe<Scalars["Int"]["output"]>;
  minCrew?: Maybe<Scalars["Int"]["output"]>;
  modifyAbility?: Maybe<ItemModifyAbility>;
  modifySpeed?: Maybe<ItemModifySpeed>;
  mountSpeed?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  packContents?: Maybe<Array<Maybe<ItemPackContents>>>;
  poisonTypes?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  properties?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  range?: Maybe<Scalars["String"]["output"]>;
  rarity?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
  stealth?: Maybe<Scalars["Boolean"]["output"]>;
  strength?: Maybe<Scalars["String"]["output"]>;
  types?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  vehicleArmorClass?: Maybe<Scalars["Int"]["output"]>;
  vehicleHealth?: Maybe<Scalars["Int"]["output"]>;
  vehicleMaxCargo?: Maybe<Scalars["Float"]["output"]>;
  vehicleMaxPassengers?: Maybe<Scalars["Int"]["output"]>;
  vehicleSeeAlso?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  vehicleSpeed?: Maybe<Scalars["Float"]["output"]>;
  vehicleThreshold?: Maybe<Scalars["Int"]["output"]>;
  weaponCategory?: Maybe<Scalars["String"]["output"]>;
};

export type ItemAttunedBy = {
  __typename?: "ItemAttunedBy";
  alignment?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  background?: Maybe<Scalars["String"]["output"]>;
  class?: Maybe<Scalars["String"]["output"]>;
  creatureType?: Maybe<Scalars["String"]["output"]>;
  psionics?: Maybe<Scalars["Boolean"]["output"]>;
  race?: Maybe<Scalars["String"]["output"]>;
  spellcasting?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ItemBonusSavingThrow = {
  __typename?: "ItemBonusSavingThrow";
  _?: Maybe<Scalars["String"]["output"]>;
  cha?: Maybe<Scalars["String"]["output"]>;
  con?: Maybe<Scalars["String"]["output"]>;
  dex?: Maybe<Scalars["String"]["output"]>;
  int?: Maybe<Scalars["String"]["output"]>;
  str?: Maybe<Scalars["String"]["output"]>;
  wis?: Maybe<Scalars["String"]["output"]>;
};

export type ItemDamage = {
  __typename?: "ItemDamage";
  _1?: Maybe<Scalars["String"]["output"]>;
  _2?: Maybe<Scalars["String"]["output"]>;
};

export type ItemEntries = {
  __typename?: "ItemEntries";
  caption?: Maybe<Scalars["String"]["output"]>;
  children?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  colLabels?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  colStyles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  items?: Maybe<Array<Maybe<ItemEntriesItems>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  page?: Maybe<Scalars["Int"]["output"]>;
  parentId?: Maybe<Scalars["Int"]["output"]>;
  rows?: Maybe<Array<Maybe<ItemEntriesRowsList>>>;
  source?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type ItemEntriesItems = {
  __typename?: "ItemEntriesItems";
  entry?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type ItemEntriesRows = {
  __typename?: "ItemEntriesRows";
  _0?: Maybe<Scalars["String"]["output"]>;
  _1?: Maybe<Scalars["String"]["output"]>;
};

export type ItemEntriesRowsList = {
  __typename?: "ItemEntriesRowsList";
  items?: Maybe<Array<Maybe<ItemEntriesRows>>>;
};

export type ItemModifyAbility = {
  __typename?: "ItemModifyAbility";
  amount?: Maybe<Scalars["Int"]["output"]>;
  cha?: Maybe<Scalars["Int"]["output"]>;
  choose?: Maybe<Array<Maybe<ItemModifyAbilityChoose>>>;
  con?: Maybe<Scalars["Int"]["output"]>;
  count?: Maybe<Scalars["Int"]["output"]>;
  dex?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  int?: Maybe<Scalars["Int"]["output"]>;
  static?: Maybe<ItemModifyAbilityStatic>;
  str?: Maybe<Scalars["Int"]["output"]>;
  wis?: Maybe<Scalars["Int"]["output"]>;
};

export type ItemModifyAbilityChoose = {
  __typename?: "ItemModifyAbilityChoose";
  amount?: Maybe<Scalars["Int"]["output"]>;
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type ItemModifyAbilityStatic = {
  __typename?: "ItemModifyAbilityStatic";
  con?: Maybe<Scalars["Int"]["output"]>;
  int?: Maybe<Scalars["Int"]["output"]>;
  str?: Maybe<Scalars["Int"]["output"]>;
};

export type ItemModifySpeed = {
  __typename?: "ItemModifySpeed";
  equal?: Maybe<ItemModifySpeedEqual>;
  multiply?: Maybe<ItemModifySpeedMultiply>;
  static?: Maybe<ItemModifySpeedStatic>;
};

export type ItemModifySpeedEqual = {
  __typename?: "ItemModifySpeedEqual";
  climb?: Maybe<Scalars["String"]["output"]>;
  fly?: Maybe<Scalars["String"]["output"]>;
};

export type ItemModifySpeedMultiply = {
  __typename?: "ItemModifySpeedMultiply";
  walk?: Maybe<Scalars["Int"]["output"]>;
};

export type ItemModifySpeedStatic = {
  __typename?: "ItemModifySpeedStatic";
  fly?: Maybe<Scalars["Int"]["output"]>;
  swim?: Maybe<Scalars["Int"]["output"]>;
  walk?: Maybe<Scalars["Int"]["output"]>;
};

export type ItemPackContents = {
  __typename?: "ItemPackContents";
  item?: Maybe<Scalars["String"]["output"]>;
  quantity?: Maybe<Scalars["Int"]["output"]>;
  special?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ItemProperty = {
  __typename?: "ItemProperty";
  abbreviation?: Maybe<Scalars["String"]["output"]>;
  entries?: Maybe<Array<Maybe<ItemPropertyEntries>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
};

export type ItemPropertyEntries = {
  __typename?: "ItemPropertyEntries";
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type ItemType = {
  __typename?: "ItemType";
  abbreviation?: Maybe<Scalars["String"]["output"]>;
  entries?: Maybe<Array<Maybe<ItemTypeEntries>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
};

export type ItemTypeEntries = {
  __typename?: "ItemTypeEntries";
  caption?: Maybe<Scalars["String"]["output"]>;
  children?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  colLabels?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  colStyles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  page?: Maybe<Scalars["Int"]["output"]>;
  parentId?: Maybe<Scalars["Int"]["output"]>;
  rows?: Maybe<Array<Maybe<ItemTypeEntriesRowsList>>>;
  source?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type ItemTypeEntriesRows = {
  __typename?: "ItemTypeEntriesRows";
  _0?: Maybe<Scalars["String"]["output"]>;
  _1?: Maybe<Scalars["String"]["output"]>;
};

export type ItemTypeEntriesRowsList = {
  __typename?: "ItemTypeEntriesRowsList";
  items?: Maybe<Array<Maybe<ItemTypeEntriesRows>>>;
};

export type Language = {
  __typename?: "Language";
  name?: Maybe<Scalars["String"]["output"]>;
  script?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type OptionalFeature = {
  __typename?: "OptionalFeature";
  additionalSpells?: Maybe<Array<Maybe<OptionalFeatureAdditionalSpells>>>;
  consumes?: Maybe<OptionalFeatureConsumes>;
  entries?: Maybe<Array<Maybe<OptionalFeatureEntries>>>;
  featureType?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  isClassFeatureVariant?: Maybe<Scalars["Boolean"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  optionalFeatureProgression?: Maybe<
    Array<Maybe<OptionalFeatureOptionalFeatureProgression>>
  >;
  prerequisite?: Maybe<OptionalFeaturePrerequisite>;
  skillProficiencies?: Maybe<OptionalFeatureSkillProficiencies>;
  source?: Maybe<Scalars["String"]["output"]>;
};

export type OptionalFeatureAdditionalSpells = {
  __typename?: "OptionalFeatureAdditionalSpells";
  resource?: Maybe<Scalars["String"]["output"]>;
  spellcastingAbility?: Maybe<OptionalFeatureAdditionalSpellsSpellcastingAbility>;
  spells?: Maybe<Array<Maybe<OptionalFeatureAdditionalSpellsSpells>>>;
};

export type OptionalFeatureAdditionalSpellsSpellcastingAbility = {
  __typename?: "OptionalFeatureAdditionalSpellsSpellcastingAbility";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type OptionalFeatureAdditionalSpellsSpells = {
  __typename?: "OptionalFeatureAdditionalSpellsSpells";
  _meta?: Maybe<OptionalFeatureAdditionalSpellsSpells_Meta>;
  choose?: Maybe<OptionalFeatureAdditionalSpellsSpellsChoose>;
  item?: Maybe<Scalars["String"]["output"]>;
};

export type OptionalFeatureAdditionalSpellsSpellsChoose = {
  __typename?: "OptionalFeatureAdditionalSpellsSpellsChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  fromFilter?: Maybe<Scalars["String"]["output"]>;
};

export type OptionalFeatureAdditionalSpellsSpells_Meta = {
  __typename?: "OptionalFeatureAdditionalSpellsSpells_meta";
  longRest?: Maybe<Scalars["Int"]["output"]>;
  resource?: Maybe<Scalars["Int"]["output"]>;
  ritual?: Maybe<Scalars["Boolean"]["output"]>;
};

export type OptionalFeatureConsumes = {
  __typename?: "OptionalFeatureConsumes";
  amount?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type OptionalFeatureEntries = {
  __typename?: "OptionalFeatureEntries";
  caption?: Maybe<Scalars["String"]["output"]>;
  colLabels?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  colStyles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  items?: Maybe<Array<Maybe<OptionalFeatureEntriesItems>>>;
  rows?: Maybe<Array<Maybe<OptionalFeatureEntriesRowsList>>>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type OptionalFeatureEntriesItems = {
  __typename?: "OptionalFeatureEntriesItems";
  entry?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type OptionalFeatureEntriesRows = {
  __typename?: "OptionalFeatureEntriesRows";
  _0?: Maybe<Scalars["String"]["output"]>;
  _1?: Maybe<Scalars["String"]["output"]>;
};

export type OptionalFeatureEntriesRowsList = {
  __typename?: "OptionalFeatureEntriesRowsList";
  items?: Maybe<Array<Maybe<OptionalFeatureEntriesRows>>>;
};

export type OptionalFeatureOptionalFeatureProgression = {
  __typename?: "OptionalFeatureOptionalFeatureProgression";
  featureType?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  progression?: Maybe<OptionalFeatureOptionalFeatureProgressionProgression>;
};

export type OptionalFeatureOptionalFeatureProgressionProgression = {
  __typename?: "OptionalFeatureOptionalFeatureProgressionProgression";
  _?: Maybe<Scalars["Int"]["output"]>;
};

export type OptionalFeaturePrerequisite = {
  __typename?: "OptionalFeaturePrerequisite";
  class?: Maybe<Scalars["String"]["output"]>;
  item?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  level?: Maybe<Scalars["Int"]["output"]>;
  pact?: Maybe<Scalars["String"]["output"]>;
  spell?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  subclass?: Maybe<Scalars["String"]["output"]>;
};

export type OptionalFeatureSkillProficiencies = {
  __typename?: "OptionalFeatureSkillProficiencies";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type Query = {
  __typename?: "Query";
  backgrounds?: Maybe<Array<Maybe<Background>>>;
  baseItems?: Maybe<Array<Maybe<BaseItem>>>;
  books?: Maybe<Array<Maybe<Book>>>;
  cards?: Maybe<Array<Maybe<Card>>>;
  classFeatures?: Maybe<Array<Maybe<ClassFeature>>>;
  classes?: Maybe<Array<Maybe<Class>>>;
  decks?: Maybe<Array<Maybe<Deck>>>;
  feats?: Maybe<Array<Maybe<Feat>>>;
  itemProperties?: Maybe<Array<Maybe<ItemProperty>>>;
  itemTypes?: Maybe<Array<Maybe<ItemType>>>;
  items?: Maybe<Array<Maybe<Item>>>;
  languages?: Maybe<Array<Maybe<Language>>>;
  optionalFeatures?: Maybe<Array<Maybe<OptionalFeature>>>;
  races?: Maybe<Array<Maybe<Race>>>;
  spells?: Maybe<Array<Maybe<Spell>>>;
  subclassFeatures?: Maybe<Array<Maybe<SubclassFeature>>>;
  subclasses?: Maybe<Array<Maybe<Subclass>>>;
  subraces?: Maybe<Array<Maybe<Subrace>>>;
  vehicles?: Maybe<Array<Maybe<Vehicle>>>;
};

export type Race = {
  __typename?: "Race";
  ability?: Maybe<RaceAbility>;
  additionalSpells?: Maybe<RaceAdditionalSpells>;
  armorProficiencies?: Maybe<RaceArmorProficiencies>;
  entries?: Maybe<Array<Maybe<RaceEntries>>>;
  feats?: Maybe<RaceFeats>;
  languageProficiencies?: Maybe<RaceLanguageProficiencies>;
  name?: Maybe<Scalars["String"]["output"]>;
  size?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  skillProficiencies?: Maybe<RaceSkillProficiencies>;
  source?: Maybe<Scalars["String"]["output"]>;
  speed?: Maybe<RaceSpeed>;
  toolProficiencies?: Maybe<RaceToolProficiencies>;
  weaponProficiencies?: Maybe<RaceWeaponProficiencies>;
};

export type RaceAbility = {
  __typename?: "RaceAbility";
  choose?: Maybe<RaceAbilityChoose>;
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type RaceAbilityChoose = {
  __typename?: "RaceAbilityChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type RaceAdditionalSpells = {
  __typename?: "RaceAdditionalSpells";
  spellcastingAbility?: Maybe<RaceAdditionalSpellsSpellcastingAbility>;
  spells?: Maybe<Array<Maybe<RaceAdditionalSpellsSpells>>>;
};

export type RaceAdditionalSpellsSpellcastingAbility = {
  __typename?: "RaceAdditionalSpellsSpellcastingAbility";
  choose?: Maybe<RaceAdditionalSpellsSpellcastingAbilityChoose>;
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type RaceAdditionalSpellsSpellcastingAbilityChoose = {
  __typename?: "RaceAdditionalSpellsSpellcastingAbilityChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type RaceAdditionalSpellsSpells = {
  __typename?: "RaceAdditionalSpellsSpells";
  _meta?: Maybe<RaceAdditionalSpellsSpells_Meta>;
  choose?: Maybe<RaceAdditionalSpellsSpellsChoose>;
  item?: Maybe<Scalars["String"]["output"]>;
};

export type RaceAdditionalSpellsSpellsChoose = {
  __typename?: "RaceAdditionalSpellsSpellsChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  fromFilter?: Maybe<Scalars["String"]["output"]>;
};

export type RaceAdditionalSpellsSpells_Meta = {
  __typename?: "RaceAdditionalSpellsSpells_meta";
  level?: Maybe<Scalars["Int"]["output"]>;
  longRest?: Maybe<Scalars["Int"]["output"]>;
};

export type RaceArmorProficiencies = {
  __typename?: "RaceArmorProficiencies";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type RaceEntries = {
  __typename?: "RaceEntries";
  caption?: Maybe<Scalars["String"]["output"]>;
  children?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  colLabels?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  colStyles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  items?: Maybe<Array<Maybe<RaceEntriesItems>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  parentId?: Maybe<Scalars["Int"]["output"]>;
  rows?: Maybe<Array<Maybe<RaceEntriesRowsList>>>;
  style?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type RaceEntriesItems = {
  __typename?: "RaceEntriesItems";
  entry?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type RaceEntriesRows = {
  __typename?: "RaceEntriesRows";
  _0?: Maybe<Scalars["String"]["output"]>;
  _1?: Maybe<Scalars["String"]["output"]>;
  _2?: Maybe<Scalars["String"]["output"]>;
};

export type RaceEntriesRowsList = {
  __typename?: "RaceEntriesRowsList";
  items?: Maybe<Array<Maybe<RaceEntriesRows>>>;
};

export type RaceFeats = {
  __typename?: "RaceFeats";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type RaceLanguageProficiencies = {
  __typename?: "RaceLanguageProficiencies";
  choose?: Maybe<RaceLanguageProficienciesChoose>;
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type RaceLanguageProficienciesChoose = {
  __typename?: "RaceLanguageProficienciesChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type RaceSkillProficiencies = {
  __typename?: "RaceSkillProficiencies";
  choose?: Maybe<RaceSkillProficienciesChoose>;
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type RaceSkillProficienciesChoose = {
  __typename?: "RaceSkillProficienciesChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type RaceSpeed = {
  __typename?: "RaceSpeed";
  climb?: Maybe<Scalars["Int"]["output"]>;
  fly?: Maybe<Scalars["Int"]["output"]>;
  swim?: Maybe<Scalars["Int"]["output"]>;
  walk?: Maybe<Scalars["Int"]["output"]>;
};

export type RaceToolProficiencies = {
  __typename?: "RaceToolProficiencies";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type RaceWeaponProficiencies = {
  __typename?: "RaceWeaponProficiencies";
  choose?: Maybe<RaceWeaponProficienciesChoose>;
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type RaceWeaponProficienciesChoose = {
  __typename?: "RaceWeaponProficienciesChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  fromFilter?: Maybe<Scalars["String"]["output"]>;
};

export type Spell = {
  __typename?: "Spell";
  classes?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  components?: Maybe<SpellComponents>;
  duration?: Maybe<SpellDuration>;
  entries?: Maybe<Array<Maybe<SpellEntries>>>;
  higherLevel?: Maybe<Array<Maybe<SpellHigherLevel>>>;
  level?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  range?: Maybe<SpellRange>;
  ritual?: Maybe<Scalars["Boolean"]["output"]>;
  school?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
  time?: Maybe<Array<Maybe<SpellTime>>>;
};

export type SpellComponents = {
  __typename?: "SpellComponents";
  m?: Maybe<Scalars["String"]["output"]>;
  s?: Maybe<Scalars["Boolean"]["output"]>;
  v?: Maybe<Scalars["Boolean"]["output"]>;
};

export type SpellDuration = {
  __typename?: "SpellDuration";
  concentration?: Maybe<Scalars["Boolean"]["output"]>;
  duration?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type SpellEntries = {
  __typename?: "SpellEntries";
  by?: Maybe<Scalars["String"]["output"]>;
  caption?: Maybe<Scalars["String"]["output"]>;
  children?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  colLabels?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  colStyles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  items?: Maybe<Array<Maybe<SpellEntriesItems>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  page?: Maybe<Scalars["Int"]["output"]>;
  parentId?: Maybe<Scalars["Int"]["output"]>;
  rows?: Maybe<Array<Maybe<SpellEntriesRowsList>>>;
  source?: Maybe<Scalars["String"]["output"]>;
  style?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type SpellEntriesItems = {
  __typename?: "SpellEntriesItems";
  entry?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type SpellEntriesRows = {
  __typename?: "SpellEntriesRows";
  _0?: Maybe<Scalars["String"]["output"]>;
  _1?: Maybe<Scalars["String"]["output"]>;
  _2?: Maybe<Scalars["String"]["output"]>;
  _3?: Maybe<Scalars["String"]["output"]>;
  _4?: Maybe<Scalars["String"]["output"]>;
  _5?: Maybe<Scalars["String"]["output"]>;
};

export type SpellEntriesRowsList = {
  __typename?: "SpellEntriesRowsList";
  items?: Maybe<Array<Maybe<SpellEntriesRows>>>;
};

export type SpellHigherLevel = {
  __typename?: "SpellHigherLevel";
  children?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  parentId?: Maybe<Scalars["Int"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type SpellRange = {
  __typename?: "SpellRange";
  distance?: Maybe<SpellRangeDistance>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type SpellRangeDistance = {
  __typename?: "SpellRangeDistance";
  distance?: Maybe<Scalars["Int"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type SpellTime = {
  __typename?: "SpellTime";
  condition?: Maybe<Scalars["String"]["output"]>;
  number?: Maybe<Scalars["Int"]["output"]>;
  unit?: Maybe<Scalars["String"]["output"]>;
};

export type Subclass = {
  __typename?: "Subclass";
  additionalSpells?: Maybe<Array<Maybe<SubclassAdditionalSpells>>>;
  cantripProgression?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  className?: Maybe<Scalars["String"]["output"]>;
  classSource?: Maybe<Scalars["String"]["output"]>;
  multiclassSlotsProgression?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  optionalFeatureProgression?: Maybe<
    Array<Maybe<SubclassOptionalFeatureProgression>>
  >;
  shortName?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
  spellcastingAbility?: Maybe<Scalars["String"]["output"]>;
  spellsKnownProgression?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  subclassFeatures?: Maybe<Array<Maybe<SubclassSubclassFeatures>>>;
  subclassTableGroups?: Maybe<Array<Maybe<SubclassSubclassTableGroups>>>;
};

export type SubclassAdditionalSpells = {
  __typename?: "SubclassAdditionalSpells";
  expanded?: Maybe<SubclassAdditionalSpellsExpanded>;
  name?: Maybe<Scalars["String"]["output"]>;
  spellcastingAbility?: Maybe<Scalars["String"]["output"]>;
  spells?: Maybe<Array<Maybe<SubclassAdditionalSpellsSpells>>>;
};

export type SubclassAdditionalSpellsExpanded = {
  __typename?: "SubclassAdditionalSpellsExpanded";
  _1?: Maybe<Array<Maybe<SubclassAdditionalSpellsExpanded1>>>;
  _3?: Maybe<Array<Maybe<SubclassAdditionalSpellsExpanded3>>>;
  _7?: Maybe<Array<Maybe<SubclassAdditionalSpellsExpanded7>>>;
  _9?: Maybe<Array<Maybe<SubclassAdditionalSpellsExpanded9>>>;
  _13?: Maybe<Array<Maybe<SubclassAdditionalSpellsExpanded13>>>;
  _19?: Maybe<Array<Maybe<SubclassAdditionalSpellsExpanded19>>>;
  s0?: Maybe<Array<Maybe<SubclassAdditionalSpellsExpandedS0>>>;
  s1?: Maybe<Array<Maybe<SubclassAdditionalSpellsExpandedS1>>>;
  s2?: Maybe<Array<Maybe<SubclassAdditionalSpellsExpandedS2>>>;
  s3?: Maybe<Array<Maybe<SubclassAdditionalSpellsExpandedS3>>>;
  s4?: Maybe<Array<Maybe<SubclassAdditionalSpellsExpandedS4>>>;
  s5?: Maybe<Array<Maybe<SubclassAdditionalSpellsExpandedS5>>>;
  s6?: Maybe<Array<Maybe<SubclassAdditionalSpellsExpandedS6>>>;
  s7?: Maybe<Array<Maybe<SubclassAdditionalSpellsExpandedS7>>>;
  s8?: Maybe<Array<Maybe<SubclassAdditionalSpellsExpandedS8>>>;
  s9?: Maybe<Array<Maybe<SubclassAdditionalSpellsExpandedS9>>>;
};

export type SubclassAdditionalSpellsExpanded1 = {
  __typename?: "SubclassAdditionalSpellsExpanded1";
  all?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsExpanded3 = {
  __typename?: "SubclassAdditionalSpellsExpanded3";
  all?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsExpanded7 = {
  __typename?: "SubclassAdditionalSpellsExpanded7";
  all?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsExpanded9 = {
  __typename?: "SubclassAdditionalSpellsExpanded9";
  item?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsExpanded13 = {
  __typename?: "SubclassAdditionalSpellsExpanded13";
  all?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsExpanded19 = {
  __typename?: "SubclassAdditionalSpellsExpanded19";
  all?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsExpandedS0 = {
  __typename?: "SubclassAdditionalSpellsExpandedS0";
  all?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsExpandedS1 = {
  __typename?: "SubclassAdditionalSpellsExpandedS1";
  all?: Maybe<Scalars["String"]["output"]>;
  item?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsExpandedS2 = {
  __typename?: "SubclassAdditionalSpellsExpandedS2";
  all?: Maybe<Scalars["String"]["output"]>;
  item?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsExpandedS3 = {
  __typename?: "SubclassAdditionalSpellsExpandedS3";
  all?: Maybe<Scalars["String"]["output"]>;
  item?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsExpandedS4 = {
  __typename?: "SubclassAdditionalSpellsExpandedS4";
  all?: Maybe<Scalars["String"]["output"]>;
  item?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsExpandedS5 = {
  __typename?: "SubclassAdditionalSpellsExpandedS5";
  all?: Maybe<Scalars["String"]["output"]>;
  item?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsExpandedS6 = {
  __typename?: "SubclassAdditionalSpellsExpandedS6";
  all?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsExpandedS7 = {
  __typename?: "SubclassAdditionalSpellsExpandedS7";
  all?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsExpandedS8 = {
  __typename?: "SubclassAdditionalSpellsExpandedS8";
  all?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsExpandedS9 = {
  __typename?: "SubclassAdditionalSpellsExpandedS9";
  all?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsSpells = {
  __typename?: "SubclassAdditionalSpellsSpells";
  _meta?: Maybe<SubclassAdditionalSpellsSpells_Meta>;
  choose?: Maybe<SubclassAdditionalSpellsSpellsChoose>;
  item?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsSpellsChoose = {
  __typename?: "SubclassAdditionalSpellsSpellsChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  fromFilter?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassAdditionalSpellsSpells_Meta = {
  __typename?: "SubclassAdditionalSpellsSpells_meta";
  level?: Maybe<Scalars["Int"]["output"]>;
  longRest?: Maybe<Scalars["Int"]["output"]>;
  resource?: Maybe<Scalars["Int"]["output"]>;
  ritual?: Maybe<Scalars["Boolean"]["output"]>;
};

export type SubclassFeature = {
  __typename?: "SubclassFeature";
  className?: Maybe<Scalars["String"]["output"]>;
  classSource?: Maybe<Scalars["String"]["output"]>;
  consumes?: Maybe<SubclassFeatureConsumes>;
  entries?: Maybe<Array<Maybe<SubclassFeatureEntries>>>;
  isClassFeatureVariant?: Maybe<Scalars["Boolean"]["output"]>;
  level?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
  subclassShortName?: Maybe<Scalars["String"]["output"]>;
  subclassSource?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassFeatureConsumes = {
  __typename?: "SubclassFeatureConsumes";
  amount?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassFeatureEntries = {
  __typename?: "SubclassFeatureEntries";
  attributes?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  caption?: Maybe<Scalars["String"]["output"]>;
  children?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  colLabels?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  colStyles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  count?: Maybe<Scalars["Int"]["output"]>;
  data?: Maybe<SubclassFeatureEntriesData>;
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  items?: Maybe<Array<Maybe<SubclassFeatureEntriesItems>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  optionalfeature?: Maybe<Scalars["String"]["output"]>;
  parentId?: Maybe<Scalars["Int"]["output"]>;
  rows?: Maybe<Array<Maybe<SubclassFeatureEntriesRowsList>>>;
  style?: Maybe<Scalars["String"]["output"]>;
  subclassFeature?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassFeatureEntriesData = {
  __typename?: "SubclassFeatureEntriesData";
  isRequiredOption?: Maybe<Scalars["Boolean"]["output"]>;
  tableInclude?: Maybe<Scalars["Boolean"]["output"]>;
};

export type SubclassFeatureEntriesItems = {
  __typename?: "SubclassFeatureEntriesItems";
  entries?: Maybe<Array<Maybe<SubclassFeatureEntriesItemsEntries>>>;
  entry?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  subclassFeature?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassFeatureEntriesItemsEntries = {
  __typename?: "SubclassFeatureEntriesItemsEntries";
  entry?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassFeatureEntriesRows = {
  __typename?: "SubclassFeatureEntriesRows";
  _0?: Maybe<Scalars["String"]["output"]>;
  _1?: Maybe<Scalars["String"]["output"]>;
  _2?: Maybe<Scalars["String"]["output"]>;
  _3?: Maybe<Scalars["String"]["output"]>;
  _4?: Maybe<Scalars["String"]["output"]>;
  _5?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassFeatureEntriesRowsList = {
  __typename?: "SubclassFeatureEntriesRowsList";
  items?: Maybe<Array<Maybe<SubclassFeatureEntriesRows>>>;
};

export type SubclassOptionalFeatureProgression = {
  __typename?: "SubclassOptionalFeatureProgression";
  featureType?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  progression?: Maybe<SubclassOptionalFeatureProgressionProgression>;
  required?: Maybe<SubclassOptionalFeatureProgressionRequired>;
};

export type SubclassOptionalFeatureProgressionProgression = {
  __typename?: "SubclassOptionalFeatureProgressionProgression";
  _3?: Maybe<Scalars["Int"]["output"]>;
  _6?: Maybe<Scalars["Int"]["output"]>;
  _7?: Maybe<Scalars["Int"]["output"]>;
  _10?: Maybe<Scalars["Int"]["output"]>;
  _11?: Maybe<Scalars["Int"]["output"]>;
  _15?: Maybe<Scalars["Int"]["output"]>;
  _17?: Maybe<Scalars["Int"]["output"]>;
  _18?: Maybe<Scalars["Int"]["output"]>;
};

export type SubclassOptionalFeatureProgressionRequired = {
  __typename?: "SubclassOptionalFeatureProgressionRequired";
  _3?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type SubclassSubclassFeatures = {
  __typename?: "SubclassSubclassFeatures";
  className?: Maybe<Scalars["String"]["output"]>;
  featureName?: Maybe<Scalars["String"]["output"]>;
  level?: Maybe<Scalars["Int"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
  subclassName?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassSubclassTableGroups = {
  __typename?: "SubclassSubclassTableGroups";
  colLabels?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  rows?: Maybe<Array<Maybe<SubclassSubclassTableGroupsRowsList>>>;
  rowsSpellProgression?: Maybe<
    Array<Maybe<SubclassSubclassTableGroupsRowsSpellProgressionList>>
  >;
  subclasses?: Maybe<Array<Maybe<SubclassSubclassTableGroupsSubclasses>>>;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassSubclassTableGroupsRows = {
  __typename?: "SubclassSubclassTableGroupsRows";
  _0?: Maybe<Scalars["String"]["output"]>;
  _1?: Maybe<Scalars["String"]["output"]>;
};

export type SubclassSubclassTableGroupsRowsList = {
  __typename?: "SubclassSubclassTableGroupsRowsList";
  items?: Maybe<Array<Maybe<SubclassSubclassTableGroupsRows>>>;
};

export type SubclassSubclassTableGroupsRowsSpellProgression = {
  __typename?: "SubclassSubclassTableGroupsRowsSpellProgression";
  _0?: Maybe<Scalars["Int"]["output"]>;
  _1?: Maybe<Scalars["Int"]["output"]>;
  _2?: Maybe<Scalars["Int"]["output"]>;
  _3?: Maybe<Scalars["Int"]["output"]>;
};

export type SubclassSubclassTableGroupsRowsSpellProgressionList = {
  __typename?: "SubclassSubclassTableGroupsRowsSpellProgressionList";
  items?: Maybe<Array<Maybe<SubclassSubclassTableGroupsRowsSpellProgression>>>;
};

export type SubclassSubclassTableGroupsSubclasses = {
  __typename?: "SubclassSubclassTableGroupsSubclasses";
  name?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
};

export type Subrace = {
  __typename?: "Subrace";
  ability?: Maybe<SubraceAbility>;
  additionalSpells?: Maybe<SubraceAdditionalSpells>;
  armorProficiencies?: Maybe<SubraceArmorProficiencies>;
  entries?: Maybe<Array<Maybe<SubraceEntries>>>;
  feats?: Maybe<SubraceFeats>;
  languageProficiencies?: Maybe<SubraceLanguageProficiencies>;
  name?: Maybe<Scalars["String"]["output"]>;
  overwrite?: Maybe<SubraceOverwrite>;
  raceName?: Maybe<Scalars["String"]["output"]>;
  raceSource?: Maybe<Scalars["String"]["output"]>;
  skillProficiencies?: Maybe<SubraceSkillProficiencies>;
  skillToolLanguageProficiencies?: Maybe<SubraceSkillToolLanguageProficiencies>;
  source?: Maybe<Scalars["String"]["output"]>;
  speed?: Maybe<SubraceSpeed>;
  toolProficiencies?: Maybe<SubraceToolProficiencies>;
  weaponProficiencies?: Maybe<SubraceWeaponProficiencies>;
};

export type SubraceAbility = {
  __typename?: "SubraceAbility";
  choose?: Maybe<SubraceAbilityChoose>;
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type SubraceAbilityChoose = {
  __typename?: "SubraceAbilityChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type SubraceAdditionalSpells = {
  __typename?: "SubraceAdditionalSpells";
  spellcastingAbility?: Maybe<SubraceAdditionalSpellsSpellcastingAbility>;
  spells?: Maybe<Array<Maybe<SubraceAdditionalSpellsSpells>>>;
};

export type SubraceAdditionalSpellsSpellcastingAbility = {
  __typename?: "SubraceAdditionalSpellsSpellcastingAbility";
  choose?: Maybe<SubraceAdditionalSpellsSpellcastingAbilityChoose>;
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type SubraceAdditionalSpellsSpellcastingAbilityChoose = {
  __typename?: "SubraceAdditionalSpellsSpellcastingAbilityChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type SubraceAdditionalSpellsSpells = {
  __typename?: "SubraceAdditionalSpellsSpells";
  _meta?: Maybe<SubraceAdditionalSpellsSpells_Meta>;
  choose?: Maybe<SubraceAdditionalSpellsSpellsChoose>;
  item?: Maybe<Scalars["String"]["output"]>;
};

export type SubraceAdditionalSpellsSpellsChoose = {
  __typename?: "SubraceAdditionalSpellsSpellsChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  fromFilter?: Maybe<Scalars["String"]["output"]>;
};

export type SubraceAdditionalSpellsSpells_Meta = {
  __typename?: "SubraceAdditionalSpellsSpells_meta";
  level?: Maybe<Scalars["Int"]["output"]>;
  longRest?: Maybe<Scalars["Int"]["output"]>;
  shortRest?: Maybe<Scalars["Int"]["output"]>;
};

export type SubraceArmorProficiencies = {
  __typename?: "SubraceArmorProficiencies";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type SubraceEntries = {
  __typename?: "SubraceEntries";
  caption?: Maybe<Scalars["String"]["output"]>;
  children?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  colLabels?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  colStyles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  data?: Maybe<SubraceEntriesData>;
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  items?: Maybe<Array<Maybe<SubraceEntriesItems>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  parentId?: Maybe<Scalars["Int"]["output"]>;
  rows?: Maybe<Array<Maybe<SubraceEntriesRowsList>>>;
  style?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type SubraceEntriesData = {
  __typename?: "SubraceEntriesData";
  overwrite?: Maybe<Scalars["String"]["output"]>;
};

export type SubraceEntriesItems = {
  __typename?: "SubraceEntriesItems";
  entry?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type SubraceEntriesRows = {
  __typename?: "SubraceEntriesRows";
  _0?: Maybe<Scalars["String"]["output"]>;
  _1?: Maybe<Scalars["String"]["output"]>;
};

export type SubraceEntriesRowsList = {
  __typename?: "SubraceEntriesRowsList";
  items?: Maybe<Array<Maybe<SubraceEntriesRows>>>;
};

export type SubraceFeats = {
  __typename?: "SubraceFeats";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type SubraceLanguageProficiencies = {
  __typename?: "SubraceLanguageProficiencies";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type SubraceOverwrite = {
  __typename?: "SubraceOverwrite";
  ability?: Maybe<Scalars["Boolean"]["output"]>;
  languageProficiencies?: Maybe<Scalars["Boolean"]["output"]>;
  skillProficiencies?: Maybe<Scalars["Boolean"]["output"]>;
};

export type SubraceSkillProficiencies = {
  __typename?: "SubraceSkillProficiencies";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type SubraceSkillToolLanguageProficiencies = {
  __typename?: "SubraceSkillToolLanguageProficiencies";
  choose?: Maybe<SubraceSkillToolLanguageProficienciesChoose>;
};

export type SubraceSkillToolLanguageProficienciesChoose = {
  __typename?: "SubraceSkillToolLanguageProficienciesChoose";
  count?: Maybe<Scalars["Int"]["output"]>;
  from?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type SubraceSpeed = {
  __typename?: "SubraceSpeed";
  fly?: Maybe<Scalars["Int"]["output"]>;
  swim?: Maybe<Scalars["Int"]["output"]>;
  walk?: Maybe<Scalars["Int"]["output"]>;
};

export type SubraceToolProficiencies = {
  __typename?: "SubraceToolProficiencies";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type SubraceWeaponProficiencies = {
  __typename?: "SubraceWeaponProficiencies";
  items?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type Vehicle = {
  __typename?: "Vehicle";
  ability?: Maybe<VehicleAbility>;
  actions?: Maybe<Array<Maybe<VehicleActions>>>;
  armorClass?: Maybe<Scalars["Int"]["output"]>;
  conditionImmunities?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  controls?: Maybe<Array<Maybe<VehicleControls>>>;
  damageImmunities?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  dimensions?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  entries?: Maybe<Array<Maybe<VehicleEntries>>>;
  health?: Maybe<Scalars["Int"]["output"]>;
  maxCargo?: Maybe<Scalars["Int"]["output"]>;
  maxCrew?: Maybe<Scalars["Int"]["output"]>;
  maxCrewNote?: Maybe<Scalars["String"]["output"]>;
  maxPassengers?: Maybe<Scalars["Int"]["output"]>;
  movements?: Maybe<Array<Maybe<VehicleMovements>>>;
  name?: Maybe<Scalars["String"]["output"]>;
  pace?: Maybe<VehiclePace>;
  size?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
  speed?: Maybe<VehicleSpeed>;
  weapons?: Maybe<Array<Maybe<VehicleWeapons>>>;
};

export type VehicleAbility = {
  __typename?: "VehicleAbility";
  cha?: Maybe<Scalars["Int"]["output"]>;
  con?: Maybe<Scalars["Int"]["output"]>;
  dex?: Maybe<Scalars["Int"]["output"]>;
  int?: Maybe<Scalars["Int"]["output"]>;
  str?: Maybe<Scalars["Int"]["output"]>;
  wis?: Maybe<Scalars["Int"]["output"]>;
};

export type VehicleActions = {
  __typename?: "VehicleActions";
  caption?: Maybe<Scalars["String"]["output"]>;
  colLabels?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  colStyles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  rows?: Maybe<Array<Maybe<VehicleActionsRowsList>>>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type VehicleActionsRows = {
  __typename?: "VehicleActionsRows";
  _0?: Maybe<Scalars["String"]["output"]>;
  _1?: Maybe<Scalars["String"]["output"]>;
  _2?: Maybe<Scalars["String"]["output"]>;
};

export type VehicleActionsRowsList = {
  __typename?: "VehicleActionsRowsList";
  items?: Maybe<Array<Maybe<VehicleActionsRows>>>;
};

export type VehicleControls = {
  __typename?: "VehicleControls";
  armorClass?: Maybe<Scalars["Int"]["output"]>;
  entries?: Maybe<Array<Maybe<VehicleControlsEntries>>>;
  health?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type VehicleControlsEntries = {
  __typename?: "VehicleControlsEntries";
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type VehicleEntries = {
  __typename?: "VehicleEntries";
  caption?: Maybe<Scalars["String"]["output"]>;
  colLabels?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  colStyles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  rows?: Maybe<Array<Maybe<VehicleEntriesRowsList>>>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type VehicleEntriesRows = {
  __typename?: "VehicleEntriesRows";
  _0?: Maybe<Scalars["String"]["output"]>;
  _1?: Maybe<Scalars["String"]["output"]>;
  _2?: Maybe<Scalars["String"]["output"]>;
};

export type VehicleEntriesRowsList = {
  __typename?: "VehicleEntriesRowsList";
  items?: Maybe<Array<Maybe<VehicleEntriesRows>>>;
};

export type VehicleMovements = {
  __typename?: "VehicleMovements";
  armorClass?: Maybe<Scalars["Int"]["output"]>;
  health?: Maybe<Scalars["Int"]["output"]>;
  healthNote?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  speed?: Maybe<Array<Maybe<VehicleMovementsSpeed>>>;
};

export type VehicleMovementsSpeed = {
  __typename?: "VehicleMovementsSpeed";
  entries?: Maybe<Array<Maybe<VehicleMovementsSpeedEntries>>>;
  mode?: Maybe<Scalars["String"]["output"]>;
};

export type VehicleMovementsSpeedEntries = {
  __typename?: "VehicleMovementsSpeedEntries";
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type VehiclePace = {
  __typename?: "VehiclePace";
  fly?: Maybe<Scalars["String"]["output"]>;
  swim?: Maybe<Scalars["String"]["output"]>;
  walk?: Maybe<Scalars["String"]["output"]>;
};

export type VehicleSpeed = {
  __typename?: "VehicleSpeed";
  fly?: Maybe<Scalars["Int"]["output"]>;
  note?: Maybe<Scalars["String"]["output"]>;
  swim?: Maybe<Scalars["Int"]["output"]>;
  walk?: Maybe<Scalars["Int"]["output"]>;
};

export type VehicleWeapons = {
  __typename?: "VehicleWeapons";
  actions?: Maybe<Array<Maybe<VehicleWeaponsActions>>>;
  armorClass?: Maybe<Scalars["Int"]["output"]>;
  count?: Maybe<Scalars["Int"]["output"]>;
  crew?: Maybe<Scalars["Int"]["output"]>;
  entries?: Maybe<Array<Maybe<VehicleWeaponsEntries>>>;
  health?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type VehicleWeaponsActions = {
  __typename?: "VehicleWeaponsActions";
  entries?: Maybe<Array<Maybe<VehicleWeaponsActionsEntries>>>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type VehicleWeaponsActionsEntries = {
  __typename?: "VehicleWeaponsActionsEntries";
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type VehicleWeaponsEntries = {
  __typename?: "VehicleWeaponsEntries";
  entry?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  items?: Maybe<Array<Maybe<VehicleWeaponsEntriesItems>>>;
  style?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type VehicleWeaponsEntriesItems = {
  __typename?: "VehicleWeaponsEntriesItems";
  entry?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Background: ResolverTypeWrapper<Background>;
  BackgroundAdditionalSpells: ResolverTypeWrapper<BackgroundAdditionalSpells>;
  BackgroundAdditionalSpellsExpanded: ResolverTypeWrapper<BackgroundAdditionalSpellsExpanded>;
  BackgroundEntries: ResolverTypeWrapper<BackgroundEntries>;
  BackgroundEntriesData: ResolverTypeWrapper<BackgroundEntriesData>;
  BackgroundEntriesItems: ResolverTypeWrapper<BackgroundEntriesItems>;
  BackgroundEntriesRows: ResolverTypeWrapper<BackgroundEntriesRows>;
  BackgroundEntriesRowsList: ResolverTypeWrapper<BackgroundEntriesRowsList>;
  BackgroundFeats: ResolverTypeWrapper<BackgroundFeats>;
  BackgroundLanguageProficiencies: ResolverTypeWrapper<BackgroundLanguageProficiencies>;
  BackgroundLanguageProficienciesChoose: ResolverTypeWrapper<BackgroundLanguageProficienciesChoose>;
  BackgroundSkillProficiencies: ResolverTypeWrapper<BackgroundSkillProficiencies>;
  BackgroundSkillProficienciesChoose: ResolverTypeWrapper<BackgroundSkillProficienciesChoose>;
  BackgroundStartingEquipment: ResolverTypeWrapper<BackgroundStartingEquipment>;
  BackgroundStartingEquipmentA: ResolverTypeWrapper<BackgroundStartingEquipmentA>;
  BackgroundStartingEquipmentB: ResolverTypeWrapper<BackgroundStartingEquipmentB>;
  BackgroundStartingEquipmentC: ResolverTypeWrapper<BackgroundStartingEquipmentC>;
  BackgroundStartingEquipmentD: ResolverTypeWrapper<BackgroundStartingEquipmentD>;
  BackgroundStartingEquipment_: ResolverTypeWrapper<BackgroundStartingEquipment_>;
  BackgroundToolProficiencies: ResolverTypeWrapper<BackgroundToolProficiencies>;
  BackgroundToolProficienciesChoose: ResolverTypeWrapper<BackgroundToolProficienciesChoose>;
  BaseItem: ResolverTypeWrapper<BaseItem>;
  BaseItemDamage: ResolverTypeWrapper<BaseItemDamage>;
  BaseItemEntries: ResolverTypeWrapper<BaseItemEntries>;
  BaseItemPackContents: ResolverTypeWrapper<BaseItemPackContents>;
  Book: ResolverTypeWrapper<Book>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Card: ResolverTypeWrapper<Card>;
  CardEntries: ResolverTypeWrapper<CardEntries>;
  Class: ResolverTypeWrapper<Class>;
  ClassAdditionalSpells: ResolverTypeWrapper<ClassAdditionalSpells>;
  ClassAdditionalSpellsSpells: ResolverTypeWrapper<ClassAdditionalSpellsSpells>;
  ClassAdditionalSpellsSpellsChoose: ResolverTypeWrapper<ClassAdditionalSpellsSpellsChoose>;
  ClassAdditionalSpellsSpells_meta: ResolverTypeWrapper<ClassAdditionalSpellsSpells_Meta>;
  ClassArmorProficiencies: ResolverTypeWrapper<ClassArmorProficiencies>;
  ClassClassFeatures: ResolverTypeWrapper<ClassClassFeatures>;
  ClassClassTableGroups: ResolverTypeWrapper<ClassClassTableGroups>;
  ClassClassTableGroupsRows: ResolverTypeWrapper<ClassClassTableGroupsRows>;
  ClassClassTableGroupsRowsList: ResolverTypeWrapper<ClassClassTableGroupsRowsList>;
  ClassClassTableGroupsRowsSpellProgression: ResolverTypeWrapper<ClassClassTableGroupsRowsSpellProgression>;
  ClassClassTableGroupsRowsSpellProgressionList: ResolverTypeWrapper<ClassClassTableGroupsRowsSpellProgressionList>;
  ClassFeature: ResolverTypeWrapper<ClassFeature>;
  ClassFeatureConsumes: ResolverTypeWrapper<ClassFeatureConsumes>;
  ClassFeatureEntries: ResolverTypeWrapper<ClassFeatureEntries>;
  ClassFeatureEntriesItems: ResolverTypeWrapper<ClassFeatureEntriesItems>;
  ClassFeatureEntriesRows: ResolverTypeWrapper<ClassFeatureEntriesRows>;
  ClassFeatureEntriesRowsList: ResolverTypeWrapper<ClassFeatureEntriesRowsList>;
  ClassHitDie: ResolverTypeWrapper<ClassHitDie>;
  ClassMulticlassing: ResolverTypeWrapper<ClassMulticlassing>;
  ClassMulticlassingProficienciesGained: ResolverTypeWrapper<ClassMulticlassingProficienciesGained>;
  ClassMulticlassingProficienciesGainedArmor: ResolverTypeWrapper<ClassMulticlassingProficienciesGainedArmor>;
  ClassMulticlassingProficienciesGainedSkills: ResolverTypeWrapper<ClassMulticlassingProficienciesGainedSkills>;
  ClassMulticlassingProficienciesGainedSkillsChoose: ResolverTypeWrapper<ClassMulticlassingProficienciesGainedSkillsChoose>;
  ClassMulticlassingProficienciesGainedTools: ResolverTypeWrapper<ClassMulticlassingProficienciesGainedTools>;
  ClassMulticlassingProficienciesGainedWeapons: ResolverTypeWrapper<ClassMulticlassingProficienciesGainedWeapons>;
  ClassMulticlassingRequirements: ResolverTypeWrapper<ClassMulticlassingRequirements>;
  ClassMulticlassingRequirementsOr: ResolverTypeWrapper<ClassMulticlassingRequirementsOr>;
  ClassOptionalFeatureProgression: ResolverTypeWrapper<ClassOptionalFeatureProgression>;
  ClassOptionalFeatureProgressionProgression: ResolverTypeWrapper<ClassOptionalFeatureProgressionProgression>;
  ClassSkillProficiencies: ResolverTypeWrapper<ClassSkillProficiencies>;
  ClassSkillProficienciesChoose: ResolverTypeWrapper<ClassSkillProficienciesChoose>;
  ClassStartingEquipment: ResolverTypeWrapper<ClassStartingEquipment>;
  ClassStartingEquipmentA: ResolverTypeWrapper<ClassStartingEquipmentA>;
  ClassStartingEquipmentB: ResolverTypeWrapper<ClassStartingEquipmentB>;
  ClassStartingEquipmentC: ResolverTypeWrapper<ClassStartingEquipmentC>;
  ClassStartingEquipment_: ResolverTypeWrapper<ClassStartingEquipment_>;
  ClassToolProficiencies: ResolverTypeWrapper<ClassToolProficiencies>;
  ClassToolProficienciesChoose: ResolverTypeWrapper<ClassToolProficienciesChoose>;
  ClassWeaponProficiencies: ResolverTypeWrapper<ClassWeaponProficiencies>;
  Deck: ResolverTypeWrapper<Deck>;
  DeckEntries: ResolverTypeWrapper<DeckEntries>;
  DeckEntriesRows: ResolverTypeWrapper<DeckEntriesRows>;
  DeckEntriesRowsList: ResolverTypeWrapper<DeckEntriesRowsList>;
  DeckEntriesRowsList0: ResolverTypeWrapper<DeckEntriesRowsList0>;
  DeckEntriesRowsList0Roll: ResolverTypeWrapper<DeckEntriesRowsList0Roll>;
  Feat: ResolverTypeWrapper<Feat>;
  FeatAbility: ResolverTypeWrapper<FeatAbility>;
  FeatAbilityChoose: ResolverTypeWrapper<FeatAbilityChoose>;
  FeatAdditionalSpells: ResolverTypeWrapper<FeatAdditionalSpells>;
  FeatAdditionalSpellsSpellcastingAbility: ResolverTypeWrapper<FeatAdditionalSpellsSpellcastingAbility>;
  FeatAdditionalSpellsSpellcastingAbilityChoose: ResolverTypeWrapper<FeatAdditionalSpellsSpellcastingAbilityChoose>;
  FeatAdditionalSpellsSpells: ResolverTypeWrapper<FeatAdditionalSpellsSpells>;
  FeatAdditionalSpellsSpellsChoose: ResolverTypeWrapper<FeatAdditionalSpellsSpellsChoose>;
  FeatAdditionalSpellsSpells_meta: ResolverTypeWrapper<FeatAdditionalSpellsSpells_Meta>;
  FeatArmorProficiencies: ResolverTypeWrapper<FeatArmorProficiencies>;
  FeatEntries: ResolverTypeWrapper<FeatEntries>;
  FeatEntriesItems: ResolverTypeWrapper<FeatEntriesItems>;
  FeatEntriesItemsEntries: ResolverTypeWrapper<FeatEntriesItemsEntries>;
  FeatEntriesRows: ResolverTypeWrapper<FeatEntriesRows>;
  FeatEntriesRowsList: ResolverTypeWrapper<FeatEntriesRowsList>;
  FeatExpertise: ResolverTypeWrapper<FeatExpertise>;
  FeatLanguageProficiencies: ResolverTypeWrapper<FeatLanguageProficiencies>;
  FeatOptionalFeatureProgression: ResolverTypeWrapper<FeatOptionalFeatureProgression>;
  FeatOptionalFeatureProgressionProgression: ResolverTypeWrapper<FeatOptionalFeatureProgressionProgression>;
  FeatPrerequisite: ResolverTypeWrapper<FeatPrerequisite>;
  FeatPrerequisiteAbility: ResolverTypeWrapper<FeatPrerequisiteAbility>;
  FeatPrerequisiteProficiency: ResolverTypeWrapper<FeatPrerequisiteProficiency>;
  FeatPrerequisiteRace: ResolverTypeWrapper<FeatPrerequisiteRace>;
  FeatSavingThrowProficiencies: ResolverTypeWrapper<FeatSavingThrowProficiencies>;
  FeatSavingThrowProficienciesChoose: ResolverTypeWrapper<FeatSavingThrowProficienciesChoose>;
  FeatSkillProficiencies: ResolverTypeWrapper<FeatSkillProficiencies>;
  FeatSkillProficienciesChoose: ResolverTypeWrapper<FeatSkillProficienciesChoose>;
  FeatSkillToolLanguageProficiencies: ResolverTypeWrapper<FeatSkillToolLanguageProficiencies>;
  FeatSkillToolLanguageProficienciesChoose: ResolverTypeWrapper<FeatSkillToolLanguageProficienciesChoose>;
  FeatToolProficiencies: ResolverTypeWrapper<FeatToolProficiencies>;
  FeatWeaponProficiencies: ResolverTypeWrapper<FeatWeaponProficiencies>;
  FeatWeaponProficienciesChoose: ResolverTypeWrapper<FeatWeaponProficienciesChoose>;
  Float: ResolverTypeWrapper<Scalars["Float"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  Item: ResolverTypeWrapper<Item>;
  ItemAttunedBy: ResolverTypeWrapper<ItemAttunedBy>;
  ItemBonusSavingThrow: ResolverTypeWrapper<ItemBonusSavingThrow>;
  ItemDamage: ResolverTypeWrapper<ItemDamage>;
  ItemEntries: ResolverTypeWrapper<ItemEntries>;
  ItemEntriesItems: ResolverTypeWrapper<ItemEntriesItems>;
  ItemEntriesRows: ResolverTypeWrapper<ItemEntriesRows>;
  ItemEntriesRowsList: ResolverTypeWrapper<ItemEntriesRowsList>;
  ItemModifyAbility: ResolverTypeWrapper<ItemModifyAbility>;
  ItemModifyAbilityChoose: ResolverTypeWrapper<ItemModifyAbilityChoose>;
  ItemModifyAbilityStatic: ResolverTypeWrapper<ItemModifyAbilityStatic>;
  ItemModifySpeed: ResolverTypeWrapper<ItemModifySpeed>;
  ItemModifySpeedEqual: ResolverTypeWrapper<ItemModifySpeedEqual>;
  ItemModifySpeedMultiply: ResolverTypeWrapper<ItemModifySpeedMultiply>;
  ItemModifySpeedStatic: ResolverTypeWrapper<ItemModifySpeedStatic>;
  ItemPackContents: ResolverTypeWrapper<ItemPackContents>;
  ItemProperty: ResolverTypeWrapper<ItemProperty>;
  ItemPropertyEntries: ResolverTypeWrapper<ItemPropertyEntries>;
  ItemType: ResolverTypeWrapper<ItemType>;
  ItemTypeEntries: ResolverTypeWrapper<ItemTypeEntries>;
  ItemTypeEntriesRows: ResolverTypeWrapper<ItemTypeEntriesRows>;
  ItemTypeEntriesRowsList: ResolverTypeWrapper<ItemTypeEntriesRowsList>;
  Language: ResolverTypeWrapper<Language>;
  OptionalFeature: ResolverTypeWrapper<OptionalFeature>;
  OptionalFeatureAdditionalSpells: ResolverTypeWrapper<OptionalFeatureAdditionalSpells>;
  OptionalFeatureAdditionalSpellsSpellcastingAbility: ResolverTypeWrapper<OptionalFeatureAdditionalSpellsSpellcastingAbility>;
  OptionalFeatureAdditionalSpellsSpells: ResolverTypeWrapper<OptionalFeatureAdditionalSpellsSpells>;
  OptionalFeatureAdditionalSpellsSpellsChoose: ResolverTypeWrapper<OptionalFeatureAdditionalSpellsSpellsChoose>;
  OptionalFeatureAdditionalSpellsSpells_meta: ResolverTypeWrapper<OptionalFeatureAdditionalSpellsSpells_Meta>;
  OptionalFeatureConsumes: ResolverTypeWrapper<OptionalFeatureConsumes>;
  OptionalFeatureEntries: ResolverTypeWrapper<OptionalFeatureEntries>;
  OptionalFeatureEntriesItems: ResolverTypeWrapper<OptionalFeatureEntriesItems>;
  OptionalFeatureEntriesRows: ResolverTypeWrapper<OptionalFeatureEntriesRows>;
  OptionalFeatureEntriesRowsList: ResolverTypeWrapper<OptionalFeatureEntriesRowsList>;
  OptionalFeatureOptionalFeatureProgression: ResolverTypeWrapper<OptionalFeatureOptionalFeatureProgression>;
  OptionalFeatureOptionalFeatureProgressionProgression: ResolverTypeWrapper<OptionalFeatureOptionalFeatureProgressionProgression>;
  OptionalFeaturePrerequisite: ResolverTypeWrapper<OptionalFeaturePrerequisite>;
  OptionalFeatureSkillProficiencies: ResolverTypeWrapper<OptionalFeatureSkillProficiencies>;
  Query: ResolverTypeWrapper<{}>;
  Race: ResolverTypeWrapper<Race>;
  RaceAbility: ResolverTypeWrapper<RaceAbility>;
  RaceAbilityChoose: ResolverTypeWrapper<RaceAbilityChoose>;
  RaceAdditionalSpells: ResolverTypeWrapper<RaceAdditionalSpells>;
  RaceAdditionalSpellsSpellcastingAbility: ResolverTypeWrapper<RaceAdditionalSpellsSpellcastingAbility>;
  RaceAdditionalSpellsSpellcastingAbilityChoose: ResolverTypeWrapper<RaceAdditionalSpellsSpellcastingAbilityChoose>;
  RaceAdditionalSpellsSpells: ResolverTypeWrapper<RaceAdditionalSpellsSpells>;
  RaceAdditionalSpellsSpellsChoose: ResolverTypeWrapper<RaceAdditionalSpellsSpellsChoose>;
  RaceAdditionalSpellsSpells_meta: ResolverTypeWrapper<RaceAdditionalSpellsSpells_Meta>;
  RaceArmorProficiencies: ResolverTypeWrapper<RaceArmorProficiencies>;
  RaceEntries: ResolverTypeWrapper<RaceEntries>;
  RaceEntriesItems: ResolverTypeWrapper<RaceEntriesItems>;
  RaceEntriesRows: ResolverTypeWrapper<RaceEntriesRows>;
  RaceEntriesRowsList: ResolverTypeWrapper<RaceEntriesRowsList>;
  RaceFeats: ResolverTypeWrapper<RaceFeats>;
  RaceLanguageProficiencies: ResolverTypeWrapper<RaceLanguageProficiencies>;
  RaceLanguageProficienciesChoose: ResolverTypeWrapper<RaceLanguageProficienciesChoose>;
  RaceSkillProficiencies: ResolverTypeWrapper<RaceSkillProficiencies>;
  RaceSkillProficienciesChoose: ResolverTypeWrapper<RaceSkillProficienciesChoose>;
  RaceSpeed: ResolverTypeWrapper<RaceSpeed>;
  RaceToolProficiencies: ResolverTypeWrapper<RaceToolProficiencies>;
  RaceWeaponProficiencies: ResolverTypeWrapper<RaceWeaponProficiencies>;
  RaceWeaponProficienciesChoose: ResolverTypeWrapper<RaceWeaponProficienciesChoose>;
  Spell: ResolverTypeWrapper<Spell>;
  SpellComponents: ResolverTypeWrapper<SpellComponents>;
  SpellDuration: ResolverTypeWrapper<SpellDuration>;
  SpellEntries: ResolverTypeWrapper<SpellEntries>;
  SpellEntriesItems: ResolverTypeWrapper<SpellEntriesItems>;
  SpellEntriesRows: ResolverTypeWrapper<SpellEntriesRows>;
  SpellEntriesRowsList: ResolverTypeWrapper<SpellEntriesRowsList>;
  SpellHigherLevel: ResolverTypeWrapper<SpellHigherLevel>;
  SpellRange: ResolverTypeWrapper<SpellRange>;
  SpellRangeDistance: ResolverTypeWrapper<SpellRangeDistance>;
  SpellTime: ResolverTypeWrapper<SpellTime>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Subclass: ResolverTypeWrapper<Subclass>;
  SubclassAdditionalSpells: ResolverTypeWrapper<SubclassAdditionalSpells>;
  SubclassAdditionalSpellsExpanded: ResolverTypeWrapper<SubclassAdditionalSpellsExpanded>;
  SubclassAdditionalSpellsExpanded1: ResolverTypeWrapper<SubclassAdditionalSpellsExpanded1>;
  SubclassAdditionalSpellsExpanded3: ResolverTypeWrapper<SubclassAdditionalSpellsExpanded3>;
  SubclassAdditionalSpellsExpanded7: ResolverTypeWrapper<SubclassAdditionalSpellsExpanded7>;
  SubclassAdditionalSpellsExpanded9: ResolverTypeWrapper<SubclassAdditionalSpellsExpanded9>;
  SubclassAdditionalSpellsExpanded13: ResolverTypeWrapper<SubclassAdditionalSpellsExpanded13>;
  SubclassAdditionalSpellsExpanded19: ResolverTypeWrapper<SubclassAdditionalSpellsExpanded19>;
  SubclassAdditionalSpellsExpandedS0: ResolverTypeWrapper<SubclassAdditionalSpellsExpandedS0>;
  SubclassAdditionalSpellsExpandedS1: ResolverTypeWrapper<SubclassAdditionalSpellsExpandedS1>;
  SubclassAdditionalSpellsExpandedS2: ResolverTypeWrapper<SubclassAdditionalSpellsExpandedS2>;
  SubclassAdditionalSpellsExpandedS3: ResolverTypeWrapper<SubclassAdditionalSpellsExpandedS3>;
  SubclassAdditionalSpellsExpandedS4: ResolverTypeWrapper<SubclassAdditionalSpellsExpandedS4>;
  SubclassAdditionalSpellsExpandedS5: ResolverTypeWrapper<SubclassAdditionalSpellsExpandedS5>;
  SubclassAdditionalSpellsExpandedS6: ResolverTypeWrapper<SubclassAdditionalSpellsExpandedS6>;
  SubclassAdditionalSpellsExpandedS7: ResolverTypeWrapper<SubclassAdditionalSpellsExpandedS7>;
  SubclassAdditionalSpellsExpandedS8: ResolverTypeWrapper<SubclassAdditionalSpellsExpandedS8>;
  SubclassAdditionalSpellsExpandedS9: ResolverTypeWrapper<SubclassAdditionalSpellsExpandedS9>;
  SubclassAdditionalSpellsSpells: ResolverTypeWrapper<SubclassAdditionalSpellsSpells>;
  SubclassAdditionalSpellsSpellsChoose: ResolverTypeWrapper<SubclassAdditionalSpellsSpellsChoose>;
  SubclassAdditionalSpellsSpells_meta: ResolverTypeWrapper<SubclassAdditionalSpellsSpells_Meta>;
  SubclassFeature: ResolverTypeWrapper<SubclassFeature>;
  SubclassFeatureConsumes: ResolverTypeWrapper<SubclassFeatureConsumes>;
  SubclassFeatureEntries: ResolverTypeWrapper<SubclassFeatureEntries>;
  SubclassFeatureEntriesData: ResolverTypeWrapper<SubclassFeatureEntriesData>;
  SubclassFeatureEntriesItems: ResolverTypeWrapper<SubclassFeatureEntriesItems>;
  SubclassFeatureEntriesItemsEntries: ResolverTypeWrapper<SubclassFeatureEntriesItemsEntries>;
  SubclassFeatureEntriesRows: ResolverTypeWrapper<SubclassFeatureEntriesRows>;
  SubclassFeatureEntriesRowsList: ResolverTypeWrapper<SubclassFeatureEntriesRowsList>;
  SubclassOptionalFeatureProgression: ResolverTypeWrapper<SubclassOptionalFeatureProgression>;
  SubclassOptionalFeatureProgressionProgression: ResolverTypeWrapper<SubclassOptionalFeatureProgressionProgression>;
  SubclassOptionalFeatureProgressionRequired: ResolverTypeWrapper<SubclassOptionalFeatureProgressionRequired>;
  SubclassSubclassFeatures: ResolverTypeWrapper<SubclassSubclassFeatures>;
  SubclassSubclassTableGroups: ResolverTypeWrapper<SubclassSubclassTableGroups>;
  SubclassSubclassTableGroupsRows: ResolverTypeWrapper<SubclassSubclassTableGroupsRows>;
  SubclassSubclassTableGroupsRowsList: ResolverTypeWrapper<SubclassSubclassTableGroupsRowsList>;
  SubclassSubclassTableGroupsRowsSpellProgression: ResolverTypeWrapper<SubclassSubclassTableGroupsRowsSpellProgression>;
  SubclassSubclassTableGroupsRowsSpellProgressionList: ResolverTypeWrapper<SubclassSubclassTableGroupsRowsSpellProgressionList>;
  SubclassSubclassTableGroupsSubclasses: ResolverTypeWrapper<SubclassSubclassTableGroupsSubclasses>;
  Subrace: ResolverTypeWrapper<Subrace>;
  SubraceAbility: ResolverTypeWrapper<SubraceAbility>;
  SubraceAbilityChoose: ResolverTypeWrapper<SubraceAbilityChoose>;
  SubraceAdditionalSpells: ResolverTypeWrapper<SubraceAdditionalSpells>;
  SubraceAdditionalSpellsSpellcastingAbility: ResolverTypeWrapper<SubraceAdditionalSpellsSpellcastingAbility>;
  SubraceAdditionalSpellsSpellcastingAbilityChoose: ResolverTypeWrapper<SubraceAdditionalSpellsSpellcastingAbilityChoose>;
  SubraceAdditionalSpellsSpells: ResolverTypeWrapper<SubraceAdditionalSpellsSpells>;
  SubraceAdditionalSpellsSpellsChoose: ResolverTypeWrapper<SubraceAdditionalSpellsSpellsChoose>;
  SubraceAdditionalSpellsSpells_meta: ResolverTypeWrapper<SubraceAdditionalSpellsSpells_Meta>;
  SubraceArmorProficiencies: ResolverTypeWrapper<SubraceArmorProficiencies>;
  SubraceEntries: ResolverTypeWrapper<SubraceEntries>;
  SubraceEntriesData: ResolverTypeWrapper<SubraceEntriesData>;
  SubraceEntriesItems: ResolverTypeWrapper<SubraceEntriesItems>;
  SubraceEntriesRows: ResolverTypeWrapper<SubraceEntriesRows>;
  SubraceEntriesRowsList: ResolverTypeWrapper<SubraceEntriesRowsList>;
  SubraceFeats: ResolverTypeWrapper<SubraceFeats>;
  SubraceLanguageProficiencies: ResolverTypeWrapper<SubraceLanguageProficiencies>;
  SubraceOverwrite: ResolverTypeWrapper<SubraceOverwrite>;
  SubraceSkillProficiencies: ResolverTypeWrapper<SubraceSkillProficiencies>;
  SubraceSkillToolLanguageProficiencies: ResolverTypeWrapper<SubraceSkillToolLanguageProficiencies>;
  SubraceSkillToolLanguageProficienciesChoose: ResolverTypeWrapper<SubraceSkillToolLanguageProficienciesChoose>;
  SubraceSpeed: ResolverTypeWrapper<SubraceSpeed>;
  SubraceToolProficiencies: ResolverTypeWrapper<SubraceToolProficiencies>;
  SubraceWeaponProficiencies: ResolverTypeWrapper<SubraceWeaponProficiencies>;
  Vehicle: ResolverTypeWrapper<Vehicle>;
  VehicleAbility: ResolverTypeWrapper<VehicleAbility>;
  VehicleActions: ResolverTypeWrapper<VehicleActions>;
  VehicleActionsRows: ResolverTypeWrapper<VehicleActionsRows>;
  VehicleActionsRowsList: ResolverTypeWrapper<VehicleActionsRowsList>;
  VehicleControls: ResolverTypeWrapper<VehicleControls>;
  VehicleControlsEntries: ResolverTypeWrapper<VehicleControlsEntries>;
  VehicleEntries: ResolverTypeWrapper<VehicleEntries>;
  VehicleEntriesRows: ResolverTypeWrapper<VehicleEntriesRows>;
  VehicleEntriesRowsList: ResolverTypeWrapper<VehicleEntriesRowsList>;
  VehicleMovements: ResolverTypeWrapper<VehicleMovements>;
  VehicleMovementsSpeed: ResolverTypeWrapper<VehicleMovementsSpeed>;
  VehicleMovementsSpeedEntries: ResolverTypeWrapper<VehicleMovementsSpeedEntries>;
  VehiclePace: ResolverTypeWrapper<VehiclePace>;
  VehicleSpeed: ResolverTypeWrapper<VehicleSpeed>;
  VehicleWeapons: ResolverTypeWrapper<VehicleWeapons>;
  VehicleWeaponsActions: ResolverTypeWrapper<VehicleWeaponsActions>;
  VehicleWeaponsActionsEntries: ResolverTypeWrapper<VehicleWeaponsActionsEntries>;
  VehicleWeaponsEntries: ResolverTypeWrapper<VehicleWeaponsEntries>;
  VehicleWeaponsEntriesItems: ResolverTypeWrapper<VehicleWeaponsEntriesItems>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Background: Background;
  BackgroundAdditionalSpells: BackgroundAdditionalSpells;
  BackgroundAdditionalSpellsExpanded: BackgroundAdditionalSpellsExpanded;
  BackgroundEntries: BackgroundEntries;
  BackgroundEntriesData: BackgroundEntriesData;
  BackgroundEntriesItems: BackgroundEntriesItems;
  BackgroundEntriesRows: BackgroundEntriesRows;
  BackgroundEntriesRowsList: BackgroundEntriesRowsList;
  BackgroundFeats: BackgroundFeats;
  BackgroundLanguageProficiencies: BackgroundLanguageProficiencies;
  BackgroundLanguageProficienciesChoose: BackgroundLanguageProficienciesChoose;
  BackgroundSkillProficiencies: BackgroundSkillProficiencies;
  BackgroundSkillProficienciesChoose: BackgroundSkillProficienciesChoose;
  BackgroundStartingEquipment: BackgroundStartingEquipment;
  BackgroundStartingEquipmentA: BackgroundStartingEquipmentA;
  BackgroundStartingEquipmentB: BackgroundStartingEquipmentB;
  BackgroundStartingEquipmentC: BackgroundStartingEquipmentC;
  BackgroundStartingEquipmentD: BackgroundStartingEquipmentD;
  BackgroundStartingEquipment_: BackgroundStartingEquipment_;
  BackgroundToolProficiencies: BackgroundToolProficiencies;
  BackgroundToolProficienciesChoose: BackgroundToolProficienciesChoose;
  BaseItem: BaseItem;
  BaseItemDamage: BaseItemDamage;
  BaseItemEntries: BaseItemEntries;
  BaseItemPackContents: BaseItemPackContents;
  Book: Book;
  Boolean: Scalars["Boolean"]["output"];
  Card: Card;
  CardEntries: CardEntries;
  Class: Class;
  ClassAdditionalSpells: ClassAdditionalSpells;
  ClassAdditionalSpellsSpells: ClassAdditionalSpellsSpells;
  ClassAdditionalSpellsSpellsChoose: ClassAdditionalSpellsSpellsChoose;
  ClassAdditionalSpellsSpells_meta: ClassAdditionalSpellsSpells_Meta;
  ClassArmorProficiencies: ClassArmorProficiencies;
  ClassClassFeatures: ClassClassFeatures;
  ClassClassTableGroups: ClassClassTableGroups;
  ClassClassTableGroupsRows: ClassClassTableGroupsRows;
  ClassClassTableGroupsRowsList: ClassClassTableGroupsRowsList;
  ClassClassTableGroupsRowsSpellProgression: ClassClassTableGroupsRowsSpellProgression;
  ClassClassTableGroupsRowsSpellProgressionList: ClassClassTableGroupsRowsSpellProgressionList;
  ClassFeature: ClassFeature;
  ClassFeatureConsumes: ClassFeatureConsumes;
  ClassFeatureEntries: ClassFeatureEntries;
  ClassFeatureEntriesItems: ClassFeatureEntriesItems;
  ClassFeatureEntriesRows: ClassFeatureEntriesRows;
  ClassFeatureEntriesRowsList: ClassFeatureEntriesRowsList;
  ClassHitDie: ClassHitDie;
  ClassMulticlassing: ClassMulticlassing;
  ClassMulticlassingProficienciesGained: ClassMulticlassingProficienciesGained;
  ClassMulticlassingProficienciesGainedArmor: ClassMulticlassingProficienciesGainedArmor;
  ClassMulticlassingProficienciesGainedSkills: ClassMulticlassingProficienciesGainedSkills;
  ClassMulticlassingProficienciesGainedSkillsChoose: ClassMulticlassingProficienciesGainedSkillsChoose;
  ClassMulticlassingProficienciesGainedTools: ClassMulticlassingProficienciesGainedTools;
  ClassMulticlassingProficienciesGainedWeapons: ClassMulticlassingProficienciesGainedWeapons;
  ClassMulticlassingRequirements: ClassMulticlassingRequirements;
  ClassMulticlassingRequirementsOr: ClassMulticlassingRequirementsOr;
  ClassOptionalFeatureProgression: ClassOptionalFeatureProgression;
  ClassOptionalFeatureProgressionProgression: ClassOptionalFeatureProgressionProgression;
  ClassSkillProficiencies: ClassSkillProficiencies;
  ClassSkillProficienciesChoose: ClassSkillProficienciesChoose;
  ClassStartingEquipment: ClassStartingEquipment;
  ClassStartingEquipmentA: ClassStartingEquipmentA;
  ClassStartingEquipmentB: ClassStartingEquipmentB;
  ClassStartingEquipmentC: ClassStartingEquipmentC;
  ClassStartingEquipment_: ClassStartingEquipment_;
  ClassToolProficiencies: ClassToolProficiencies;
  ClassToolProficienciesChoose: ClassToolProficienciesChoose;
  ClassWeaponProficiencies: ClassWeaponProficiencies;
  Deck: Deck;
  DeckEntries: DeckEntries;
  DeckEntriesRows: DeckEntriesRows;
  DeckEntriesRowsList: DeckEntriesRowsList;
  DeckEntriesRowsList0: DeckEntriesRowsList0;
  DeckEntriesRowsList0Roll: DeckEntriesRowsList0Roll;
  Feat: Feat;
  FeatAbility: FeatAbility;
  FeatAbilityChoose: FeatAbilityChoose;
  FeatAdditionalSpells: FeatAdditionalSpells;
  FeatAdditionalSpellsSpellcastingAbility: FeatAdditionalSpellsSpellcastingAbility;
  FeatAdditionalSpellsSpellcastingAbilityChoose: FeatAdditionalSpellsSpellcastingAbilityChoose;
  FeatAdditionalSpellsSpells: FeatAdditionalSpellsSpells;
  FeatAdditionalSpellsSpellsChoose: FeatAdditionalSpellsSpellsChoose;
  FeatAdditionalSpellsSpells_meta: FeatAdditionalSpellsSpells_Meta;
  FeatArmorProficiencies: FeatArmorProficiencies;
  FeatEntries: FeatEntries;
  FeatEntriesItems: FeatEntriesItems;
  FeatEntriesItemsEntries: FeatEntriesItemsEntries;
  FeatEntriesRows: FeatEntriesRows;
  FeatEntriesRowsList: FeatEntriesRowsList;
  FeatExpertise: FeatExpertise;
  FeatLanguageProficiencies: FeatLanguageProficiencies;
  FeatOptionalFeatureProgression: FeatOptionalFeatureProgression;
  FeatOptionalFeatureProgressionProgression: FeatOptionalFeatureProgressionProgression;
  FeatPrerequisite: FeatPrerequisite;
  FeatPrerequisiteAbility: FeatPrerequisiteAbility;
  FeatPrerequisiteProficiency: FeatPrerequisiteProficiency;
  FeatPrerequisiteRace: FeatPrerequisiteRace;
  FeatSavingThrowProficiencies: FeatSavingThrowProficiencies;
  FeatSavingThrowProficienciesChoose: FeatSavingThrowProficienciesChoose;
  FeatSkillProficiencies: FeatSkillProficiencies;
  FeatSkillProficienciesChoose: FeatSkillProficienciesChoose;
  FeatSkillToolLanguageProficiencies: FeatSkillToolLanguageProficiencies;
  FeatSkillToolLanguageProficienciesChoose: FeatSkillToolLanguageProficienciesChoose;
  FeatToolProficiencies: FeatToolProficiencies;
  FeatWeaponProficiencies: FeatWeaponProficiencies;
  FeatWeaponProficienciesChoose: FeatWeaponProficienciesChoose;
  Float: Scalars["Float"]["output"];
  Int: Scalars["Int"]["output"];
  Item: Item;
  ItemAttunedBy: ItemAttunedBy;
  ItemBonusSavingThrow: ItemBonusSavingThrow;
  ItemDamage: ItemDamage;
  ItemEntries: ItemEntries;
  ItemEntriesItems: ItemEntriesItems;
  ItemEntriesRows: ItemEntriesRows;
  ItemEntriesRowsList: ItemEntriesRowsList;
  ItemModifyAbility: ItemModifyAbility;
  ItemModifyAbilityChoose: ItemModifyAbilityChoose;
  ItemModifyAbilityStatic: ItemModifyAbilityStatic;
  ItemModifySpeed: ItemModifySpeed;
  ItemModifySpeedEqual: ItemModifySpeedEqual;
  ItemModifySpeedMultiply: ItemModifySpeedMultiply;
  ItemModifySpeedStatic: ItemModifySpeedStatic;
  ItemPackContents: ItemPackContents;
  ItemProperty: ItemProperty;
  ItemPropertyEntries: ItemPropertyEntries;
  ItemType: ItemType;
  ItemTypeEntries: ItemTypeEntries;
  ItemTypeEntriesRows: ItemTypeEntriesRows;
  ItemTypeEntriesRowsList: ItemTypeEntriesRowsList;
  Language: Language;
  OptionalFeature: OptionalFeature;
  OptionalFeatureAdditionalSpells: OptionalFeatureAdditionalSpells;
  OptionalFeatureAdditionalSpellsSpellcastingAbility: OptionalFeatureAdditionalSpellsSpellcastingAbility;
  OptionalFeatureAdditionalSpellsSpells: OptionalFeatureAdditionalSpellsSpells;
  OptionalFeatureAdditionalSpellsSpellsChoose: OptionalFeatureAdditionalSpellsSpellsChoose;
  OptionalFeatureAdditionalSpellsSpells_meta: OptionalFeatureAdditionalSpellsSpells_Meta;
  OptionalFeatureConsumes: OptionalFeatureConsumes;
  OptionalFeatureEntries: OptionalFeatureEntries;
  OptionalFeatureEntriesItems: OptionalFeatureEntriesItems;
  OptionalFeatureEntriesRows: OptionalFeatureEntriesRows;
  OptionalFeatureEntriesRowsList: OptionalFeatureEntriesRowsList;
  OptionalFeatureOptionalFeatureProgression: OptionalFeatureOptionalFeatureProgression;
  OptionalFeatureOptionalFeatureProgressionProgression: OptionalFeatureOptionalFeatureProgressionProgression;
  OptionalFeaturePrerequisite: OptionalFeaturePrerequisite;
  OptionalFeatureSkillProficiencies: OptionalFeatureSkillProficiencies;
  Query: {};
  Race: Race;
  RaceAbility: RaceAbility;
  RaceAbilityChoose: RaceAbilityChoose;
  RaceAdditionalSpells: RaceAdditionalSpells;
  RaceAdditionalSpellsSpellcastingAbility: RaceAdditionalSpellsSpellcastingAbility;
  RaceAdditionalSpellsSpellcastingAbilityChoose: RaceAdditionalSpellsSpellcastingAbilityChoose;
  RaceAdditionalSpellsSpells: RaceAdditionalSpellsSpells;
  RaceAdditionalSpellsSpellsChoose: RaceAdditionalSpellsSpellsChoose;
  RaceAdditionalSpellsSpells_meta: RaceAdditionalSpellsSpells_Meta;
  RaceArmorProficiencies: RaceArmorProficiencies;
  RaceEntries: RaceEntries;
  RaceEntriesItems: RaceEntriesItems;
  RaceEntriesRows: RaceEntriesRows;
  RaceEntriesRowsList: RaceEntriesRowsList;
  RaceFeats: RaceFeats;
  RaceLanguageProficiencies: RaceLanguageProficiencies;
  RaceLanguageProficienciesChoose: RaceLanguageProficienciesChoose;
  RaceSkillProficiencies: RaceSkillProficiencies;
  RaceSkillProficienciesChoose: RaceSkillProficienciesChoose;
  RaceSpeed: RaceSpeed;
  RaceToolProficiencies: RaceToolProficiencies;
  RaceWeaponProficiencies: RaceWeaponProficiencies;
  RaceWeaponProficienciesChoose: RaceWeaponProficienciesChoose;
  Spell: Spell;
  SpellComponents: SpellComponents;
  SpellDuration: SpellDuration;
  SpellEntries: SpellEntries;
  SpellEntriesItems: SpellEntriesItems;
  SpellEntriesRows: SpellEntriesRows;
  SpellEntriesRowsList: SpellEntriesRowsList;
  SpellHigherLevel: SpellHigherLevel;
  SpellRange: SpellRange;
  SpellRangeDistance: SpellRangeDistance;
  SpellTime: SpellTime;
  String: Scalars["String"]["output"];
  Subclass: Subclass;
  SubclassAdditionalSpells: SubclassAdditionalSpells;
  SubclassAdditionalSpellsExpanded: SubclassAdditionalSpellsExpanded;
  SubclassAdditionalSpellsExpanded1: SubclassAdditionalSpellsExpanded1;
  SubclassAdditionalSpellsExpanded3: SubclassAdditionalSpellsExpanded3;
  SubclassAdditionalSpellsExpanded7: SubclassAdditionalSpellsExpanded7;
  SubclassAdditionalSpellsExpanded9: SubclassAdditionalSpellsExpanded9;
  SubclassAdditionalSpellsExpanded13: SubclassAdditionalSpellsExpanded13;
  SubclassAdditionalSpellsExpanded19: SubclassAdditionalSpellsExpanded19;
  SubclassAdditionalSpellsExpandedS0: SubclassAdditionalSpellsExpandedS0;
  SubclassAdditionalSpellsExpandedS1: SubclassAdditionalSpellsExpandedS1;
  SubclassAdditionalSpellsExpandedS2: SubclassAdditionalSpellsExpandedS2;
  SubclassAdditionalSpellsExpandedS3: SubclassAdditionalSpellsExpandedS3;
  SubclassAdditionalSpellsExpandedS4: SubclassAdditionalSpellsExpandedS4;
  SubclassAdditionalSpellsExpandedS5: SubclassAdditionalSpellsExpandedS5;
  SubclassAdditionalSpellsExpandedS6: SubclassAdditionalSpellsExpandedS6;
  SubclassAdditionalSpellsExpandedS7: SubclassAdditionalSpellsExpandedS7;
  SubclassAdditionalSpellsExpandedS8: SubclassAdditionalSpellsExpandedS8;
  SubclassAdditionalSpellsExpandedS9: SubclassAdditionalSpellsExpandedS9;
  SubclassAdditionalSpellsSpells: SubclassAdditionalSpellsSpells;
  SubclassAdditionalSpellsSpellsChoose: SubclassAdditionalSpellsSpellsChoose;
  SubclassAdditionalSpellsSpells_meta: SubclassAdditionalSpellsSpells_Meta;
  SubclassFeature: SubclassFeature;
  SubclassFeatureConsumes: SubclassFeatureConsumes;
  SubclassFeatureEntries: SubclassFeatureEntries;
  SubclassFeatureEntriesData: SubclassFeatureEntriesData;
  SubclassFeatureEntriesItems: SubclassFeatureEntriesItems;
  SubclassFeatureEntriesItemsEntries: SubclassFeatureEntriesItemsEntries;
  SubclassFeatureEntriesRows: SubclassFeatureEntriesRows;
  SubclassFeatureEntriesRowsList: SubclassFeatureEntriesRowsList;
  SubclassOptionalFeatureProgression: SubclassOptionalFeatureProgression;
  SubclassOptionalFeatureProgressionProgression: SubclassOptionalFeatureProgressionProgression;
  SubclassOptionalFeatureProgressionRequired: SubclassOptionalFeatureProgressionRequired;
  SubclassSubclassFeatures: SubclassSubclassFeatures;
  SubclassSubclassTableGroups: SubclassSubclassTableGroups;
  SubclassSubclassTableGroupsRows: SubclassSubclassTableGroupsRows;
  SubclassSubclassTableGroupsRowsList: SubclassSubclassTableGroupsRowsList;
  SubclassSubclassTableGroupsRowsSpellProgression: SubclassSubclassTableGroupsRowsSpellProgression;
  SubclassSubclassTableGroupsRowsSpellProgressionList: SubclassSubclassTableGroupsRowsSpellProgressionList;
  SubclassSubclassTableGroupsSubclasses: SubclassSubclassTableGroupsSubclasses;
  Subrace: Subrace;
  SubraceAbility: SubraceAbility;
  SubraceAbilityChoose: SubraceAbilityChoose;
  SubraceAdditionalSpells: SubraceAdditionalSpells;
  SubraceAdditionalSpellsSpellcastingAbility: SubraceAdditionalSpellsSpellcastingAbility;
  SubraceAdditionalSpellsSpellcastingAbilityChoose: SubraceAdditionalSpellsSpellcastingAbilityChoose;
  SubraceAdditionalSpellsSpells: SubraceAdditionalSpellsSpells;
  SubraceAdditionalSpellsSpellsChoose: SubraceAdditionalSpellsSpellsChoose;
  SubraceAdditionalSpellsSpells_meta: SubraceAdditionalSpellsSpells_Meta;
  SubraceArmorProficiencies: SubraceArmorProficiencies;
  SubraceEntries: SubraceEntries;
  SubraceEntriesData: SubraceEntriesData;
  SubraceEntriesItems: SubraceEntriesItems;
  SubraceEntriesRows: SubraceEntriesRows;
  SubraceEntriesRowsList: SubraceEntriesRowsList;
  SubraceFeats: SubraceFeats;
  SubraceLanguageProficiencies: SubraceLanguageProficiencies;
  SubraceOverwrite: SubraceOverwrite;
  SubraceSkillProficiencies: SubraceSkillProficiencies;
  SubraceSkillToolLanguageProficiencies: SubraceSkillToolLanguageProficiencies;
  SubraceSkillToolLanguageProficienciesChoose: SubraceSkillToolLanguageProficienciesChoose;
  SubraceSpeed: SubraceSpeed;
  SubraceToolProficiencies: SubraceToolProficiencies;
  SubraceWeaponProficiencies: SubraceWeaponProficiencies;
  Vehicle: Vehicle;
  VehicleAbility: VehicleAbility;
  VehicleActions: VehicleActions;
  VehicleActionsRows: VehicleActionsRows;
  VehicleActionsRowsList: VehicleActionsRowsList;
  VehicleControls: VehicleControls;
  VehicleControlsEntries: VehicleControlsEntries;
  VehicleEntries: VehicleEntries;
  VehicleEntriesRows: VehicleEntriesRows;
  VehicleEntriesRowsList: VehicleEntriesRowsList;
  VehicleMovements: VehicleMovements;
  VehicleMovementsSpeed: VehicleMovementsSpeed;
  VehicleMovementsSpeedEntries: VehicleMovementsSpeedEntries;
  VehiclePace: VehiclePace;
  VehicleSpeed: VehicleSpeed;
  VehicleWeapons: VehicleWeapons;
  VehicleWeaponsActions: VehicleWeaponsActions;
  VehicleWeaponsActionsEntries: VehicleWeaponsActionsEntries;
  VehicleWeaponsEntries: VehicleWeaponsEntries;
  VehicleWeaponsEntriesItems: VehicleWeaponsEntriesItems;
};

export type BackgroundResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Background"] = ResolversParentTypes["Background"],
> = {
  additionalSpells?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["BackgroundAdditionalSpells"]>>>,
    ParentType,
    ContextType
  >;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["BackgroundEntries"]>>>,
    ParentType,
    ContextType
  >;
  feats?: Resolver<
    Maybe<ResolversTypes["BackgroundFeats"]>,
    ParentType,
    ContextType
  >;
  languageProficiencies?: Resolver<
    Maybe<ResolversTypes["BackgroundLanguageProficiencies"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  skillProficiencies?: Resolver<
    Maybe<ResolversTypes["BackgroundSkillProficiencies"]>,
    ParentType,
    ContextType
  >;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  startingEquipment?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["BackgroundStartingEquipment"]>>>,
    ParentType,
    ContextType
  >;
  toolProficiencies?: Resolver<
    Maybe<ResolversTypes["BackgroundToolProficiencies"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundAdditionalSpellsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundAdditionalSpells"] = ResolversParentTypes["BackgroundAdditionalSpells"],
> = {
  expanded?: Resolver<
    Maybe<ResolversTypes["BackgroundAdditionalSpellsExpanded"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundAdditionalSpellsExpandedResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundAdditionalSpellsExpanded"] = ResolversParentTypes["BackgroundAdditionalSpellsExpanded"],
> = {
  s0?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  s1?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  s2?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  s3?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  s4?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  s5?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundEntries"] = ResolversParentTypes["BackgroundEntries"],
> = {
  caption?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  children?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  colLabels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  colStyles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  data?: Resolver<
    Maybe<ResolversTypes["BackgroundEntriesData"]>,
    ParentType,
    ContextType
  >;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["BackgroundEntriesItems"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  rows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["BackgroundEntriesRowsList"]>>>,
    ParentType,
    ContextType
  >;
  style?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundEntriesDataResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundEntriesData"] = ResolversParentTypes["BackgroundEntriesData"],
> = {
  isFeature?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  tableInclude?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundEntriesItemsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundEntriesItems"] = ResolversParentTypes["BackgroundEntriesItems"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundEntriesRowsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundEntriesRows"] = ResolversParentTypes["BackgroundEntriesRows"],
> = {
  _0?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundEntriesRowsListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundEntriesRowsList"] = ResolversParentTypes["BackgroundEntriesRowsList"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["BackgroundEntriesRows"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundFeatsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundFeats"] = ResolversParentTypes["BackgroundFeats"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundLanguageProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundLanguageProficiencies"] = ResolversParentTypes["BackgroundLanguageProficiencies"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["BackgroundLanguageProficienciesChoose"]>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundLanguageProficienciesChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundLanguageProficienciesChoose"] = ResolversParentTypes["BackgroundLanguageProficienciesChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundSkillProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundSkillProficiencies"] = ResolversParentTypes["BackgroundSkillProficiencies"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["BackgroundSkillProficienciesChoose"]>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundSkillProficienciesChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundSkillProficienciesChoose"] = ResolversParentTypes["BackgroundSkillProficienciesChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundStartingEquipmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundStartingEquipment"] = ResolversParentTypes["BackgroundStartingEquipment"],
> = {
  _?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["BackgroundStartingEquipment_"]>>>,
    ParentType,
    ContextType
  >;
  a?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["BackgroundStartingEquipmentA"]>>>,
    ParentType,
    ContextType
  >;
  b?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["BackgroundStartingEquipmentB"]>>>,
    ParentType,
    ContextType
  >;
  c?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["BackgroundStartingEquipmentC"]>>>,
    ParentType,
    ContextType
  >;
  d?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["BackgroundStartingEquipmentD"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundStartingEquipmentAResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundStartingEquipmentA"] = ResolversParentTypes["BackgroundStartingEquipmentA"],
> = {
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  special?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  tool?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundStartingEquipmentBResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundStartingEquipmentB"] = ResolversParentTypes["BackgroundStartingEquipmentB"],
> = {
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  special?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  tool?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundStartingEquipmentCResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundStartingEquipmentC"] = ResolversParentTypes["BackgroundStartingEquipmentC"],
> = {
  special?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundStartingEquipmentDResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundStartingEquipmentD"] = ResolversParentTypes["BackgroundStartingEquipmentD"],
> = {
  special?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundStartingEquipment_Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundStartingEquipment_"] = ResolversParentTypes["BackgroundStartingEquipment_"],
> = {
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  special?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  tool?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  worthValue?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundToolProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundToolProficiencies"] = ResolversParentTypes["BackgroundToolProficiencies"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["BackgroundToolProficienciesChoose"]>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BackgroundToolProficienciesChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BackgroundToolProficienciesChoose"] = ResolversParentTypes["BackgroundToolProficienciesChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BaseItem"] = ResolversParentTypes["BaseItem"],
> = {
  ammoType?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  armorClass?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  damage?: Resolver<
    Maybe<ResolversTypes["BaseItemDamage"]>,
    ParentType,
    ContextType
  >;
  damageType?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["BaseItemEntries"]>>>,
    ParentType,
    ContextType
  >;
  isArmor?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  isFirearm?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  isWeapon?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  packContents?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["BaseItemPackContents"]>>>,
    ParentType,
    ContextType
  >;
  properties?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  range?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  rarity?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  reload?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  stealth?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  strength?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  types?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  weaponCategory?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseItemDamageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BaseItemDamage"] = ResolversParentTypes["BaseItemDamage"],
> = {
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _2?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseItemEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BaseItemEntries"] = ResolversParentTypes["BaseItemEntries"],
> = {
  children?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseItemPackContentsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["BaseItemPackContents"] = ResolversParentTypes["BaseItemPackContents"],
> = {
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  special?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Book"] = ResolversParentTypes["Book"],
> = {
  group?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CardResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Card"] = ResolversParentTypes["Card"],
> = {
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["CardEntries"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  set?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CardEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["CardEntries"] = ResolversParentTypes["CardEntries"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  style?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Class"] = ResolversParentTypes["Class"],
> = {
  additionalSpells?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassAdditionalSpells"]>>>,
    ParentType,
    ContextType
  >;
  armorProficiencies?: Resolver<
    Maybe<ResolversTypes["ClassArmorProficiencies"]>,
    ParentType,
    ContextType
  >;
  cantripProgression?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  classFeatures?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassClassFeatures"]>>>,
    ParentType,
    ContextType
  >;
  classTableGroups?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassClassTableGroups"]>>>,
    ParentType,
    ContextType
  >;
  hitDie?: Resolver<
    Maybe<ResolversTypes["ClassHitDie"]>,
    ParentType,
    ContextType
  >;
  multiclassSlotsProgression?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  multiclassing?: Resolver<
    Maybe<ResolversTypes["ClassMulticlassing"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  optionalFeatureProgression?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassOptionalFeatureProgression"]>>>,
    ParentType,
    ContextType
  >;
  preparedSpellsFormula?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  savingThrowProficiencies?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  skillProficiencies?: Resolver<
    Maybe<ResolversTypes["ClassSkillProficiencies"]>,
    ParentType,
    ContextType
  >;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  spellcastingAbility?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  spellsKnownProgression?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  startingEquipment?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassStartingEquipment"]>>>,
    ParentType,
    ContextType
  >;
  subclassTitle?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  toolProficiencies?: Resolver<
    Maybe<ResolversTypes["ClassToolProficiencies"]>,
    ParentType,
    ContextType
  >;
  weaponProficiencies?: Resolver<
    Maybe<ResolversTypes["ClassWeaponProficiencies"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassAdditionalSpellsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassAdditionalSpells"] = ResolversParentTypes["ClassAdditionalSpells"],
> = {
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  spellcastingAbility?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  spells?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassAdditionalSpellsSpells"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassAdditionalSpellsSpellsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassAdditionalSpellsSpells"] = ResolversParentTypes["ClassAdditionalSpellsSpells"],
> = {
  _meta?: Resolver<
    Maybe<ResolversTypes["ClassAdditionalSpellsSpells_meta"]>,
    ParentType,
    ContextType
  >;
  choose?: Resolver<
    Maybe<ResolversTypes["ClassAdditionalSpellsSpellsChoose"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassAdditionalSpellsSpellsChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassAdditionalSpellsSpellsChoose"] = ResolversParentTypes["ClassAdditionalSpellsSpellsChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  fromFilter?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassAdditionalSpellsSpells_MetaResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassAdditionalSpellsSpells_meta"] = ResolversParentTypes["ClassAdditionalSpellsSpells_meta"],
> = {
  level?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassArmorProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassArmorProficiencies"] = ResolversParentTypes["ClassArmorProficiencies"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassClassFeaturesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassClassFeatures"] = ResolversParentTypes["ClassClassFeatures"],
> = {
  className?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  featureName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  level?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassClassTableGroupsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassClassTableGroups"] = ResolversParentTypes["ClassClassTableGroups"],
> = {
  colLabels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  rows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassClassTableGroupsRowsList"]>>>,
    ParentType,
    ContextType
  >;
  rowsSpellProgression?: Resolver<
    Maybe<
      Array<
        Maybe<ResolversTypes["ClassClassTableGroupsRowsSpellProgressionList"]>
      >
    >,
    ParentType,
    ContextType
  >;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassClassTableGroupsRowsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassClassTableGroupsRows"] = ResolversParentTypes["ClassClassTableGroupsRows"],
> = {
  _0?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _2?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _3?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _4?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassClassTableGroupsRowsListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassClassTableGroupsRowsList"] = ResolversParentTypes["ClassClassTableGroupsRowsList"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassClassTableGroupsRows"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassClassTableGroupsRowsSpellProgressionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassClassTableGroupsRowsSpellProgression"] = ResolversParentTypes["ClassClassTableGroupsRowsSpellProgression"],
> = {
  _0?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _1?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _2?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _3?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _4?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _5?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _6?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _7?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _8?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassClassTableGroupsRowsSpellProgressionListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassClassTableGroupsRowsSpellProgressionList"] = ResolversParentTypes["ClassClassTableGroupsRowsSpellProgressionList"],
> = {
  items?: Resolver<
    Maybe<
      Array<Maybe<ResolversTypes["ClassClassTableGroupsRowsSpellProgression"]>>
    >,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassFeatureResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassFeature"] = ResolversParentTypes["ClassFeature"],
> = {
  className?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  classSource?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  consumes?: Resolver<
    Maybe<ResolversTypes["ClassFeatureConsumes"]>,
    ParentType,
    ContextType
  >;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassFeatureEntries"]>>>,
    ParentType,
    ContextType
  >;
  isClassFeatureVariant?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  level?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassFeatureConsumesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassFeatureConsumes"] = ResolversParentTypes["ClassFeatureConsumes"],
> = {
  amount?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassFeatureEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassFeatureEntries"] = ResolversParentTypes["ClassFeatureEntries"],
> = {
  attributes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  caption?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  children?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  classFeature?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  colLabels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  colStyles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassFeatureEntriesItems"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  optionalfeature?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  page?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  rows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassFeatureEntriesRowsList"]>>>,
    ParentType,
    ContextType
  >;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassFeatureEntriesItemsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassFeatureEntriesItems"] = ResolversParentTypes["ClassFeatureEntriesItems"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassFeatureEntriesRowsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassFeatureEntriesRows"] = ResolversParentTypes["ClassFeatureEntriesRows"],
> = {
  _0?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _2?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _3?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassFeatureEntriesRowsListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassFeatureEntriesRowsList"] = ResolversParentTypes["ClassFeatureEntriesRowsList"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassFeatureEntriesRows"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassHitDieResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassHitDie"] = ResolversParentTypes["ClassHitDie"],
> = {
  faces?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassMulticlassingResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassMulticlassing"] = ResolversParentTypes["ClassMulticlassing"],
> = {
  proficienciesGained?: Resolver<
    Maybe<ResolversTypes["ClassMulticlassingProficienciesGained"]>,
    ParentType,
    ContextType
  >;
  requirements?: Resolver<
    Maybe<ResolversTypes["ClassMulticlassingRequirements"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassMulticlassingProficienciesGainedResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassMulticlassingProficienciesGained"] = ResolversParentTypes["ClassMulticlassingProficienciesGained"],
> = {
  armor?: Resolver<
    Maybe<ResolversTypes["ClassMulticlassingProficienciesGainedArmor"]>,
    ParentType,
    ContextType
  >;
  skills?: Resolver<
    Maybe<ResolversTypes["ClassMulticlassingProficienciesGainedSkills"]>,
    ParentType,
    ContextType
  >;
  tools?: Resolver<
    Maybe<ResolversTypes["ClassMulticlassingProficienciesGainedTools"]>,
    ParentType,
    ContextType
  >;
  weapons?: Resolver<
    Maybe<ResolversTypes["ClassMulticlassingProficienciesGainedWeapons"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassMulticlassingProficienciesGainedArmorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassMulticlassingProficienciesGainedArmor"] = ResolversParentTypes["ClassMulticlassingProficienciesGainedArmor"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassMulticlassingProficienciesGainedSkillsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassMulticlassingProficienciesGainedSkills"] = ResolversParentTypes["ClassMulticlassingProficienciesGainedSkills"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["ClassMulticlassingProficienciesGainedSkillsChoose"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassMulticlassingProficienciesGainedSkillsChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassMulticlassingProficienciesGainedSkillsChoose"] = ResolversParentTypes["ClassMulticlassingProficienciesGainedSkillsChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassMulticlassingProficienciesGainedToolsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassMulticlassingProficienciesGainedTools"] = ResolversParentTypes["ClassMulticlassingProficienciesGainedTools"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassMulticlassingProficienciesGainedWeaponsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassMulticlassingProficienciesGainedWeapons"] = ResolversParentTypes["ClassMulticlassingProficienciesGainedWeapons"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassMulticlassingRequirementsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassMulticlassingRequirements"] = ResolversParentTypes["ClassMulticlassingRequirements"],
> = {
  cha?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  dex?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  int?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  or?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassMulticlassingRequirementsOr"]>>>,
    ParentType,
    ContextType
  >;
  str?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  wis?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassMulticlassingRequirementsOrResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassMulticlassingRequirementsOr"] = ResolversParentTypes["ClassMulticlassingRequirementsOr"],
> = {
  dex?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  str?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassOptionalFeatureProgressionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassOptionalFeatureProgression"] = ResolversParentTypes["ClassOptionalFeatureProgression"],
> = {
  featureType?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  progression?: Resolver<
    Maybe<ResolversTypes["ClassOptionalFeatureProgressionProgression"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassOptionalFeatureProgressionProgressionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassOptionalFeatureProgressionProgression"] = ResolversParentTypes["ClassOptionalFeatureProgressionProgression"],
> = {
  _1?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _2?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _3?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _4?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _5?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _6?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _7?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _8?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _9?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _10?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _11?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _12?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _13?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _14?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _15?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _16?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _17?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _18?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _19?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _20?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassSkillProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassSkillProficiencies"] = ResolversParentTypes["ClassSkillProficiencies"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["ClassSkillProficienciesChoose"]>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassSkillProficienciesChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassSkillProficienciesChoose"] = ResolversParentTypes["ClassSkillProficienciesChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassStartingEquipmentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassStartingEquipment"] = ResolversParentTypes["ClassStartingEquipment"],
> = {
  _?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassStartingEquipment_"]>>>,
    ParentType,
    ContextType
  >;
  a?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassStartingEquipmentA"]>>>,
    ParentType,
    ContextType
  >;
  b?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassStartingEquipmentB"]>>>,
    ParentType,
    ContextType
  >;
  c?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassStartingEquipmentC"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassStartingEquipmentAResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassStartingEquipmentA"] = ResolversParentTypes["ClassStartingEquipmentA"],
> = {
  filter?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassStartingEquipmentBResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassStartingEquipmentB"] = ResolversParentTypes["ClassStartingEquipmentB"],
> = {
  filter?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassStartingEquipmentCResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassStartingEquipmentC"] = ResolversParentTypes["ClassStartingEquipmentC"],
> = {
  filter?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassStartingEquipment_Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassStartingEquipment_"] = ResolversParentTypes["ClassStartingEquipment_"],
> = {
  filter?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassToolProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassToolProficiencies"] = ResolversParentTypes["ClassToolProficiencies"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["ClassToolProficienciesChoose"]>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassToolProficienciesChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassToolProficienciesChoose"] = ResolversParentTypes["ClassToolProficienciesChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassWeaponProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ClassWeaponProficiencies"] = ResolversParentTypes["ClassWeaponProficiencies"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeckResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Deck"] = ResolversParentTypes["Deck"],
> = {
  cards?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["DeckEntries"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeckEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["DeckEntries"] = ResolversParentTypes["DeckEntries"],
> = {
  children?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  colLabels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  colStyles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  footnotes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  rows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["DeckEntriesRowsList"]>>>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeckEntriesRowsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["DeckEntriesRows"] = ResolversParentTypes["DeckEntriesRows"],
> = {
  _0?: Resolver<
    Maybe<ResolversTypes["DeckEntriesRowsList0"]>,
    ParentType,
    ContextType
  >;
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeckEntriesRowsListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["DeckEntriesRowsList"] = ResolversParentTypes["DeckEntriesRowsList"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["DeckEntriesRows"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeckEntriesRowsList0Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["DeckEntriesRowsList0"] = ResolversParentTypes["DeckEntriesRowsList0"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  roll?: Resolver<
    Maybe<ResolversTypes["DeckEntriesRowsList0Roll"]>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeckEntriesRowsList0RollResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["DeckEntriesRowsList0Roll"] = ResolversParentTypes["DeckEntriesRowsList0Roll"],
> = {
  exact?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  max?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Feat"] = ResolversParentTypes["Feat"],
> = {
  ability?: Resolver<
    Maybe<ResolversTypes["FeatAbility"]>,
    ParentType,
    ContextType
  >;
  additionalSpells?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["FeatAdditionalSpells"]>>>,
    ParentType,
    ContextType
  >;
  armorProficiencies?: Resolver<
    Maybe<ResolversTypes["FeatArmorProficiencies"]>,
    ParentType,
    ContextType
  >;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["FeatEntries"]>>>,
    ParentType,
    ContextType
  >;
  expertise?: Resolver<
    Maybe<ResolversTypes["FeatExpertise"]>,
    ParentType,
    ContextType
  >;
  languageProficiencies?: Resolver<
    Maybe<ResolversTypes["FeatLanguageProficiencies"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  optionalFeatureProgression?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["FeatOptionalFeatureProgression"]>>>,
    ParentType,
    ContextType
  >;
  prerequisite?: Resolver<
    Maybe<ResolversTypes["FeatPrerequisite"]>,
    ParentType,
    ContextType
  >;
  savingThrowProficiencies?: Resolver<
    Maybe<ResolversTypes["FeatSavingThrowProficiencies"]>,
    ParentType,
    ContextType
  >;
  skillProficiencies?: Resolver<
    Maybe<ResolversTypes["FeatSkillProficiencies"]>,
    ParentType,
    ContextType
  >;
  skillToolLanguageProficiencies?: Resolver<
    Maybe<ResolversTypes["FeatSkillToolLanguageProficiencies"]>,
    ParentType,
    ContextType
  >;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  toolProficiencies?: Resolver<
    Maybe<ResolversTypes["FeatToolProficiencies"]>,
    ParentType,
    ContextType
  >;
  weaponProficiencies?: Resolver<
    Maybe<ResolversTypes["FeatWeaponProficiencies"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatAbilityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatAbility"] = ResolversParentTypes["FeatAbility"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["FeatAbilityChoose"]>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatAbilityChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatAbilityChoose"] = ResolversParentTypes["FeatAbilityChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatAdditionalSpellsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatAdditionalSpells"] = ResolversParentTypes["FeatAdditionalSpells"],
> = {
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  spellcastingAbility?: Resolver<
    Maybe<ResolversTypes["FeatAdditionalSpellsSpellcastingAbility"]>,
    ParentType,
    ContextType
  >;
  spells?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["FeatAdditionalSpellsSpells"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatAdditionalSpellsSpellcastingAbilityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatAdditionalSpellsSpellcastingAbility"] = ResolversParentTypes["FeatAdditionalSpellsSpellcastingAbility"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["FeatAdditionalSpellsSpellcastingAbilityChoose"]>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatAdditionalSpellsSpellcastingAbilityChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatAdditionalSpellsSpellcastingAbilityChoose"] = ResolversParentTypes["FeatAdditionalSpellsSpellcastingAbilityChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatAdditionalSpellsSpellsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatAdditionalSpellsSpells"] = ResolversParentTypes["FeatAdditionalSpellsSpells"],
> = {
  _meta?: Resolver<
    Maybe<ResolversTypes["FeatAdditionalSpellsSpells_meta"]>,
    ParentType,
    ContextType
  >;
  choose?: Resolver<
    Maybe<ResolversTypes["FeatAdditionalSpellsSpellsChoose"]>,
    ParentType,
    ContextType
  >;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatAdditionalSpellsSpellsChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatAdditionalSpellsSpellsChoose"] = ResolversParentTypes["FeatAdditionalSpellsSpellsChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  fromFilter?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatAdditionalSpellsSpells_MetaResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatAdditionalSpellsSpells_meta"] = ResolversParentTypes["FeatAdditionalSpellsSpells_meta"],
> = {
  longRest?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  ritual?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  shortRest?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  will?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatArmorProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatArmorProficiencies"] = ResolversParentTypes["FeatArmorProficiencies"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatEntries"] = ResolversParentTypes["FeatEntries"],
> = {
  caption?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  children?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  colLabels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  colStyles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["FeatEntriesItems"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  rows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["FeatEntriesRowsList"]>>>,
    ParentType,
    ContextType
  >;
  style?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatEntriesItemsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatEntriesItems"] = ResolversParentTypes["FeatEntriesItems"],
> = {
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["FeatEntriesItemsEntries"]>>>,
    ParentType,
    ContextType
  >;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatEntriesItemsEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatEntriesItemsEntries"] = ResolversParentTypes["FeatEntriesItemsEntries"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatEntriesRowsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatEntriesRows"] = ResolversParentTypes["FeatEntriesRows"],
> = {
  _0?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _2?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatEntriesRowsListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatEntriesRowsList"] = ResolversParentTypes["FeatEntriesRowsList"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["FeatEntriesRows"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatExpertiseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatExpertise"] = ResolversParentTypes["FeatExpertise"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatLanguageProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatLanguageProficiencies"] = ResolversParentTypes["FeatLanguageProficiencies"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatOptionalFeatureProgressionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatOptionalFeatureProgression"] = ResolversParentTypes["FeatOptionalFeatureProgression"],
> = {
  featureType?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  progression?: Resolver<
    Maybe<ResolversTypes["FeatOptionalFeatureProgressionProgression"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatOptionalFeatureProgressionProgressionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatOptionalFeatureProgressionProgression"] = ResolversParentTypes["FeatOptionalFeatureProgressionProgression"],
> = {
  _?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatPrerequisiteResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatPrerequisite"] = ResolversParentTypes["FeatPrerequisite"],
> = {
  ability?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["FeatPrerequisiteAbility"]>>>,
    ParentType,
    ContextType
  >;
  feat?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  level?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  other?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  proficiency?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["FeatPrerequisiteProficiency"]>>>,
    ParentType,
    ContextType
  >;
  race?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["FeatPrerequisiteRace"]>>>,
    ParentType,
    ContextType
  >;
  spellcasting?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  spellcasting2020?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatPrerequisiteAbilityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatPrerequisiteAbility"] = ResolversParentTypes["FeatPrerequisiteAbility"],
> = {
  cha?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  dex?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  int?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  str?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  wis?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatPrerequisiteProficiencyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatPrerequisiteProficiency"] = ResolversParentTypes["FeatPrerequisiteProficiency"],
> = {
  armor?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  weapon?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatPrerequisiteRaceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatPrerequisiteRace"] = ResolversParentTypes["FeatPrerequisiteRace"],
> = {
  displayEntry?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  subrace?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatSavingThrowProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatSavingThrowProficiencies"] = ResolversParentTypes["FeatSavingThrowProficiencies"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["FeatSavingThrowProficienciesChoose"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatSavingThrowProficienciesChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatSavingThrowProficienciesChoose"] = ResolversParentTypes["FeatSavingThrowProficienciesChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatSkillProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatSkillProficiencies"] = ResolversParentTypes["FeatSkillProficiencies"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["FeatSkillProficienciesChoose"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatSkillProficienciesChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatSkillProficienciesChoose"] = ResolversParentTypes["FeatSkillProficienciesChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatSkillToolLanguageProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatSkillToolLanguageProficiencies"] = ResolversParentTypes["FeatSkillToolLanguageProficiencies"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["FeatSkillToolLanguageProficienciesChoose"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatSkillToolLanguageProficienciesChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatSkillToolLanguageProficienciesChoose"] = ResolversParentTypes["FeatSkillToolLanguageProficienciesChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatToolProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatToolProficiencies"] = ResolversParentTypes["FeatToolProficiencies"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatWeaponProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatWeaponProficiencies"] = ResolversParentTypes["FeatWeaponProficiencies"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["FeatWeaponProficienciesChoose"]>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatWeaponProficienciesChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["FeatWeaponProficienciesChoose"] = ResolversParentTypes["FeatWeaponProficienciesChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  fromFilter?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Item"] = ResolversParentTypes["Item"],
> = {
  ammoType?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  armorClass?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  attachedSpells?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  attuned?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  attunedBy?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ItemAttunedBy"]>>>,
    ParentType,
    ContextType
  >;
  baseItem?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  bonusAC?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  bonusAbilityCheck?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  bonusProficiencyBonus?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  bonusSavingThrow?: Resolver<
    Maybe<ResolversTypes["ItemBonusSavingThrow"]>,
    ParentType,
    ContextType
  >;
  bonusSpellAttack?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  bonusSpellSaveDC?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  bonusWeapon?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  bonusWeaponDamage?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  carryingCapacity?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  crew?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  damage?: Resolver<
    Maybe<ResolversTypes["ItemDamage"]>,
    ParentType,
    ContextType
  >;
  deckSeeAlso?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ItemEntries"]>>>,
    ParentType,
    ContextType
  >;
  grantsProficiency?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  isCursed?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  isFirearm?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  isPoison?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  isWeapon?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  maxCrew?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  minCrew?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  modifyAbility?: Resolver<
    Maybe<ResolversTypes["ItemModifyAbility"]>,
    ParentType,
    ContextType
  >;
  modifySpeed?: Resolver<
    Maybe<ResolversTypes["ItemModifySpeed"]>,
    ParentType,
    ContextType
  >;
  mountSpeed?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  packContents?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ItemPackContents"]>>>,
    ParentType,
    ContextType
  >;
  poisonTypes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  properties?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  range?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  rarity?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  stealth?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  strength?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  types?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  vehicleArmorClass?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  vehicleHealth?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  vehicleMaxCargo?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  vehicleMaxPassengers?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  vehicleSeeAlso?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  vehicleSpeed?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  vehicleThreshold?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  weaponCategory?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemAttunedByResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemAttunedBy"] = ResolversParentTypes["ItemAttunedBy"],
> = {
  alignment?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  background?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  class?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  creatureType?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  psionics?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  race?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  spellcasting?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemBonusSavingThrowResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemBonusSavingThrow"] = ResolversParentTypes["ItemBonusSavingThrow"],
> = {
  _?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  cha?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  con?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  dex?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  int?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  str?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  wis?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemDamageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemDamage"] = ResolversParentTypes["ItemDamage"],
> = {
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _2?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemEntries"] = ResolversParentTypes["ItemEntries"],
> = {
  caption?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  children?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  colLabels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  colStyles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ItemEntriesItems"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  rows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ItemEntriesRowsList"]>>>,
    ParentType,
    ContextType
  >;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemEntriesItemsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemEntriesItems"] = ResolversParentTypes["ItemEntriesItems"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemEntriesRowsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemEntriesRows"] = ResolversParentTypes["ItemEntriesRows"],
> = {
  _0?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemEntriesRowsListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemEntriesRowsList"] = ResolversParentTypes["ItemEntriesRowsList"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ItemEntriesRows"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemModifyAbilityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemModifyAbility"] = ResolversParentTypes["ItemModifyAbility"],
> = {
  amount?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  cha?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  choose?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ItemModifyAbilityChoose"]>>>,
    ParentType,
    ContextType
  >;
  con?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  dex?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  int?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  static?: Resolver<
    Maybe<ResolversTypes["ItemModifyAbilityStatic"]>,
    ParentType,
    ContextType
  >;
  str?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  wis?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemModifyAbilityChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemModifyAbilityChoose"] = ResolversParentTypes["ItemModifyAbilityChoose"],
> = {
  amount?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemModifyAbilityStaticResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemModifyAbilityStatic"] = ResolversParentTypes["ItemModifyAbilityStatic"],
> = {
  con?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  int?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  str?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemModifySpeedResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemModifySpeed"] = ResolversParentTypes["ItemModifySpeed"],
> = {
  equal?: Resolver<
    Maybe<ResolversTypes["ItemModifySpeedEqual"]>,
    ParentType,
    ContextType
  >;
  multiply?: Resolver<
    Maybe<ResolversTypes["ItemModifySpeedMultiply"]>,
    ParentType,
    ContextType
  >;
  static?: Resolver<
    Maybe<ResolversTypes["ItemModifySpeedStatic"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemModifySpeedEqualResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemModifySpeedEqual"] = ResolversParentTypes["ItemModifySpeedEqual"],
> = {
  climb?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  fly?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemModifySpeedMultiplyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemModifySpeedMultiply"] = ResolversParentTypes["ItemModifySpeedMultiply"],
> = {
  walk?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemModifySpeedStaticResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemModifySpeedStatic"] = ResolversParentTypes["ItemModifySpeedStatic"],
> = {
  fly?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  swim?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  walk?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemPackContentsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemPackContents"] = ResolversParentTypes["ItemPackContents"],
> = {
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  special?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemPropertyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemProperty"] = ResolversParentTypes["ItemProperty"],
> = {
  abbreviation?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ItemPropertyEntries"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemPropertyEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemPropertyEntries"] = ResolversParentTypes["ItemPropertyEntries"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemTypeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemType"] = ResolversParentTypes["ItemType"],
> = {
  abbreviation?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ItemTypeEntries"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemTypeEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemTypeEntries"] = ResolversParentTypes["ItemTypeEntries"],
> = {
  caption?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  children?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  colLabels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  colStyles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  rows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ItemTypeEntriesRowsList"]>>>,
    ParentType,
    ContextType
  >;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemTypeEntriesRowsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemTypeEntriesRows"] = ResolversParentTypes["ItemTypeEntriesRows"],
> = {
  _0?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemTypeEntriesRowsListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["ItemTypeEntriesRowsList"] = ResolversParentTypes["ItemTypeEntriesRowsList"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ItemTypeEntriesRows"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LanguageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Language"] = ResolversParentTypes["Language"],
> = {
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  script?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionalFeatureResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OptionalFeature"] = ResolversParentTypes["OptionalFeature"],
> = {
  additionalSpells?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["OptionalFeatureAdditionalSpells"]>>>,
    ParentType,
    ContextType
  >;
  consumes?: Resolver<
    Maybe<ResolversTypes["OptionalFeatureConsumes"]>,
    ParentType,
    ContextType
  >;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["OptionalFeatureEntries"]>>>,
    ParentType,
    ContextType
  >;
  featureType?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  isClassFeatureVariant?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  optionalFeatureProgression?: Resolver<
    Maybe<
      Array<Maybe<ResolversTypes["OptionalFeatureOptionalFeatureProgression"]>>
    >,
    ParentType,
    ContextType
  >;
  prerequisite?: Resolver<
    Maybe<ResolversTypes["OptionalFeaturePrerequisite"]>,
    ParentType,
    ContextType
  >;
  skillProficiencies?: Resolver<
    Maybe<ResolversTypes["OptionalFeatureSkillProficiencies"]>,
    ParentType,
    ContextType
  >;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionalFeatureAdditionalSpellsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OptionalFeatureAdditionalSpells"] = ResolversParentTypes["OptionalFeatureAdditionalSpells"],
> = {
  resource?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  spellcastingAbility?: Resolver<
    Maybe<ResolversTypes["OptionalFeatureAdditionalSpellsSpellcastingAbility"]>,
    ParentType,
    ContextType
  >;
  spells?: Resolver<
    Maybe<
      Array<Maybe<ResolversTypes["OptionalFeatureAdditionalSpellsSpells"]>>
    >,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionalFeatureAdditionalSpellsSpellcastingAbilityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OptionalFeatureAdditionalSpellsSpellcastingAbility"] = ResolversParentTypes["OptionalFeatureAdditionalSpellsSpellcastingAbility"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionalFeatureAdditionalSpellsSpellsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OptionalFeatureAdditionalSpellsSpells"] = ResolversParentTypes["OptionalFeatureAdditionalSpellsSpells"],
> = {
  _meta?: Resolver<
    Maybe<ResolversTypes["OptionalFeatureAdditionalSpellsSpells_meta"]>,
    ParentType,
    ContextType
  >;
  choose?: Resolver<
    Maybe<ResolversTypes["OptionalFeatureAdditionalSpellsSpellsChoose"]>,
    ParentType,
    ContextType
  >;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionalFeatureAdditionalSpellsSpellsChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OptionalFeatureAdditionalSpellsSpellsChoose"] = ResolversParentTypes["OptionalFeatureAdditionalSpellsSpellsChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  fromFilter?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionalFeatureAdditionalSpellsSpells_MetaResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OptionalFeatureAdditionalSpellsSpells_meta"] = ResolversParentTypes["OptionalFeatureAdditionalSpellsSpells_meta"],
> = {
  longRest?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  resource?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  ritual?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionalFeatureConsumesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OptionalFeatureConsumes"] = ResolversParentTypes["OptionalFeatureConsumes"],
> = {
  amount?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionalFeatureEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OptionalFeatureEntries"] = ResolversParentTypes["OptionalFeatureEntries"],
> = {
  caption?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  colLabels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  colStyles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["OptionalFeatureEntriesItems"]>>>,
    ParentType,
    ContextType
  >;
  rows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["OptionalFeatureEntriesRowsList"]>>>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionalFeatureEntriesItemsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OptionalFeatureEntriesItems"] = ResolversParentTypes["OptionalFeatureEntriesItems"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionalFeatureEntriesRowsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OptionalFeatureEntriesRows"] = ResolversParentTypes["OptionalFeatureEntriesRows"],
> = {
  _0?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionalFeatureEntriesRowsListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OptionalFeatureEntriesRowsList"] = ResolversParentTypes["OptionalFeatureEntriesRowsList"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["OptionalFeatureEntriesRows"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionalFeatureOptionalFeatureProgressionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OptionalFeatureOptionalFeatureProgression"] = ResolversParentTypes["OptionalFeatureOptionalFeatureProgression"],
> = {
  featureType?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  progression?: Resolver<
    Maybe<
      ResolversTypes["OptionalFeatureOptionalFeatureProgressionProgression"]
    >,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionalFeatureOptionalFeatureProgressionProgressionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OptionalFeatureOptionalFeatureProgressionProgression"] = ResolversParentTypes["OptionalFeatureOptionalFeatureProgressionProgression"],
> = {
  _?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionalFeaturePrerequisiteResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OptionalFeaturePrerequisite"] = ResolversParentTypes["OptionalFeaturePrerequisite"],
> = {
  class?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  item?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  level?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  pact?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  spell?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  subclass?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OptionalFeatureSkillProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["OptionalFeatureSkillProficiencies"] = ResolversParentTypes["OptionalFeatureSkillProficiencies"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  backgrounds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Background"]>>>,
    ParentType,
    ContextType
  >;
  baseItems?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["BaseItem"]>>>,
    ParentType,
    ContextType
  >;
  books?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Book"]>>>,
    ParentType,
    ContextType
  >;
  cards?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Card"]>>>,
    ParentType,
    ContextType
  >;
  classFeatures?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ClassFeature"]>>>,
    ParentType,
    ContextType
  >;
  classes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Class"]>>>,
    ParentType,
    ContextType
  >;
  decks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Deck"]>>>,
    ParentType,
    ContextType
  >;
  feats?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Feat"]>>>,
    ParentType,
    ContextType
  >;
  itemProperties?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ItemProperty"]>>>,
    ParentType,
    ContextType
  >;
  itemTypes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ItemType"]>>>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Item"]>>>,
    ParentType,
    ContextType
  >;
  languages?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Language"]>>>,
    ParentType,
    ContextType
  >;
  optionalFeatures?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["OptionalFeature"]>>>,
    ParentType,
    ContextType
  >;
  races?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Race"]>>>,
    ParentType,
    ContextType
  >;
  spells?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Spell"]>>>,
    ParentType,
    ContextType
  >;
  subclassFeatures?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassFeature"]>>>,
    ParentType,
    ContextType
  >;
  subclasses?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Subclass"]>>>,
    ParentType,
    ContextType
  >;
  subraces?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Subrace"]>>>,
    ParentType,
    ContextType
  >;
  vehicles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Vehicle"]>>>,
    ParentType,
    ContextType
  >;
};

export type RaceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Race"] = ResolversParentTypes["Race"],
> = {
  ability?: Resolver<
    Maybe<ResolversTypes["RaceAbility"]>,
    ParentType,
    ContextType
  >;
  additionalSpells?: Resolver<
    Maybe<ResolversTypes["RaceAdditionalSpells"]>,
    ParentType,
    ContextType
  >;
  armorProficiencies?: Resolver<
    Maybe<ResolversTypes["RaceArmorProficiencies"]>,
    ParentType,
    ContextType
  >;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RaceEntries"]>>>,
    ParentType,
    ContextType
  >;
  feats?: Resolver<Maybe<ResolversTypes["RaceFeats"]>, ParentType, ContextType>;
  languageProficiencies?: Resolver<
    Maybe<ResolversTypes["RaceLanguageProficiencies"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  size?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  skillProficiencies?: Resolver<
    Maybe<ResolversTypes["RaceSkillProficiencies"]>,
    ParentType,
    ContextType
  >;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  speed?: Resolver<Maybe<ResolversTypes["RaceSpeed"]>, ParentType, ContextType>;
  toolProficiencies?: Resolver<
    Maybe<ResolversTypes["RaceToolProficiencies"]>,
    ParentType,
    ContextType
  >;
  weaponProficiencies?: Resolver<
    Maybe<ResolversTypes["RaceWeaponProficiencies"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceAbilityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceAbility"] = ResolversParentTypes["RaceAbility"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["RaceAbilityChoose"]>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceAbilityChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceAbilityChoose"] = ResolversParentTypes["RaceAbilityChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceAdditionalSpellsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceAdditionalSpells"] = ResolversParentTypes["RaceAdditionalSpells"],
> = {
  spellcastingAbility?: Resolver<
    Maybe<ResolversTypes["RaceAdditionalSpellsSpellcastingAbility"]>,
    ParentType,
    ContextType
  >;
  spells?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RaceAdditionalSpellsSpells"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceAdditionalSpellsSpellcastingAbilityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceAdditionalSpellsSpellcastingAbility"] = ResolversParentTypes["RaceAdditionalSpellsSpellcastingAbility"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["RaceAdditionalSpellsSpellcastingAbilityChoose"]>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceAdditionalSpellsSpellcastingAbilityChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceAdditionalSpellsSpellcastingAbilityChoose"] = ResolversParentTypes["RaceAdditionalSpellsSpellcastingAbilityChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceAdditionalSpellsSpellsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceAdditionalSpellsSpells"] = ResolversParentTypes["RaceAdditionalSpellsSpells"],
> = {
  _meta?: Resolver<
    Maybe<ResolversTypes["RaceAdditionalSpellsSpells_meta"]>,
    ParentType,
    ContextType
  >;
  choose?: Resolver<
    Maybe<ResolversTypes["RaceAdditionalSpellsSpellsChoose"]>,
    ParentType,
    ContextType
  >;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceAdditionalSpellsSpellsChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceAdditionalSpellsSpellsChoose"] = ResolversParentTypes["RaceAdditionalSpellsSpellsChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  fromFilter?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceAdditionalSpellsSpells_MetaResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceAdditionalSpellsSpells_meta"] = ResolversParentTypes["RaceAdditionalSpellsSpells_meta"],
> = {
  level?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  longRest?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceArmorProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceArmorProficiencies"] = ResolversParentTypes["RaceArmorProficiencies"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceEntries"] = ResolversParentTypes["RaceEntries"],
> = {
  caption?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  children?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  colLabels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  colStyles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RaceEntriesItems"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  rows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RaceEntriesRowsList"]>>>,
    ParentType,
    ContextType
  >;
  style?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceEntriesItemsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceEntriesItems"] = ResolversParentTypes["RaceEntriesItems"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceEntriesRowsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceEntriesRows"] = ResolversParentTypes["RaceEntriesRows"],
> = {
  _0?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _2?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceEntriesRowsListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceEntriesRowsList"] = ResolversParentTypes["RaceEntriesRowsList"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["RaceEntriesRows"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceFeatsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceFeats"] = ResolversParentTypes["RaceFeats"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceLanguageProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceLanguageProficiencies"] = ResolversParentTypes["RaceLanguageProficiencies"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["RaceLanguageProficienciesChoose"]>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceLanguageProficienciesChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceLanguageProficienciesChoose"] = ResolversParentTypes["RaceLanguageProficienciesChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceSkillProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceSkillProficiencies"] = ResolversParentTypes["RaceSkillProficiencies"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["RaceSkillProficienciesChoose"]>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceSkillProficienciesChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceSkillProficienciesChoose"] = ResolversParentTypes["RaceSkillProficienciesChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceSpeedResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceSpeed"] = ResolversParentTypes["RaceSpeed"],
> = {
  climb?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  fly?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  swim?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  walk?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceToolProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceToolProficiencies"] = ResolversParentTypes["RaceToolProficiencies"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceWeaponProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceWeaponProficiencies"] = ResolversParentTypes["RaceWeaponProficiencies"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["RaceWeaponProficienciesChoose"]>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RaceWeaponProficienciesChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["RaceWeaponProficienciesChoose"] = ResolversParentTypes["RaceWeaponProficienciesChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  fromFilter?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpellResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Spell"] = ResolversParentTypes["Spell"],
> = {
  classes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  components?: Resolver<
    Maybe<ResolversTypes["SpellComponents"]>,
    ParentType,
    ContextType
  >;
  duration?: Resolver<
    Maybe<ResolversTypes["SpellDuration"]>,
    ParentType,
    ContextType
  >;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SpellEntries"]>>>,
    ParentType,
    ContextType
  >;
  higherLevel?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SpellHigherLevel"]>>>,
    ParentType,
    ContextType
  >;
  level?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  range?: Resolver<
    Maybe<ResolversTypes["SpellRange"]>,
    ParentType,
    ContextType
  >;
  ritual?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  school?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  time?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SpellTime"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpellComponentsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SpellComponents"] = ResolversParentTypes["SpellComponents"],
> = {
  m?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  s?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  v?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpellDurationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SpellDuration"] = ResolversParentTypes["SpellDuration"],
> = {
  concentration?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  duration?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpellEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SpellEntries"] = ResolversParentTypes["SpellEntries"],
> = {
  by?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  caption?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  children?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  colLabels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  colStyles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SpellEntriesItems"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  rows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SpellEntriesRowsList"]>>>,
    ParentType,
    ContextType
  >;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  style?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpellEntriesItemsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SpellEntriesItems"] = ResolversParentTypes["SpellEntriesItems"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpellEntriesRowsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SpellEntriesRows"] = ResolversParentTypes["SpellEntriesRows"],
> = {
  _0?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _2?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _3?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _4?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _5?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpellEntriesRowsListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SpellEntriesRowsList"] = ResolversParentTypes["SpellEntriesRowsList"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SpellEntriesRows"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpellHigherLevelResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SpellHigherLevel"] = ResolversParentTypes["SpellHigherLevel"],
> = {
  children?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpellRangeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SpellRange"] = ResolversParentTypes["SpellRange"],
> = {
  distance?: Resolver<
    Maybe<ResolversTypes["SpellRangeDistance"]>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpellRangeDistanceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SpellRangeDistance"] = ResolversParentTypes["SpellRangeDistance"],
> = {
  distance?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpellTimeResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SpellTime"] = ResolversParentTypes["SpellTime"],
> = {
  condition?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  number?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  unit?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Subclass"] = ResolversParentTypes["Subclass"],
> = {
  additionalSpells?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpells"]>>>,
    ParentType,
    ContextType
  >;
  cantripProgression?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  className?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  classSource?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  multiclassSlotsProgression?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  optionalFeatureProgression?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassOptionalFeatureProgression"]>>>,
    ParentType,
    ContextType
  >;
  shortName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  spellcastingAbility?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  spellsKnownProgression?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  subclassFeatures?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassSubclassFeatures"]>>>,
    ParentType,
    ContextType
  >;
  subclassTableGroups?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassSubclassTableGroups"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpells"] = ResolversParentTypes["SubclassAdditionalSpells"],
> = {
  expanded?: Resolver<
    Maybe<ResolversTypes["SubclassAdditionalSpellsExpanded"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  spellcastingAbility?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  spells?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsSpells"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpandedResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpanded"] = ResolversParentTypes["SubclassAdditionalSpellsExpanded"],
> = {
  _1?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsExpanded1"]>>>,
    ParentType,
    ContextType
  >;
  _3?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsExpanded3"]>>>,
    ParentType,
    ContextType
  >;
  _7?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsExpanded7"]>>>,
    ParentType,
    ContextType
  >;
  _9?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsExpanded9"]>>>,
    ParentType,
    ContextType
  >;
  _13?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsExpanded13"]>>>,
    ParentType,
    ContextType
  >;
  _19?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsExpanded19"]>>>,
    ParentType,
    ContextType
  >;
  s0?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsExpandedS0"]>>>,
    ParentType,
    ContextType
  >;
  s1?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsExpandedS1"]>>>,
    ParentType,
    ContextType
  >;
  s2?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsExpandedS2"]>>>,
    ParentType,
    ContextType
  >;
  s3?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsExpandedS3"]>>>,
    ParentType,
    ContextType
  >;
  s4?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsExpandedS4"]>>>,
    ParentType,
    ContextType
  >;
  s5?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsExpandedS5"]>>>,
    ParentType,
    ContextType
  >;
  s6?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsExpandedS6"]>>>,
    ParentType,
    ContextType
  >;
  s7?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsExpandedS7"]>>>,
    ParentType,
    ContextType
  >;
  s8?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsExpandedS8"]>>>,
    ParentType,
    ContextType
  >;
  s9?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassAdditionalSpellsExpandedS9"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpanded1Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpanded1"] = ResolversParentTypes["SubclassAdditionalSpellsExpanded1"],
> = {
  all?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpanded3Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpanded3"] = ResolversParentTypes["SubclassAdditionalSpellsExpanded3"],
> = {
  all?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpanded7Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpanded7"] = ResolversParentTypes["SubclassAdditionalSpellsExpanded7"],
> = {
  all?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpanded9Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpanded9"] = ResolversParentTypes["SubclassAdditionalSpellsExpanded9"],
> = {
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpanded13Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpanded13"] = ResolversParentTypes["SubclassAdditionalSpellsExpanded13"],
> = {
  all?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpanded19Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpanded19"] = ResolversParentTypes["SubclassAdditionalSpellsExpanded19"],
> = {
  all?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpandedS0Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpandedS0"] = ResolversParentTypes["SubclassAdditionalSpellsExpandedS0"],
> = {
  all?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpandedS1Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpandedS1"] = ResolversParentTypes["SubclassAdditionalSpellsExpandedS1"],
> = {
  all?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpandedS2Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpandedS2"] = ResolversParentTypes["SubclassAdditionalSpellsExpandedS2"],
> = {
  all?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpandedS3Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpandedS3"] = ResolversParentTypes["SubclassAdditionalSpellsExpandedS3"],
> = {
  all?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpandedS4Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpandedS4"] = ResolversParentTypes["SubclassAdditionalSpellsExpandedS4"],
> = {
  all?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpandedS5Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpandedS5"] = ResolversParentTypes["SubclassAdditionalSpellsExpandedS5"],
> = {
  all?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpandedS6Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpandedS6"] = ResolversParentTypes["SubclassAdditionalSpellsExpandedS6"],
> = {
  all?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpandedS7Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpandedS7"] = ResolversParentTypes["SubclassAdditionalSpellsExpandedS7"],
> = {
  all?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpandedS8Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpandedS8"] = ResolversParentTypes["SubclassAdditionalSpellsExpandedS8"],
> = {
  all?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsExpandedS9Resolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsExpandedS9"] = ResolversParentTypes["SubclassAdditionalSpellsExpandedS9"],
> = {
  all?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsSpellsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsSpells"] = ResolversParentTypes["SubclassAdditionalSpellsSpells"],
> = {
  _meta?: Resolver<
    Maybe<ResolversTypes["SubclassAdditionalSpellsSpells_meta"]>,
    ParentType,
    ContextType
  >;
  choose?: Resolver<
    Maybe<ResolversTypes["SubclassAdditionalSpellsSpellsChoose"]>,
    ParentType,
    ContextType
  >;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsSpellsChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsSpellsChoose"] = ResolversParentTypes["SubclassAdditionalSpellsSpellsChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  fromFilter?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassAdditionalSpellsSpells_MetaResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassAdditionalSpellsSpells_meta"] = ResolversParentTypes["SubclassAdditionalSpellsSpells_meta"],
> = {
  level?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  longRest?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  resource?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  ritual?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassFeatureResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassFeature"] = ResolversParentTypes["SubclassFeature"],
> = {
  className?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  classSource?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  consumes?: Resolver<
    Maybe<ResolversTypes["SubclassFeatureConsumes"]>,
    ParentType,
    ContextType
  >;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassFeatureEntries"]>>>,
    ParentType,
    ContextType
  >;
  isClassFeatureVariant?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  level?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  subclassShortName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  subclassSource?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassFeatureConsumesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassFeatureConsumes"] = ResolversParentTypes["SubclassFeatureConsumes"],
> = {
  amount?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassFeatureEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassFeatureEntries"] = ResolversParentTypes["SubclassFeatureEntries"],
> = {
  attributes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  caption?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  children?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  colLabels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  colStyles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  data?: Resolver<
    Maybe<ResolversTypes["SubclassFeatureEntriesData"]>,
    ParentType,
    ContextType
  >;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassFeatureEntriesItems"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  optionalfeature?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  parentId?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  rows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassFeatureEntriesRowsList"]>>>,
    ParentType,
    ContextType
  >;
  style?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  subclassFeature?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassFeatureEntriesDataResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassFeatureEntriesData"] = ResolversParentTypes["SubclassFeatureEntriesData"],
> = {
  isRequiredOption?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  tableInclude?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassFeatureEntriesItemsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassFeatureEntriesItems"] = ResolversParentTypes["SubclassFeatureEntriesItems"],
> = {
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassFeatureEntriesItemsEntries"]>>>,
    ParentType,
    ContextType
  >;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  subclassFeature?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassFeatureEntriesItemsEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassFeatureEntriesItemsEntries"] = ResolversParentTypes["SubclassFeatureEntriesItemsEntries"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassFeatureEntriesRowsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassFeatureEntriesRows"] = ResolversParentTypes["SubclassFeatureEntriesRows"],
> = {
  _0?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _2?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _3?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _4?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _5?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassFeatureEntriesRowsListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassFeatureEntriesRowsList"] = ResolversParentTypes["SubclassFeatureEntriesRowsList"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassFeatureEntriesRows"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassOptionalFeatureProgressionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassOptionalFeatureProgression"] = ResolversParentTypes["SubclassOptionalFeatureProgression"],
> = {
  featureType?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  progression?: Resolver<
    Maybe<ResolversTypes["SubclassOptionalFeatureProgressionProgression"]>,
    ParentType,
    ContextType
  >;
  required?: Resolver<
    Maybe<ResolversTypes["SubclassOptionalFeatureProgressionRequired"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassOptionalFeatureProgressionProgressionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassOptionalFeatureProgressionProgression"] = ResolversParentTypes["SubclassOptionalFeatureProgressionProgression"],
> = {
  _3?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _6?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _7?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _10?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _11?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _15?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _17?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _18?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassOptionalFeatureProgressionRequiredResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassOptionalFeatureProgressionRequired"] = ResolversParentTypes["SubclassOptionalFeatureProgressionRequired"],
> = {
  _3?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassSubclassFeaturesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassSubclassFeatures"] = ResolversParentTypes["SubclassSubclassFeatures"],
> = {
  className?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  featureName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  level?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  subclassName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassSubclassTableGroupsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassSubclassTableGroups"] = ResolversParentTypes["SubclassSubclassTableGroups"],
> = {
  colLabels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  rows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassSubclassTableGroupsRowsList"]>>>,
    ParentType,
    ContextType
  >;
  rowsSpellProgression?: Resolver<
    Maybe<
      Array<
        Maybe<
          ResolversTypes["SubclassSubclassTableGroupsRowsSpellProgressionList"]
        >
      >
    >,
    ParentType,
    ContextType
  >;
  subclasses?: Resolver<
    Maybe<
      Array<Maybe<ResolversTypes["SubclassSubclassTableGroupsSubclasses"]>>
    >,
    ParentType,
    ContextType
  >;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassSubclassTableGroupsRowsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassSubclassTableGroupsRows"] = ResolversParentTypes["SubclassSubclassTableGroupsRows"],
> = {
  _0?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassSubclassTableGroupsRowsListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassSubclassTableGroupsRowsList"] = ResolversParentTypes["SubclassSubclassTableGroupsRowsList"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubclassSubclassTableGroupsRows"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassSubclassTableGroupsRowsSpellProgressionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassSubclassTableGroupsRowsSpellProgression"] = ResolversParentTypes["SubclassSubclassTableGroupsRowsSpellProgression"],
> = {
  _0?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _1?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _2?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  _3?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassSubclassTableGroupsRowsSpellProgressionListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassSubclassTableGroupsRowsSpellProgressionList"] = ResolversParentTypes["SubclassSubclassTableGroupsRowsSpellProgressionList"],
> = {
  items?: Resolver<
    Maybe<
      Array<
        Maybe<ResolversTypes["SubclassSubclassTableGroupsRowsSpellProgression"]>
      >
    >,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubclassSubclassTableGroupsSubclassesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubclassSubclassTableGroupsSubclasses"] = ResolversParentTypes["SubclassSubclassTableGroupsSubclasses"],
> = {
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Subrace"] = ResolversParentTypes["Subrace"],
> = {
  ability?: Resolver<
    Maybe<ResolversTypes["SubraceAbility"]>,
    ParentType,
    ContextType
  >;
  additionalSpells?: Resolver<
    Maybe<ResolversTypes["SubraceAdditionalSpells"]>,
    ParentType,
    ContextType
  >;
  armorProficiencies?: Resolver<
    Maybe<ResolversTypes["SubraceArmorProficiencies"]>,
    ParentType,
    ContextType
  >;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubraceEntries"]>>>,
    ParentType,
    ContextType
  >;
  feats?: Resolver<
    Maybe<ResolversTypes["SubraceFeats"]>,
    ParentType,
    ContextType
  >;
  languageProficiencies?: Resolver<
    Maybe<ResolversTypes["SubraceLanguageProficiencies"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  overwrite?: Resolver<
    Maybe<ResolversTypes["SubraceOverwrite"]>,
    ParentType,
    ContextType
  >;
  raceName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  raceSource?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  skillProficiencies?: Resolver<
    Maybe<ResolversTypes["SubraceSkillProficiencies"]>,
    ParentType,
    ContextType
  >;
  skillToolLanguageProficiencies?: Resolver<
    Maybe<ResolversTypes["SubraceSkillToolLanguageProficiencies"]>,
    ParentType,
    ContextType
  >;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  speed?: Resolver<
    Maybe<ResolversTypes["SubraceSpeed"]>,
    ParentType,
    ContextType
  >;
  toolProficiencies?: Resolver<
    Maybe<ResolversTypes["SubraceToolProficiencies"]>,
    ParentType,
    ContextType
  >;
  weaponProficiencies?: Resolver<
    Maybe<ResolversTypes["SubraceWeaponProficiencies"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceAbilityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceAbility"] = ResolversParentTypes["SubraceAbility"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["SubraceAbilityChoose"]>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceAbilityChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceAbilityChoose"] = ResolversParentTypes["SubraceAbilityChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceAdditionalSpellsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceAdditionalSpells"] = ResolversParentTypes["SubraceAdditionalSpells"],
> = {
  spellcastingAbility?: Resolver<
    Maybe<ResolversTypes["SubraceAdditionalSpellsSpellcastingAbility"]>,
    ParentType,
    ContextType
  >;
  spells?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubraceAdditionalSpellsSpells"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceAdditionalSpellsSpellcastingAbilityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceAdditionalSpellsSpellcastingAbility"] = ResolversParentTypes["SubraceAdditionalSpellsSpellcastingAbility"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["SubraceAdditionalSpellsSpellcastingAbilityChoose"]>,
    ParentType,
    ContextType
  >;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceAdditionalSpellsSpellcastingAbilityChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceAdditionalSpellsSpellcastingAbilityChoose"] = ResolversParentTypes["SubraceAdditionalSpellsSpellcastingAbilityChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceAdditionalSpellsSpellsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceAdditionalSpellsSpells"] = ResolversParentTypes["SubraceAdditionalSpellsSpells"],
> = {
  _meta?: Resolver<
    Maybe<ResolversTypes["SubraceAdditionalSpellsSpells_meta"]>,
    ParentType,
    ContextType
  >;
  choose?: Resolver<
    Maybe<ResolversTypes["SubraceAdditionalSpellsSpellsChoose"]>,
    ParentType,
    ContextType
  >;
  item?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceAdditionalSpellsSpellsChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceAdditionalSpellsSpellsChoose"] = ResolversParentTypes["SubraceAdditionalSpellsSpellsChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  fromFilter?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceAdditionalSpellsSpells_MetaResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceAdditionalSpellsSpells_meta"] = ResolversParentTypes["SubraceAdditionalSpellsSpells_meta"],
> = {
  level?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  longRest?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  shortRest?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceArmorProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceArmorProficiencies"] = ResolversParentTypes["SubraceArmorProficiencies"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceEntries"] = ResolversParentTypes["SubraceEntries"],
> = {
  caption?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  children?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Int"]>>>,
    ParentType,
    ContextType
  >;
  colLabels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  colStyles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  data?: Resolver<
    Maybe<ResolversTypes["SubraceEntriesData"]>,
    ParentType,
    ContextType
  >;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubraceEntriesItems"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  rows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubraceEntriesRowsList"]>>>,
    ParentType,
    ContextType
  >;
  style?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceEntriesDataResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceEntriesData"] = ResolversParentTypes["SubraceEntriesData"],
> = {
  overwrite?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceEntriesItemsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceEntriesItems"] = ResolversParentTypes["SubraceEntriesItems"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceEntriesRowsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceEntriesRows"] = ResolversParentTypes["SubraceEntriesRows"],
> = {
  _0?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceEntriesRowsListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceEntriesRowsList"] = ResolversParentTypes["SubraceEntriesRowsList"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["SubraceEntriesRows"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceFeatsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceFeats"] = ResolversParentTypes["SubraceFeats"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceLanguageProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceLanguageProficiencies"] = ResolversParentTypes["SubraceLanguageProficiencies"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceOverwriteResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceOverwrite"] = ResolversParentTypes["SubraceOverwrite"],
> = {
  ability?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  languageProficiencies?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  skillProficiencies?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceSkillProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceSkillProficiencies"] = ResolversParentTypes["SubraceSkillProficiencies"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceSkillToolLanguageProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceSkillToolLanguageProficiencies"] = ResolversParentTypes["SubraceSkillToolLanguageProficiencies"],
> = {
  choose?: Resolver<
    Maybe<ResolversTypes["SubraceSkillToolLanguageProficienciesChoose"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceSkillToolLanguageProficienciesChooseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceSkillToolLanguageProficienciesChoose"] = ResolversParentTypes["SubraceSkillToolLanguageProficienciesChoose"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  from?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceSpeedResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceSpeed"] = ResolversParentTypes["SubraceSpeed"],
> = {
  fly?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  swim?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  walk?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceToolProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceToolProficiencies"] = ResolversParentTypes["SubraceToolProficiencies"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubraceWeaponProficienciesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["SubraceWeaponProficiencies"] = ResolversParentTypes["SubraceWeaponProficiencies"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Vehicle"] = ResolversParentTypes["Vehicle"],
> = {
  ability?: Resolver<
    Maybe<ResolversTypes["VehicleAbility"]>,
    ParentType,
    ContextType
  >;
  actions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VehicleActions"]>>>,
    ParentType,
    ContextType
  >;
  armorClass?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  conditionImmunities?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  controls?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VehicleControls"]>>>,
    ParentType,
    ContextType
  >;
  damageImmunities?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  dimensions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VehicleEntries"]>>>,
    ParentType,
    ContextType
  >;
  health?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  maxCargo?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  maxCrew?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  maxCrewNote?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  maxPassengers?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  movements?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VehicleMovements"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  pace?: Resolver<
    Maybe<ResolversTypes["VehiclePace"]>,
    ParentType,
    ContextType
  >;
  size?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  speed?: Resolver<
    Maybe<ResolversTypes["VehicleSpeed"]>,
    ParentType,
    ContextType
  >;
  weapons?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VehicleWeapons"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleAbilityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleAbility"] = ResolversParentTypes["VehicleAbility"],
> = {
  cha?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  con?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  dex?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  int?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  str?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  wis?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleActionsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleActions"] = ResolversParentTypes["VehicleActions"],
> = {
  caption?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  colLabels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  colStyles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  rows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VehicleActionsRowsList"]>>>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleActionsRowsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleActionsRows"] = ResolversParentTypes["VehicleActionsRows"],
> = {
  _0?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _2?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleActionsRowsListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleActionsRowsList"] = ResolversParentTypes["VehicleActionsRowsList"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VehicleActionsRows"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleControlsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleControls"] = ResolversParentTypes["VehicleControls"],
> = {
  armorClass?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VehicleControlsEntries"]>>>,
    ParentType,
    ContextType
  >;
  health?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleControlsEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleControlsEntries"] = ResolversParentTypes["VehicleControlsEntries"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleEntries"] = ResolversParentTypes["VehicleEntries"],
> = {
  caption?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  colLabels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  colStyles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  rows?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VehicleEntriesRowsList"]>>>,
    ParentType,
    ContextType
  >;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleEntriesRowsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleEntriesRows"] = ResolversParentTypes["VehicleEntriesRows"],
> = {
  _0?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _1?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  _2?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleEntriesRowsListResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleEntriesRowsList"] = ResolversParentTypes["VehicleEntriesRowsList"],
> = {
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VehicleEntriesRows"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleMovementsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleMovements"] = ResolversParentTypes["VehicleMovements"],
> = {
  armorClass?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  health?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  healthNote?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  speed?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VehicleMovementsSpeed"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleMovementsSpeedResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleMovementsSpeed"] = ResolversParentTypes["VehicleMovementsSpeed"],
> = {
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VehicleMovementsSpeedEntries"]>>>,
    ParentType,
    ContextType
  >;
  mode?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleMovementsSpeedEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleMovementsSpeedEntries"] = ResolversParentTypes["VehicleMovementsSpeedEntries"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehiclePaceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehiclePace"] = ResolversParentTypes["VehiclePace"],
> = {
  fly?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  swim?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  walk?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleSpeedResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleSpeed"] = ResolversParentTypes["VehicleSpeed"],
> = {
  fly?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  swim?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  walk?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleWeaponsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleWeapons"] = ResolversParentTypes["VehicleWeapons"],
> = {
  actions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VehicleWeaponsActions"]>>>,
    ParentType,
    ContextType
  >;
  armorClass?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  crew?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VehicleWeaponsEntries"]>>>,
    ParentType,
    ContextType
  >;
  health?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleWeaponsActionsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleWeaponsActions"] = ResolversParentTypes["VehicleWeaponsActions"],
> = {
  entries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VehicleWeaponsActionsEntries"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleWeaponsActionsEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleWeaponsActionsEntries"] = ResolversParentTypes["VehicleWeaponsActionsEntries"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleWeaponsEntriesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleWeaponsEntries"] = ResolversParentTypes["VehicleWeaponsEntries"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  items?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VehicleWeaponsEntriesItems"]>>>,
    ParentType,
    ContextType
  >;
  style?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VehicleWeaponsEntriesItemsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["VehicleWeaponsEntriesItems"] = ResolversParentTypes["VehicleWeaponsEntriesItems"],
> = {
  entry?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Background?: BackgroundResolvers<ContextType>;
  BackgroundAdditionalSpells?: BackgroundAdditionalSpellsResolvers<ContextType>;
  BackgroundAdditionalSpellsExpanded?: BackgroundAdditionalSpellsExpandedResolvers<ContextType>;
  BackgroundEntries?: BackgroundEntriesResolvers<ContextType>;
  BackgroundEntriesData?: BackgroundEntriesDataResolvers<ContextType>;
  BackgroundEntriesItems?: BackgroundEntriesItemsResolvers<ContextType>;
  BackgroundEntriesRows?: BackgroundEntriesRowsResolvers<ContextType>;
  BackgroundEntriesRowsList?: BackgroundEntriesRowsListResolvers<ContextType>;
  BackgroundFeats?: BackgroundFeatsResolvers<ContextType>;
  BackgroundLanguageProficiencies?: BackgroundLanguageProficienciesResolvers<ContextType>;
  BackgroundLanguageProficienciesChoose?: BackgroundLanguageProficienciesChooseResolvers<ContextType>;
  BackgroundSkillProficiencies?: BackgroundSkillProficienciesResolvers<ContextType>;
  BackgroundSkillProficienciesChoose?: BackgroundSkillProficienciesChooseResolvers<ContextType>;
  BackgroundStartingEquipment?: BackgroundStartingEquipmentResolvers<ContextType>;
  BackgroundStartingEquipmentA?: BackgroundStartingEquipmentAResolvers<ContextType>;
  BackgroundStartingEquipmentB?: BackgroundStartingEquipmentBResolvers<ContextType>;
  BackgroundStartingEquipmentC?: BackgroundStartingEquipmentCResolvers<ContextType>;
  BackgroundStartingEquipmentD?: BackgroundStartingEquipmentDResolvers<ContextType>;
  BackgroundStartingEquipment_?: BackgroundStartingEquipment_Resolvers<ContextType>;
  BackgroundToolProficiencies?: BackgroundToolProficienciesResolvers<ContextType>;
  BackgroundToolProficienciesChoose?: BackgroundToolProficienciesChooseResolvers<ContextType>;
  BaseItem?: BaseItemResolvers<ContextType>;
  BaseItemDamage?: BaseItemDamageResolvers<ContextType>;
  BaseItemEntries?: BaseItemEntriesResolvers<ContextType>;
  BaseItemPackContents?: BaseItemPackContentsResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  Card?: CardResolvers<ContextType>;
  CardEntries?: CardEntriesResolvers<ContextType>;
  Class?: ClassResolvers<ContextType>;
  ClassAdditionalSpells?: ClassAdditionalSpellsResolvers<ContextType>;
  ClassAdditionalSpellsSpells?: ClassAdditionalSpellsSpellsResolvers<ContextType>;
  ClassAdditionalSpellsSpellsChoose?: ClassAdditionalSpellsSpellsChooseResolvers<ContextType>;
  ClassAdditionalSpellsSpells_meta?: ClassAdditionalSpellsSpells_MetaResolvers<ContextType>;
  ClassArmorProficiencies?: ClassArmorProficienciesResolvers<ContextType>;
  ClassClassFeatures?: ClassClassFeaturesResolvers<ContextType>;
  ClassClassTableGroups?: ClassClassTableGroupsResolvers<ContextType>;
  ClassClassTableGroupsRows?: ClassClassTableGroupsRowsResolvers<ContextType>;
  ClassClassTableGroupsRowsList?: ClassClassTableGroupsRowsListResolvers<ContextType>;
  ClassClassTableGroupsRowsSpellProgression?: ClassClassTableGroupsRowsSpellProgressionResolvers<ContextType>;
  ClassClassTableGroupsRowsSpellProgressionList?: ClassClassTableGroupsRowsSpellProgressionListResolvers<ContextType>;
  ClassFeature?: ClassFeatureResolvers<ContextType>;
  ClassFeatureConsumes?: ClassFeatureConsumesResolvers<ContextType>;
  ClassFeatureEntries?: ClassFeatureEntriesResolvers<ContextType>;
  ClassFeatureEntriesItems?: ClassFeatureEntriesItemsResolvers<ContextType>;
  ClassFeatureEntriesRows?: ClassFeatureEntriesRowsResolvers<ContextType>;
  ClassFeatureEntriesRowsList?: ClassFeatureEntriesRowsListResolvers<ContextType>;
  ClassHitDie?: ClassHitDieResolvers<ContextType>;
  ClassMulticlassing?: ClassMulticlassingResolvers<ContextType>;
  ClassMulticlassingProficienciesGained?: ClassMulticlassingProficienciesGainedResolvers<ContextType>;
  ClassMulticlassingProficienciesGainedArmor?: ClassMulticlassingProficienciesGainedArmorResolvers<ContextType>;
  ClassMulticlassingProficienciesGainedSkills?: ClassMulticlassingProficienciesGainedSkillsResolvers<ContextType>;
  ClassMulticlassingProficienciesGainedSkillsChoose?: ClassMulticlassingProficienciesGainedSkillsChooseResolvers<ContextType>;
  ClassMulticlassingProficienciesGainedTools?: ClassMulticlassingProficienciesGainedToolsResolvers<ContextType>;
  ClassMulticlassingProficienciesGainedWeapons?: ClassMulticlassingProficienciesGainedWeaponsResolvers<ContextType>;
  ClassMulticlassingRequirements?: ClassMulticlassingRequirementsResolvers<ContextType>;
  ClassMulticlassingRequirementsOr?: ClassMulticlassingRequirementsOrResolvers<ContextType>;
  ClassOptionalFeatureProgression?: ClassOptionalFeatureProgressionResolvers<ContextType>;
  ClassOptionalFeatureProgressionProgression?: ClassOptionalFeatureProgressionProgressionResolvers<ContextType>;
  ClassSkillProficiencies?: ClassSkillProficienciesResolvers<ContextType>;
  ClassSkillProficienciesChoose?: ClassSkillProficienciesChooseResolvers<ContextType>;
  ClassStartingEquipment?: ClassStartingEquipmentResolvers<ContextType>;
  ClassStartingEquipmentA?: ClassStartingEquipmentAResolvers<ContextType>;
  ClassStartingEquipmentB?: ClassStartingEquipmentBResolvers<ContextType>;
  ClassStartingEquipmentC?: ClassStartingEquipmentCResolvers<ContextType>;
  ClassStartingEquipment_?: ClassStartingEquipment_Resolvers<ContextType>;
  ClassToolProficiencies?: ClassToolProficienciesResolvers<ContextType>;
  ClassToolProficienciesChoose?: ClassToolProficienciesChooseResolvers<ContextType>;
  ClassWeaponProficiencies?: ClassWeaponProficienciesResolvers<ContextType>;
  Deck?: DeckResolvers<ContextType>;
  DeckEntries?: DeckEntriesResolvers<ContextType>;
  DeckEntriesRows?: DeckEntriesRowsResolvers<ContextType>;
  DeckEntriesRowsList?: DeckEntriesRowsListResolvers<ContextType>;
  DeckEntriesRowsList0?: DeckEntriesRowsList0Resolvers<ContextType>;
  DeckEntriesRowsList0Roll?: DeckEntriesRowsList0RollResolvers<ContextType>;
  Feat?: FeatResolvers<ContextType>;
  FeatAbility?: FeatAbilityResolvers<ContextType>;
  FeatAbilityChoose?: FeatAbilityChooseResolvers<ContextType>;
  FeatAdditionalSpells?: FeatAdditionalSpellsResolvers<ContextType>;
  FeatAdditionalSpellsSpellcastingAbility?: FeatAdditionalSpellsSpellcastingAbilityResolvers<ContextType>;
  FeatAdditionalSpellsSpellcastingAbilityChoose?: FeatAdditionalSpellsSpellcastingAbilityChooseResolvers<ContextType>;
  FeatAdditionalSpellsSpells?: FeatAdditionalSpellsSpellsResolvers<ContextType>;
  FeatAdditionalSpellsSpellsChoose?: FeatAdditionalSpellsSpellsChooseResolvers<ContextType>;
  FeatAdditionalSpellsSpells_meta?: FeatAdditionalSpellsSpells_MetaResolvers<ContextType>;
  FeatArmorProficiencies?: FeatArmorProficienciesResolvers<ContextType>;
  FeatEntries?: FeatEntriesResolvers<ContextType>;
  FeatEntriesItems?: FeatEntriesItemsResolvers<ContextType>;
  FeatEntriesItemsEntries?: FeatEntriesItemsEntriesResolvers<ContextType>;
  FeatEntriesRows?: FeatEntriesRowsResolvers<ContextType>;
  FeatEntriesRowsList?: FeatEntriesRowsListResolvers<ContextType>;
  FeatExpertise?: FeatExpertiseResolvers<ContextType>;
  FeatLanguageProficiencies?: FeatLanguageProficienciesResolvers<ContextType>;
  FeatOptionalFeatureProgression?: FeatOptionalFeatureProgressionResolvers<ContextType>;
  FeatOptionalFeatureProgressionProgression?: FeatOptionalFeatureProgressionProgressionResolvers<ContextType>;
  FeatPrerequisite?: FeatPrerequisiteResolvers<ContextType>;
  FeatPrerequisiteAbility?: FeatPrerequisiteAbilityResolvers<ContextType>;
  FeatPrerequisiteProficiency?: FeatPrerequisiteProficiencyResolvers<ContextType>;
  FeatPrerequisiteRace?: FeatPrerequisiteRaceResolvers<ContextType>;
  FeatSavingThrowProficiencies?: FeatSavingThrowProficienciesResolvers<ContextType>;
  FeatSavingThrowProficienciesChoose?: FeatSavingThrowProficienciesChooseResolvers<ContextType>;
  FeatSkillProficiencies?: FeatSkillProficienciesResolvers<ContextType>;
  FeatSkillProficienciesChoose?: FeatSkillProficienciesChooseResolvers<ContextType>;
  FeatSkillToolLanguageProficiencies?: FeatSkillToolLanguageProficienciesResolvers<ContextType>;
  FeatSkillToolLanguageProficienciesChoose?: FeatSkillToolLanguageProficienciesChooseResolvers<ContextType>;
  FeatToolProficiencies?: FeatToolProficienciesResolvers<ContextType>;
  FeatWeaponProficiencies?: FeatWeaponProficienciesResolvers<ContextType>;
  FeatWeaponProficienciesChoose?: FeatWeaponProficienciesChooseResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  ItemAttunedBy?: ItemAttunedByResolvers<ContextType>;
  ItemBonusSavingThrow?: ItemBonusSavingThrowResolvers<ContextType>;
  ItemDamage?: ItemDamageResolvers<ContextType>;
  ItemEntries?: ItemEntriesResolvers<ContextType>;
  ItemEntriesItems?: ItemEntriesItemsResolvers<ContextType>;
  ItemEntriesRows?: ItemEntriesRowsResolvers<ContextType>;
  ItemEntriesRowsList?: ItemEntriesRowsListResolvers<ContextType>;
  ItemModifyAbility?: ItemModifyAbilityResolvers<ContextType>;
  ItemModifyAbilityChoose?: ItemModifyAbilityChooseResolvers<ContextType>;
  ItemModifyAbilityStatic?: ItemModifyAbilityStaticResolvers<ContextType>;
  ItemModifySpeed?: ItemModifySpeedResolvers<ContextType>;
  ItemModifySpeedEqual?: ItemModifySpeedEqualResolvers<ContextType>;
  ItemModifySpeedMultiply?: ItemModifySpeedMultiplyResolvers<ContextType>;
  ItemModifySpeedStatic?: ItemModifySpeedStaticResolvers<ContextType>;
  ItemPackContents?: ItemPackContentsResolvers<ContextType>;
  ItemProperty?: ItemPropertyResolvers<ContextType>;
  ItemPropertyEntries?: ItemPropertyEntriesResolvers<ContextType>;
  ItemType?: ItemTypeResolvers<ContextType>;
  ItemTypeEntries?: ItemTypeEntriesResolvers<ContextType>;
  ItemTypeEntriesRows?: ItemTypeEntriesRowsResolvers<ContextType>;
  ItemTypeEntriesRowsList?: ItemTypeEntriesRowsListResolvers<ContextType>;
  Language?: LanguageResolvers<ContextType>;
  OptionalFeature?: OptionalFeatureResolvers<ContextType>;
  OptionalFeatureAdditionalSpells?: OptionalFeatureAdditionalSpellsResolvers<ContextType>;
  OptionalFeatureAdditionalSpellsSpellcastingAbility?: OptionalFeatureAdditionalSpellsSpellcastingAbilityResolvers<ContextType>;
  OptionalFeatureAdditionalSpellsSpells?: OptionalFeatureAdditionalSpellsSpellsResolvers<ContextType>;
  OptionalFeatureAdditionalSpellsSpellsChoose?: OptionalFeatureAdditionalSpellsSpellsChooseResolvers<ContextType>;
  OptionalFeatureAdditionalSpellsSpells_meta?: OptionalFeatureAdditionalSpellsSpells_MetaResolvers<ContextType>;
  OptionalFeatureConsumes?: OptionalFeatureConsumesResolvers<ContextType>;
  OptionalFeatureEntries?: OptionalFeatureEntriesResolvers<ContextType>;
  OptionalFeatureEntriesItems?: OptionalFeatureEntriesItemsResolvers<ContextType>;
  OptionalFeatureEntriesRows?: OptionalFeatureEntriesRowsResolvers<ContextType>;
  OptionalFeatureEntriesRowsList?: OptionalFeatureEntriesRowsListResolvers<ContextType>;
  OptionalFeatureOptionalFeatureProgression?: OptionalFeatureOptionalFeatureProgressionResolvers<ContextType>;
  OptionalFeatureOptionalFeatureProgressionProgression?: OptionalFeatureOptionalFeatureProgressionProgressionResolvers<ContextType>;
  OptionalFeaturePrerequisite?: OptionalFeaturePrerequisiteResolvers<ContextType>;
  OptionalFeatureSkillProficiencies?: OptionalFeatureSkillProficienciesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Race?: RaceResolvers<ContextType>;
  RaceAbility?: RaceAbilityResolvers<ContextType>;
  RaceAbilityChoose?: RaceAbilityChooseResolvers<ContextType>;
  RaceAdditionalSpells?: RaceAdditionalSpellsResolvers<ContextType>;
  RaceAdditionalSpellsSpellcastingAbility?: RaceAdditionalSpellsSpellcastingAbilityResolvers<ContextType>;
  RaceAdditionalSpellsSpellcastingAbilityChoose?: RaceAdditionalSpellsSpellcastingAbilityChooseResolvers<ContextType>;
  RaceAdditionalSpellsSpells?: RaceAdditionalSpellsSpellsResolvers<ContextType>;
  RaceAdditionalSpellsSpellsChoose?: RaceAdditionalSpellsSpellsChooseResolvers<ContextType>;
  RaceAdditionalSpellsSpells_meta?: RaceAdditionalSpellsSpells_MetaResolvers<ContextType>;
  RaceArmorProficiencies?: RaceArmorProficienciesResolvers<ContextType>;
  RaceEntries?: RaceEntriesResolvers<ContextType>;
  RaceEntriesItems?: RaceEntriesItemsResolvers<ContextType>;
  RaceEntriesRows?: RaceEntriesRowsResolvers<ContextType>;
  RaceEntriesRowsList?: RaceEntriesRowsListResolvers<ContextType>;
  RaceFeats?: RaceFeatsResolvers<ContextType>;
  RaceLanguageProficiencies?: RaceLanguageProficienciesResolvers<ContextType>;
  RaceLanguageProficienciesChoose?: RaceLanguageProficienciesChooseResolvers<ContextType>;
  RaceSkillProficiencies?: RaceSkillProficienciesResolvers<ContextType>;
  RaceSkillProficienciesChoose?: RaceSkillProficienciesChooseResolvers<ContextType>;
  RaceSpeed?: RaceSpeedResolvers<ContextType>;
  RaceToolProficiencies?: RaceToolProficienciesResolvers<ContextType>;
  RaceWeaponProficiencies?: RaceWeaponProficienciesResolvers<ContextType>;
  RaceWeaponProficienciesChoose?: RaceWeaponProficienciesChooseResolvers<ContextType>;
  Spell?: SpellResolvers<ContextType>;
  SpellComponents?: SpellComponentsResolvers<ContextType>;
  SpellDuration?: SpellDurationResolvers<ContextType>;
  SpellEntries?: SpellEntriesResolvers<ContextType>;
  SpellEntriesItems?: SpellEntriesItemsResolvers<ContextType>;
  SpellEntriesRows?: SpellEntriesRowsResolvers<ContextType>;
  SpellEntriesRowsList?: SpellEntriesRowsListResolvers<ContextType>;
  SpellHigherLevel?: SpellHigherLevelResolvers<ContextType>;
  SpellRange?: SpellRangeResolvers<ContextType>;
  SpellRangeDistance?: SpellRangeDistanceResolvers<ContextType>;
  SpellTime?: SpellTimeResolvers<ContextType>;
  Subclass?: SubclassResolvers<ContextType>;
  SubclassAdditionalSpells?: SubclassAdditionalSpellsResolvers<ContextType>;
  SubclassAdditionalSpellsExpanded?: SubclassAdditionalSpellsExpandedResolvers<ContextType>;
  SubclassAdditionalSpellsExpanded1?: SubclassAdditionalSpellsExpanded1Resolvers<ContextType>;
  SubclassAdditionalSpellsExpanded3?: SubclassAdditionalSpellsExpanded3Resolvers<ContextType>;
  SubclassAdditionalSpellsExpanded7?: SubclassAdditionalSpellsExpanded7Resolvers<ContextType>;
  SubclassAdditionalSpellsExpanded9?: SubclassAdditionalSpellsExpanded9Resolvers<ContextType>;
  SubclassAdditionalSpellsExpanded13?: SubclassAdditionalSpellsExpanded13Resolvers<ContextType>;
  SubclassAdditionalSpellsExpanded19?: SubclassAdditionalSpellsExpanded19Resolvers<ContextType>;
  SubclassAdditionalSpellsExpandedS0?: SubclassAdditionalSpellsExpandedS0Resolvers<ContextType>;
  SubclassAdditionalSpellsExpandedS1?: SubclassAdditionalSpellsExpandedS1Resolvers<ContextType>;
  SubclassAdditionalSpellsExpandedS2?: SubclassAdditionalSpellsExpandedS2Resolvers<ContextType>;
  SubclassAdditionalSpellsExpandedS3?: SubclassAdditionalSpellsExpandedS3Resolvers<ContextType>;
  SubclassAdditionalSpellsExpandedS4?: SubclassAdditionalSpellsExpandedS4Resolvers<ContextType>;
  SubclassAdditionalSpellsExpandedS5?: SubclassAdditionalSpellsExpandedS5Resolvers<ContextType>;
  SubclassAdditionalSpellsExpandedS6?: SubclassAdditionalSpellsExpandedS6Resolvers<ContextType>;
  SubclassAdditionalSpellsExpandedS7?: SubclassAdditionalSpellsExpandedS7Resolvers<ContextType>;
  SubclassAdditionalSpellsExpandedS8?: SubclassAdditionalSpellsExpandedS8Resolvers<ContextType>;
  SubclassAdditionalSpellsExpandedS9?: SubclassAdditionalSpellsExpandedS9Resolvers<ContextType>;
  SubclassAdditionalSpellsSpells?: SubclassAdditionalSpellsSpellsResolvers<ContextType>;
  SubclassAdditionalSpellsSpellsChoose?: SubclassAdditionalSpellsSpellsChooseResolvers<ContextType>;
  SubclassAdditionalSpellsSpells_meta?: SubclassAdditionalSpellsSpells_MetaResolvers<ContextType>;
  SubclassFeature?: SubclassFeatureResolvers<ContextType>;
  SubclassFeatureConsumes?: SubclassFeatureConsumesResolvers<ContextType>;
  SubclassFeatureEntries?: SubclassFeatureEntriesResolvers<ContextType>;
  SubclassFeatureEntriesData?: SubclassFeatureEntriesDataResolvers<ContextType>;
  SubclassFeatureEntriesItems?: SubclassFeatureEntriesItemsResolvers<ContextType>;
  SubclassFeatureEntriesItemsEntries?: SubclassFeatureEntriesItemsEntriesResolvers<ContextType>;
  SubclassFeatureEntriesRows?: SubclassFeatureEntriesRowsResolvers<ContextType>;
  SubclassFeatureEntriesRowsList?: SubclassFeatureEntriesRowsListResolvers<ContextType>;
  SubclassOptionalFeatureProgression?: SubclassOptionalFeatureProgressionResolvers<ContextType>;
  SubclassOptionalFeatureProgressionProgression?: SubclassOptionalFeatureProgressionProgressionResolvers<ContextType>;
  SubclassOptionalFeatureProgressionRequired?: SubclassOptionalFeatureProgressionRequiredResolvers<ContextType>;
  SubclassSubclassFeatures?: SubclassSubclassFeaturesResolvers<ContextType>;
  SubclassSubclassTableGroups?: SubclassSubclassTableGroupsResolvers<ContextType>;
  SubclassSubclassTableGroupsRows?: SubclassSubclassTableGroupsRowsResolvers<ContextType>;
  SubclassSubclassTableGroupsRowsList?: SubclassSubclassTableGroupsRowsListResolvers<ContextType>;
  SubclassSubclassTableGroupsRowsSpellProgression?: SubclassSubclassTableGroupsRowsSpellProgressionResolvers<ContextType>;
  SubclassSubclassTableGroupsRowsSpellProgressionList?: SubclassSubclassTableGroupsRowsSpellProgressionListResolvers<ContextType>;
  SubclassSubclassTableGroupsSubclasses?: SubclassSubclassTableGroupsSubclassesResolvers<ContextType>;
  Subrace?: SubraceResolvers<ContextType>;
  SubraceAbility?: SubraceAbilityResolvers<ContextType>;
  SubraceAbilityChoose?: SubraceAbilityChooseResolvers<ContextType>;
  SubraceAdditionalSpells?: SubraceAdditionalSpellsResolvers<ContextType>;
  SubraceAdditionalSpellsSpellcastingAbility?: SubraceAdditionalSpellsSpellcastingAbilityResolvers<ContextType>;
  SubraceAdditionalSpellsSpellcastingAbilityChoose?: SubraceAdditionalSpellsSpellcastingAbilityChooseResolvers<ContextType>;
  SubraceAdditionalSpellsSpells?: SubraceAdditionalSpellsSpellsResolvers<ContextType>;
  SubraceAdditionalSpellsSpellsChoose?: SubraceAdditionalSpellsSpellsChooseResolvers<ContextType>;
  SubraceAdditionalSpellsSpells_meta?: SubraceAdditionalSpellsSpells_MetaResolvers<ContextType>;
  SubraceArmorProficiencies?: SubraceArmorProficienciesResolvers<ContextType>;
  SubraceEntries?: SubraceEntriesResolvers<ContextType>;
  SubraceEntriesData?: SubraceEntriesDataResolvers<ContextType>;
  SubraceEntriesItems?: SubraceEntriesItemsResolvers<ContextType>;
  SubraceEntriesRows?: SubraceEntriesRowsResolvers<ContextType>;
  SubraceEntriesRowsList?: SubraceEntriesRowsListResolvers<ContextType>;
  SubraceFeats?: SubraceFeatsResolvers<ContextType>;
  SubraceLanguageProficiencies?: SubraceLanguageProficienciesResolvers<ContextType>;
  SubraceOverwrite?: SubraceOverwriteResolvers<ContextType>;
  SubraceSkillProficiencies?: SubraceSkillProficienciesResolvers<ContextType>;
  SubraceSkillToolLanguageProficiencies?: SubraceSkillToolLanguageProficienciesResolvers<ContextType>;
  SubraceSkillToolLanguageProficienciesChoose?: SubraceSkillToolLanguageProficienciesChooseResolvers<ContextType>;
  SubraceSpeed?: SubraceSpeedResolvers<ContextType>;
  SubraceToolProficiencies?: SubraceToolProficienciesResolvers<ContextType>;
  SubraceWeaponProficiencies?: SubraceWeaponProficienciesResolvers<ContextType>;
  Vehicle?: VehicleResolvers<ContextType>;
  VehicleAbility?: VehicleAbilityResolvers<ContextType>;
  VehicleActions?: VehicleActionsResolvers<ContextType>;
  VehicleActionsRows?: VehicleActionsRowsResolvers<ContextType>;
  VehicleActionsRowsList?: VehicleActionsRowsListResolvers<ContextType>;
  VehicleControls?: VehicleControlsResolvers<ContextType>;
  VehicleControlsEntries?: VehicleControlsEntriesResolvers<ContextType>;
  VehicleEntries?: VehicleEntriesResolvers<ContextType>;
  VehicleEntriesRows?: VehicleEntriesRowsResolvers<ContextType>;
  VehicleEntriesRowsList?: VehicleEntriesRowsListResolvers<ContextType>;
  VehicleMovements?: VehicleMovementsResolvers<ContextType>;
  VehicleMovementsSpeed?: VehicleMovementsSpeedResolvers<ContextType>;
  VehicleMovementsSpeedEntries?: VehicleMovementsSpeedEntriesResolvers<ContextType>;
  VehiclePace?: VehiclePaceResolvers<ContextType>;
  VehicleSpeed?: VehicleSpeedResolvers<ContextType>;
  VehicleWeapons?: VehicleWeaponsResolvers<ContextType>;
  VehicleWeaponsActions?: VehicleWeaponsActionsResolvers<ContextType>;
  VehicleWeaponsActionsEntries?: VehicleWeaponsActionsEntriesResolvers<ContextType>;
  VehicleWeaponsEntries?: VehicleWeaponsEntriesResolvers<ContextType>;
  VehicleWeaponsEntriesItems?: VehicleWeaponsEntriesItemsResolvers<ContextType>;
};
