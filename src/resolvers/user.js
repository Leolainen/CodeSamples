import { User } from "../models";

/**
 * Projection is a concept in mongoDB which is about fetching
 * specific data (for instance only username) in a request.
 */

export default {
  Query: {
    users: (root, args, context, info) => {
      // Todo: Auth, projection, pagination
      return User.find({});
    },
    user: (root, args, context, info) => {}
  },
  Mutation: {
    signUp: (root, args, context, info) => {}
  }
};
