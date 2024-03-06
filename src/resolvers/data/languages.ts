import { getQueries, loadFilesSync } from "./utils.js";
import { Language, Resolvers } from "../../__generated__/graphql";

type Languages = {
  language: Language;
};

const files = loadFilesSync<Languages>("/data/modified/languages");
const data = {
  languages: files.flatMap((e) => e.language),
};

export const resolvers: Resolvers = {
  Query: {
    ...getQueries(data),
    language: (parent, { name }) => data.languages.find((e) => e.name === name),
  },
};