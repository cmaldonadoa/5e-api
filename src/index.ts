import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { mergeTypeDefs } from "@graphql-tools/merge";
import rootDir from "app-root-dir";
import { resolvers as dataResolvers } from "./resolvers/data";
import { resolvers as authResolvers } from "./resolvers/authentication";
import jwt from "jsonwebtoken";

const root = rootDir.get();

const loadedTypeDefs = await loadSchema(root + "/schemas/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});
const typeDefs = mergeTypeDefs(loadedTypeDefs);
const resolvers = { ...dataResolvers, ...authResolvers };

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
      username = jwt.verify(token, process.env.JWT_KEY);
    } catch (e) {
      console.log(e);
    }

    return { username, token };
  },
});

console.log(`🚀  Server ready at: ${url}`);
