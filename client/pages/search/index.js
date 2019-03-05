import { Query } from "react-apollo";
import { toast } from "react-toastify";
import { withRouter } from "next/router";
import React, { Fragment, useContext } from "react";
import gql from "graphql-tag";

import { Context } from "../../components/Context";
import Layout from "../../components/Layout";
import Sample from "../../components/Sample";
import Spinner from "../../components/Spinner";

export default withRouter(() => {
  const context = useContext(Context);

  const { title, frameworks, languages } = context.query;

  const frameworksQuery = frameworks
    ? frameworks.map(fw => fw.value)
    : undefined;
  const languagesQuery = languages
    ? languages.map(lang => lang.value)
    : undefined;

  const SAMPLE_QUERY = gql`
    query Sample(
      $title: String
      $languagesQuery: [String]
      $frameworksQuery: [String]
    ) {
      samples(
        title: $title
        languages: $languagesQuery
        frameworks: $frameworksQuery
      ) {
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
        variables={{ title, languagesQuery, frameworksQuery }}
        onError={({ message }) => toast.error(message)}
      >
        {({ loading, data, error, variables }) => {
          if (loading) {
            return <Spinner />;
          }

          if (error) {
            return (
              <div>
                <p>Something went wrong...</p>
              </div>
            );
          }

          return (
            <Fragment>
              {data.samples.length > 0 ? (
                <Fragment>
                  {data.samples.map((sample, index) => (
                    <div key={index}>
                      <Sample
                        preview
                        {...sample}
                        href={`/codeSample?sample=${sample.id}`}
                      />
                    </div>
                  ))}
                </Fragment>
              ) : (
                <p>No samples match your search. :'(</p>
              )}
            </Fragment>
          );
        }}
      </Query>
    </Layout>
  );
});
