import {
  FaCode,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserPlus
} from "react-icons/fa";
import { Mutation, Query } from "react-apollo";
import React, {
  Fragment,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
import gql from "graphql-tag";

import { Context } from "../Context";
import Hamburger from "../Hamburger";
import Sidebar from "../Sidebar";
import StyledLink from "../StyledLink";

import {
  LOGGED_IN,
  LOGGED_OUT,
  TOGGLE_SIDEBAR,
  UPDATE_WINDOW_WIDTH,
  WINDOW_WIDTH_DESKTOP
} from "./constants";
import reducer from "./reducer";
import styles from "./style.scss";

const initialState = {
  sidebarIsOpen: false,
  windowWidth: 0
};

export default function Header() {
  const context = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [windowWidth, setWindowWidth] = useState(0);

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  // const updateWindowWidth = () => {
  //   dispatch({ type: UPDATE_WINDOW_WIDTH, data: window.innerWidth });
  //   console.log("state", state);
  // };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    console.log(windowWidth);
    // dispatch({ type: UPDATE_WINDOW_WIDTH, data: window.innerWidth });
    // window.addEventListener("resize", () => updateWindowWidth());

    // return () =>
    //   window.removeEventListener("resize", () => updateWindowWidth());
  }, []);

  const ME_QUERY = gql`
    query {
      me {
        id
        username
        email
      }
    }
  `;

  const authorizedSidebar = () => (
    <Fragment>
      <Hamburger
        className={styles.hamburger}
        onClick={toggleSidebar}
        isOpen={state.sidebarIsOpen}
        right
      />
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

  const authorizedLinks = () => (
    <Fragment>
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
    </Fragment>
  );

  const unauthorizedSidebar = () => (
    <Fragment>
      <Hamburger
        className={styles.hamburger}
        onClick={toggleSidebar}
        isOpen={state.sidebarIsOpen}
        right
      />

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

          return <Fragment>{authorizedSidebar()}</Fragment>;
        }}
      </Query>
    </Fragment>
  );

  const unauthorizedLinks = () => (
    <Query query={ME_QUERY}>
      {({ error, loading, data }) => {
        if (loading) {
          return <span />;
        }
        if (error) {
          // not being signed in is an error
          return (
            <Fragment>
              <StyledLink href={"/login"} icon={<FaSignInAlt />}>
                Log in
              </StyledLink>
              <StyledLink href={"/register"} icon={<FaUserPlus />}>
                Register
              </StyledLink>
            </Fragment>
          );
        }

        context.dispatch({ type: LOGGED_IN }, data.me);

        return <Fragment>{authorizedLinks()}</Fragment>;
      }}
    </Query>
  );

  const LoggedInHeader = () => (
    <Fragment>
      {context.me && (
        <span className={styles.username}>{context.me.username}</span>
      )}
      {windowWidth < WINDOW_WIDTH_DESKTOP ? (
        authorizedSidebar()
      ) : (
        <div className={styles.headerLinks}>{authorizedLinks()}</div>
      )}
    </Fragment>
  );

  const LoggedOutHeader = () => (
    <Fragment>
      {windowWidth < WINDOW_WIDTH_DESKTOP ? (
        unauthorizedSidebar()
      ) : (
        <div className={styles.headerLinks}>{unauthorizedLinks()}</div>
      )}
    </Fragment>
  );

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.innerWrapper}>
          <StyledLink className={styles.logo} inheritColor href={"/"}>
            <h2>CodeSamples</h2>
          </StyledLink>

          {context.loggedIn ? LoggedInHeader() : LoggedOutHeader()}
        </div>
      </header>
    </div>
  );
}
