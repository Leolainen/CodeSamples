import PropTypes from "prop-types";
import React from "react";

import styles from "./style.scss";

export default function Tag({ children, ...rest }) {
  return (
    <div className={styles.tag} {...rest}>
      {children}
    </div>
  );
}

Tag.propTypes = {
  children: PropTypes.node.isRequired
};
