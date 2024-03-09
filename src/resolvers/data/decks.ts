import { getQueries, loadFilesSync } from "../utils";
import { Card, Deck, Resolvers } from "../../__generated__/graphql";

type Decks = {
  deck: Deck;
  card: Card;
};

const files = loadFilesSync<Decks>("/storage/data/modified/decks");
const data = {
  decks: files.flatMap((e) => e.deck),
  cards: files.flatMap((e) => e.card),
};

const queries = {
  deck: (name: string) => data.decks.find((e) => e.name === name),
  card: (name: string) => data.cards.find((e) => e.name === name),
};

export default {
  Query: {
    ...getQueries(data),
    deck: (_parent, { name }) => queries.deck(name),
    card: (_parent, { name }) => queries.card(name),
  },
} satisfies Resolvers;
