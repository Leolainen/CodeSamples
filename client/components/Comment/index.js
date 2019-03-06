import PropTypes from "prop-types";
import React from "react";

import Like from "../Like";

import styles from "./style.scss";

export default function Comment({
  id,
  comment,
  date,
  edited,
  likes,
  username
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {username}
        <Like amount={likes.length} />
      </div>
      <div className={styles.content}>{comment}</div>
      <div className={styles.footer}>
        {edited && <span>Edited</span>}
        <p>{new Date(parseInt(date)).toLocaleString()}</p>
      </div>
    </div>
  );
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  edited: PropTypes.bool.isRequired,
  likes: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
};
