import gql from "graphql-tag";

export const COMMENT_QUERY = gql`
  query Comment($id: String!) {
    comments(codeSampleId: $id) {
      id
      userId
      username
      likes
      comment
      edited
      createdAt
      updatedAt
    }
  }
`;

export const LIKE_QUERY = gql`
  query sampleById($id: ID!) {
    sampleById(id: $id) {
      id
      likes
    }
  }
`;

export const LIKE_MUTATION = gql`
  mutation likeSample($id: ID!) {
    likeSample(id: $id) {
      id
      likes
    }
  }
`;

export const DELETE_SAMPLE_MUTATION = gql`
  mutation deleteSample($id: ID!) {
    deleteSample(id: $id) {
      id
      title
    }
  }
`;

export const POST_COMMENT_MUTATION = gql`
  mutation postComment(
    $userId: String!
    $codeSampleId: String!
    $comment: String!
  ) {
    postComment(
      userId: $userId
      codeSampleId: $codeSampleId
      comment: $comment
    ) {
      id
      userId
      username
      codeSampleId
      likes
      comment
      edited
      date
    }
  }
`;
