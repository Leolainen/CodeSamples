import PropTypes from "prop-types";
import React from "react";

import styles from "./style.scss";

export default function Tag({ children }) {
  return <div className={styles.tag}>{children}</div>;
}

Tag.propTypes = {
  children: PropTypes.node.isRequired
};
