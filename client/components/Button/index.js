import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

export default function Button({ rounded, children, ...rest }) {
  const style = classnames(styles.button, {
    [styles.rounded]: rounded
  });

  return (
    <button className={style} type="button" {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  rounded: PropTypes.bool
};

Button.defaultProps = {
  children: "",
  rounded: false
};
