import React, { Component } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Linking
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { Button, View, Icon, Text } from "native-base";
import { StackActions, NavigationActions } from "react-navigation";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { registrationRequest } from "../../actions/register";
import styles from "./styles";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";
import RegistrationHeader from "../../shared/registrationHeader";
import RegisterForm from "../forms/registrationForm/RegistrationForms";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      forgotPasswordModalVisible: false
    };
  }

  componentDidMount = () => {
    FirebaseAnalytics.setCurrentScreen("Register", "Authentication");
  };

  componentDidUpdate = prevProps => {
    const { registrationError } = this.props;
    if (registrationError && !prevProps.registrationError) {
      if (registrationError === "This email is already taken.") {
        this.setState({ forgotPasswordModalVisible: true });
      }
    }
  };

  loginNavigation = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  resetToRoute = () => {
    const { navigation } = this.props;

    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: "Landing" }),
        NavigationActions.navigate({ routeName: "Login" })
      ]
    });

    navigation.dispatch(resetAction);
  };

  toggleModal = () => {
    this.setState({
      forgotPasswordModalVisible: !this.state.forgotPasswordModalVisible
    });
  };

  forgotPasswordRedirect = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("ForgotPassword");
    this.toggleModal();
  };

  support = () => {
    Linking.openURL("mailto:contact@fledglink.com?subject=App Support").catch(
      err => console.log("An error occurred", err)
    );
  };

  registration = (email, password, fullName, referralCode) => {
    const { registrationRequest } = this.props;

    this.setState({ loading: true }, () =>
      registrationRequest(
        email,
        password,
        fullName,
        referralCode,
        this.onSuccess,
        this.onError
      )
    );
  };

  onSuccess = () => this.setState({ loading: false });

  onError = () => this.setState({ loading: false });

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    const { forgotPasswordModalVisible, loading } = this.state;
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
                    secondaryText="Get started with Fledglink"
                    primaryText="Create Your Account"
                  />
                </View>
                <View>
                  <RegisterForm
                    loading={loading}
                    registration={this.registration}
                    navigate={navigate}
                  />
                </View>

                <View style={styles.helpView}>
                  <Text onPress={this.resetToRoute} style={styles.helpText}>
                    Already a have an account?{" "}
                    <Text style={[styles.helpText, styles.violet]}>
                      Sign in
                    </Text>
                  </Text>
                </View>

                <View style={styles.helpView}>
                  <Text
                    onPress={this.support}
                    style={[styles.helpText, styles.violet]}
                  >
                    Help
                  </Text>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>
          <Modal
            isVisible={forgotPasswordModalVisible}
            animationIn="slideInUp"
            onBackdropPress={this.toggleModal}
          >
            <View style={styles.forgotPasswordModal}>
              <Text style={styles.text}>This email is already in use</Text>
              <View style={styles.modalButtonsWrapper}>
                <Button
                  transparent
                  onPress={this.forgotPasswordRedirect}
                  rounded
                  style={styles.modalDeleteBtn}
                >
                  <Text style={styles.modalDeleteBtnText}>
                    Forgot password?
                  </Text>
                </Button>
                <TouchableOpacity
                  onPress={this.toggleModal}
                  style={styles.modalCancelBtn}
                >
                  <Icon
                    style={styles.modalCancelBtnIcon}
                    name="arrow-left"
                    type="Feather"
                  />
                  <Text style={styles.modalCancelBtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token.token,
  formState: state.form.Register,
  registrationSuccess: state.register.registrationSuccess,
  registrationError: state.register.registrationError
});

function bindActions(dispatch) {
  return {
    registrationRequest: (
      email,
      password,
      fullName,
      referralCode,
      onSuccess,
      onError
    ) =>
      dispatch(
        registrationRequest(
          email,
          password,
          fullName,
          referralCode,
          onSuccess,
          onError
        )
      )
  };
}

SignUp.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  registrationRequest: PropTypes.func.isRequired,
  registrationSuccess: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  bindActions
)(SignUp);
