import "../main/css/globals.css";
import "focus-visible";
import { addDecorator, configure } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import React from "react";

import { Provider } from "../components/Context";

const req = require.context("../components/", true, /story\.js/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withKnobs);
addDecorator(story => <Provider>{story()}</Provider>);
configure(loadStories, module);
