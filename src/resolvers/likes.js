import mongoose from "mongoose";
import { UserInputError } from "apollo-server-express";
import Joi from "joi";

import { Likes } from "../models";
import { likes } from "../schemas";
import * as Auth from "../auth";

export default {
  Query: {
    allLikes: (root, args, context, info) => {
      return Likes.find({});
    },
    Likes: (root, args, context, info) => {
      return Likes.find({ ...args });
    }
  },
  Mutation: {
    handleLike: async (root, args, { req, res }, info) => {
      Auth.checkSignedIn(req);

      const userId = req.session.userId;
      const codeSampleId = args.id;

      const like = await Likes.findOne({ userId, codeSampleId }, (err, res) => {
        if (err) new ApolloError(err);
        console.log("alreadyLikedByUser response: ", res);
        return res;
      });

      //   const codeSampleToReturn = await CodeSample.findByIdAndUpdate(
      //     args.id,
      //     { $inc: { likes: 1 } },
      //     { new: true }
      //   );

      return codeSampleToReturn;
    }
  }
};
