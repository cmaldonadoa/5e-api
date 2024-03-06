import { getQueries, loadFilesSync } from "./utils.js";
import { Race, Resolvers, Subrace } from "../../__generated__/graphql";

type Races = {
  race: Race;
  subrace: Subrace;
};

const files = loadFilesSync<Races>("/data/modified/races");
const data = {
  races: files.flatMap((e) => e.race),
  subraces: files.flatMap((e) => e.subrace),
};

export const resolvers: Resolvers = {
  Query: {
    ...getQueries(data),
    race: (parent, { name, source }) =>
      data.races.find((e) => e.name === name && e.source === source),
    subrace: (parent, { name, source }) =>
      data.subraces.find((e) => e.name === name && e.source === source),
  },
};
