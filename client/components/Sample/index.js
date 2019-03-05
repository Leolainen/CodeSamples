import { FaThumbsUp } from "react-icons/fa";
import { Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import gql from "graphql-tag";

import Button from "../Button";
import Container from "../Container";
import Spinner from "../Spinner";
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
  href,
  preview,
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

  const style = classnames(styles.wrapper, {
    [styles.preview]: preview
  });

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

      <Query
        query={LIKE_QUERY}
        variables={{ id }}
        onError={({ message }) => toast.error(message)}
      >
        {({ data, loading }) => {
          if (loading) {
            return (
              <Button className={styles.likes}>
                <div className={styles.likes}>
                  <FaThumbsUp style={{ fontSize: "12px" }} />
                  <Spinner relative />
                </div>
              </Button>
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
                  <Button className={styles.likes} onClick={() => mutate()}>
                    <div>
                      <FaThumbsUp style={{ fontSize: "12px" }} />
                      <span>{fetchedLikes.length}</span>
                    </div>
                  </Button>
                );
              }}
            </Mutation>
          );
        }}
      </Query>

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
      <div className={styles.codeSampleWrapper}>
        <pre className={styles.codeSample}>{codeSample}</pre>
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
              <StyledLink href={href ? href : "#"}>
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
  codeSample: PropTypes.string.isRequired,
  href: PropTypes.string,
  preview: PropTypes.bool
};

Sample.defaultProps = {
  likes: [],
  description: null,
  href: null,
  preview: false
};
