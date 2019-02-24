import { mount, render } from "enzyme";
import React from "react";

import CustomSelect from "./index";

describe("<CustomSelect />", () => {
  test("it renders properly", () => {
    render(<CustomSelect />);
  });
});
