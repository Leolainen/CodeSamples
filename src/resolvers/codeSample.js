import mongoose from "mongoose";
import { UserInputError, ApolloError } from "apollo-server-express";
import Joi from "joi";

import { CodeSample } from "../models";
import { postCodeSample } from "../schemas";
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
    postSample: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req);

      const { userId, username } = req.session;

      await Joi.validate(args, postCodeSample, { abortEarly: false });

      args.userId = userId;
      args.username = username;

      const codeSample = await CodeSample.create(args);

      return codeSample;
    },
    updateSample: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req);

      const { id } = args;

      // maybe doesn't need validation?
      // Since user is free to edit as they see fit.
      // await Joi.validate(args, updateCodeSample, { abortEarly: false });

      const updatedCodeSample = await CodeSample.findByIdAndUpdate(
        id,
        { ...args, edited: true },
        { new: true }
      );

      return updatedCodeSample;
    },
    likeSample: async (root, { id }, { req }, info) => {
      Auth.checkSignedIn(req);

      const { userId } = req.session;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`There are no samples with the id "${id}"`);
      }

      const likedCodeSample = await CodeSample.findById(
        id,
        (err, codeSample) => {
          if (err) throw new ApolloError(`Error: ${err}`);

          // Checks if current userId matches the userId of the like
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

      return likedCodeSample;
    }
  }
};
