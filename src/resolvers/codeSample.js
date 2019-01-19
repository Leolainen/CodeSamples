import mongoose from "mongoose";
import { UserInputError } from "apollo-server-express";
import Joi from "joi";

import { CodeSample, User } from "../models";
import { postCodeSample, updateCodeSample } from "../schemas";
import * as Auth from "../auth";

export default {
  Query: {
    samples: (root, args, context, info) => {
      return CodeSample.find({});
    },
    sample: (root, args, context, info) => {
      // if (!mongoose.Types.ObjectId.isValid(id)) {
      //   throw new UserInputError(`There are no samples with the id "${id}"`);
      // }

      // args must be an object!
      return CodeSample.find(args);
    }
  },
  Mutation: {
    post: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req);

      await Joi.validate(args, postCodeSample, { abortEarly: false });
      args.userId = req.session.userId;
      args.username = req.session.username;

      const codeSample = await CodeSample.create(args);
      // codeSample.userId = req.session.userId;

      return codeSample;
    }
    // update: async (root, args, { req }, info) => {
    //   const { userId } = req.session;
    //   if (userId) {
    //     return User.findById(userId);
    //   }

    //   await Joi.validate(args, signIn, { abortEarly: false });

    //   const { email, password } = args;
    //   const user = await Auth.attemptSignIn(email, password);

    //   req.session.userId = user.id;

    //   return user;
    // }
  }
};
