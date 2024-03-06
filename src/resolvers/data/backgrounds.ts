import { getQueries, loadFilesSync } from "./utils.js";
import { Background, Resolvers } from "../../__generated__/graphql";

type Backgrounds = {
  background: Background;
};

const files = loadFilesSync<Backgrounds>("/data/modified/backgrounds");
const data = {
  backgrounds: files.flatMap((e) => e.background),
};

export const resolvers: Resolvers = {
  Query: {
    ...getQueries(data),
    background: (parent, { name }) =>
      data.backgrounds.find((e) => e.name === name),
  },
};
