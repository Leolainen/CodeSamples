import PropTypes from "prop-types";
import React, { useReducer } from "react";
import classnames from "classnames";

import { WAS_CLICKED } from "./constants";
import reducer from "./reducer";
import styles from "./style.scss";

const initialState = {
  wasClicked: false
};

export default function Button({ rounded, children, ...rest }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const style = classnames(styles.button, {
    [styles.wasClicked]: state.wasClicked, // for testing
    [styles.rounded]: rounded
  });

  return (
    <button
      className={style}
      type="button"
      {...rest}
      onClick={() => dispatch({ type: WAS_CLICKED })}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node
};

Button.defaultProps = {
  children: ""
};
