import { ApolloError } from "apollo-server-express";
import Joi from "joi";

import { Language } from "../models";
import { addLanguage } from "../schemas";
import * as Auth from "../auth";

export default {
  Query: {
    allLanguages: (root, args, context, info) => {
      return Language.find({});
    },
    languages: (root, args, context, info) => {
      return Language.find({ ...args });
    },
    language: (root, { id }, context, info) => {
      return Language.findById(id);
    }
  },
  Mutation: {
    addLanguage: async (root, { language, codeSampleId }, { req }, info) => {
      Auth.checkSignedIn(req);
      await Joi.validate({ language, codeSampleId }, addLanguage, {
        abortEarly: false
      });

      const updatedLanguage = await Language.findOne(
        { language: language.toLowerCase() },
        (err, languageToUpdate) => {
          if (err) throw new ApolloError(`Error: ${err}`);

          // if the language doesn't exist: create it
          if (!languageToUpdate) {
            Language.create({
              language: language.toLowerCase(),
              codeSampleId: [codeSampleId]
            });

            return;
          }

          // Add another codeSampleId to the language unless it already has that id
          if (
            languageToUpdate.codeSampleId.some(
              sampleId => sampleId === codeSampleId
            )
          ) {
            return;
          } else {
            languageToUpdate.codeSampleId.push(codeSampleId);
          }

          languageToUpdate.save(err => {
            if (err) throw new ApolloError(`Error: ${err}`);
          });
        }
      );

      return updatedLanguage;
    }
  }
};
