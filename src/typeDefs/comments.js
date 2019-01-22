import { gql } from "apollo-server-express";
import Likes from "./likes";

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
    update(language: [String], framework: [String], codeSample: String!): Sample
  }
  type Comment {
    id: ID!
    userId: String!
    likes: [Likes]!
    dislikes: Array!
    comment: String
    edited: boolean
    timestamp: Number
    date: date
  }
`;
