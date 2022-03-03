import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Container, Toast } from "native-base";
import { setTokenStore } from "../../actions/token";
import { serverUrl } from "../../configs/config";
import PropTypes from "prop-types";

import AuthButton from "../../shared/authButton";
import inputWithIconComponent from "../HOCComponents/InputComponentWithIcon";
import ValidateInput from "../../shared/validateInput";

const Input = inputWithIconComponent(ValidateInput);

const errors = {
  password: "Password must contain at least 8 characters.",
  confirm: "Passwords must match"
};

const config = {
  text: {
    type: "text",
    icon: "eye-off"
  },
  password: {
    type: "password",
    icon: "eye"
  }
};

class ChangePassword extends Component {
  static propTypes = {
    token: PropTypes.string
  };

  state = {
    loading: false,
    oldPassword: {
      value: "",
      valid: false,
      visible: false
    },
    newPassword: {
      value: "",
      valid: false,
      visible: false
    },
    confirmPassword: {
      value: "",
      valid: false,
      visible: false
    }
  };

  getRef = (ref, field) => (this.inputs = { ...this.inputs, [field]: ref });

  onChange = (key, value, valid) => {
    this.setState(state => {
      return {
        [key]: {
          ...state[key],
          value,
          valid
        }
      };
    });
  };

  onPasswordFocus = key => {
    this.setState(state => {
      return {
        [key]: {
          ...state[key],
          visible: true
        }
      };
    });
  };

  onPasswordBlur = key => {
    this.setState(state => {
      return {
        [key]: {
          ...state[key],
          visible: false
        }
      };
    });
  };

  getConfig = key => {
    if (this.state[key].visible) {
      return config.text;
    }

    return config.password;
  };

  onChangePasswordType = key => {
    this.setState(state => {
      return {
        [key]: {
          ...state[key],
          visible: !state[key].visible
        }
      };
    });
  };

  onSubmitEditing = input => this.inputs[input]._root.focus();

  submit = () => {
    const { oldPassword, newPassword } = this.state;
    const { setTokenStore } = this.props;

    this.setState({ loading: true });

    const passwords = {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    };

    fetch(`${serverUrl}/users/me/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`
      },
      body: JSON.stringify({ ...passwords })
    })
      .then(result => result.json())
      .then(result => {
        this.setState({ loading: false });

        if (result.token) {
          Toast.show({
            text: "Your password has been changed",
            position: "absolute", //position: "top" Before
            type: "success",
            duration: 5000
          });

          setTokenStore(result.token);
        }

        if (result.message) {
          Toast.show({
            text: result.message,
            position: "absolute", //position: "top" Before
            type: "danger",
            duration: 5000
          });
        }
      });
  };

  render() {
    const { loading, oldPassword, newPassword, confirmPassword } = this.state;

    const validateForm =
      oldPassword.valid && newPassword.valid && confirmPassword.valid;

    return (
      <Container style={{ backgroundColor: "#fff", paddingBottom: 20 }}>
        <View style={{ padding: 20 }}>
          <View style={{ marginBottom: 20 }}>
            <Input
              getRef={ref => this.getRef(ref, "oldPassword")}
              error={errors.password}
              validateTest={new RegExp(/^(?!\s*$).+/g)}
              onChangeText={(value, valid) =>
                this.onChange("oldPassword", value, valid)
              }
              onChangeInputType={() => this.onChangePasswordType("oldPassword")}
              onFocus={() => this.onPasswordFocus("oldPassword")}
              onBlur={() => this.onPasswordBlur("oldPassword")}
              onSubmitEditing={() => this.onSubmitEditing("newPassword")}
              returnKeyType="next"
              activeColor="rgb(60, 3, 85)"
              inactiveColor="rgb(146, 146, 146)"
              label="Old Password"
              type={this.getConfig("oldPassword").type}
              iconName={this.getConfig("oldPassword").icon}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Input
              getRef={ref => this.getRef(ref, "newPassword")}
              error={errors.password}
              validateTest={new RegExp(/^(?=.{8,})/)}
              onChangeText={(value, valid) =>
                this.onChange("newPassword", value, valid)
              }
              onChangeInputType={() => this.onChangePasswordType("newPassword")}
              onFocus={() => this.onPasswordFocus("newPassword")}
              onBlur={() => this.onPasswordBlur("newPassword")}
              onSubmitEditing={() => this.onSubmitEditing("confirmPassword")}
              returnKeyType="next"
              activeColor="rgb(60, 3, 85)"
              inactiveColor="rgb(146, 146, 146)"
              label="New Password"
              type={this.getConfig("newPassword").type}
              iconName={this.getConfig("newPassword").icon}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Input
              getRef={ref => this.getRef(ref, "confirmPassword")}
              error={errors.confirm}
              validateTest={newPassword.value}
              onChangeText={(value, valid) =>
                this.onChange("confirmPassword", value, valid)
              }
              onChangeInputType={() =>
                this.onChangePasswordType("confirmPassword")
              }
              onFocus={() => this.onPasswordFocus("confirmPassword")}
              onBlur={() => this.onPasswordBlur("confirmPassword")}
              onSubmitEditing={this.submit}
              returnKeyType="done"
              activeColor="rgb(60, 3, 85)"
              inactiveColor="rgb(146, 146, 146)"
              label="Confirm New Password"
              type={this.getConfig("confirmPassword").type}
              iconName={this.getConfig("confirmPassword").icon}
            />
          </View>

          <AuthButton
            loading={loading}
            textButton="update password"
            isDisable={!validateForm}
            pressButton={this.submit}
          />
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  token: state.token.token
});

function bindActions(dispatch) {
  return {
    setTokenStore: token => dispatch(setTokenStore(token))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(ChangePassword);
