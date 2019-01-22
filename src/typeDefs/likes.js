import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    likes(userId: String): [Likes!]!
  }
  extend type Mutation {
    addLike(userId: String!): Likes
    removeLike(userId: String!): Likes
  }
  extend type Likes {
    id: ID!
    userId: String!
  }
`;
