import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

export default function Tag({ children, onClick, className, ...rest }) {
  const style = classnames(styles.tag, className, {
    [styles.clickable]: onClick
  });

  return (
    <div className={style} onClick={onClick} {...rest}>
      {children}
    </div>
  );
}

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
};

Tag.defaultProps = {
  onClick: null,
  className: ""
};
