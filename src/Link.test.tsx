// from: https://facebook.github.io/jest/docs/tutorial-react.html

import * as React from "react";
import Link from "./Link";
import * as renderer from "react-test-renderer";

import {isElement, isComponent} from "./test-utils";

test("Link changes the class when hovered", () => {
  const component = renderer.create(
    <Link page="#HOME">HOME</Link>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  let _isElement = isElement(tree.props);
  expect(_isElement).toBeFalsy();
  let _isComponent = isComponent(tree.props);
  expect(_isComponent).toBeFalsy();

  // manually trigger the callback
  (tree.props as any).onMouseEnter();

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  (tree.props as any).onMouseLeave();

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});