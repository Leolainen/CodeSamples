import { Query } from "react-apollo";
import { toast } from "react-toastify";
import { withRouter } from "next/router";
import React, { useContext } from "react";
import gql from "graphql-tag";

import { Context } from "../../components/Context";
import Layout from "../../components/Layout";
import Sample from "../../components/Sample";
import Spinner from "../../components/Spinner";

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
      <Query
        query={SAMPLE_QUERY}
        variables={{ title, languages, frameworks }}
        onError={({ message }) => toast.error(message)}
      >
        {({ loading, data }) => {
          if (loading) {
            return <Spinner />;
          }

          return (
            <div>
              {loading ? (
                <Spinner />
              ) : (
                data.samples.map((sample, index) => (
                  <Sample
                    preview
                    key={index}
                    {...sample}
                    href={`/codeSample?sample=${sample.id}`}
                  />
                ))
              )}
            </div>
          );
        }}
      </Query>
    </Layout>
  );
});
