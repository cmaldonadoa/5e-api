import { getQueries, loadFilesSync } from "../utils";
import { Feat, Resolvers } from "../../__generated__/graphql";

type Feats = {
  feat: Feat;
};

const files = loadFilesSync<Feats>("/storage/data/modified/feats");
const data = {
  feats: files.flatMap((e) => e.feat),
};

export const queries = {
  feat: (name: string) => data.feats.find((e) => e.name === name),
};

export default {
  Query: {
    ...getQueries(data),
    feat: (_parent, { name }) => queries.feat(name),
  },
} satisfies Resolvers;
