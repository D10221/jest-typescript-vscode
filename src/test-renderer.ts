import {ReactElement} from "react";
import * as R from "react-test-renderer";

 export interface Renderer {
        toJSON(): ReactTestRendererJSON;
    }

    export interface ReactTestRendererJSON {
        type: string;
        props: any;
        children: null | Array<string | ReactTestRendererJSON>;
        $$typeof?: any;
    }
    export interface TestRendererOptions {
        createNodeMock: (element: ReactElement<any>) => any;
    }
    // https://github.com/facebook/react/blob/master/src/renderers/testing/ReactTestMount.js#L155
    export function create(nextElement: ReactElement<any>, options?: TestRendererOptions): Renderer;

export function create<T extends ReactElement<P>, P>(nextElement: T, options?: R.TestRendererOptions): Renderer {    
    return R.create(nextElement, options) as any;
}