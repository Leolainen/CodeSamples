import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

// custom validation for the spacing prop
const validateSpacing = (props, propName, componentName) => {
  if (props[propName]) {
    const value = props[propName];

    if (value >= 1 && value <= 24) {
      return null;
    }
    return new Error(
      `Validation failed: The property ${propName} in ${componentName} expects a number value between 1 - 24. Supplied value is ${value}.`
    );
  }

  // if validation passes
  return null;
};

export default function Container({
  transparent,
  center,
  className,
  children,
  spacing,
  ...rest
}) {
  const style = classnames(
    styles.default,
    styles[`spacing_${spacing}`],
    className,
    {
      ...rest,
      [styles.center]: center,
      [styles.transparent]: transparent
    }
  );

  return <div className={style}>{children}</div>;
}

Container.propTypes = {
  className: PropTypes.string,
  transparent: PropTypes.bool,
  center: PropTypes.bool,
  children: PropTypes.node.isRequired,
  spacing: validateSpacing
};

Container.defaultProps = {
  className: "",
  transparent: false,
  center: false,
  spacing: null
};
