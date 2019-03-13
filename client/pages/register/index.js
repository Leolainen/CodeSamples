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
    mutation signUp($username: String!, $email: String!, $password: String!) {
      signUp(username: $username, email: $email, password: $password) {
        email
        username
      }
    }
  `;

  const passwordValidation = values => {
    // prettier-ignore
    const passRegExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    console.log("password validating", passRegExp.test(values));
    return passRegExp.test(values)
      ? undefined
      : "Password must be at least 8 characters, contain at least 1 number and no special characters";
  };

  /**
 * 
mutation {
  signUp(email: "email@test.com", username: "test", password: "secret") {
    id,
    email,
    username,
    createdAt
  }
}
 */
  return (
    <Mutation
      mutation={LOGIN_MUTATION}
      onCompleted={() => Router.push("/")}
      onError={err => console.log("error:", { ...err })}
    >
      {signUp => (
        <Layout>
          <FForm
            onSubmit={values =>
              signUp({
                variables: {
                  username: values.username,
                  email: values.email,
                  password: values.password
                }
              })
            }
            children={({ submitting, pristine }) => (
              <Container spacing={4} center>
                <h5>Register a new account</h5>
                <Input
                  name="username"
                  type="text"
                  label="Desired username"
                  inverted
                  fullWidth
                  required
                />
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
                  validate={passwordValidation}
                />
                <Button
                  type="submit"
                  disabled={pristine || submitting}
                  fullWidth
                >
                  Register
                </Button>
              </Container>
            )}
          />
        </Layout>
      )}
    </Mutation>
  );
};
