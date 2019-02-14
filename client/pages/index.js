import { Query } from "react-apollo";
import React from "react";
import gql from "graphql-tag";

import Layout from "../components/Layout";

export default () => {
  const allCodeSamples = () => (
    <Query
      query={gql`
        {
          allSamples {
            id
            userId
            username
            title
            codeSample
            likes
            edited
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }
        if (error) {
          return <p>Error! :( {error}</p>;
        }

        return data.allSamples.map(({ title, username }, index) => (
          <div key={index}>
            <p>
              {title} by {username}
            </p>
          </div>
        ));
      }}
    </Query>
  );

  return (
    <Layout>
      <h1>index!</h1>
      {allCodeSamples()}
    </Layout>
  );
};
