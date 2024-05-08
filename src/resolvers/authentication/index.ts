import { Resolvers, User } from "../../__generated__/graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JSONMutator } from "../utils";
import { GraphQLError } from "graphql/error";
import { ApolloServerErrorCode } from "@apollo/server/errors";

type Users = {
  user: User;
};

const json = new JSONMutator<Users>("/storage/authentication/users.json");

export default {
  Mutation: {
    register: async (_parent, { username, password }) => {
      const users = json.get("user", (e: User) => e.username === username);
      if (users.length)
        throw new GraphQLError("User is already taken", {
          extensions: {
            code: ApolloServerErrorCode.BAD_REQUEST,
            http: { status: 403 },
          },
        });
      const user: User = {
        username,
        password: await bcrypt.hash(password, 5),
      };

      json.add("user", user);
      json.save();
      return true;
    },
    login: async (_parent, { username, password }) => {
      const users = json.get("user", (e: User) => e.username === username);
      if (!users.length)
        throw new GraphQLError("Username does not exist", {
          extensions: {
            code: ApolloServerErrorCode.BAD_REQUEST,
            http: { status: 400 },
          },
        });

      const user = users[0].item;

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid)
        throw new GraphQLError("Incorrect password", {
          extensions: {
            code: ApolloServerErrorCode.BAD_REQUEST,
            http: { status: 403 },
          },
        });

      if (!process.env.JWT_KEY)
        throw new GraphQLError("Bad JWT", {
          extensions: {
            code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
            http: { status: 500 },
          },
        });

      return jwt.sign(username, process.env.JWT_KEY);
    },
  },
} satisfies Resolvers;
