import PropTypes from "prop-types";
import React, { useReducer } from "react";
import classnames from "classnames";

import { HAS_FOCUS, HAS_LENGTH, HAS_NO_FOCUS } from "./constants";
import reducer from "./reducer";
import styles from "./style.scss";

const initialState = {
  hasFocus: false,
  hasLength: 0
};

export default function Input({
  inverted,
  outlined,
  label,
  placeholder,
  rounded,
  ...rest
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const style = classnames(styles.input, {
    [styles.rounded]: rounded,
    [styles.outlined]: outlined,
    [styles.inverted]: inverted
  });

  const labelStyle = classnames(styles.labelWrapper, {
    [styles.isActive]: state.hasFocus || state.hasLength
  });

  return (
    <div className={styles.wrapper}>
      <input
        className={style}
        placeholder={label ? "" : placeholder}
        onFocus={() => dispatch({ type: HAS_FOCUS })}
        onBlur={() => dispatch({ type: HAS_NO_FOCUS })}
        onChange={e => dispatch({ type: HAS_LENGTH, value: e.target.value })}
        {...rest}
      />
      {label && <label className={labelStyle}>{label}</label>}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rounded: PropTypes.bool,
  outlined: PropTypes.bool,
  inverted: PropTypes.bool
};

Input.defaultProps = {
  label: "",
  placeholder: "",
  rounded: false,
  outlined: false,
  inverted: false
};
