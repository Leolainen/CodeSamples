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

        return data.allSamples.map(
          ({ title, username, likes, codeSample, edited }, index) => (
            <div key={index} style={{ border: "1px solid black" }}>
              <p>
                Title: <b>{title}</b>
              </p>
              <p>
                by: <b>{username}</b>
              </p>
              <p>likes: {likes.length}</p>
              <p>edited: {JSON.stringify(edited)}</p>
              <pre>{codeSample}</pre>
            </div>
          )
        );
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
