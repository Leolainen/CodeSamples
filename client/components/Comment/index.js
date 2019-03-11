import { Mutation } from "react-apollo";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import React, { Fragment, useContext, useReducer } from "react";

import { Context } from "../Context";
import Button from "../Button";
import Container from "../Container";
import FForm from "../FForm";
import Input from "../Input";
import Like from "../Like";
import Modal from "../Modal";

import {
  DELETE_COMMENT_MUTATION,
  LIKE_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION
} from "./queries";
import { TOGGLE_EDIT } from "./constants";
import reducer from "./reducer";
import styles from "./style.scss";

const initialState = {
  isEditing: false
};

export default function Comment({
  id,
  userId,
  comment,
  edited,
  likes,
  createdAt,
  updatedAt,
  username,
  refetch
}) {
  const context = useContext(Context);

  const [state, dispatch] = useReducer(reducer, initialState);

  const parseDate = dateToParse =>
    new Date(parseInt(dateToParse)).toLocaleString();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {username} {edited && <span>Edited</span>}
        <Mutation
          mutation={LIKE_COMMENT_MUTATION}
          variables={{ id }}
          onError={({ message }) => toast.error(message)}
          onCompleted={() => refetch()}
        >
          {likeComment => {
            return <Like amount={likes.length} onClick={() => likeComment()} />;
          }}
        </Mutation>
      </div>
      <div className={styles.content}>{comment}</div>
      <div className={styles.footer}>
        <p>Posted on: {parseDate(createdAt)}</p>
        {edited && <p>Last updated: {parseDate(updatedAt)}</p>}
        {context.me.id === userId && (
          <Fragment>
            <Mutation
              mutation={DELETE_COMMENT_MUTATION}
              onCompleted={() => {
                toast.success(`Comment successfully deleted`);
                refetch();
              }}
              onError={({ message }) => toast.error(message)}
              variables={{ id }}
            >
              {mutate => <Button onClick={mutate}>Delete</Button>}
            </Mutation>

            <Button onClick={() => dispatch({ type: TOGGLE_EDIT })}>
              Edit comment
            </Button>
          </Fragment>
        )}
      </div>
      {state.isEditing && (
        <Modal clickOutside={() => dispatch({ type: TOGGLE_EDIT })}>
          <Mutation
            mutation={UPDATE_COMMENT_MUTATION}
            onError={({ message }) => toast.error(message)}
            onCompleted={() => {
              toast.success(`Updated comments successfully!`);
              refetch();
              dispatch({ type: TOGGLE_EDIT });
            }}
            variables={{ id }}
          >
            {updateComment => (
              <FForm
                initialValues={{ comment }}
                onSubmit={async values => {
                  updateComment({
                    variables: {
                      id,
                      comment: values.comment
                    }
                  });

                  await refetch();
                }}
                children={({ submitting, pristine }) => (
                  <Container spacing={6}>
                    <h5>Say something</h5>
                    <Input
                      name="comment"
                      placeholder="Comment"
                      fullWidth
                      required
                      textarea
                      rows={6}
                    />
                    <Button
                      type="submit"
                      disabled={pristine || submitting}
                      fullWidth
                    >
                      Update comment
                    </Button>
                  </Container>
                )}
              />
            )}
          </Mutation>
        </Modal>
      )}
    </div>
  );
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  edited: PropTypes.bool.isRequired,
  likes: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  refetch: PropTypes.func,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired
};

Comment.defaultProps = {
  refetch: null
};
