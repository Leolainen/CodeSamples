import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    allFrameworks: [Framework!]!
    framework(id: ID!): Framework
    frameworks(framework: String, codeSampleId: String): [Framework!]!
  }
  extend type Mutation {
    addFramework(codeSampleId: String!, framework: String!): Framework
  }
  type Framework {
    id: ID!
    codeSampleId: [String!]!
    framework: String!
  }
`;
