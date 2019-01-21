import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import Button from "./index";

// eslint-disable-next-line no-undef
const stories = storiesOf("Button", module);

stories.add("with text", () => <Button>Hello Button</Button>);
stories.add("with some emoji", () => (
  <Button onClick={action("clicked")}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
));
