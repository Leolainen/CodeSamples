import {
  FaCode,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserPlus
} from "react-icons/fa";
import { Mutation, Query } from "react-apollo";
import React, { useReducer, useState } from "react";
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
                  <Hamburger
                    className={styles.hamburger}
                    onClick={toggleSidebar}
                    isOpen={state.sidebarIsOpen}
                    right
                  />
                  <Sidebar right isOpen={state.sidebarIsOpen}>
                    <StyledLink href={"/login"} icon={<FaSignInAlt />}>
                      <span>Log in</span>
                    </StyledLink>
                    <StyledLink href={"/register"} icon={<FaUserPlus />}>
                      <span>Register</span>
                    </StyledLink>
                  </Sidebar>
                </div>
              );
            }

            setMe(data.me);

            return (
              <div className={styles.innerWrapper}>
                <Hamburger
                  className={styles.hamburger}
                  onClick={toggleSidebar}
                  isOpen={state.sidebarIsOpen}
                  right
                />
                <Sidebar right isOpen={state.sidebarIsOpen}>
                  <StyledLink href="#" icon={<FaCode />}>
                    <span>Post a sample</span>
                  </StyledLink>
                  <StyledLink href="#" icon={<FaUser />}>
                    <span>My samples</span>
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
                        <span>Log out</span>
                      </StyledLink>
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
