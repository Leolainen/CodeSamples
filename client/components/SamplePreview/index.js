import React from "react";

import Container from "../Container";

import styles from "./style.scss";

export default function SamplePreview({
  title,
  username,
  id,
  description,
  frameworks,
  languages,
  codeSample,
  ...rest
}) {
  return (
    <Container className={styles.wrapper}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <span>by: {username}</span>
      </div>
      {frameworks.length > 0 && (
        <div className={styles.tagWrapper}>
          {frameworks.map((fw, index) => (
            <div key={index} className={styles.tag}>
              {fw.framework}
            </div>
          ))}
        </div>
      )}
      {languages.length > 0 && (
        <div className={styles.tagWrapper}>
          {languages.map((lang, index) => (
            <div key={index} className={styles.tag}>
              {lang.language}
            </div>
          ))}
        </div>
      )}
      <div className={styles.codeSample}>
        <pre>{codeSample}</pre>
      </div>
    </Container>
  );
}
