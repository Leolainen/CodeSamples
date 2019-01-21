import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import Sidebar from ".";

// eslint-disable-next-line no-undef
const stories = storiesOf("Sidebar", module);

stories.add("default", () => (
  <Sidebar isOpen={boolean("isOpen", false)} right={boolean("right", false)}>
    <ul>
      <li>item</li>
      <li>item</li>
      <li>item</li>
    </ul>
  </Sidebar>
));
