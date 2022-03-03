import React, { Component } from "react";
import { View } from "native-base";
import { StyleSheet, Dimensions } from "react-native";
import PropTypes from "prop-types";
import LoginInput from "../../../shared/validateInput";
import AuthButton from "../../../shared/authButton";
import { colors } from "../../../configs/config";
import InputWithEyeIcon from "../../../shared/InputWithEyeIcon";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 20
  }
});

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      password: "",
      validateEmail: false,
      validatePassword: false
    };
  }

  emailChangeHandler = (email, validateEmail) => {
    this.setState({
      email,
      validateEmail
    });
  };

  passwordChangeHandler = (password, validatePassword) => {
    this.setState({
      password,
      validatePassword
    });
  };

  submit = () => {
    const { email, password } = this.state;
    const { getUserRequest } = this.props;

    this.setState({ loading: true }, () =>
      getUserRequest(email, password, this.onSuccess, this.onError)
    );
  };

  onSuccess = () => this.setState({ loading: false });

  onError = () => this.setState({ loading: false });

  render() {
    const { loading, validateEmail, validatePassword } = this.state;
    const valid = validateEmail && validatePassword;
    return (
      <View>
        <View style={styles.inputWrapper}>
          <LoginInput
            validateTest={
              new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/)
            }
            onChangeText={this.emailChangeHandler}
            activeColor="rgb(60, 3, 85)"
            inactiveColor="rgb(146, 146, 146)"
            label="Email"
            type="email"
          />
        </View>
        <View style={styles.inputWrapper}>
          <InputWithEyeIcon
            validateTest={new RegExp(/^(?=.{8,})/)}
            onChangeText={this.passwordChangeHandler}
            activeColor="rgb(60, 3, 85)"
            inactiveColor="rgb(146, 146, 146)"
            label="Password"
          />
        </View>
        <AuthButton
          textButton="Sign In"     
          loading={loading}
          isDisable={valid}
          pressButton={this.submit}
        />
      </View>
    );
  }
}

LoginForm.propTypes = {
  getUserRequest: PropTypes.func.isRequired
};
