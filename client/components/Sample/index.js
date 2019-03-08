import { Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import React, { Fragment, useContext, useReducer } from "react";
import Router from "next/router";
import classnames from "classnames";
import gql from "graphql-tag";

import { Context } from "../Context";
import Button from "../Button";
import Comment from "../Comment";
import Container from "../Container";
import Like from "../Like";
import Modal from "../Modal";
import Spinner from "../Spinner";
import StyledLink from "../StyledLink";
import Tags from "../Tags";
import WriteComment from "../WriteComment";

import { TOGGLE_COMMENT_MODAL } from "./constants";
import reducer from "./reducer";
import styles from "./style.scss";

const initialState = {
  commentModalIsOpen: false
};

export default function Sample({
  title,
  username,
  id,
  userId,
  likes,
  description,
  frameworks,
  languages,
  codeSample,
  onClick,
  href,
  preview,
  ...rest
}) {
  const context = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  const COMMENT_QUERY = gql`
    query Comment($id: String!) {
      comments(codeSampleId: $id) {
        id
        userId
        username
        likes
        comment
        edited
        date
      }
    }
  `;

  const LIKE_QUERY = gql`
    query sampleById($id: ID!) {
      sampleById(id: $id) {
        id
        likes
      }
    }
  `;

  const LIKE_MUTATION = gql`
    mutation likeSample($id: ID!) {
      likeSample(id: $id) {
        id
        likes
      }
    }
  `;

  const DELETE_SAMPLE_MUTATION = gql`
    mutation deleteSample($id: ID!) {
      deleteSample(id: $id) {
        id
        title
      }
    }
  `;

  const style = classnames(styles.wrapper, {
    [styles.preview]: preview
  });

  const toggleCommentModal = () => dispatch({ type: TOGGLE_COMMENT_MODAL });
  const renderLanguages = languages && languages.map(lang => lang.language);
  const renderFrameworks = frameworks && frameworks.map(fw => fw.framework);

  return (
    <Container className={style} {...rest} onClick={onClick}>
      {href ? (
        <StyledLink href={href} noStyle>
          <div className={styles.header}>
            <h3>{title}</h3>
            <span>by: {username}</span>
          </div>
        </StyledLink>
      ) : (
        <div className={styles.header}>
          <h3>{title}</h3>
          <span>by: {username}</span>
        </div>
      )}
      {context.me.id === userId && !preview && (
        <Mutation
          mutation={DELETE_SAMPLE_MUTATION}
          onError={({ message }) => toast.error(message)}
          variables={{ id }}
          onCompleted={() => {
            toast.success(`Sample was successfully deleted`);
            Router.back();
          }}
        >
          {mutate => <Button onClick={mutate}>Delete sample</Button>}
        </Mutation>
      )}
      {languages.length > 0 && <Tags toRender={renderLanguages} />}
      {frameworks.length > 0 && <Tags toRender={renderFrameworks} />}
      <Query
        query={LIKE_QUERY}
        variables={{ id }}
        onError={({ message }) => toast.error(message)}
      >
        {({ data, loading }) => {
          if (loading) {
            return (
              <div className={styles.likeWrapper}>
                <Spinner relative />
              </div>
            );
          }

          return (
            <Mutation
              mutation={LIKE_MUTATION}
              refetchQueries={() => [
                { query: LIKE_QUERY, variables: { id: data.sampleById.id } }
              ]}
              variables={{ id }}
              onError={({ message }) => toast.error(message)}
            >
              {mutate => {
                const fetchedLikes = data.sampleById
                  ? [...data.sampleById.likes]
                  : likes;

                return (
                  <div className={styles.likeWrapper}>
                    <Like
                      amount={fetchedLikes.length}
                      onClick={() => mutate()}
                    />
                  </div>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
      <div className={styles.codeSampleWrapper}>
        <pre className={styles.codeSample}>{codeSample}</pre>
      </div>
      {description && !preview && (
        <Fragment>
          <span>Authors description:</span>
          <div className={styles.description}>
            <p>{description}</p>
          </div>
        </Fragment>
      )}
      <Query
        query={COMMENT_QUERY}
        variables={{ id }}
        onError={({ message }) => toast.error(message)}
      >
        {({ loading, data, refetch }) => {
          if (loading) {
            return <Spinner relative />;
          }

          const overOneComment = data.comments.length > 1;

          const comments = data.comments.map((comment, index) => (
            <Comment key={index} {...comment} refetch={refetch} />
          ));

          return (
            <Fragment>
              <div className={styles.commentsWrapper}>
                <p className={styles.innerCommentsWrapper}>
                  {data.comments.length}{" "}
                  {overOneComment ? "comments" : "comment"}
                  <Button
                    className={styles.writeCommentButton}
                    onClick={toggleCommentModal}
                  >
                    Write a comment
                  </Button>
                </p>
              </div>

              {!preview &&
                (comments.length > 0 ? comments : "Be the first to comment!")}

              {state.commentModalIsOpen && (
                <Modal clickOutside={toggleCommentModal}>
                  <WriteComment
                    submitted={toggleCommentModal}
                    refetch={() => refetch()}
                    codeSampleId={id}
                  />
                </Modal>
              )}
            </Fragment>
          );
        }}
      </Query>
    </Container>
  );
}

Sample.propTypes = {
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  likes: PropTypes.array,
  description: PropTypes.string,
  frameworks: PropTypes.array.isRequired,
  languages: PropTypes.array.isRequired,
  codeSample: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  preview: PropTypes.bool
};

Sample.defaultProps = {
  likes: [],
  description: null,
  href: "",
  preview: false,
  onClick: null
};
