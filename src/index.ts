import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { mergeTypeDefs } from "@graphql-tools/merge";
import rootDir from "app-root-dir";
import { resolvers as dataResolvers } from "./resolvers/data";

const root = rootDir.get();

const loadedTypeDefs = await loadSchema(root + "/schemas/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});
const typeDefs = mergeTypeDefs(loadedTypeDefs);
const resolvers = { ...dataResolvers };

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 5555 },
  context: async ({ req, res }) => {
    const token = req.headers.authorization || "";
    const user = null; //await getUser(token);
    return { user };
  },
});

console.log(`🚀  Server ready at: ${url}`);
