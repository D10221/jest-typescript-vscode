import * as React from "react";

export interface CheckboxWithLabelProps extends React.Props<any> {
  labelOff: string;
  labelOn: string;
}

export default class CheckboxWithLabel extends React.Component<CheckboxWithLabelProps, any> {

  constructor(props: CheckboxWithLabelProps) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      isChecked: false
    };
  }

  onChange = () => {
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
   const self = this;
   const state = this.state;
   const props = this.props;
    return (
      <label>
        <input
          type="checkbox"
          checked={state.isChecked}
          onChange={self.onChange}
          />
        { state.isChecked ? props.labelOn : props.labelOff }
      </label>
    );
  }
}