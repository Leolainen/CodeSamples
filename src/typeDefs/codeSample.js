import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    allSamples: [Sample!]!
    samples(
      userId: String
      username: String
      title: String
      frameworks: [String]
      languages: [String]
    ): [Sample!]!
    sampleById(id: ID): Sample

    allFrameworks: [Framework!]!
    framework(id: ID!): Framework
    frameworks(framework: String): [Framework!]!

    allLanguages: [Language!]!
    language(id: ID!): Language
    languages(language: String): [Language!]!
  }

  extend type Mutation {
    postSample(
      title: String!
      codeSample: String!
      frameworks: [String]
      languages: [String]
    ): Sample
    updateSample(
      id: ID!
      title: String
      codeSample: String
      frameworks: [String]
      languages: [String]
    ): Sample
    likeSample(id: ID): Sample
    deleteSample(id: ID): Sample

    addFramework(codeSampleId: String!, framework: String!): Framework

    addLanguage(codeSampleId: String!, language: String!): Language
  }

  type Sample {
    id: ID!
    userId: String!
    username: String!
    title: String!
    codeSample: String!
    frameworks: [Framework!]!
    languages: [Language!]!
    likes: [String!]!
    edited: Boolean!
    createdAt: String!
    date: String!
  }

  type Framework {
    id: ID!
    framework: String!
  }

  type Language {
    id: ID!
    language: String!
  }
`;
