import CreatableSelect from "react-select/lib/Creatable";
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";
import classnames from "classnames";

import styles from "./style.scss";

export default function CustomSelect({ canCreate, className, ...rest }) {
  const outerStyles = classnames(styles["react-select-container"], className);
  const innerStyles = classnames(styles["react-select--menu"]);

  const typeOfSelect = () => {
    if (canCreate) {
      const handleChange = (newValue, actionMeta) => {
        console.group("Value Changed");
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
      };

      return (
        <CreatableSelect
          onChange={handleChange}
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
  canCreate: PropTypes.bool
};

CustomSelect.defaultProps = {
  className: "",
  canCreate: false
};
