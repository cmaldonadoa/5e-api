import { getQueries, loadFilesSync } from "../utils";
import { Language, Resolvers } from "../../__generated__/graphql";

type Languages = {
  language: Language;
};

const files = loadFilesSync<Languages>("/storage/data/modified/languages");
const data = {
  languages: files.flatMap((e) => e.language),
};

export const queries = {
  language: (name: string) => data.languages.find((e) => e.name === name),
};

export default {
  Query: {
    ...getQueries(data),
    language: (_parent, { name }) => queries.language(name),
  },
} satisfies Resolvers;
