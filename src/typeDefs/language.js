import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    allLanguages: [Language!]!
    language(id: ID!): Language
    languages(language: String, codeSampleId: String): [Language!]!
  }
  extend type Mutation {
    addLanguage(codeSampleId: String!, language: String!): Language
  }
  type Language {
    id: ID!
    codeSampleId: [String!]!
    language: String!
  }
`;
