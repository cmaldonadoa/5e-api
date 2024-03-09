import { getQueries, loadFilesSync } from "../utils";
import { Resolvers, Spell } from "../../__generated__/graphql";

type Spells = {
  spell: Spell;
};

const files = loadFilesSync<Spells>("/storage/data/modified/spells");
const data = {
  spells: files.flatMap((e) => e.spell),
};

export const queries = {
  spell: (name: string) => data.spells.find((e) => e.name === name),
};

export default {
  Query: {
    ...getQueries(data),
    spell: (_parent, { name }) => queries.spell(name),
  },
} satisfies Resolvers;
