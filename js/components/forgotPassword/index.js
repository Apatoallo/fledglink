import React, { Component } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, Text, Toast, Icon } from "native-base";
import styles from "./styles";
import { serverUrl } from "../../configs/config";
import firebase from "@react-native-firebase/app";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";
import PropTypes from "prop-types";

import RegistrationHeader from "../../shared/registrationHeader";
import LoginInput from "../../shared/validateInput";
import AuthButton from "../../shared/authButton";

class ForgotPassword extends Component {
  static propTypes = {
    setTokenStore: PropTypes.func
  };

  state = {
    email: "",
    valid: false,
    loading: false
  };

  componentDidMount = () => {
    FirebaseAnalytics.setCurrentScreen("Forgot Password", "Authentication");
  };

  loginNavigation = () => {
    const {
      navigation: { goBack }
    } = this.props;
    return goBack();
  };

  onChange = (value, valid) => {
    this.setState({ email: value, valid });
  };

  submit = () => {
    const { navigation } = this.props;
    const { email } = this.state;

    this.setState({ loading: true });

    firebase
      .messaging()
      .getToken()
      .then(token => {
        return fetch(`${serverUrl}/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        });
      })
      .then(result => {
        if (result.status === 200) {
          this.setState({ loading: false });

          Toast.show({
            text: "We have sent you a link, please check your email.",
            position: "absolute", //position: "top" Before
            type: "success",
            duration: 5000
          });

          navigation.navigate("Login");
        } else {
          Toast.show({
            text: "Something went wrong",
            position: "absolute", //position: "top" Before
            type: "danger",
            duration: 5000
          });
        }
      });
  };

  render() {
    const { loading, valid } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
        <ScrollView
          alwaysBounceVertical
          style={{
            flex: 1,
            backgroundColor: "#f7f7f7"
          }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView style={{ flex: 1 }}>
              <View style={styles.arrow}>
                <TouchableOpacity
                  style={styles.back}
                  onPress={this.loginNavigation}
                >
                  <Icon type="Feather" name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.padded}>
                <View style={{ flex: 1 }}>
                  <RegistrationHeader
                    secondaryText="Request reset password link"
                    primaryText="Forgot Password"
                  />
                </View>
                <View>
                  <LoginInput
                    error={"Please fill a valid email address."}
                    validateTest={
                      new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/)
                    }
                    onChangeText={(value, valid) => this.onChange(value, valid)}
                    activeColor="rgb(60, 3, 85)"
                    returnKeyType="done"
                    inactiveColor="rgb(146, 146, 146)"
                    label="Email"
                  />
                  <View style={styles.hint}>
                    <Text style={styles.hintText}>
                      Enter your email address and we will send you a link to
                      reset your password.
                    </Text>
                  </View>
                </View>
                <View style={styles.action}>
                  <AuthButton
                    loading={loading}
                    textButton="Submit"
                    isDisable={!valid}
                    pressButton={this.submit}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ForgotPassword;
