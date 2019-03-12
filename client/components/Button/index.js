import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

export default function Button({
  rounded,
  className,
  fullWidth,
  children,
  noStyle,
  ...rest
}) {
  const style = classnames(styles.button, className, {
    [styles.rounded]: rounded,
    [styles.fullWidth]: fullWidth,
    [styles.noStyle]: noStyle
  });

  return (
    <button className={style} type="button" {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  rounded: PropTypes.bool,
  className: PropTypes.string,
  noStyle: PropTypes.bool
};

Button.defaultProps = {
  children: "",
  rounded: false,
  className: "",
  noStyle: false
};
