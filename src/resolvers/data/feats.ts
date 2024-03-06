import { getQueries, loadFilesSync } from "./utils.js";
import { Feat, Resolvers } from "../../__generated__/graphql";

type Feats = {
  feat: Feat;
};

const files = loadFilesSync<Feats>("/data/modified/feats");
const data = {
  feats: files.flatMap((e) => e.feat),
};

export const resolvers: Resolvers = {
  Query: {
    ...getQueries(data),
    feat: (parent, { name }) => data.feats.find((e) => e.name === name),
  },
};