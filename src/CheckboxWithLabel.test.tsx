import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-addons-test-utils";
import {isElement} from "lodash";

import CheckboxWithLabel from "./CheckboxWithLabel";

function isComponent(args: any): args is React.Component<any, any> {
  return TestUtils.isCompositeComponent(args);
}

function findDOMNode<T, S>(args: void| Element | React.Component<T, S>) {

    if (isElement(args)) {
       return ReactDOM.findDOMNode(args as Element);
    }

    if (isComponent(args)) {
      return ReactDOM.findDOMNode(args as React.Component<any, any>);
    }

    throw "void Is Not Supported";
}

it("CheckboxWithLabel changes the text after click", () => {
  // debugger;

  // Render a checkbox with label in the document
  const checkbox = TestUtils.renderIntoDocument(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />
  ) as CheckboxWithLabel;

  const checkboxNode = findDOMNode(checkbox);

  // Verify that it's Off by default
  expect(checkboxNode.textContent).toEqual("Off");

  // Simulate a click and verify that it is now On
  TestUtils.Simulate.change(
    TestUtils.findRenderedDOMComponentWithTag(checkbox, "input")
  );

  expect(checkboxNode.textContent).toEqual("On");
});