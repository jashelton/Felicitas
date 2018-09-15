import { ApolloServer } from "apollo-server";
import jwt from "jsonwebtoken";
import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import models from "./models";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || null;
    let user;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) user = undefined;
        user = decode;
      });
    } else {
      user = undefined;
    }
    return Object.assign({}, { models }, { user });
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
