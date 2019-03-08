import PropTypes from "prop-types";
import React from "react";

import Tag from "../Tag";

import styles from "./style.scss";

export default function Tags({ toRender }) {
  return (
    <div className={styles.wrapper}>
      {toRender.map((item, index) => (
        <Tag key={index}>{item}</Tag>
      ))}
    </div>
  );
}

Tags.propTypes = {
  toRender: PropTypes.array.isRequired
};
