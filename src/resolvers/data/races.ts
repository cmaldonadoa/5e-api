import { getQueries, loadFilesSync } from "../utils";
import { Race, Resolvers, Subrace } from "../../__generated__/graphql";

type Races = {
  race: Race;
  subrace: Subrace;
};

const files = loadFilesSync<Races>("/storage/data/modified/races");
const data = {
  races: files.flatMap((e) => e.race),
  subraces: files.flatMap((e) => e.subrace),
};

export const queries = {
  race: (name: string, source: string) =>
    data.races.find((e) => e.name === name && e.source === source) || null,
  subrace: (name: string, source: string) =>
    data.subraces.find((e) => e.name === name && e.source === source) || null,
};

export default {
  Query: {
    ...getQueries(data),
    race: (_parent, { name, source }) => queries.race(name, source),
    subrace: (_parent, { name, source }) => queries.subrace(name, source),
  },
} satisfies Resolvers;
