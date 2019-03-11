import { Mutation, Query } from "react-apollo";
// import { monokai } from "react-syntax-highlighter/dist/styles/hljs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import React, { Fragment, useContext, useEffect, useReducer } from "react";
import Router from "next/router";
// import SyntaxHighlighter from "react-syntax-highlighter";
import classnames from "classnames";

import { Context } from "../Context";
import Button from "../Button";
import Comment from "../Comment";
import Container from "../Container";
import Like from "../Like";
import Modal from "../Modal";
import Spinner from "../Spinner";
import StyledLink from "../StyledLink";
import Tag from "../Tag";
import WriteComment from "../WriteComment";

import {
  COMMENT_QUERY,
  DELETE_SAMPLE_MUTATION,
  LIKE_MUTATION,
  LIKE_QUERY
} from "./queries";
import { TOGGLE_COMMENT_MODAL, TOGGLE_LANGUAGE_HIGHLIGHT } from "./constants";
import reducer from "./reducer";
import styles from "./style.scss";

const initialState = {
  commentModalIsOpen: false,
  languageHighlight: "text"
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
  createdAt,
  updatedAt,
  edited,
  ...rest
}) {
  const context = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  const parseDate = dateToParse =>
    new Date(parseInt(dateToParse)).toLocaleString();

  const style = classnames(styles.wrapper, {
    [styles.preview]: preview
  });

  const toggleCommentModal = () => dispatch({ type: TOGGLE_COMMENT_MODAL });

  useEffect(() => {
    const initialLanguage = languages.length ? languages[0].language : "text";

    dispatch({ type: TOGGLE_LANGUAGE_HIGHLIGHT, data: initialLanguage });
  }, []);

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
          <div className={styles.title}>
            <h3>{title}</h3>
            <span>Author: {username}</span>
          </div>

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
        </div>
      )}

      <div className={styles.date}>
        <span>Posted: {parseDate(createdAt)}</span>
        {edited && <span>Last updated: {parseDate(updatedAt)}</span>}
      </div>

      {context.me.id === userId && !preview && (
        <Fragment>
          <Mutation
            mutation={DELETE_SAMPLE_MUTATION}
            onError={({ message }) => toast.error(message)}
            variables={{ id }}
            onCompleted={() => {
              toast.success(`Sample was successfully deleted`);
              Router.back();
            }}
          >
            {mutate => (
              <Button className="" onClick={mutate}>
                Delete sample
              </Button>
            )}
          </Mutation>
          <StyledLink href={`/editSample?sample=${id}`}>Edit sample</StyledLink>
        </Fragment>
      )}

      {languages.length > 0 && (
        <div className={styles.tagWrapper}>
          {languages.map((language, index) => (
            <Tag
              key={index}
              onClick={() =>
                dispatch({
                  type: TOGGLE_LANGUAGE_HIGHLIGHT,
                  data: language.language
                })
              }
            >
              {language.language}
            </Tag>
          ))}
        </div>
      )}

      {frameworks.length > 0 && (
        <div className={styles.tagWrapper}>
          {frameworks.map((framework, index) => (
            <Tag key={index}>{framework.framework}</Tag>
          ))}
        </div>
      )}

      <div className={styles.codeSampleWrapper}>
        <SyntaxHighlighter
          showLineNumbers
          language={state.languageHighlight}
          style={atomDark}
        >
          {codeSample}
        </SyntaxHighlighter>
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
  preview: PropTypes.bool,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  edited: PropTypes.bool.isRequired
};

Sample.defaultProps = {
  likes: [],
  description: null,
  href: "",
  preview: false,
  onClick: null
};
