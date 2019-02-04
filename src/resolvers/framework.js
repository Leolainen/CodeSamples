import mongoose from "mongoose";
import { UserInputError, ApolloError } from "apollo-server-express";
import Joi from "joi";

import { Framework } from "../models";
import { addFramework } from "../schemas";
import * as Auth from "../auth";

export default {
  Query: {
    allFrameworks: (root, args, context, info) => {
      return Framework.find({});
    },
    frameworks: (root, args, context, info) => {
      return Framework.find({ ...args });
    },
    framework: (root, { id }, context, info) => {
      return Framework.findById(id);
    }
  },
  Mutation: {
    addFramework: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req);
      await Joi.validate(args, addFramework, { abortEarly: false });

      const updatedFramework = await Framework.findOne(
        { framework: args.framework.toLowerCase() },
        (err, frameworkToUpdate) => {
          if (err) throw new ApolloError(`Error: ${err}`);

          // if the framework doesn't exist: create it
          if (!frameworkToUpdate) {
            Framework.create({
              framework: args.framework.toLowerCase(),
              codeSampleId: [args.codeSampleId]
            });

            return;
          }

          // Checks if current framework contains the codeSampleId otherwise do nothing
          if (
            frameworkToUpdate.codeSampleId.some(
              sampleId => sampleId === args.codeSampleId
            )
          ) {
            return;
          } else {
            frameworkToUpdate.push(args.codeSampleId);
          }

          frameworkToUpdate.save(err => {
            if (err) throw new ApolloError(`Error: ${err}`);
          });
        }
      );

      return updatedFramework;
    }
  }
};
