import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { mergeTypeDefs } from "@graphql-tools/merge";
import rootDir from "app-root-dir";
import dataResolvers from "./resolvers/data";
import authResolvers from "./resolvers/authentication";
import charResolvers from "./resolvers/character";
import jwt from "jsonwebtoken";
import { Resolvers } from "./__generated__/graphql";

const root = rootDir.get();

const loadedTypeDefs = await loadSchema(root + "/schemas/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});
const typeDefs = mergeTypeDefs(loadedTypeDefs);
const resolvers: Resolvers = {
  Query: {
    ...dataResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...charResolvers.Mutation,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  includeStacktraceInErrorResponses: false,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 5555 },
  context: async ({ req }) => {
    const token = req.headers.authorization;
    if (!token) return {};

    let username: string | jwt.JwtPayload;
    try {
      if (!process.env.JWT_KEY) {
        console.log("No JWT set");
        return { token };
      }
      username = jwt.verify(token, process.env.JWT_KEY);
      return { username, token };
    } catch (e) {
      console.log(e);
    }
    return { token };
  },
});

console.log(`🚀  Server ready at: ${url}`);
