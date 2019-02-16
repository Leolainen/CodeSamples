import React, { useContext } from "react";

import { Context } from "../components/Context";
import Container from "../components/Container";
import Input from "../components/Input";
import Layout from "../components/Layout";

export default () => {
  const { loggedIn } = useContext(Context);

  return (
    <Layout
      header={
        !loggedIn && (
          <p>
            <a href="#">Log in</a> or <a href="#">register!</a>
          </p>
        )
      }
    >
      <Container center transparent>
        <Input label="Search for a sample" rounded />
      </Container>
    </Layout>
  );
};
