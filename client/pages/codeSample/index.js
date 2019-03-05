import { Query } from "react-apollo";
import { toast } from "react-toastify";
import { withRouter } from "next/router";
import React from "react";
import gql from "graphql-tag";

import Layout from "../../components/Layout";
import Sample from "../../components/Sample";

export default withRouter(props => {
  const sampleId = props.router.query.sample;

  const SAMPLE_QUERY = gql`
    query Sample($sampleId: ID!) {
      sampleById(id: $sampleId) {
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
    <Layout center fullScreen>
      <div>
        <Query
          query={SAMPLE_QUERY}
          variables={{ sampleId }}
          onError={({ message }) => toast.warn(message)}
        >
          {({ loading, data }) => {
            if (loading) {
              return <p>Loading...</p>;
            }

            return <Sample {...data.sampleById} />;
          }}
        </Query>
      </div>
    </Layout>
  );
});
