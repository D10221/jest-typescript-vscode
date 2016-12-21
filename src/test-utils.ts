/*
    react-addons-test-utils Extended
 */

import { Component } from "react";
import * as TestUtils from "react-addons-test-utils";
import { isElement } from "lodash";
export { isElement } from "lodash";
export {
    createRenderer,
    EventSimulator,
    findAllInRenderedTree,
    findRenderedComponentWithType,
    findRenderedDOMComponentWithClass,
    findRenderedDOMComponentWithTag,
    isCompositeComponent,
    isCompositeComponentWithType,
    isElementOfType,
    mockComponent,
    MockedComponentClass,
    OptionalEventProperties,
    renderIntoDocument,
    scryRenderedComponentsWithType,
    scryRenderedDOMComponentsWithClass,
    scryRenderedDOMComponentsWithTag,
    ShallowRenderer,
    Simulate,
    SyntheticEventData
} from "react-addons-test-utils";

export function isComponent(args: any): args is Component<any, any> {
    return TestUtils.isCompositeComponent(args);
}

/**
 * ;)
 */
export function isVoid(args: void | Element | Component<any, any>): args is void {
    return !isComponent(args) && !isElement(args);
}

/**
 * TestUtils.isDOMComponent takes instance: ReactInstance, asserts is Element, 
 * and ReactInstance is (Component<any, any> | Element)
 * renderIntoDocument returns (void | Componenet | Element)
 * 
 */
export function isDOMComponent(x: void| Element| Component<any, any>): x is Element {
    // type ReactInstance = Component<any, any> | Element;
    if ( !isElement(x) || !isComponent(x) ) return false;
    return TestUtils.isDOMComponent(x);
}
