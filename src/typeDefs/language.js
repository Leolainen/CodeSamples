import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    language(id: ID, language: String): Language
    languages: [Language!]!
  }
  extend type Mutation {
    addLanguage(language: String!): Language
  }
  type Language {
    id: ID!
    codeSampleId: [String!]!
    language: String!
  }
`;
