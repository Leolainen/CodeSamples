import gql from "graphql-tag";

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

export const UPDATE_COMMENT_MUTATION = gql`
  mutation updateComment($id: ID!, $comment: String!) {
    updateComment(id: $id, comment: $comment) {
      id
      comment
    }
  }
`;

export const LIKE_COMMENT_MUTATION = gql`
  mutation likeComment($id: ID!) {
    likeComment(id: $id) {
      id
      likes
    }
  }
`;
