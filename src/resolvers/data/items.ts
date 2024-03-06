import { getQueries, loadFilesSync } from "./utils.js";
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
const files = loadFilesSync<Items>("/data/modified/items");
const data = {
  items: files.flatMap((e) => e.item),
  baseItems: files.flatMap((e) => e.baseItem),
  itemProperties: files.flatMap((e) => e.itemProperty),
  itemTypes: files.flatMap((e) => e.itemType),
};

export const resolvers: Resolvers = {
  Query: {
    ...getQueries(data),
    item: (parent, { name }) => data.items.find((e) => e.name === name),
    baseItem: (parent, { name }) => data.baseItems.find((e) => e.name === name),
    itemProperty: (parent, { name }) =>
      data.itemProperties.find((e) => e.name === name),
    itemType: (parent, { name }) => data.itemTypes.find((e) => e.name === name),
  },
};
