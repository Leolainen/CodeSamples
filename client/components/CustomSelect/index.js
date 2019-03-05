import CreatableSelect from "react-select/lib/Creatable";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import classnames from "classnames";

import styles from "./style.scss";

export default function CustomSelect({
  options,
  creatable,
  value,
  defaultValue,
  className,
  isMulti,
  ...rest
}) {
  const [currentOptions, setCurrentOptions] = useState(options);
  const [currentValue, setCurrentValue] = useState(
    value ? value : defaultValue
  );
  const outerStyles = classnames(styles["react-select-container"], className);
  const innerStyles = classnames(styles["react-select--menu"]);

  useEffect(() => {
    setCurrentOptions(options);
  });

  const typeOfSelect = () => {
    if (creatable) {
      const handleChange = newValue => {
        setCurrentValue(newValue);
      };

      const handleCreate = val => {
        const newOption = {
          label: val,
          value: val.toLowerCase()
        };

        const newValue = isMulti ? [...currentValue, newOption] : newOption;

        setCurrentOptions([...currentOptions, newOption]);
        setCurrentValue(newValue);
      };

      return (
        <CreatableSelect
          isMulti={isMulti}
          defaultValue={defaultValue}
          value={currentValue}
          options={currentOptions}
          onCreateOption={handleCreate}
          onChange={handleChange}
          className={outerStyles}
          classNamePrefix={innerStyles}
          {...rest}
        />
      );
    }
    return (
      <Select
        defaultValue={defaultValue}
        isMulti={isMulti}
        value={currentValue}
        options={currentOptions}
        className={outerStyles}
        classNamePrefix={innerStyles}
        {...rest}
      />
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
