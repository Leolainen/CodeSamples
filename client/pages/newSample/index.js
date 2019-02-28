import { Field } from "react-final-form";
import { Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";
import React from "react";
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
      $languages: [String]
      $frameworks: [String]
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

  const preventTab = e => {
    if (e.key === "Tab") {
      e.preventDefault();
      return "\t";
    }
  };

  return (
    <Mutation
      mutation={POST_MUTATION}
      onCompleted={() => toast.success("Your sample was posted!")}
      onError={({ err }) => toast.warn(err)}
    >
      {postSample => (
        <Layout>
          <FForm
            onSubmit={
              ({ title, codeSample, description, languages, frameworks }) =>
                postSample({
                  variables: {
                    title,
                    codeSample,
                    description,
                    languages: languages
                      ? languages.map(language => language.value)
                      : [],
                    frameworks: frameworks
                      ? frameworks.map(framework => framework.value)
                      : []
                  }
                })
              // frameworks: [...frameworks.framework]
            }
            children={({ submitting, pristine, values }) => (
              <Container spacing={6}>
                <h5>Post a new sample!</h5>
                <Input
                  name="title"
                  type="text"
                  placeholder="Title"
                  fullWidth
                  required
                />
                <Input
                  name="codeSample"
                  placeholder="Sample"
                  fullWidth
                  textarea
                  required
                  rows={4}
                  onKeyDown={preventTab}
                />
                <Input
                  name="description"
                  placeholder="description"
                  fullWidth
                  textarea
                  rows={4}
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
                          return {
                            label: fw.framework,
                            value: fw.framework
                          };
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
                          return {
                            label: lang.language,
                            value: lang.language
                          };
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
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </Container>
            )}
          />
        </Layout>
      )}
    </Mutation>
  );
};
