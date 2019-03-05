// import { Field, Form } from "react-final-form";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import CustomSelect from "./index";

const stories = storiesOf("CustomSelect", module);

const containerStyle = {
  width: "200px",
  height: "200px",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "lightgrey"
};

const mockOptions = [
  {
    label: "One",
    value: "one"
  },
  { label: "Two", value: "two" },
  { label: "Three", value: "three" },
  { label: "Four", value: "four" }
];

stories.add("Custom Select", () => (
  <div style={containerStyle}>
    <CustomSelect
      isMulti={boolean("isMulti")}
      isSearchable={boolean("isSearchable")}
      placeholder={text(
        "Placeholder",
        "text dislayed when no options are selected"
      )}
      defaultValue={boolean("defaultValue", mockOptions[0])}
      options={mockOptions}
    />
  </div>
));

stories.add("Creatable select", () => (
  <div style={containerStyle}>
    <CustomSelect
      creatable
      isMulti={boolean("isMulti")}
      isSearchable={boolean("isSearchable")}
      placeholder={text(
        "Placeholder",
        "text dislayed when no options are selected"
      )}
      defaultValue={boolean("defaultValue", mockOptions[0])}
      options={mockOptions}
    />
  </div>
));
stories.add("Custom Select", () => (
  <div style={containerStyle}>
    <CustomSelect
      isMulti={boolean("isMulti")}
      isSearchable={(boolean("isSearchable"), true)}
      placeholder={text(
        "Placeholder",
        "text dislayed when no options are selected"
      )}
      defaultValue={boolean("defaultValue", mockOptions[0])}
      options={mockOptions}
    />
  </div>
));
