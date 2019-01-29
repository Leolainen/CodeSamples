import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import Button from "./index";

const stories = storiesOf("Button", module);

stories.add("with text", () => (
  <Button onClick={action("Button was clicked")}>Hello Button</Button>
));

stories.add("with some emoji", () => (
  <Button onClick={action("clicked")}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
));
