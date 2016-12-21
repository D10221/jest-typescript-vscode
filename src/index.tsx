import * as React from "react";
import * as ReactDOM from "react-dom";

import CheckboxWithLabel from "./CheckboxWithLabel";
import Link from "./Link";

ReactDOM.render((
    <div>
        <Link page="#home"> Home </Link>
        <CheckboxWithLabel labelOn="ON" labelOff="OFF"/>;
    </div>),
    document.body);