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

export const resolvers: Resolvers = {
  Query: {
    ...getQueries(data),
    deck: (parent, { name }) => data.decks.find((e) => e.name === name),
    card: (parent, { name }) => data.cards.find((e) => e.name === name),
  },
};
