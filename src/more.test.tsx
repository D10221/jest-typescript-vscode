// from: https://facebook.github.io/jest/docs/tutorial-react.html

import * as React from "react";
import Component = React.Component;

import * as renderer from "react-test-renderer";
import * as TestUtils from "react-addons-test-utils";
import { isElement } from "lodash";

function isComponent(args: any): args is Component<any, any> {
  return TestUtils.isCompositeComponent(args);
}

/**
 * TestUtils.isDOMComponent takes instance: ReactInstance, asserts is Element, 
 * and ReactInstance is (Component<any, any> | Element)
 * renderIntoDocument returns (void | Componenet | Element)
 * 
 */
function isDOMComponent(x: void | Element | Component<any, any>): x is Element {
  // type ReactInstance = Component<any, any> | Element;
  if (!isElement(x) || !isComponent(x)) return false;
  return TestUtils.isDOMComponent(x);
}

function isReactInstance(x: any): x is Component<any, any> | Element {
  return isElement(x) || isComponent(x);
}

function isTestRenderer(x: any): x is renderer.Renderer {
  return x && typeof (x.toJSON) === "function";
}

test("Link changes the class when hovered", () => {

  const X3 = (props?: any) => {
    return <a {...props}></a>;
  }

  const X2 = (props?: any) => {
    return <X3 {...props} />;
  };

  const X1 = (props?: any) => {
    return <X2 {...props} />;
  };

  const Link = (props?: any) => {
    // let self = this as any;
    return (
      <X1 className={props.className}
        href={props.page || "#"}
        onMouseEnter={props._onMouseEnter}
        onMouseLeave={props._onMouseLeave} >
        {props.children}
      </X1>
    );
  };

  let triggered = {
    _onMouseEnter: false,
    _onMouseLeave: true,
  };

  const _onMouseEnter = () => triggered._onMouseEnter = true;
  const _onMouseLeave = () => triggered._onMouseLeave = true;

  // renamed from componenet to ???, is it a component is it an Element ? 
  const container = renderer.create(
    (<Link className={"hovered"} page="#HOME"
      _onMouseEnter={_onMouseEnter}
      _onMouseLeave={_onMouseLeave}>
      HOME
      </Link>)
  );
  // What it is ? 
  let _isComponent = isComponent(container);
  expect(_isComponent).toBeFalsy();
  let _isElement = isElement(container) || TestUtils.isDOMComponent(container as any);
  expect(_isElement).toBeFalsy();
  expect(isReactInstance(container)).toBeFalsy(); // already checked, btw
  // its a Renderer, ;)
  expect(isTestRenderer(container)).toBeTruthy();

  let tree = container.toJSON();
  expect(tree).toMatchSnapshot();
  let anyProps = tree.props as any;

  // What is it ?
  expect(TestUtils.isDOMComponent(tree.props as any)).toBeFalsy();
  expect(isDOMComponent(tree.props as any)).toBeFalsy()
  expect(isComponent(tree.props)).toBeFalsy();
  expect(typeof tree.props).toEqual("object");

  // buried 3 levels down 
  expect(tree.type).toEqual("a");

  // manually trigger the callback
  anyProps.onMouseEnter();
  expect(triggered._onMouseEnter).toBeTruthy();

  // re-rendering
  tree = container.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  anyProps.onMouseLeave();
  expect(triggered._onMouseLeave).toBeTruthy();

  // re-rendering
  tree = container.toJSON();
  expect(tree).toMatchSnapshot();
});
