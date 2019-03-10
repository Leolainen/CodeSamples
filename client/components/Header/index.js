import {
  FaCode,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserPlus
} from "react-icons/fa";
import { Mutation, Query } from "react-apollo";
import React, { Fragment, useContext, useReducer } from "react";
import gql from "graphql-tag";

import { Context } from "../Context";
import Hamburger from "../Hamburger";
import Sidebar from "../Sidebar";
import StyledLink from "../StyledLink";

import { LOGGED_IN, LOGGED_OUT, TOGGLE_SIDEBAR } from "./constants";
import reducer from "./reducer";
import styles from "./style.scss";

const initialState = {
  sidebarIsOpen: false
};

export default function Header() {
  const context = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const LoggedInMenu = () => (
    <Fragment>
      {context.me && (
        <span className={styles.username}>{context.me.username}</span>
      )}
      <Sidebar right isOpen={state.sidebarIsOpen} onClick={toggleSidebar}>
        <StyledLink href="/newSample" icon={<FaCode />}>
          Post a sample
        </StyledLink>
        <StyledLink href="/mySamples" icon={<FaUser />}>
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
                context.dispatch({ type: LOGGED_OUT });
                mutate();
              }}
            >
              Log out
            </StyledLink>
          )}
        </Mutation>
      </Sidebar>
    </Fragment>
  );

  const ME_QUERY = gql`
    query {
      me {
        id
        username
        email
      }
    }
  `;

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
          {context.loggedIn ? (
            LoggedInMenu()
          ) : (
            <Query query={ME_QUERY}>
              {({ error, loading, data }) => {
                if (loading) {
                  return <span />;
                }
                if (error) {
                  // not being signed in is an error
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

                context.dispatch({ type: LOGGED_IN }, data.me);

                return <Fragment>{LoggedInMenu()}</Fragment>;
              }}
            </Query>
          )}
        </div>
      </header>
    </div>
  );
}
