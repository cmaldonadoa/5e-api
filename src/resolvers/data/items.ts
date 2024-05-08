import { getQueries, loadFilesSync } from "../utils";
import {
  BaseItem,
  Item,
  ItemProperty,
  ItemType,
  Resolvers,
} from "../../__generated__/graphql";

type Items = {
  item: Item;
  baseItem: BaseItem;
  itemProperty: ItemProperty;
  itemType: ItemType;
};
const files = loadFilesSync<Items>("/storage/data/modified/items");
const data = {
  items: files.flatMap((e) => e.item),
  baseItems: files.flatMap((e) => e.baseItem),
  itemProperties: files.flatMap((e) => e.itemProperty),
  itemTypes: files.flatMap((e) => e.itemType),
};

export const queries = {
  item: (name: string) => data.items.find((e) => e.name === name) || null,
  baseItem: (name: string) =>
    data.baseItems.find((e) => e.name === name) || null,
  itemProperty: (name: string) =>
    data.itemProperties.find((e) => e.name === name) || null,
  itemType: (name: string) =>
    data.itemTypes.find((e) => e.name === name) || null,
};

export default {
  Query: {
    ...getQueries(data),
    item: (_parent, { name }) => queries.item(name),
    baseItem: (_parent, { name }) => queries.baseItem(name),
    itemProperty: (_parent, { name }) => queries.itemProperty(name),
    itemType: (_parent, { name }) => queries.itemType(name),
  },
} satisfies Resolvers;
