import { ApolloServer } from "apollo-server";
import jwt from "jsonwebtoken";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import models from "./models";

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
