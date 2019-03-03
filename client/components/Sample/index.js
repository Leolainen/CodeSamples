import { FaThumbsUp } from "react-icons/fa";
import { Mutation, Query } from "react-apollo";
import PropTypes from "prop-types";
import React from "react";
import gql from "graphql-tag";

import Container from "../Container";
import StyledLink from "../StyledLink";

import styles from "./style.scss";

export default function Sample({
  title,
  username,
  id,
  likes,
  description,
  frameworks,
  languages,
  codeSample,
  onClick,
  ...rest
}) {
  const COMMENT_QUERY = gql`
    query Comment($id: String!) {
      comments(codeSampleId: $id) {
        username
        likes
        comment
        edited
        date
      }
    }
  `;

  const LIKE_MUTATION = gql`
    mutation {
      likeComment(id: "5c63cb5acbdbbd0281e4beb1") {
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

  // console.log("id", id);

  return (
    <Container className={styles.wrapper} {...rest} onClick={onClick}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <span>by: {username}</span>
      </div>
      <div className={styles.likes}>
        <FaThumbsUp style={{ fontSize: "12px" }} />
        <span>{likes.length}</span>
      </div>
      {languages.length > 0 && (
        <div className={styles.tagWrapper}>
          {languages.map((lang, index) => (
            <div key={index} className={styles.tag}>
              {lang.language}
            </div>
          ))}
        </div>
      )}
      {frameworks.length > 0 && (
        <div className={styles.tagWrapper}>
          {frameworks.map((fw, index) => (
            <div key={index} className={styles.tag}>
              {fw.framework}
            </div>
          ))}
        </div>
      )}
      <div className={styles.codeSample}>
        <pre>{codeSample}</pre>
      </div>

      <Query variables={{ id }} query={COMMENT_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>loading</p>;
          }
          if (error) {
            return <p>error</p>;
          }

          const overOneComment = data.comments.length > 1;

          return (
            <div className={styles.commentsWrapper}>
              <StyledLink href="#">
                {data.comments.length} {overOneComment ? "comments" : "comment"}
              </StyledLink>
            </div>
          );
        }}
      </Query>

      <div className={styles.comments} />
    </Container>
  );
}

Sample.propTypes = {
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  likes: PropTypes.array,
  description: PropTypes.string,
  frameworks: PropTypes.array.isRequired,
  languages: PropTypes.array.isRequired,
  codeSample: PropTypes.string.isRequired
};

Sample.defaultProps = {
  likes: [],
  description: null
};
