import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";

const Nav = ({ children }) => (
  <ul>
    <li>
      <Link href="../">
        <a>Index</a>
      </Link>
    </li>
    <li>
      <Link href="../character">
        <a>Character sheet</a>
      </Link>
    </li>
    <li>
      <Link href="../bestiary">
        <a>Bestiary</a>
      </Link>
    </li>
    {children}
  </ul>
);

Nav.propTypes = {
  children: PropTypes.node
};

Nav.defaultProps = {
  children: null
};

export default Nav;
