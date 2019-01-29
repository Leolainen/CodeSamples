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
      label={text("Label", "This is a label")}
      rounded={boolean("rounded", false)}
      type="text"
      placeholder="text type"
    />
  </div>
));
