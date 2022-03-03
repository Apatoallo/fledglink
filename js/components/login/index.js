import React, { Component } from "react";
import {
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  Linking
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, Text, Icon } from "native-base";
import { StackActions, NavigationActions } from "react-navigation";
import PropTypes from "prop-types";
import styles from "./styles";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";
import getUserRequest from "../../actions/auth";
import RegistrationHeader from "../../shared/registrationHeader";
import LoginForm from "../forms/loginForm/LoginForm";

class Login extends Component {
  componentWillMount = () => {
    FirebaseAnalytics.setCurrentScreen("Login", "Authentication");
  };

  loginNavigation = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  };

  resetToRoute = () => {
    const { navigation } = this.props;

    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: "Landing" }),
        NavigationActions.navigate({ routeName: "SignUp" })
      ]
    });

    navigation.dispatch(resetAction);
  };

  support = () => {
    Linking.openURL("mailto:contact@fledglink.com?subject=App Support").catch(
      err => console.log("An error occurred", err)
    );
  };

  render() {
    const {
      getUserRequest,
      navigation: { navigate }
    } = this.props;

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
                    secondaryText="Already a member?"
                    primaryText="Sign In"
                  />
                </View>
                <LoginForm getUserRequest={getUserRequest} />
                <View style={[styles.action, { marginTop: 20 }]}>
                  <Text onPress={this.resetToRoute} style={styles.text}>
                    Don't have an account?{" "}
                    <Text style={styles.link}>Create one</Text>
                  </Text>
                </View>
                <View style={styles.action}>
                  <Text
                    onPress={() => navigate("ForgotPassword")}
                    style={styles.link}
                  >
                    {"Forgot your password?"}
                  </Text>
                </View>
                <View style={styles.helpView}>
                  <Text onPress={this.support} style={styles.link}>
                    Help
                  </Text>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function bindAction(dispatch) {
  return {
    getUserRequest: (email, password, onSuccess, onError) =>
      dispatch(getUserRequest(email, password, onSuccess, onError))
  };
}

Login.propTypes = {
  getUserRequest: PropTypes.func.isRequired
};

export default connect(
  null,
  bindAction
)(Login);
