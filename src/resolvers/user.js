import mongoose from "mongoose";
import { UserInputError } from "apollo-server-express";
import Joi from "joi";

import { User } from "../models";
import { signUp } from "../schemas";

/**
 * Projection is a concept in mongoDB which is about fetching
 * specific data (for instance only username) in a request.
 */

export default {
  Query: {
    users: (root, args, context, info) => {
      // Todo: Auth, projection, pagination, sanitization
      return User.find({});
    },
    user: (root, { id }, context, info) => {
      // Todo: Auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(id)) {
        // if a user id is NOT valid
        throw new UserInputError(`${id} is not a valid user id`);
      }

      return User.findById(id);
    }
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      // Todo: not auth
      // validation
      await Joi.validate(args, signUp, { abortEarly: false });

      return User.create(args);
    }
  }
};
