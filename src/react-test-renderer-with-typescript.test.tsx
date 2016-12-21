import * as React from "react";
import * as renderer from "react-test-renderer";
import * as TestUtil from "react-addons-test-utils";

interface HTMLProps extends React.HTMLProps<any> {
    [key: string]: any;
}

interface ITree /* reimplements ReactTestRendererJSON */ {
    type: string;
    // I'm not sure about this but ... is it close enought ? 
    props: HTMLProps;
    children: null | Array<string | ITree>;
    $$typeof?: any;
}

function isTree(x: string | ITree): x is ITree {
    return x && (typeof x !== "string")
        && x.type !== "undefined"
        && typeof x.children !== "undefined" // .. or  === ("string" || "array"
        && typeof x.props !== "undefined"; // === "object"
}

function isString(x: any): x is string {
    return typeof x === "string";
}

describe("wtf?", () => {

    it("works?", () => {

        let All = (props: any) =>
            (<div {...props.divProps}>
                Hello1
                <span {...props.spanProps}>
                    Hello2
                    <a {...props.aProps}>
                        Hello3
                    </a>
                </span>
            </div>);

        const X3 = (props?: any) => {
            return <All {...props}></All>;
        }

        const X2 = (props?: any) => {
            return <X3 {...props} />;
        };

        const X1 = (props?: any) => {
            return <X2 {...props} />;
        };

        let result = {
            onDrag: false,
            onDrop: false,
            onMouseEnter: false
        };

        let onDrag = () => result.onDrag = true;
        let onDrop = () => result.onDrop = true;
        let onMouseEnter = () => result.onMouseEnter = true;

        let _render /*: ReactTestInstance*/ = renderer.create(X1({
            divProps: {
                onDrag
            },
            spanProps: {
                onDrop
            },
            aProps: {
                onMouseEnter
            }
        }));

        // 1st Rendered component its a Div
        let divTree = _render.toJSON() as ITree;

        // is Not an Element
        expect(TestUtil.isDOMComponent(divTree as any))
            .toBeFalsy();
        // is Not a Component
        expect(TestUtil.isCompositeComponent(divTree as any))
            .toBeFalsy();
        // is a Tree 
        expect(isTree(divTree))
            .toBeTruthy();

        // tree.props = 1st rendered DOMElement props , in this case a <div/>
        expect(divTree.type).toEqual("div");
        // not created 
        expect(divTree.props.accept).toBeUndefined();
        // should be there, beacuse of divProps
        expect(typeof divTree.props.onDrag).toEqual("function");

        //  TODO: ReactTestRenderer.js => Symbol['for']('react.test.json')
        // expect(tree.$$typeof).toBe("?");

        // trigger !
        divTree.props.onDrag(null);

        // Children ... 
        // Net        
        expect(divTree.children.length).toEqual(2);

        // String children 
        {
            let text = divTree.children.filter(isString)[0];
            if (!isString(text)) { throw "Never"; }
            expect(text).toEqual("Hello1");
        }

        // For <Span/>
        let spanTree = divTree.children.filter(isTree)[0];

        if (!isTree(spanTree)) {
            // make peace with the compiler ... 
            throw "never";
        }

        expect(isTree(spanTree)).toBeTruthy();
        expect(spanTree.type).toEqual("span");
        // String children 
        {
            let text = spanTree.children.filter(isString)[0];
            if (!isString(text)) { throw "Never"; }
            expect(text).toEqual("Hello2");
        }

        // trigger, [div][span onDrop]
        spanTree.props.onDrop(null);

        // For <A/>
        let aTree = spanTree.children.filter(isTree)[0];
        expect(isTree(aTree)).toBeTruthy();
        if (!isTree(aTree)) {
            // make peace with the compiler 
            // ...Its a ITree 
            throw "never";
        }

        expect(aTree.type).toEqual("a");
        aTree.props.onMouseEnter(null);
        let text = aTree.children.filter(isString)[0];
        if (!isString(text)) { throw "Never"; }
        expect(text).toEqual("Hello3");


        expect(result).toEqual(
            {
                onDrag: true,
                onDrop: true,
                onMouseEnter: true
            }
        );
    });
    // ...
});