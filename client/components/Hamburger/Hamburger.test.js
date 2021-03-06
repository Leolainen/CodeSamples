import { mount } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import Hamburger from ".";

test("<Hamburger />", () => {
  const hamburger = mount(<Hamburger />);
  expect(hamburger.props()).toEqual({ right: false, isOpen: false });
  hamburger.unmount();

  const component = renderer.create(<Hamburger />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("<Hamburger isOpen />", () => {
  const hamburger = mount(<Hamburger isOpen />);
  expect(hamburger.props()).toEqual({ right: false, isOpen: true });
  hamburger.unmount();

  const component = renderer.create(<Hamburger isOpen />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("<Hamburger right />", () => {
  const hamburger = mount(<Hamburger right />);
  expect(hamburger.props()).toEqual({ right: true, isOpen: false });
  hamburger.unmount();

  const component = renderer.create(<Hamburger right />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("<Hamburger right isOpen />", () => {
  const hamburger = mount(<Hamburger right isOpen />);
  expect(hamburger.props()).toEqual({ right: true, isOpen: true });
  hamburger.unmount();

  const component = renderer.create(<Hamburger isOpen right />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
