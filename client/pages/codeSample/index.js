import { Query, Mutation } from "react-apollo";
import React from "react";
import { withRouter } from "next/router";
import gql from "graphql-tag";

export default withRouter(props => {
  const sampleId = props.router.query.sample;
  return <div>Hello this is sample with id {sampleId}!</div>;
});
