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

  return (
    <Mutation mutation={LOGIN_MUTATION} onCompleted={() => Router.push("/")}>
      {signIn => (
        <Layout>
          <FForm
            onSubmit={values =>
              signIn({
                variables: {
                  email: values.email,
                  password: values.password
                }
              })
            }
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
