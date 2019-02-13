import mongoose from "mongoose";
import { UserInputError, ApolloError } from "apollo-server-express";
import Joi from "joi";

import { Comment } from "../models";
import { postComment } from "../schemas";
import * as Auth from "../auth";

export default {
  Query: {
    allComments: (root, args, context, info) => {
      return Comment.find({});
    },
    comments: (root, args, context, info) => {
      return Comment.find({ ...args });
    },
    commentById: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`There are no comments with the id "${id}"`);
      }

      return Comment.findById(id);
    }
  },
  Mutation: {
    postComment: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req);

      const { userId, username } = req.session;

      args.userId = userId;
      args.username = username;

      await Joi.validate(args, postComment, { abortEarly: true });
      const comment = await Comment.create(args);

      return comment;
    },
    updateComment: async (root, args, { req }, info) => {
      Auth.checkSignedIn(req);

      const { id } = args;

      // maybe doesn't need validation?
      // Since user is free to edit as they see fit.
      // await Joi.validate(args, updateComment, { abortEarly: false });

      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { ...args, edited: true },
        { new: true }
      );

      return updatedComment;
    },
    likeComment: async (root, { id }, { req }, info) => {
      Auth.checkSignedIn(req);

      const { userId } = req.session;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`There are no comments with the id "${id}"`);
      }

      const likedComment = await Comment.findById(id, (err, comment) => {
        if (err) throw new ApolloError(`Error: ${err}`);

        // Checks if current userId matches the userId of the like
        if (comment.likes.some(like => like === userId)) {
          comment.likes = comment.likes.filter(like => like !== userId);
        } else {
          comment.likes.push(userId);
        }

        comment.save(err => {
          if (err) throw new ApolloError(`Error: ${err}`);
        });
      });

      return likedComment;
    },
    deleteComment: async (root, { id }, { req }, info) => {
      Auth.checkSignedIn(req);

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`There are no comments with the id "${id}"`);
      }

      const removedComment = await Comment.findByIdAndDelete(id);

      return removedComment;
    }
  }
};
