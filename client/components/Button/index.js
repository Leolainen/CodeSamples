import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

export default function Button({ rounded, fullWidth, children, ...rest }) {
  const style = classnames(styles.button, {
    [styles.rounded]: rounded,
    [styles.fullWidth]: fullWidth
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
