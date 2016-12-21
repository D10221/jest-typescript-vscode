import * as React from "react";
import Component = React.Component;
import { isElement, isComponent, isVoid, renderIntoDocument, isDOMComponent } from "./test-utils";

// import * as ReactDOM from "react-dom";

class MyComponent extends Component<any, any> {
    render() { return (<div />); }
}

describe("renderIntoDocument returned Types", () => {

    let msg = "hello";

    // Component<P, {}> | Element | void    

    it("isElement", () => {
        expect(
            isElement(
                // from inline JSX , React.CreateElement('tagName', <props>, children)
                renderIntoDocument(
                    <div><span>{msg}</span></div>
                )
            )
        )
            .toBeTruthy();

        expect(
            isElement(
                // From React.CreteElement(CLASS, ...props, ...children)
                renderIntoDocument(
                    <MyComponent />
                )
            )
        )
            .toBeFalsy();

        expect(
            // same as IsElement
            isDOMComponent(
                renderIntoDocument(
                    <MyComponent />
                )
            )
        )
            .toBeFalsy();
    });
    it("isElement when renderIntoDocument from Stateless", () => {
        const stateless = (x: any) => <span>{x}</span>;
        expect(
            isElement(
                renderIntoDocument(
                    // ...
                    stateless(msg)
                )
            )
        ).toBeTruthy();
    });

    it("is NOT Component when renderIntoDocument from Stateless", () => {
        const stateless = (x: any) => <span>{x}</span>;
        expect(
            isComponent(
                renderIntoDocument(
                    // ...
                    stateless(msg)
                )
            )
        ).toBeFalsy();
    });

    it("isComponent", () => {

        expect(
            isComponent(
                renderIntoDocument(
                    <MyComponent />
                )
            )
        )
            .toBeTruthy();
    });

    it("isVoid", () => {
        expect(
            isVoid(
                renderIntoDocument(
                    <div><span>{msg}</span></div>
                )))
            .toBeFalsy();
    });

    it("isComponent", () => {
        expect(
            isComponent(
                renderIntoDocument(
                    <MyComponent />
                )
            )
        )
            .toBeTruthy();

        expect(
            isDOMComponent(
                renderIntoDocument(
                    <MyComponent />
                )
            )
        )
            .toBeFalsy();
        // ... 
        expect(
            isComponent(
                renderIntoDocument(
                    <div><span>{msg}</span></div>
                )
            )
        )
            .toBeFalsy();
    });
});
