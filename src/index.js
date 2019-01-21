import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

import {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} from "./dbConfig";
import { APP_PORT, IN_PROD } from "./appConfig";
import {
  SESSION_NAME,
  SESSION_SECRET,
  SESSION_LIFETIME
} from "./sessionConfig";

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

    app.use(
      session({
        name: SESSION_NAME,
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: SESSION_LIFETIME,
          sameSite: true,
          secure: IN_PROD
        }
      })
    );

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: IN_PROD
        ? false
        : {
            settings: {
              "request.credentials": "include"
            }
          },
      context: ({ req, res }) => ({ req, res })
    });

    server.applyMiddleware({ app });

    app.listen({ port: APP_PORT }, () => {
      return console.log(`http://localhost:${APP_PORT}${server.graphqlPath}`);
    });
  } catch (e) {
    console.error("Something went wrong:", e);
  }
})();
