import { Field } from "react-final-form";
import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

export default function Input({
  className,
  inverted,
  outlined,
  label,
  placeholder,
  rounded,
  name,
  fullWidth,
  validate,
  ...rest
}) {
  const style = classnames(
    styles.input,
    {
      [styles.rounded]: rounded,
      [styles.outlined]: outlined,
      [styles.inverted]: inverted,
      [styles.fullWidth]: fullWidth
    },
    className
  );

  const wrapperStyle = classnames(styles.wrapper, {
    [styles.fullWidth]: fullWidth
  });

  return (
    <Field name={name} validate={validate}>
      {({ input, meta }) => (
        <div className={wrapperStyle}>
          <input
            className={style}
            placeholder={label ? "" : placeholder}
            {...rest}
            {...input}
          />
          {label && (
            <label
              className={classnames(styles.labelWrapper, {
                [styles.isActive]: meta.active || meta.dirty
              })}
            >
              {label}
            </label>
          )}
          {meta.error && meta.touched && (
            <span className={styles.errorText}>{meta.error}</span>
          )}
        </div>
      )}
    </Field>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rounded: PropTypes.bool,
  outlined: PropTypes.bool,
  inverted: PropTypes.bool,
  fullWidth: PropTypes.bool,
  validate: PropTypes.func,
  className: PropTypes.string
};

Input.defaultProps = {
  label: "",
  placeholder: "",
  rounded: false,
  outlined: false,
  inverted: false,
  fullWidth: false,
  validate: null,
  className: ""
};
