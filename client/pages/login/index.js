import { Mutation, graphql, withApollo } from "react-apollo";
import React from "react";
import gql from "graphql-tag";

import Button from "../../components/Button";
import Container from "../../components/Container";
import FForm from "../../components/FForm";
import Input from "../../components/Input";
import Layout from "../../components/Layout";

export default () => {
  const handleSubmit = async submittedData => {
    console.log("submitting", submittedData);

    const mutationVariables = `signIn(password: "${
      submittedData.password
    }", email: "${submittedData.email}")`;
    const mutation = gql`
      mutation {
        ${mutationVariables}
        {
          username
          email
        }
      }
    `;

    const meQuery = gql`
      query {
        me {
          username
          email
        }
      }
    `;

    const mutationRequest = ({ client }) => {
      debugger;
      const res = client.mutation({ mutation });
      console.log("mutationRequest clinet", client);
      console.log("mutationRequest res", res);

      const { error, loading, data } = res;

      if (loading) {
        return null;
      }
      if (error) {
        return error;
      }

      return data;
    };

    debugger;
    const theMutation = withApollo(mutationRequest);

    console.log("theMutation", theMutation);

    // <Mutation mutation={mutation}>
    //   {({ data }) => {
    //     <div>a</div>;
    //   }}
    // </Mutation>;
    // context.dispatch({ type: "UPDATE_QUERY" }, data);
    // Router.push(`/search`);
  };

  /**
   * 
    mutation {
      signIn(password:"testpassword1", email:"testemail@email.com") {
        id, username, email
      }
    }
   */
  return (
    <Layout>
      password:"testpassword1", email:"testemail@email.com"
      <FForm
        onSubmit={handleSubmit}
        children={({ submitting, pristine }) => (
          <Container spacing={6}>
            <Input
              name="email"
              type="text"
              label="E-mail"
              inverted
              fullWidth
              required
            />
            <Input
              name="password"
              type="password"
              label="password"
              inverted
              fullWidth
              required
            />
            <Button type="submit" disabled={pristine || submitting} fullWidth>
              Log in
            </Button>
          </Container>
        )}
      />
    </Layout>
  );
};
