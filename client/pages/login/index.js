import { Mutation } from "react-apollo";
import React from "react";
import Router from "next/router";
import gql from "graphql-tag";

import Button from "../../components/Button";
import Container from "../../components/Container";
import FForm from "../../components/FForm";
import Input from "../../components/Input";
import Layout from "../../components/Layout";

export default () => {
  // const stringifyQuery = query => {
  //   return JSON.stringify(query).replace(/[{}]/g, "");
  // };

  const LOGIN_MUTATION = gql`
    mutation signIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        email
        username
      }
    }
  `;

  const handleLogin = data => {
    console.log("Login successful!", data);
    // Router.push("/");
  };

  const handleSubmit = values => {
    console.log("submitting: ", values);
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
    <Mutation
      mutation={LOGIN_MUTATION}
      onCompleted={loginResponse => handleLogin(loginResponse)}
    >
      {(signIn, { data }) => (
        <Layout>
          <FForm
            onSubmit={handleSubmit}
            children={({ submitting, pristine, values }) => (
              <Container spacing={6}>
                <Input
                  name="email"
                  type="email"
                  label="E-mail"
                  inverted
                  fullWidth
                  required
                />
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  inverted
                  fullWidth
                  required
                />
                <Button
                  type="submit"
                  disabled={pristine || submitting}
                  fullWidth
                  onClick={() =>
                    signIn({
                      variables: {
                        email: values.email,
                        password: values.password
                      }
                    })
                  }
                >
                  Log in
                </Button>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </Container>
            )}
          />
        </Layout>
      )}
    </Mutation>
  );
};
