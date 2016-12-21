// from: https://facebook.github.io/jest/docs/tutorial-react.html

import * as React from "react";

export type Status = "normal" | "hovered";

export interface LinkProps {
    page?: string;
}
export interface LinkState {
    class?: Status;
}

export default class Link extends React.Component<LinkProps, LinkState> {

    constructor(props: LinkProps) {
        super(props);

        this.state = {
            class: "normal",
        };
    }

    private _onMouseEnter = () => {
        this.setState({ class: "hovered" });
    }

    private _onMouseLeave = () => {
        this.setState({ class: "normal" });
    }

    render() {
        return (
            <a className={ this.state.class }
               href = { this.props.page || "#" }
               onMouseEnter = { this._onMouseEnter }
               onMouseLeave = { this._onMouseLeave } >
                { this.props.children }
            </a>
    ); }

}