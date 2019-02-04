import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    allComments: [Comment!]!
    comments(userId: String, username: String, title: String): [Comment!]!
    commentById(id: ID): Comment
  }
  extend type Mutation {
    post(
      title: String!
      language: [String]
      framework: [String]
      codeSample: String!
    ): Sample
    update(language: [String], framework: [String], codeSample: String!): Sample
  }
  type Comment {
    id: ID!
    userId: String!
    codeSampleId: String!
    likes: [String!]!
    comment: String
    edited: boolean
    timestamp: Number
    date: date
  }
`;
