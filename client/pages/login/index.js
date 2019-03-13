import { Mutation } from "react-apollo";
import { toast } from "react-toastify";
import React from "react";
import Router from "next/router";
import gql from "graphql-tag";

import Button from "../../components/Button";
import Container from "../../components/Container";
import FForm from "../../components/FForm";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";

export default () => {
  const LOGIN_MUTATION = gql`
    mutation signIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        email
        username
      }
    }
  `;

  return (
    <Mutation
      mutation={LOGIN_MUTATION}
      onError={({ message }) => {
        toast.error(message);
      }}
      onCompleted={() => {
        toast.success("Logged in!");
        Router.push("/");
      }}
    >
      {(signIn, { loading }) => (
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
            children={({ submitting, pristine }) => (
              <Container spacing={4} center>
                <h5>Login to your account</h5>
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
                  {loading ? <Spinner center /> : "Log in"}
                </Button>
              </Container>
            )}
          />
        </Layout>
      )}
    </Mutation>
  );
};
