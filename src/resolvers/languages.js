import mongoose from "mongoose";
import { UserInputError, ApolloError } from "apollo-server-express";
import Joi from "joi";

import { Language } from "../models";
// import { postCodeSample } from "../schemas";
import * as Auth from "../auth";

export default {
  Query: {
    languages: (root, args, context, info) => {
      return Language.find({});
    },
    language: (root, args, context, info) => {
      return Language.find({ ...args });
    }
  },
  Mutation: {
    addLanguage: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req);
      // await Joi.validate(args, postCodeSample, { abortEarly: false });

      const language = await Language.create(args);

      return language;
    }
  }
};
