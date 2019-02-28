import {
  FaCode,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserPlus
} from "react-icons/fa";
import { Mutation, Query } from "react-apollo";
import React, { Fragment, useReducer, useState } from "react";
import gql from "graphql-tag";

import Hamburger from "../Hamburger";
import Sidebar from "../Sidebar";
import StyledLink from "../StyledLink";

import { TOGGLE_SIDEBAR } from "./constants";
import reducer from "./reducer";
import styles from "./style.scss";

const initialState = {
  sidebarIsOpen: false
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

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  return (
    <div>
      <header className={styles.header}>
        <StyledLink className={styles.logo} inheritColor href={"/"}>
          <h2>CodeSamples</h2>
        </StyledLink>

        <div className={styles.innerWrapper}>
          <Hamburger
            className={styles.hamburger}
            onClick={toggleSidebar}
            isOpen={state.sidebarIsOpen}
            right
          />
          <Query query={ME_QUERY}>
            {({ error, loading, data }) => {
              if (loading) {
                return <p>Checking login status...</p>;
              }
              if (error) {
                // not being signed in is an error
                // <p>{error.graphQLErrors[0].message}</p>
                return (
                  <Sidebar
                    right
                    isOpen={state.sidebarIsOpen}
                    onClick={toggleSidebar}
                  >
                    <StyledLink href={"/login"} icon={<FaSignInAlt />}>
                      Log in
                    </StyledLink>
                    <StyledLink href={"/register"} icon={<FaUserPlus />}>
                      Register
                    </StyledLink>
                  </Sidebar>
                );
              }

              setMe(data.me);

              return (
                <Fragment>
                  <Sidebar
                    right
                    isOpen={state.sidebarIsOpen}
                    onClick={toggleSidebar}
                  >
                    <StyledLink href="/newSample" icon={<FaCode />}>
                      Post a sample
                    </StyledLink>
                    <StyledLink href="#" icon={<FaUser />}>
                      My samples
                    </StyledLink>
                    <Mutation
                      mutation={gql`
                        mutation {
                          signOut
                        }
                      `}
                    >
                      {mutate => (
                        <StyledLink
                          href="/"
                          icon={<FaSignOutAlt />}
                          onClick={() => {
                            mutate();
                            setMe({});
                          }}
                        >
                          Log out
                        </StyledLink>
                      )}
                    </Mutation>
                  </Sidebar>
                </Fragment>
              );
            }}
          </Query>
        </div>
      </header>
      {me && <span className={styles.username}>{me.username}</span>}
    </div>
  );
}

/**
 * <Button
                        onClick={() => {
                          mutate();
                          setMe({});
                          Router.push("/");
                        }}
                      >
                        Log out
                      </Button>
 */
