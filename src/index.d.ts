import {ReactElement, Component} from "react";

/**
 * 
 */
declare module TestUtilsX {
    export function renderIntoDocument<P, S>
        (element: new() => ReactElement<P>)
        : Component<P, S> | Element | void;
}