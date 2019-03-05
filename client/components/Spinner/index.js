import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

export default function Spinner({ relative }) {
  const style = classnames(styles.spinner, {
    [styles.relative]: relative
  });

  return (
    <div className={styles.spinnerWrapper}>
      <span className={style} />
    </div>
  );
}

Spinner.propTypes = {
  relative: PropTypes.bool
};

Spinner.defaultProps = {
  relative: false
};
