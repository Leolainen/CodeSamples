import { Field } from "react-final-form";
import { Query } from "react-apollo";
import React, { useContext } from "react";
import Router from "next/router";
import gql from "graphql-tag";

import { Context } from "../components/Context";
import Button from "../components/Button";
import Container from "../components/Container";
import CustomSelect from "../components/CustomSelect";
import FForm from "../components/FForm";
import Input from "../components/Input";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";

export default () => {
  const context = useContext(Context);

  const handleSubmit = data => {
    window.localStorage.setItem("query", JSON.stringify(data));
    context.dispatch({ type: "SET_QUERY" }, data);
    Router.push(`/search`);
  };

  return (
    <React.Fragment>
      <Layout center>
        <FForm
          onSubmit={handleSubmit}
          children={({ submitting, pristine }) => (
            <Container spacing={2} center>
              <Input
                name="title"
                type="search"
                placeholder="Search for a sample"
                fullWidth
              />
              <Field
                name="frameworks"
                render={({ input }) => (
                  <Query
                    query={gql`
                      {
                        allFrameworks {
                          framework
                        }
                      }
                    `}
                  >
                    {({ loading, error, data }) => {
                      if (loading) {
                        return (
                          <CustomSelect
                            isDisabled
                            placeholder={<Spinner relative />}
                          />
                        );
                      }
                      if (error) {
                        return (
                          <CustomSelect
                            isDisabled
                            placeholder={`Error: ${error}`}
                          />
                        );
                      }

                      const options = data.allFrameworks.map(fw => {
                        return { label: fw.framework, value: fw.framework };
                      });

                      return (
                        <CustomSelect
                          placeholder="Select framework..."
                          isSearchable
                          isMulti
                          {...input}
                          options={options}
                        />
                      );
                    }}
                  </Query>
                )}
              />

              <Field
                name="languages"
                render={({ input }) => (
                  <Query
                    query={gql`
                      {
                        allLanguages {
                          language
                        }
                      }
                    `}
                  >
                    {({ loading, error, data }) => {
                      if (loading) {
                        return (
                          <CustomSelect
                            options={[]}
                            isDisabled
                            placeholder={<Spinner relative />}
                          />
                        );
                      }
                      if (error) {
                        return (
                          <CustomSelect
                            options={[]}
                            isDisabled
                            placeholder={`Error: ${error}`}
                          />
                        );
                      }

                      const options = data.allLanguages.map(lang => {
                        return { label: lang.language, value: lang.language };
                      });

                      return (
                        <CustomSelect
                          placeholder="Select language..."
                          isSearchable
                          isMulti
                          {...input}
                          options={options}
                        />
                      );
                    }}
                  </Query>
                )}
              />

              <Button type="submit" fullWidth disabled={pristine || submitting}>
                Search
              </Button>
            </Container>
          )}
        />
      </Layout>
    </React.Fragment>
  );
};
