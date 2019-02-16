import React, { useContext } from "react";

import { Context } from "../components/Context";
import Input from "../components/Input";
import Layout from "../components/Layout";

export default () => {
  const { loggedIn } = useContext(Context);

  return (
    <Layout>
      <h1>index!</h1>
      {!loggedIn && (
        <p>
          <a href="#">Log in</a> or <a href="#">register!</a>
        </p>
      )}

      <Input label="Search for a sample" rounded />
    </Layout>
  );
};
