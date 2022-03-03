import React, { PureComponent } from "react";
import { Keyboard } from "react-native";
import inputWithIconComponent from "../components/HOCComponents/InputComponentWithIcon";
import ValidateInput from "./validateInput";

const InputWithIconComponent = inputWithIconComponent(ValidateInput);

export default class InputWithEyeIcon extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputConfig: {
        type: "password",
        iconName: "eye"
      }
    };
  }

  inputTypeChange = () => {
    const {
      inputConfig: { type }
    } = this.state;
    Keyboard.dismiss();
    this.setState({
      inputConfig: {
        type: type === "password" ? "text" : "password",
        iconName: type === "password" ? "eye-off" : "eye"
      }
    });
  };

  render() {
    const { inputConfig } = this.state;
    return (
      <InputWithIconComponent
        onChangeInputType={this.inputTypeChange}
        {...this.props}
        {...inputConfig}
      />
    );
  }
}
