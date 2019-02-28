import { Field } from "react-final-form";
import { Mutation, Query } from "react-apollo";
import React from "react";
import Router from "next/router";
import gql from "graphql-tag";

import Button from "../../components/Button";
import Container from "../../components/Container";
import CustomSelect from "../../components/CustomSelect";
import FForm from "../../components/FForm";
import Input from "../../components/Input";
import Layout from "../../components/Layout";

export default () => {
  /**
     * 
mutation {
  postSample(
    title:"testing graphql 4",
    codeSample:"<h1>Testing graphql refactor 4</h1>",
    description: "description here",
    languages: ["JavaScript", "HTML"],
    frameworks: ["React"])
    {
      id,
      userId,
      username,
      title,
      codeSample,
      description,
      frameworks {
        framework
      },
      languages {
        language
      },
  }
}
     */
  const POST_MUTATION = gql`
    mutation postSample(
      $title: String!
      $codeSample: String!
      $description: String
      $languages: Array
      $frameworks: Array
    ) {
      postSample(
        title: $title
        codeSample: $codeSample
        description: $description
        languages: $languages
        frameworks: $frameworks
      ) {
        id
        userId
        username
        title
        codeSample
        description
        frameworks {
          framework
        }
        languages {
          language
        }
      }
    }
  `;

  return (
    <Mutation
      mutation={POST_MUTATION}
      onCompleted={() => console.log("Completed! Search for it!")}
      onError={err => console.log("error:", { ...err })}
    >
      {postSample => (
        <Layout>
          <FForm
            onSubmit={({
              title,
              codeSample,
              description,
              languages,
              frameworks
            }) =>
              postSample({
                variables: {
                  title,
                  codeSample,
                  description,
                  languages,
                  frameworks
                }
              })
            }
            children={({ submitting, pristine }) => (
              <Container spacing={6}>
                <h5>Register a new account</h5>
                <Input
                  name="title"
                  type="text"
                  label="Title"
                  fullWidth
                  required
                />
                <Input
                  name="codeSample"
                  label="Sample"
                  fullWidth
                  textarea
                  required
                />
                <Input
                  name="description"
                  label="description"
                  fullWidth
                  textarea
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
                              placeholder="Loading frameworks..."
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
                              isDisabled
                              placeholder="Loading languages..."
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
                <Button
                  type="submit"
                  disabled={pristine || submitting}
                  fullWidth
                >
                  Post sample
                </Button>
              </Container>
            )}
          />
        </Layout>
      )}
    </Mutation>
  );
};
