import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

const Sidebar = ({ children, isOpen, right }) => {
  const style = classnames(styles.innerWrapper, {
    [styles.isOpen]: isOpen,
    [styles.right]: right
  });

  return (
    <div className={styles.wrapper}>
      <div className={style}>
        <div className={styles.itemsWrapper}>{children}</div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  right: PropTypes.bool
};

Sidebar.defaultProps = {
  isOpen: false,
  right: false
};

export default Sidebar;

/**
 * example on how to use this component if it ever gets used
 * <Sidebar isOpen={leftSidebarIsOpen}>
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
 */
