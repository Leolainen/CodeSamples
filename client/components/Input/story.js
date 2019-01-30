// import { Field, Form } from "react-final-form";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import Input from "./index";

const stories = storiesOf("Input", module);

const containerStyle = {
  width: "200px",
  height: "200px",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "lightgrey"
};

stories.add("Text input", () => (
  <div style={containerStyle}>
    <Input
      placeholder={text("Placeholder", "Will show if no label")}
      label={text("Label", "This is a label")}
      rounded={boolean("rounded", false)}
      type="text"
    />
  </div>
));

/*
stories.add("Complete form with React-final-form", () => (
  <Form
    onSubmit={() => action("Submitted")}
    validate={validate}
    render={({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit}>
        <Field
          name="firstName"
          component={
            <Input
              type="text"
              rounded={boolean("rounded", false)}
              label={text("Label", "Label")}
            />
          }
        />
        <button type="submit" disabled={pristine || invalid}>
          Submit
        </button>
      </form>
    )}
  />
));
*/

// stories.add("select option input", () => (
//   <div style={containerStyle}>
//     <Input type="select" rounded={boolean("rounded", false)}>
//       {mockOptions.map((option, index) => (
//         <option key={index} value={option}>
//           {option}
//         </option>
//       ))}
//     </Input>
//   </div>
// ));
