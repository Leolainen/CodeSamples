import PropTypes from "prop-types";
import React, { useContext } from "react";
import classnames from "classnames";

import { Context } from "../Context";

import styles from "./style.scss";

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
        {!loggedIn && (
          <p>
            <a href="#">Log in</a> or <a href="#">register!</a>
          </p>
        )}
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
