import { mount, render } from "enzyme";
import React from "react";

import Button from "./index";

describe("<Button />", () => {
  test("button renders properly", () => {
    render(<Button />);
  });
});
