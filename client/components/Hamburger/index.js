import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

const Hamburger = ({ right, isOpen, className, ...rest }) => {
  const wrapperStyle = classnames(styles.wrapper, className);
  const barStyle = classnames(styles.bar, {
    [styles.isOpen]: isOpen,
    [styles.right]: right
  });

  return (
    <button type="button" className={wrapperStyle} {...rest}>
      <span className={barStyle} />
      <span className={barStyle} />
      <span className={barStyle} />
    </button>
  );
};

Hamburger.propTypes = {
  isOpen: PropTypes.bool,
  right: PropTypes.bool,
  className: PropTypes.string
};

Hamburger.defaultProps = {
  isOpen: false,
  right: false,
  className: ""
};

export default Hamburger;
