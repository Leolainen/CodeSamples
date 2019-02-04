import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    allSamples: [Sample!]!
    samples(userId: String, username: String, title: String): [Sample!]!
    sampleById(id: ID): Sample
  }
  extend type Mutation {
    postSample(
      title: String!
      language: [String]
      framework: [String]
      codeSample: String!
    ): Sample
    updateSample(
      id: ID!
      title: String
      language: [String]
      framework: [String]
      codeSample: String
    ): Sample
    likeSample(id: ID): Sample
    deleteSample(id: ID): Sample
  }
  type Sample {
    id: ID!
    userId: String!
    username: String!
    title: String!
    language: Language!
    framework: Framework!
    codeSample: String!
    likes: [String!]!
    edited: Boolean!
    createdAt: String!
    date: String!
  }
`;
