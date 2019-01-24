import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    allSamples: [Sample!]!
    comments(userId: String, username: String, title: String): [Sample!]!
    sampleById(id: ID): Sample
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
    likes: Number!
    dislikes: Number!
    comment: String
    edited: boolean
    timestamp: Number
    date: date
  }
`;
