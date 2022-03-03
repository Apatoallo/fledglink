import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "native-base";
import InputComponent from "./inputComponent";

export default class LoginInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isValid: false,
      error: ""
    };
  }

  validateInput = text => {
    const { validateTest } = this.props;

    if (typeof validateTest === "object") {
      return validateTest.test(text);
    }

    return validateTest === text;
  };

  onChange = text => {
    const { isValid } = Object.assign({}, this.state);
    const isValidInput = this.validateInput(text);
    const { onChangeText, error } = this.props;
    this.setState(
      {
        value: text,
        isValid: isValidInput,
        error: isValidInput ? null : error
      },
      () => {
        if (isValid !== isValidInput || isValidInput) {
          onChangeText(text, isValidInput);
        }
      }
    );
  };

  onFocus = () => {
    const { onFocus } = this.props;

    if (onFocus) {
      onFocus();
    }
  };

  onBlur = () => {
    const { onBlur } = this.props;

    if (onBlur) {
      onBlur();
    }
  };

  render() {
    const { value, error } = this.state;
    const {
      getRef,
      autoCapitalize,
      label,
      onSubmitEditing,
      returnKeyType,
      type,
      activeColor,
      inactiveColor
    } = this.props;
    return (
      <View>
        <InputComponent
          getRef={getRef}
          returnKeyType={returnKeyType}
          value={value}
          onSubmitEditing={onSubmitEditing}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChange}
          autoCapitalize={autoCapitalize}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          label={label}
          type={type}
        />
        {!!error && (
          <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
            {error}
          </Text>
        )}
      </View>
    );
  }
}

LoginInput.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  activeColor: PropTypes.string.isRequired,
  inactiveColor: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  returnKeyType: PropTypes.string,
  validateTest: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(RegExp)
  ]).isRequired
};

LoginInput.defaultProps = {
  onSubmitEditing: () => {},
  autoCapitalize: "none",
  type: "text",
  error: "",
  returnKeyType: "default"
};
