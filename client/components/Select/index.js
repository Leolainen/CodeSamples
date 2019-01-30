import PropTypes from "prop-types";
import React, { useReducer } from "react";
import classnames from "classnames";

import Input from "../Input";

import {
  ADD_TO_SELECTED_VALUE,
  REMOVE_SELECTED_VALUE,
  SET_SEARCH_FIELD,
  SET_SELECTED_VALUE
} from "./constants";
import reducer from "./reducer";
import styles from "./style.scss";

const initialState = {
  searchField: "",
  selectedValues: []
};

export default function Select({
  options,
  multiple,
  searchable,
  children,
  ...rest
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const optionStyle = classnames(styles.option);

  const handleChange = e => {
    setTimeout(() => {
      dispatch({ type: SET_SEARCH_FIELD, value: e.target.value });
    }, 500);
  };

  const filteredOptions = options.filter(option =>
    option.includes(state.searchField)
  );

  return (
    <div className={styles.selectWrapper}>
      <Input type="text" {...rest} onChange={handleChange} />
      <div className={styles.optionsWrapper}>
        {filteredOptions.map((option, index) => (
          <div
            tabIndex="0"
            onClick={e =>
              multiple
                ? dispatch({
                    type: ADD_TO_SELECTED_VALUE,
                    value: e.target.value
                  })
                : dispatch({ type: SET_SELECTED_VALUE, value: e.target.value })
            }
            className={optionStyle}
            value={option}
            key={index}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

Select.propTypes = {
  children: PropTypes.node,
  multiple: PropTypes.bool,
  searchable: PropTypes.bool,
  options: PropTypes.array.isRequired
};

Select.defaultProps = {
  children: null,
  multiple: false,
  searchable: false
};
