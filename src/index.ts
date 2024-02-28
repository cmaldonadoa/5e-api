import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import fs from "fs";

const loadedTypeDefs = await loadSchema("schemas/*.graphql", {
    loaders: [new GraphQLFileLoader()]
});
const queries = `type Query {\n_: Boolean\n}\n\n`;
const typeDefs = queries + loadedTypeDefs;

const server = new ApolloServer({ typeDefs });

const { url } = await startStandaloneServer(server, {
    listen: { port: 5555 }
});

console.log(`🚀  Server ready at: ${url}`);
