import { Mutation, graphql, withApollo } from "react-apollo";
import React, { useContext, useState } from "react";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import gql from "graphql-tag";

import { Context } from "../../components/Context";
import Button from "../../components/Button";
import Container from "../../components/Container";
import FForm from "../../components/FForm";
import Input from "../../components/Input";
import Layout from "../../components/Layout";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [logIn, toggleLogIn] = useState(false);
  const context = useContext(Context);

  // const stringifyQuery = query => {
  //   return JSON.stringify(query).replace(/[{}]/g, "");
  // };

  const LOGIN_MUTATION = gql`
    mutation singIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        email
        username
      }
    }
  `;

  const handleLogin = data => {
    console.log("Login successful!", data);
    Router.push("/");
  };

  const handleSubmit = submittedData => {
    console.log("submitting", submittedData);

    setEmail(submittedData.email);
    setPassword(submittedData.password);
    context.dispatch({ type: "SET_MUTATION" }, submittedData);
    // toggleLogIn(true);

    // const mutationVariables = `signIn(${stringifyQuery({ ...submittedData })})`;
    // const mutationVariables = `signIn(password: "${
    //   submittedData.password
    // }", email: "${submittedData.email}")`;

    // const stringifiedSubmit = JSON.stringify(submittedData);

    // console.log("stringifiedSubmitData", stringifiedSubmit);
    // console.log("mutationsVariables", mutationVariables);

    // const mutation = gql`
    //   mutation {
    //     ${mutationVariables}
    //     {
    //       username
    //       email
    //     }
    //   }
    // `;

    // const meQuery = gql`
    //   query {
    //     me {
    //       username
    //       email
    //     }
    //   }
    // `;

    // console.log("mutation", mutation);

    // const login = fetch(
    //   `http://localhost:4000/graphql?mutation={signIn(password:"${
    //     submittedData.password
    //   }",email:"${submittedData.email}"){username,email}}`
    // )
    //   .then(res => res.json())
    //   .then(data => console.log("Logged in:", data));
    // const login = fetch(`http://localhost:4000/graphql`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/graphql"
    //   },
    //   body: mutation
    // })
    //   .then(res => res.json())
    //   .then(data => console.log("Logged in:", data));

    // console.log("login", login);

    // const me = fetch(`http://localhost:4000/graphql?query={me{username,email}}`)
    //   .then(res => res.json())
    //   .then(data => console.log(data));
    // console.log("me", me);

    // const mutationRequest = ({ client }) => {
    //   debugger;
    //   const res = client.mutation({ mutation });
    //   console.log("mutationRequest clinet", client);
    //   console.log("mutationRequest res", res);

    //   const { error, loading, data } = res;

    //   if (loading) {
    //     return null;
    //   }
    //   if (error) {
    //     return error;
    //   }

    //   return data;
    // };

    // debugger;
    // const theMutation = withApollo(mutationRequest);

    // console.log("theMutation", theMutation);

    // return (
    //   <Mutation mutation={mutation}>
    //     {({ loading, error, data }) => {
    //       console.log("returned login data", data);

    //       const { username, email } = data;

    //       if (loading) {
    //         return <p>loading</p>;
    //       }
    //       if (error) {
    //         return <p>error</p>;
    //       }

    //       context.dispatch({ type: "LOG_IN" });
    //       context.dispatch({ type: "SET_USERNAME" }, username);
    //       context.dispatch({ type: "SET_EMAIL" }, email);
    //       // Router.push(`/search`);
    //       return <div>a</div>;
    //     }}
    //   </Mutation>
    // );
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
      variables={{
        email: context.mutation.email,
        password: context.mutation.password
      }}
      onCompleted={loginResponse => handleLogin(loginResponse)}
    >
      {mutation => (
        <Layout>
          password:"testpassword1", email:"testemail@email.com"
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
                  onClick={() => mutation()}
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
