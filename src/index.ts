import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { mergeTypeDefs } from "@graphql-tools/merge";
import rootDir from "app-root-dir";
import fs from "fs";
import { Resolvers } from "./__generated__/graphql";
import {
  Backgrounds,
  Books,
  Decks,
  Feats,
  Items,
  Languages,
  Races,
  Spells,
  Vehicles,
} from "./index.d";

const root = rootDir.get();

const loadFilesSync = <T>(dirname: string): T[] => {
  const files = fs.readdirSync(dirname).filter((file) => /\.json$/.test(file));
  return files.map((file) =>
    JSON.parse(fs.readFileSync(`${dirname}/${file}`, "utf-8"))
  );
};

const data = {
  backgrounds: loadFilesSync<Backgrounds>(root + "/data/modified/backgrounds"),
  books: loadFilesSync<Books>(root + "/data/modified/books"),
  decks: loadFilesSync<Decks>(root + "/data/modified/decks"),
  feats: loadFilesSync<Feats>(root + "/data/modified/feats"),
  items: loadFilesSync<Items>(root + "/data/modified/items"),
  languages: loadFilesSync<Languages>(root + "/data/modified/languages"),
  races: loadFilesSync<Races>(root + "/data/modified/races"),
  spells: loadFilesSync<Spells>(root + "/data/modified/spells"),
  vehicles: loadFilesSync<Vehicles>(root + "/data/modified/vehicles"),
};

const loadedTypeDefs = await loadSchema(root + "/schemas/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});
const typeDefs = mergeTypeDefs(loadedTypeDefs);
const resolvers: Resolvers = {
  Query: {
    backgrounds: () => data.backgrounds.flatMap((e) => e.background),
    books: () => data.books.flatMap((e) => e.book),
    decks: () => data.decks.flatMap((e) => e.deck),
    cards: () => data.decks.flatMap((e) => e.card),
    feats: () => data.feats.flatMap((e) => e.feat),
    items: () => data.items.flatMap((e) => e.item),
    baseItems: () => data.items.flatMap((e) => e.baseItem),
    itemProperties: () => data.items.flatMap((e) => e.itemProperty),
    itemTypes: () => data.items.flatMap((e) => e.itemType),
    languages: () => data.languages.flatMap((e) => e.language),
    races: () => data.races.flatMap((e) => e.race),
    subraces: () => data.races.flatMap((e) => e.subrace),
    spells: () => data.spells.flatMap((e) => e.spell),
    vehicles: () => data.vehicles.flatMap((e) => e.vehicle),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 5555 },
});

console.log(`🚀  Server ready at: ${url}`);
