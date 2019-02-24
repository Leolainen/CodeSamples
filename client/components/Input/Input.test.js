// test on focus
// test onblur
// test onChange

import { render } from "enzyme";
import React from "react";

import Input from "./index";

describe("<Input />", () => {
  test("component renders properly", () => {
    render(<Input name="input" />);
  });
});
