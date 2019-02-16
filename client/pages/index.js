import { Field } from "react-final-form";
import React from "react";
import Select from "react-select";

import Button from "../components/Button";
import Container from "../components/Container";
import FForm from "../components/FForm";
import Input from "../components/Input";
import Layout from "../components/Layout";

const mockOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "c#", label: "C#" }
];

export default () => {
  const handleSubmit = data => {
    console.log(data);
  };

  return (
    <Layout center>
      <FForm
        onSubmit={handleSubmit}
        children={({ submitting, pristine, values }) => (
          <Container center transparent>
            <Input
              name="title"
              type="search"
              label="Search for a sample"
              rounded
              inverted
            />
            <Field
              name="languages"
              render={({ input }) => (
                <Select {...input} options={mockOptions} />
              )}
            />

            <Button type="submit" disabled={pristine || submitting}>
              submit
            </Button>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </Container>
        )}
      />
    </Layout>
  );
};
