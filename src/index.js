import mongoose from "mongoose";
import express from "express";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { createCipher } from "crypto";

import {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} from "./dbConfig";
import { APP_PORT, IN_PROD } from "./appConfig";

(async () => {
  try {
    /**
     * { useNewUrlParser: true } fixes
     * "deprecationWarning: current URL string parser is deprecated" warning
     */
    await mongoose.connect(
      `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      { useNewUrlParser: true }
    );

    const app = express();
    app.disable("x-powered-by");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: !IN_PROD
    });

    server.applyMiddleware({ app });

    app.listen({ port: APP_PORT }, () => {
      return console.log(`http://localhost:${APP_PORT}${server.graphqlPath}`);
    });
  } catch (e) {
    console.error("Something went wrong:", e);
  }
})();
