import { Mutation } from "react-apollo";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import gql from "graphql-tag";

import { Context } from "../Context";
import Button from "../Button";
import Like from "../Like";

import styles from "./style.scss";

export default function Comment({
  id,
  userId,
  comment,
  date,
  edited,
  likes,
  username,
  refetch
}) {
  const context = useContext(Context);
  const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($id: ID!) {
      deleteComment(id: $id) {
        id
      }
    }
  `;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {username} {edited && <span>Edited</span>}
        <Like amount={likes.length} />
      </div>
      <div className={styles.content}>{comment}</div>
      <div className={styles.footer}>
        <p>{new Date(parseInt(date)).toLocaleString()}</p>
        {context.me.id === userId && (
          <Mutation
            onCompleted={data => {
              toast.success(`Removed comment ${data.comment}`);
              refetch();
            }}
            onError={({ message }) => toast.error(message)}
            mutation={DELETE_COMMENT_MUTATION}
            variables={{ id }}
          >
            {mutate => <Button onClick={mutate}>Delete</Button>}
          </Mutation>
        )}
      </div>
    </div>
  );
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  edited: PropTypes.bool.isRequired,
  likes: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  refetch: PropTypes.func
};

Comment.defaultProps = {
  refetch: null
};
