import { Query } from "react-apollo";
import { toast } from "react-toastify";
import { withRouter } from "next/router";
import React, { Fragment, useContext, useEffect, useState } from "react";
import gql from "graphql-tag";

import { Context } from "../../components/Context";
import { isEmpty } from "../../utils/objects";
import Layout from "../../components/Layout";
import Sample from "../../components/Sample";
import Spinner from "../../components/Spinner";

export default withRouter(() => {
  const context = useContext(Context);
  const [currentQuery, setCurrentQueries] = useState(context.query);

  useEffect(() => {
    if (isEmpty(currentQuery)) {
      const localStorageQuery = JSON.parse(
        window.localStorage.getItem("query")
      );
      setCurrentQueries(localStorageQuery);
    }
  });

  const { title, frameworks, languages } = currentQuery;

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
        userId
        username
        codeSample
        title
        likes
        description
        edited
        createdAt
        updatedAt
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
        {({ loading, data, error }) => {
          if (loading) {
            return <Spinner />;
          }

          if (error) {
            return <p>Something went wrong...</p>;
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
