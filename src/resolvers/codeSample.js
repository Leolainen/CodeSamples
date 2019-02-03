import mongoose from "mongoose";
import { UserInputError, ApolloError } from "apollo-server-express";
import Joi from "joi";

import { CodeSample, Likes } from "../models";
import { postCodeSample, updateCodeSample } from "../schemas";
import * as Auth from "../auth";

export default {
  Query: {
    allSamples: (root, args, context, info) => {
      return CodeSample.find({});
    },
    samples: (root, args, context, info) => {
      return CodeSample.find({ ...args });
    },
    sampleById: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`There are no samples with the id "${id}"`);
      }

      return CodeSample.findById(id);
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
    },
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
    // },
    like: async (root, args, { req, res }, info) => {
      Auth.checkSignedIn(req);

      const userId = req.session.userId;
      const codeSampleId = args.id;

      if (!mongoose.Types.ObjectId.isValid(codeSampleId)) {
        throw new UserInputError(
          `There are no samples with the id "${codeSampleId}"`
        );
      }

      const codeSampleToReturn = await CodeSample.findById(
        codeSampleId,
        (err, codeSample) => {
          if (err) throw new ApolloError(`Error: ${err}`);

          if (codeSample.likes.some(like => like === userId)) {
            codeSample.likes = codeSample.likes.filter(like => like !== userId);
          } else {
            codeSample.likes.push(userId);
          }

          codeSample.save(err => {
            if (err) throw new ApolloError(`Error: ${err}`);
          });
        }
      );

      return codeSampleToReturn;
    }
  }
};
