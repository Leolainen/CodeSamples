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
    addFramework: async (root, { framework, codeSampleId }, { req }, info) => {
      Auth.checkSignedIn(req);
      await Joi.validate({ framework, codeSampleId }, addFramework, {
        abortEarly: false
      });

      const updatedFramework = await Framework.findOne(
        { framework: framework.toLowerCase() },
        (err, frameworkToUpdate) => {
          if (err) throw new ApolloError(`Error: ${err}`);

          // if the framework doesn't exist: create it
          if (!frameworkToUpdate) {
            Framework.create({
              framework: framework.toLowerCase(),
              codeSampleId: [codeSampleId]
            });

            return;
          }

          // Checks if current framework contains the codeSampleId otherwise do nothing
          if (
            frameworkToUpdate.codeSampleId.some(
              sampleId => sampleId === codeSampleId
            )
          ) {
            return;
          } else {
            frameworkToUpdate.push(codeSampleId);
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
