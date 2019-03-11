import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    allComments: [Comment!]!
    comments(codeSampleId: String, userId: String): [Comment!]!
    commentById(id: ID): Comment
  }
  extend type Mutation {
    postComment(
      userId: String!
      codeSampleId: String!
      comment: String!
    ): Comment
    updateComment(id: ID!, comment: String): Comment
    likeComment(id: ID!): Comment
    deleteComment(id: ID!): Comment
  }
  type Comment {
    id: ID!
    userId: String!
    username: String!
    codeSampleId: String!
    likes: [String!]!
    comment: String
    edited: Boolean!
    createdAt: String!
    updatedAt: String!
    date: String!
  }
`;
