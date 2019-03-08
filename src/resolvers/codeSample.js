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
      // regex so query will make a case-insensitive search for all samples containing the title
      args.title = { $regex: new RegExp(args.title, "i") };

      let query = { ...args };

      if (args.frameworks) {
        const frameworks = args.frameworks.map(
          async framework => await Framework.find({ framework })
        );
        args.frameworks = await Promise.all(frameworks);

        // promises gets returned in an extra layer of array for some reason. needs to be flattened
        query = { ...args, frameworks: { $in: args.frameworks.flat() } };
      }

      if (args.languages) {
        const languages = args.languages.map(
          async language => await Language.find({ language: language })
        );
        args.languages = await Promise.all(languages);

        // promises gets returned in an extra layer of array for some reason. needs to be flattened
        query = { ...args, languages: { $in: args.languages.flat() } };
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

      // Convert frameworks array into Framework types or create it if it doesn't exist

      const convertToType = async (arg, model) => {
        console.log("arg:", arg);
        this.arg = arg.toLowerCase();

        const fetchModel = async () => {
          await model.findOne({
            [this.arg]: this.arg
          });
        };

        let fetchedType = await fetchModel();

        console.log("fetchedType:", fetchedType);

        if (!fetchedType) {
          console.log("fetchedType is undefined and should be created");
          await model.create({
            [this.arg]: this.arg
          });

          fetchedType = await fetchModel();

          console.log("newly created fetchedType:", fetchedType);
        }

        console.log("fetchedType that will be returned:", fetchedType);

        return fetchedType;
      };

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

      // Same as above but with languages
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
        // async framework => await convertToType(framework, Framework)
      );
      const promisedLanguages = languages.map(
        // async language => await convertToType(language, Language)
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
    },
    deleteSample: async (root, { id }, { req }, info) => {
      Auth.checkSignedIn(req);

      const removedCodeSample = await CodeSample.findByIdAndDelete(
        id,
        (err, codeSample) => {
          if (err) throw new ApolloError(`Error: ${err}`);

          return codeSample;
        }
      );

      return removedCodeSample;
    }
  }
};
