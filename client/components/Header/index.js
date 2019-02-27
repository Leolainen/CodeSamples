import { Mutation, Query } from "react-apollo";
import React, { useReducer, useState } from "react";
import Router from "next/router";
import gql from "graphql-tag";

import Button from "../Button";
import Hamburger from "../Hamburger";
import Sidebar from "../Sidebar";
import StyledLink from "../StyledLink";

import { TOGGLE_HAMBURGER } from "./constants";
import reducer from "./reducer";
import styles from "./style.scss";

const initialState = {
  hamburgerIsOpen: false
};

export default function Header() {
  const ME_QUERY = gql`
    query {
      me {
        username
        email
      }
    }
  `;

  const [state, dispatch] = useReducer(reducer, initialState);
  const [me, setMe] = useState({});

  const handleHamburger = () => {
    dispatch({ type: TOGGLE_HAMBURGER });
  };

  return (
    <div>
      <header className={styles.header}>
        <StyledLink className={styles.logo} inheritColor href={"/"}>
          <h2>CodeSamples</h2>
        </StyledLink>
        <Query query={ME_QUERY}>
          {({ error, loading, data }) => {
            if (loading) {
              return <p>Checking login status...</p>;
            }
            if (error) {
              // not being signed in is an error
              // <p>{error.graphQLErrors[0].message}</p>
              return (
                <div className={styles.innerWrapper}>
                  <p>
                    <StyledLink href={"/login"}>Log in</StyledLink>{" "}
                  </p>
                  <p>
                    <StyledLink href={"/register"}>Register</StyledLink>
                  </p>
                </div>
              );
            }

            setMe(data.me);

            return (
              <div className={styles.innerWrapper}>
                <Hamburger
                  className={styles.hamburger}
                  onClick={handleHamburger}
                  isOpen={state.hamburgerIsOpen}
                  right
                />
                <Sidebar right isOpen={state.hamburgerIsOpen}>
                  <StyledLink href="#">Post a sample</StyledLink>
                  <StyledLink href="#">My samples</StyledLink>
                  <Mutation
                    mutation={gql`
                      mutation {
                        signOut
                      }
                    `}
                  >
                    {mutate => (
                      <Button
                        onClick={() => {
                          mutate();
                          setMe({});
                          Router.push("/");
                        }}
                      >
                        Log out
                      </Button>
                    )}
                  </Mutation>
                </Sidebar>
              </div>
            );
          }}
        </Query>
      </header>
      {me && <span className={styles.username}>{me.username}</span>}
    </div>
  );
}
