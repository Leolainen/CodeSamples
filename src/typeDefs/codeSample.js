import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    sample(id: ID!): Sample
    samples: [Sample!]!
  }
  extend type Mutation {
    post(
      title: String!
      langauge: [String]
      framework: [String]
      codeSample: String!
    ): Sample
    update(langauge: [String], framework: [String], codeSample: String!): Sample
    # delete: Boolean
  }
  type Sample {
    id: ID!
    userId: String!
    title: String!
    langauge: [String!]!
    framework: [String!]!
    codeSample: String!
    likes: Int!
    dislikes: Int!
    edited: Boolean!
    createdAt: String!
    date: String!
  }
`;
