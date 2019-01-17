import { User } from "../models";

/**
 * Projection is a concept in mongoDB which is about fetching
 * specific data (for instance only username) in a request.
 */

export default {
  Query: {
    users: (root, arg, context, info) => {
      // Todo: Auth, projection, pagination
      return User.find({});
    },
    user: (root, arg, context, info) => {}
  },
  Mutation: {
    signUp: (root, arg, context, info) => {}
  }
};
