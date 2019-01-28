import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    likes(userId: String, codeSampleId: String): [Likes!]!
  }
  extend type Mutation {
    addLike(userId: String!, codeSampleId: String!): Likes
    removeLike(userId: String!, codeSampleId: String!): Likes
  }
  type Likes {
    id: ID!
    userId: String!
    codeSampleId: String!
  }
`;
