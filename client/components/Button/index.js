import PropTypes from "prop-types";
import React, { useReducer } from "react";
import classnames from "classnames";

import { WAS_CLICKED } from "./constants";
import reducer from "./reducer";

import styles from "./style.scss";

const initialState = {
  wasClicked: false
};

export default function Button({ children, ...rest }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const style = classnames(styles.button, {
    [styles.wasClicked]: state.wasClicked
  });

  return (
    <button
      className={style}
      {...rest}
      onClick={() => dispatch({ type: WAS_CLICKED })}
    >
      {children}
    </button>
  );
}

// const Button = props => {
//   const store = useContext(Context);

//   const style = classnames({
//     [styles.header]: store.wasClicked
//   });

//   const handleClick = () => {
//     store.dispatch({ type: "WAS_CLICKED" });
//   };

//   return (
//     <div className={styles.example}>
//       <h1 className={style}>
//         {store.wasClicked ? "Was clicked" : "was NOT clicked"}!
//       </h1>

//       <button
//         className={classnames({ [styles.wasClicked]: store.wasClicked })}
//         onClick={handleClick}
//         type="button"
//       >
//         {props.children}
//       </button>
//     </div>
//   );
// };

Button.propTypes = {
  children: PropTypes.node
};

Button.defaultProps = {
  children: ""
};
