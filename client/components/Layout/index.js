import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

const Layout = ({ aside, children, theme }) => {
  const layoutTheme = classnames(styles.content, {
    [styles.default]: theme === "default"
  });

  return (
    <div className={styles.wrapper}>
      {aside && <aside className={styles.aside}>Aside</aside>}
      <div className={layoutTheme}>{children}</div>
    </div>
  );
};

Layout.propTypes = {
  aside: PropTypes.any,
  theme: PropTypes.string,
  children: PropTypes.node.isRequired
};

Layout.defaultProps = {
  aside: undefined,
  theme: "default"
};

export default Layout;
