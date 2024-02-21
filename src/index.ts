import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { parse } from "./utils/json2graphql.js";
import * as fs from "fs";

const data = fs.readFileSync(
  process.cwd() + "/data/modified/books/books.json",
  "utf-8",
);

const books = JSON.parse(data);
const typeDefs = `type Query {\n_: Boolean\n}\n\n` + parse(books, "books");

const server = new ApolloServer({ typeDefs });

const { url } = await startStandaloneServer(server, {
  listen: { port: 5555 },
});

console.log(`🚀  Server ready at: ${url}`);
