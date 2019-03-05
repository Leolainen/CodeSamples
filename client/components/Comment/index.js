import PropTypes from "prop-types";
import React from "react";

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
      <div className={styles.header}>{username}</div>
      <div className={styles.content}>{comment}</div>
      <div className={styles.footer}>
        {likes.length > 0 && <span>Likes: {likes.length}</span>}
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
