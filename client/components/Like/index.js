import { FaThumbsUp } from "react-icons/fa";
import PropTypes from "prop-types";
import React from "react";

import Button from "../Button";

import styles from "./style.scss";

export default function Like({ amount, onClick }) {
  return (
    <Button className={styles.likes} onClick={onClick}>
      <FaThumbsUp style={{ fontSize: "12px" }} />
      <span>{amount}</span>
    </Button>
  );
}

Like.propTypes = {
  amount: PropTypes.number.isRequired,
  onClick: PropTypes.func
};

Like.defaultProps = {
  onClick: null
};
