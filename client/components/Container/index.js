import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

export default function Container({
  transparent,
  center,
  className,
  children,
  spacing,
  ...rest
}) {
  // eslint-disable-next-line
  const style = classnames(styles.default, styles.spacing_[spacing], {
    className,
    ...rest,
    [styles.center]: center,
    [styles.transparent]: transparent
  });

  // console.log("spacing is set", spacing);
  // console.log(`styles.spacing_[spacing]`, styles.spacing_[spacing]);
  // console.log("classnames(style)", style);

  return <div className={style}>{children}</div>;
}

Container.propTypes = {
  className: PropTypes.string,
  transparent: PropTypes.bool,
  center: PropTypes.bool,
  children: PropTypes.node.isRequired,
  spacing: PropTypes.number
};

Container.defaultProps = {
  className: "",
  transparent: false,
  center: false,
  spacing: null
};
