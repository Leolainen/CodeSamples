import { Query } from "react-apollo";
import { toast } from "react-toastify";
import React, { Fragment, useContext, useEffect } from "react";
import Router, { withRouter } from "next/router";
import gql from "graphql-tag";

import { Context } from "../../components/Context";
import { isEmpty } from "../../utils/objects";
import Layout from "../../components/Layout";
import Sample from "../../components/Sample";
import Spinner from "../../components/Spinner";
import StyledLink from "../../components/StyledLink";

export default withRouter(() => {
  const context = useContext(Context);

  useEffect(() => {
    if (isEmpty(context.me)) {
      toast.error("You're not signed in!");
      Router.push("/");
    }
  }, []);

  const SAMPLE_QUERY = gql`
    query Sample($userId: String) {
      samples(userId: $userId) {
        id
        userId
        username
        codeSample
        title
        likes
        description
        edited
        createdAt
        updatedAt
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
        query={SAMPLE_QUERY}
        variables={{ userId: context.me.id }}
        onError={({ message }) => toast.error(message)}
      >
        {({ loading, data, error }) => {
          if (loading) {
            return <Spinner />;
          }

          if (error) {
            return <p>Something went wrong...</p>;
          }

          return (
            <Fragment>
              {data.samples.length > 0 ? (
                <Fragment>
                  {data.samples.map((sample, index) => (
                    <div key={index}>
                      <Sample
                        preview
                        {...sample}
                        href={`/codeSample?sample=${sample.id}`}
                      />
                    </div>
                  ))}
                </Fragment>
              ) : (
                <p>
                  You have not posted any code samples!{" "}
                  <StyledLink href="/newSample">
                    Click here to post a sample
                  </StyledLink>
                </p>
              )}
            </Fragment>
          );
        }}
      </Query>
    </Layout>
  );
});
