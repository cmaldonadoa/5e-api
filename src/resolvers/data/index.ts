import { resolvers as backgroundsResolvers } from "./backgrounds.js";
import { resolvers as booksResolvers } from "./books.js";
import { resolvers as classesResolvers } from "./classes.js";
import { resolvers as featsResolvers } from "./feats.js";
import { resolvers as itemsResolvers } from "./items.js";
import { resolvers as languagesResolvers } from "./languages.js";
import { resolvers as racesResolvers } from "./races.js";
import { resolvers as spellsResolvers } from "./spells.js";
import { resolvers as vehiclesResolvers } from "./vehicles.js";

import { Resolvers } from "../../__generated__/graphql";

export const resolvers: Resolvers = {
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
};
