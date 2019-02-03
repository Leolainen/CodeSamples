import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    allSamples: [Sample!]!
    samples(userId: String, username: String, title: String): [Sample!]!
    sampleById(id: ID): Sample
  }
  extend type Mutation {
    post(
      title: String!
      language: [String]
      framework: [String]
      codeSample: String!
    ): Sample
    update(
      id: ID
      language: [String]
      framework: [String]
      codeSample: String
    ): Sample
    like(id: ID): Sample
    # delete: Boolean
  }
  type Sample {
    id: ID!
    userId: String!
    username: String!
    title: String!
    language: [String!]!
    framework: [String!]!
    codeSample: String!
    likes: [String!]!
    edited: Boolean!
    createdAt: String!
    date: String!
  }
`;
