import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

export default function StyledLink({
  href,
  children,
  className,
  inheritColor,
  icon,
  onClick
}) {
  const style = classnames(styles.root, className, {
    [styles.inheritColor]: inheritColor
  });

  return (
    <Link href={href}>
      <a className={style} onClick={onClick}>
        {icon && icon}
        {children}
      </a>
    </Link>
  );
}

StyledLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  inheritColor: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func
};

StyledLink.defaultProps = {
  className: "",
  inheritColor: false,
  icon: null,
  onClick: null
};
