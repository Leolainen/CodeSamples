import { Query } from "react-apollo";
import PropTypes from "prop-types";
import React from "react";
import gql from "graphql-tag";

import Container from "../Container";
import StyledLink from "../StyledLink";

import styles from "./style.scss";

export default function SamplePreview({
  title,
  username,
  id,
  description,
  frameworks,
  languages,
  codeSample,
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

  // console.log("id", id);

  return (
    <Container className={styles.wrapper} {...rest}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <span>by: {username}</span>
      </div>
      {frameworks.length > 0 && (
        <div className={styles.tagWrapper}>
          {frameworks.map((fw, index) => (
            <div key={index} className={styles.tag}>
              {fw.framework}
            </div>
          ))}
        </div>
      )}
      {languages.length > 0 && (
        <div className={styles.tagWrapper}>
          {languages.map((lang, index) => (
            <div key={index} className={styles.tag}>
              {lang.language}
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

          return (
            <StyledLink href="#">{data.comments.length} comments</StyledLink>
          );
        }}
      </Query>

      <div className={styles.comments} />
    </Container>
  );
}

SamplePreview.propTypes = {
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
  frameworks: PropTypes.array.isRequired,
  languages: PropTypes.array.isRequired,
  codeSample: PropTypes.string.isRequired
};

SamplePreview.defaultProps = {
  description: null
};
