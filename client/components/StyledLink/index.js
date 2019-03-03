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
  onClick,
  noStyle
}) {
  const style = classnames(styles.root, className, {
    [styles.inheritColor]: inheritColor,
    [styles.noStyle]: noStyle
  });

  return (
    <Link href={href}>
      <div>
        <a className={style} onClick={onClick}>
          {icon && icon}
          <span>{children}</span>
        </a>
      </div>
    </Link>
  );
}

StyledLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  inheritColor: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  noStyle: PropTypes.bool
};

StyledLink.defaultProps = {
  className: "",
  inheritColor: false,
  icon: null,
  onClick: null,
  noStyle: false
};
