import { getQueries, loadFilesSync } from "./utils.js";
import { Book, Resolvers } from "../../__generated__/graphql";

type Books = {
  book: Book;
};

const files = loadFilesSync<Books>("/data/modified/books");
const data = {
  books: files.flatMap((e) => e.book),
};

export const resolvers: Resolvers = {
  Query: {
    ...getQueries(data),
    book: (parent, { id }) => data.books.find((e) => e.id === id),
  },
};
