import CreatableSelect from "react-select/lib/Creatable";
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";
import classnames from "classnames";

import styles from "./style.scss";

export default function CustomSelect({ creatable, className, ...rest }) {
  const outerStyles = classnames(styles["react-select-container"], className);
  const innerStyles = classnames(styles["react-select--menu"]);

  const typeOfSelect = () => {
    if (creatable) {
      return (
        <CreatableSelect
          className={outerStyles}
          classNamePrefix={innerStyles}
          {...rest}
        />
      );
    }
    return (
      <Select className={outerStyles} classNamePrefix={innerStyles} {...rest} />
    );
  };

  return typeOfSelect();
}

CustomSelect.propTypes = {
  className: PropTypes.string,
  creatable: PropTypes.bool,
  options: PropTypes.array,
  isMulti: PropTypes.bool,
  defaultValue: PropTypes.object
};

CustomSelect.defaultProps = {
  className: "",
  creatable: false,
  isMulti: false,
  options: []
};
