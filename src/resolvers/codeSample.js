import mongoose from "mongoose";
import { UserInputError, ApolloError } from "apollo-server-express";
import Joi from "joi";

import { CodeSample, Framework, Language } from "../models";
import { postCodeSample } from "../schemas";
import * as Auth from "../auth";

export default {
  Query: {
    allSamples: (root, args, context, info) => {
      return CodeSample.find({});
    },
    samples: async (root, args, context, info) => {
      let query = { ...args };

      if (args.frameworks) {
        const frameworks = args.frameworks.map(
          async framework => await Framework.find({ framework })
        );
        args.frameworks = await Promise.all(frameworks);

        // promises gets returned in an extra layer of array for some reason. needs to be flattened
        query = { frameworks: { $in: args.frameworks.flat() } };
      }

      if (args.languages) {
        const languages = args.languages.map(
          async language => await Language.find({ language: language })
        );
        args.languages = await Promise.all(languages);

        // promises gets returned in an extra layer of array for some reason. needs to be flattened
        query = { languages: { $in: args.languages.flat() } };
      }

      return await CodeSample.find(query);
    },
    sampleById: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`There are no samples with the id "${id}"`);
      }

      return CodeSample.findById(id);
    },

    allFrameworks: (root, args, context, info) => {
      return Framework.find({});
    },
    frameworks: (root, args, context, info) => {
      return Framework.find({ ...args });
    },
    framework: (root, { id }, context, info) => {
      return Framework.findById(id);
    },

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
    postSample: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req);

      const { userId, username } = req.session;
      const { frameworks, languages } = args;

      await Joi.validate(args, postCodeSample, { abortEarly: false });

      // Convert frameworks array into Framework types
      const handleFramework = async framework => {
        const fetchFramework = async () =>
          await Framework.findOne({
            framework: framework.toLowerCase()
          });

        let fetchedFramework = await fetchFramework();

        if (!fetchedFramework) {
          await Framework.create({
            framework: framework.toLowerCase()
          });
          fetchedFramework = await fetchFramework();
        }

        return fetchedFramework;
      };

      // Convert languages array into Language types
      const handleLanguage = async language => {
        const fetchLang = async () =>
          await Language.findOne({
            language: language.toLowerCase()
          });

        let fetchedLanguage = await fetchLang();

        if (!fetchedLanguage) {
          await Language.create({
            language: language.toLowerCase()
          });
          fetchedLanguage = await fetchLang();
        }

        return fetchedLanguage;
      };

      const promisedFrameworks = frameworks.map(
        async framework => await handleFramework(framework)
      );
      const promisedLanguages = languages.map(
        async language => await handleLanguage(language)
      );

      args.userId = userId;
      args.username = username;
      args.frameworks = await Promise.all(promisedFrameworks);
      args.languages = await Promise.all(promisedLanguages);

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

    // addFramework: async (root, { framework }, { req }, info) => {
    //   Auth.checkSignedIn(req);
    //   await Joi.validate({ framework, codeSampleId }, addFramework, {
    //     abortEarly: false
    //   });

    //   const updatedFramework = await Framework.findOne(
    //     { framework: framework.toLowerCase() },
    //     (err, frameworkToUpdate) => {
    //       if (err) throw new ApolloError(`Error: ${err}`);

    //       // if the framework doesn't exist: create it
    //       if (!frameworkToUpdate) {
    //         Framework.create({
    //           framework: framework.toLowerCase(),
    //           codeSampleId: [codeSampleId]
    //         });

    //         return;
    //       }

    //       // Checks if current framework contains the codeSampleId and in that case do nothing
    //       if (
    //         frameworkToUpdate.codeSampleId.some(
    //           sampleId => sampleId === codeSampleId
    //         )
    //       ) {
    //         return;
    //       } else {
    //         frameworkToUpdate.codeSampleId.push(codeSampleId);
    //       }

    //       frameworkToUpdate.save(err => {
    //         if (err) throw new ApolloError(`Error: ${err}`);
    //       });
    //     }
    //   );

    //   return updatedFramework;
    // },

    // addLanguage: async (root, { language }, { req }, info) => {
    //   Auth.checkSignedIn(req);
    //   await Joi.validate({ language, codeSampleId }, addLanguage, {
    //     abortEarly: false
    //   });

    //   const updatedLanguage = await Language.findOne(
    //     { language: language.toLowerCase() },
    //     (err, languageToUpdate) => {
    //       if (err) throw new ApolloError(`Error: ${err}`);

    //       // if the language doesn't exist: create it
    //       if (!languageToUpdate) {
    //         Language.create({
    //           language: language.toLowerCase(),
    //           codeSampleId: [codeSampleId]
    //         });

    //         return;
    //       }

    //       // Add another codeSampleId to the language unless it already has that id
    //       if (
    //         languageToUpdate.codeSampleId.some(
    //           sampleId => sampleId === codeSampleId
    //         )
    //       ) {
    //         return;
    //       } else {
    //         languageToUpdate.codeSampleId.push(codeSampleId);
    //       }

    //       languageToUpdate.save(err => {
    //         if (err) throw new ApolloError(`Error: ${err}`);
    //       });
    //     }
    //   );

    //   return updatedLanguage;
    // }
  }
};
