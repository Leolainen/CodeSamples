import { Field } from "react-final-form";
import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

import styles from "./style.scss";

export default function Input({
  inverted,
  outlined,
  label,
  placeholder,
  rounded,
  name,
  ...rest
}) {
  const style = classnames(styles.input, {
    [styles.rounded]: rounded,
    [styles.outlined]: outlined,
    [styles.inverted]: inverted
  });

  return (
    <Field name={name}>
      {({ input, meta }) => (
        <div className={styles.wrapper}>
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
              {meta.error && meta.touched ? `${label} (${meta.error})` : label}
            </label>
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
  inverted: PropTypes.bool
};

Input.defaultProps = {
  label: "",
  placeholder: "",
  rounded: false,
  outlined: false,
  inverted: false
};
