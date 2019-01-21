import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import Hamburger from "./index";

const stories = storiesOf("Hamburger", module);

const containerStyle = {
  width: "200px",
  height: "200px",
  position: "relative",
  backgroundColor: "grey"
};

stories.add("left aligned", () => (
  <div style={containerStyle}>
    <Hamburger isOpen={boolean("isOpen", false)} />
  </div>
));

stories.add("right aligned", () => (
  <div
    style={{ ...containerStyle, display: "flex", justifyContent: "flex-end" }}
  >
    <Hamburger right isOpen={boolean("isOpen", false)} />
  </div>
));
