import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

export default function Spinner({ center }) {
  const style = classnames(styles.spinnerWrapper, {
    [styles.center]: center
  });

  return (
    <div className={style}>
      <span className={styles.spinner} />
    </div>
  );
}
