import {
  Background,
  BaseItem,
  Book,
  Card,
  Deck,
  Feat,
  Item,
  ItemProperty,
  ItemType,
  Language,
  Race,
  Spell,
  Subrace,
  Vehicle,
} from "./__generated__/graphql";

export type Backgrounds = {
  background: Background;
};

export type Books = {
  book: Book;
};

export type Decks = {
  deck: Deck;
  card: Card;
};

export type Feats = {
  feat: Feat;
};

export type Items = {
  item: Item;
  baseItem: BaseItem;
  itemProperty: ItemProperty;
  itemType: ItemType;
};

export type Languages = {
  language: Language;
};

export type Races = {
  race: Race;
  subrace: Subrace;
};

export type Spells = {
  spell: Spell;
};

export type Vehicles = {
  vehicle: Vehicle;
};
