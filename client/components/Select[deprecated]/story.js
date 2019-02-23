import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import Select from "./index";

const mockOptions = ["one", "two", "three", "four", "five"];

const stories = storiesOf("Select", module);

const containerStyle = {
  width: "200px",
  height: "200px",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "lightgrey"
};

stories.add("Single Select", () => (
  <div style={containerStyle}>
    <Select
      options={mockOptions}
      rounded={boolean("rounded", false)}
      type="text"
    />
  </div>
));

stories.add("Multiple Select", () => (
  <div style={containerStyle}>
    <Select
      options={mockOptions}
      multiple
      rounded={boolean("rounded", false)}
      type="text"
    />
  </div>
));
