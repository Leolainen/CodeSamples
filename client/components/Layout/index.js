import PropTypes from "prop-types";
import React, { useState } from "react";
import classnames from "classnames";

import Hamburger from "../Hamburger";
import Nav from "../Nav";
import Sidebar from "../Sidebar";

import styles from "./style.scss";

const Layout = ({ sidebarData, children, theme }) => {
  const [rightSidebarIsOpen, toggleRightSidebar] = useState(false);
  const [leftSidebarIsOpen, toggleLeftSidebar] = useState(false);

  const layoutTheme = classnames(styles.content, {
    [styles.default]: theme === "default"
  });

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Hamburger
          onClick={() => {
            toggleRightSidebar(false);
            toggleLeftSidebar(!leftSidebarIsOpen);
          }}
          isOpen={leftSidebarIsOpen}
        />

        {sidebarData && (
          <Hamburger
            onClick={() => {
              toggleLeftSidebar(false);
              toggleRightSidebar(!rightSidebarIsOpen);
            }}
            right
            isOpen={rightSidebarIsOpen}
          />
        )}
      </header>
      <aside>
        <Sidebar isOpen={leftSidebarIsOpen}>
          <Nav />
        </Sidebar>

        {sidebarData && (
          <Sidebar isOpen={rightSidebarIsOpen} right>
            <ul>
              {sidebarData.map((data, index) => (
                <li key={index}>{data}</li>
              ))}
            </ul>
          </Sidebar>
        )}
      </aside>
      <div className={layoutTheme}>{children}</div>
    </div>
  );
};

Layout.propTypes = {
  sidebarData: PropTypes.array,
  theme: PropTypes.string,
  children: PropTypes.node.isRequired
};

Layout.defaultProps = {
  sidebarData: null,
  theme: "default"
};

export default Layout;
