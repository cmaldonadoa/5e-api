import { getQueries, loadFilesSync } from "../utils";
import { Background, Resolvers } from "../../__generated__/graphql";

type Backgrounds = {
  background: Background;
};

const files = loadFilesSync<Backgrounds>("/storage/data/modified/backgrounds");
const data = {
  backgrounds: files.flatMap((e) => e.background),
};

export const queries = {
  background: (name: string) =>
    data.backgrounds.find((e) => e.name === name) || null,
};

export default {
  Query: {
    ...getQueries(data),
    background: (_parent, { name }) => queries.background(name),
  },
} satisfies Resolvers;
