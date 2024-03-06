import { getQueries, loadFilesSync } from "./utils.js";
import { Resolvers, Spell } from "../../__generated__/graphql";

type Spells = {
  spell: Spell;
};

const files = loadFilesSync<Spells>("/data/modified/spells");
const data = {
  spells: files.flatMap((e) => e.spell),
};

export const resolvers: Resolvers = {
  Query: {
    ...getQueries(data),
    spell: (parent, { name }) => data.spells.find((e) => e.name === name),
  },
};
