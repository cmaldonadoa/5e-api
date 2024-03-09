import { getQueries, loadFilesSync } from "../utils";
import { Book, Resolvers } from "../../__generated__/graphql";

type Books = {
  book: Book;
};

const files = loadFilesSync<Books>("/storage/data/modified/books");
const data = {
  books: files.flatMap((e) => e.book),
};

export const queries = {
  book: (id: string) => data.books.find((e) => e.id === id),
};

export default {
  Query: {
    ...getQueries(data),
    book: (_parent, { id }) => queries.book(id),
  },
} satisfies Resolvers;
