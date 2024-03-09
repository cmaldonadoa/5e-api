import backgroundsResolvers from "./backgrounds.js";
import booksResolvers from "./books.js";
import classesResolvers from "./classes.js";
import featsResolvers from "./feats.js";
import itemsResolvers from "./items.js";
import languagesResolvers from "./languages.js";
import racesResolvers from "./races.js";
import spellsResolvers from "./spells.js";
import vehiclesResolvers from "./vehicles.js";
import { Resolvers } from "../../__generated__/graphql";

export default {
  Query: {
    ...backgroundsResolvers.Query,
    ...booksResolvers.Query,
    ...classesResolvers.Query,
    ...featsResolvers.Query,
    ...itemsResolvers.Query,
    ...languagesResolvers.Query,
    ...racesResolvers.Query,
    ...spellsResolvers.Query,
    ...vehiclesResolvers.Query,
  },
} satisfies Resolvers;
