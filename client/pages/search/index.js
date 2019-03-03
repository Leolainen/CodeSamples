import { Query } from "react-apollo";
import { withRouter } from "next/router";
import React, { useContext } from "react";
import gql from "graphql-tag";

import { Context } from "../../components/Context";
import Layout from "../../components/Layout";
import Sample from "../../components/Sample";
import StyledLink from "../../components/StyledLink";

export default withRouter(props => {
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

  const dynamicQueryHandler = () => {
    // This is the ugliest function ever but it works until I figure out something better.
    let samplesQuery = "samples(";

    if (title) {
      samplesQuery = samplesQuery.concat(", ", titleQuery);
    }
    if (languages) {
      samplesQuery = samplesQuery.concat(", ", languageQuery);
    }
    if (frameworks) {
      samplesQuery = samplesQuery.concat(", ", frameworkQuery);
    }

    samplesQuery += ")";

    if (!title && !languages && !frameworks) {
      samplesQuery = "samples";
    }

    return samplesQuery;
  };

  const dynamicQuery = dynamicQueryHandler();
  const query = gql`{
      ${dynamicQuery} {
        id
        username
        codeSample
        title
        likes
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

          return (
            <div>
              {data.samples.map((sample, index) => (
                <StyledLink
                  key={sample.id}
                  href={`/codeSample?sample=${sample.id}`}
                  noStyle
                >
                  <Sample key={index} {...sample} />
                </StyledLink>
              ))}
            </div>
          );
        }}
      </Query>
    </Layout>
  );
});
