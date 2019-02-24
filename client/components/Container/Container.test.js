import { mount, render } from "enzyme";
import React from "react";

import Container from "./index";

// let consoleError;

// beforeEach(() => {
//   consoleError = jest.spyOn(console, "error");
// });

describe("<Container />", () => {
  test("component renders properly", () => {
    render(<Container>child</Container>);
  });

  test("should throw if prop {spacing} is lower than 1 or higher than 24", () => {
    console.error = jest.fn();

    let wrapper = mount(<Container spacing={25}>child</Container>);
    expect(console.error).toHaveBeenCalledTimes(1);
    wrapper.unmount();

    wrapper = mount(<Container spacing={-1}>child</Container>);
    expect(wrapper.prop("spacing")).toBe(-1);
    expect(console.error).toHaveBeenCalledTimes(2);
    wrapper.unmount();

    wrapper = mount(<Container spacing={12}>child</Container>);
    expect(wrapper.prop("spacing")).toBe(12);
    expect(console.error).toHaveBeenCalledTimes(2);

    wrapper.unmount();
  });
});
