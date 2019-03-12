import { Field } from "react-final-form";
import { Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";
import React from "react";
import Router from "next/router";
import gql from "graphql-tag";

import Button from "../../components/Button";
import Container from "../../components/Container";
import CustomSelect from "../../components/CustomSelect";
import Editor from "../../components/Editor";
import FForm from "../../components/FForm";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";

export default () => {
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

  return (
    <Mutation
      mutation={POST_MUTATION}
      onCompleted={data => {
        toast.success("Your sample was posted!");
        Router.push(`/codeSample?sample=${data.postSample.id}`);
      }}
      onError={({ message }) => toast.error(message)}
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
                  languages: languages
                    ? languages.map(language => language.value)
                    : [],
                  frameworks: frameworks
                    ? frameworks.map(framework => framework.value)
                    : []
                }
              })
            }
            children={({ submitting, pristine }) => (
              <Container spacing={6}>
                <h5>Post a new sample!</h5>
                <Input
                  name="title"
                  type="text"
                  placeholder="Title"
                  fullWidth
                  required
                />
                <Field name="codeSample">
                  {({ input }) => (
                    <Editor
                      mode="javascript"
                      theme="monokai"
                      {...input}
                      highlightActiveLine
                      showGutter
                      width="100%"
                      enableBasicAutocompletion
                    />
                  )}
                </Field>
                <Input
                  name="description"
                  placeholder="description"
                  fullWidth
                  textarea
                  rows={9}
                />
                <Field
                  name="frameworks"
                  render={({ input }) => (
                    <Query
                      onError={({ message }) => toast.error(message)}
                      query={gql`
                        {
                          allFrameworks {
                            framework
                          }
                        }
                      `}
                    >
                      {({ loading, data }) => {
                        if (loading) {
                          return (
                            <CustomSelect
                              isDisabled
                              placeholder={<Spinner />}
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
                            creatable
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
                      onError={({ message }) => toast.error(message)}
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
                              placeholder={<Spinner />}
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
                            creatable
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
