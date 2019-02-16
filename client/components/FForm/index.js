import { Form } from "react-final-form";
import PropTypes from "prop-types";
import React from "react";

export default function FForm({ onSubmit, initialValues, children }) {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        reset,
        submitting,
        pristine,
        invalid,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          {typeof children === "object"
            ? children
            : children({
                handleSubmit,
                reset,
                submitting,
                pristine,
                values,
                invalid
              })}
        </form>
      )}
    />
  );
}

FForm.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object
};

FForm.defaultProps = {
  initialValues: {}
};
