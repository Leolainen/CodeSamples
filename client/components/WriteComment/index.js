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

import styles from "./style.scss";

export default function WriteComment({ submitted, refetch, codeSampleId }) {
  const context = useContext(Context);

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
      onCompleted={() => submitted()}
    >
      {postComment => (
        <FForm
          onSubmit={async values => {
            postComment({
              variables: {
                userId: context.me.id,
                codeSampleId,
                comment: values.comment
              }
            });

            await refetch();
          }}
          children={({ submitting, pristine }) => (
            <Container spacing={6} className={styles.commentWrapper}>
              <h5>Say something</h5>
              <Input
                className={styles.commentField}
                name="comment"
                placeholder="Comment"
                fullWidth
                required
                textarea
                rows={9}
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
  codeSampleId: PropTypes.string.isRequired,
  submitted: PropTypes.func,
  refetch: PropTypes.func
};

WriteComment.defaultProps = {
  refetch: null,
  submitted: null
};
