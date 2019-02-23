import { Query } from "react-apollo";
import React, { useContext } from "react";
import gql from "graphql-tag";

import { Context } from "../../components/Context";
import Container from "../../components/Container";
import Layout from "../../components/Layout";

export default () => {
  const context = useContext(Context);

  const { title, frameworks, languages } = context.query;
  const processedFrameworks =
    frameworks && frameworks.map(fw => `"${fw.value}"`);
  const frameworkQuery = frameworks && `frameworks: [${processedFrameworks}]`;

  // eslint-disable-next-line object-shorthand
  const titleQuery = title && `title: "${title}"`;

  const processedLanguages =
    languages && languages.map(lang => `"${lang.value}"`);
  const languageQuery = languages && `languages: [${processedLanguages}]`;

  console.log("titleQuery", titleQuery);
  console.log("frameworkQuery", frameworkQuery);
  console.log("languageQuery", languageQuery);

  const dynamicQueryHandler = () => {
    let samplesQuery = "samples";
    if (!context.query) {
      return samplesQuery;
    }
    samplesQuery = "samples(";

    if (title) {
      samplesQuery += `${titleQuery}, `;
      //   samplesQuery.concat(", ", titleQuery);
    }
    if (languages) {
      samplesQuery += `${languageQuery}, `;
      //   samplesQuery.concat(", ", languageQuery);
    }
    if (frameworks) {
      samplesQuery += `${frameworkQuery}, `;
      //   samplesQuery.concat(", ", frameworkQuery);
    }

    samplesQuery += ")";

    console.log("finished sampleQuery", samplesQuery);
    return samplesQuery;
  };

  const dynamicQuery = dynamicQueryHandler();
  const query = gql`{
      ${dynamicQuery} {
        username
        codeSample
        title
        frameworks {
          framework
        }
        languages {
          language
        }
      }
    }
  `;

  console.log("complete query:", query);

  return (
    <Layout center>
      <Query
        query={query}
        variables={{ titleQuery, languageQuery, frameworkQuery }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error: {error}</p>;
          }

          console.log("data", data);

          return (
            <Container transparent>
              <pre>{JSON.stringify(data, 0, 2)}</pre>
            </Container>
          );
        }}
      </Query>
    </Layout>
  );
};
