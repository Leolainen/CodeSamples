import PropTypes from "prop-types";
import React, { useEffect } from "react";

import styles from "./style.scss";

export default function Modal({ clickOutside, children, ...rest }) {
  let wrapperRef = {};

  const setWrapperRef = node => (wrapperRef = node);

  const handleClickOutside = event => {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      clickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, document.removeEventListener("mousedown", handleClickOutside));

  return (
    <div className={styles.modalWrapper} {...rest}>
      <div ref={setWrapperRef} className={styles.modal}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  clickOutside: PropTypes.func.isRequired
};
