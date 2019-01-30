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
      onFocus={action("Input has focus")}
      onBlur={action("Input lost focus")}
    />
  </div>
));
