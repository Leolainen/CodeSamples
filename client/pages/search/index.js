import { Query } from "react-apollo";
import { withRouter } from "next/router";
import React, { useContext } from "react";
import gql from "graphql-tag";

import { Context } from "../../components/Context";
import Layout from "../../components/Layout";
import Sample from "../../components/Sample";

export default withRouter(() => {
  const context = useContext(Context);

  const { title, frameworks, languages } = context.query;

  const SAMPLE_QUERY = gql`
    query Sample($title: String, $languages: [String], $frameworks: [String]) {
      samples(title: $title, languages: $languages, frameworks: $frameworks) {
        id
        username
        codeSample
        title
        likes
        description
        frameworks {
          framework
        }
        languages {
          language
        }
      }
    }
  `;

  return (
    <Layout center>
      <Query query={SAMPLE_QUERY} variables={{ title, languages, frameworks }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error: {error}</p>;
          }

          return (
            <div>
              {data.samples.map((sample, index) => (
                <Sample
                  preview
                  key={index}
                  {...sample}
                  href={`/codeSample?sample=${sample.id}`}
                />
              ))}
            </div>
          );
        }}
      </Query>
    </Layout>
  );
});
