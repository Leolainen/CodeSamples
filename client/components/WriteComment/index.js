import { Mutation } from "react-apollo";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import gql from "graphql-tag";

import { Context } from "../Context";
import Button from "../Button";
import Container from "../Container";
import FForm from "../FForm";
import Input from "../Input";
import Layout from "../Layout";

import styles from "./style.scss";

export default function WriteComment({ codeSampleId, ...rest }) {
  const context = useContext(Context);

  console.log("context.me", context.me);

  /**
     * 
mutation {
  postComment(userId: "5c41f7e4e0ef9daa700688fb",
    codeSampleId: "5c760814e33ffb051dc6976b",
    comment: "this is a comment") {
      id,
      userId,
      username,
      codeSampleId,
      likes,
      comment,
      edited,
      date
  }
}
     */

  const COMMENT_MUTATION = gql`
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
  return (
    <Mutation
      mutation={COMMENT_MUTATION}
      onError={({ message }) => toast.warn(message)}
    >
      {postComment => (
        <FForm
          onSubmit={values =>
            postComment({
              variables: {
                userId: context.me.id,
                codeSampleId,
                comment: values.comment
              }
            })
          }
          children={({ submitting, pristine }) => (
            <Container spacing={6}>
              <h5>Comment</h5>
              <Input
                name="comment"
                placeholder="Comment"
                fullWidth
                required
                textarea
                rows={6}
              />
              <Button type="submit" disabled={pristine || submitting} fullWidth>
                Post comment
              </Button>
            </Container>
          )}
        />
      )}
    </Mutation>
  );
}

WriteComment.propTypes = {
  codeSampleId: PropTypes.string.isRequired
};
