import PropTypes from "prop-types";
import React, { useContext } from "react";
import classnames from "classnames";

import { Context } from "../Context";

import styles from "./style.scss";

const Button = props => {
  const store = useContext(Context);

  const style = classnames({
    [styles.header]: store.wasClicked
  });

  const handleClick = () => {
    store.dispatch({ type: "WAS_CLICKED" });
  };

  return (
    <div className={styles.example}>
      <h1 className={style}>
        {store.wasClicked ? "Was clicked" : "was NOT clicked"}!
      </h1>

      <button
        className={classnames({ [styles.wasClicked]: store.wasClicked })}
        onClick={handleClick}
        type="button"
      >
        {props.children}
      </button>
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node
};

Button.defaultProps = {
  children: ""
};

export default Button;
