import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

const Layout = ({ header, aside, children, theme }) => {
  const layoutTheme = classnames(styles.content, {
    [styles.default]: theme === "default"
  });

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>{header}</header>
      {aside && <aside className={styles.aside}>Aside</aside>}
      <div className={layoutTheme}>{children}</div>
    </div>
  );
};

Layout.propTypes = {
  aside: PropTypes.any,
  theme: PropTypes.string,
  children: PropTypes.node.isRequired,
  header: PropTypes.node
};

Layout.defaultProps = {
  aside: undefined,
  theme: "default",
  header: null
};

export default Layout;
