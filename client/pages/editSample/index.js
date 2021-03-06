import { Field } from "react-final-form";
import { Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";
import React from "react";
import Router, { withRouter } from "next/router";
import gql from "graphql-tag";

import Button from "../../components/Button";
import Container from "../../components/Container";
import CustomSelect from "../../components/CustomSelect";
import Editor from "../../components/Editor";
import FForm from "../../components/FForm";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";

export default withRouter(props => {
  const sampleId = props.router.query.sample;

  const SAMPLE_QUERY = gql`
    query sampleById($id: ID!) {
      sampleById(id: $id) {
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

  const UPDATE_MUTATION = gql`
    mutation updateSample(
      $id: ID!
      $title: String
      $codeSample: String
      $description: String
      $languages: [String]
      $frameworks: [String]
    ) {
      updateSample(
        id: $id
        title: $title
        codeSample: $codeSample
        description: $description
        languages: $languages
        frameworks: $frameworks
      ) {
        id
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
    <Query
      query={SAMPLE_QUERY}
      variables={{ id: sampleId }}
      onError={({ message }) => toast.error(message)}
    >
      {({ loading, data }) => {
        if (loading) {
          return <Spinner relative />;
        }

        const { sampleById } = data;

        const fetchedLanguages = sampleById.languages.map(lang => ({
          label: lang.language,
          value: lang.language
        }));
        const fetchedFrameworks = sampleById.frameworks.map(fw => ({
          label: fw.framework,
          value: fw.framework
        }));

        return (
          <Mutation
            mutation={UPDATE_MUTATION}
            onCompleted={({ updateSample }) => {
              toast.success("Your sample was updated successfully!");
              Router.push(`/codeSample?sample=${updateSample.id}`);
            }}
            onError={({ message }) => toast.error(message)}
          >
            {updateSample => (
              <Layout>
                <FForm
                  initialValues={{
                    title: sampleById.title,
                    codeSample: sampleById.codeSample,
                    description: sampleById.description,
                    frameworks: fetchedFrameworks,
                    languages: fetchedLanguages
                  }}
                  onSubmit={({
                    title,
                    codeSample,
                    description,
                    languages,
                    frameworks
                  }) =>
                    updateSample({
                      variables: {
                        id: sampleId,
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
                      <h5>
                        Edit <i>{data.sampleById.title}</i>
                      </h5>
                      <Input name="title" type="text" fullWidth required />
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
                        rows={4}
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
                        Update sample
                      </Button>
                    </Container>
                  )}
                />
              </Layout>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
});
