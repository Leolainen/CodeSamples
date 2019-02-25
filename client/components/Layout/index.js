import { Query } from "react-apollo";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import classnames from "classnames";
import gql from "graphql-tag";

import { Context } from "../Context";

import styles from "./style.scss";

const ME_QUERY = gql`
  query {
    me {
      username
      email
    }
  }
`;

const Layout = ({ center, aside, children, theme }) => {
  const { loggedIn } = useContext(Context);
  const contentStyle = classnames(styles.content);

  const wrapperStyle = classnames(styles.wrapper, {
    [styles.center]: center,
    [styles.default]: theme === "default"
  });

  return (
    <div className={wrapperStyle}>
      <header className={styles.header}>
        <Query query={ME_QUERY}>
          {({ error, loading, data }) => {
            if (loading) {
              return <p>Checking login status...</p>;
            }
            if (error) {
              console.error("error", { ...error });
              return (
                <div>
                  <p>{error.graphQLErrors[0].message}</p>
                  <p>
                    <Link href={"/login"}>
                      <a>Log in</a>
                    </Link>{" "}
                    or{" "}
                    <Link href={"/register"}>
                      <a>Register a new account</a>
                    </Link>
                  </p>
                </div>
              );
            }
            const { me } = data;
            return <p>welcome, {me.username}</p>;
          }}
        </Query>
      </header>
      {aside && <aside className={styles.aside}>Aside</aside>}
      <div className={contentStyle}>{children}</div>
    </div>
  );
};

Layout.propTypes = {
  aside: PropTypes.any,
  theme: PropTypes.string,
  children: PropTypes.node.isRequired,
  center: PropTypes.bool
};

Layout.defaultProps = {
  aside: undefined,
  theme: "default",
  center: false
};

export default Layout;
