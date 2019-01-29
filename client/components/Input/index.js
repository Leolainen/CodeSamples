import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

export default function Input({ label, rounded, ...rest }) {
  const style = classnames(styles.input, {
    [styles.rounded]: rounded
  });

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={style} {...rest} />
    </div>
  );
}
