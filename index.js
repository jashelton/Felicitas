import express from "express";
import bodyParser from "body-parser";
import { graphiqlExpress, graphqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import models from "./models";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
  // context: ({ req }) => {
  //   const token = req.headers.authorization || '';
  //   const user = getUser(token);
  //   return { user };
  // }
});

const app = express();

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({ schema, context: { models } })
);

models.sequelize.sync().then(() => app.listen(3000));
