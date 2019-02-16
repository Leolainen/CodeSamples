import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

const Hamburger = ({ right, isOpen, ...rest }) => {
  const barStyle = classnames(styles.bar, {
    [styles.isOpen]: isOpen,
    [styles.right]: right
  });

  return (
    <div className={styles.wrapper} {...rest}>
      <span className={barStyle} />
      <span className={barStyle} />
      <span className={barStyle} />
    </div>
  );
};

Hamburger.propTypes = {
  isOpen: PropTypes.bool,
  right: PropTypes.bool
};

Hamburger.defaultProps = {
  isOpen: false,
  right: false
};

export default Hamburger;

/**
 * example on how to use this component
 * <Hamburger
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
 */
