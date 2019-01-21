import mongoose from "mongoose";
import { UserInputError } from "apollo-server-express";
import Joi from "joi";

import { User } from "../models";
import { signUp, signIn } from "../schemas";
import * as Auth from "../auth";

/**
 * Projection is a concept in mongoDB which is about fetching
 * specific data (for instance only username) in a request.
 */

export default {
  Query: {
    me: (root, args, { req }, info) => {
      // Todo: projection
      Auth.checkSignedIn(req);

      return User.findById(req.session.userId);
    },
    users: (root, args, { req }, info) => {
      // Todo: Auth, projection, pagination, sanitization
      Auth.checkSignedIn(req);

      return User.find({});
    },
    user: (root, { id }, { req }, info) => {
      // Todo: Auth, projection, sanitization
      Auth.checkSignedIn(req);

      if (!mongoose.Types.ObjectId.isValid(id)) {
        // if a user id is NOT valid
        throw new UserInputError(`${id} is not a valid user id`);
      }

      return User.findById(id);
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // Todo: not auth
      Auth.checkSignedOut(req);

      await Joi.validate(args, signUp, { abortEarly: false });

      const user = await User.create(args);
      req.session.userId = user.id;
      req.session.username = user.username;

      return user;
    },
    signIn: async (root, args, { req }, info) => {
      const { userId } = req.session;
      if (userId) {
        return User.findById(userId);
      }

      await Joi.validate(args, signIn, { abortEarly: false });

      const { email, password } = args;
      const user = await Auth.attemptSignIn(email, password);

      req.session.userId = user.id;
      req.session.username = user.username;

      return user;
    },
    signOut: (root, args, { req, res }, info) => {
      Auth.checkSignedIn(req);
      return Auth.signOut(req, res);
    }
  }
};
