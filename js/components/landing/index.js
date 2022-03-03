import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";
import { View, Text } from "native-base";
import styles from "./styles";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";

const background = require("../../../images/loadingBG.png");
const logo = require("../../../images/fledglink.png");

class Login extends Component {
  componentWillMount = () => {
    FirebaseAnalytics.setCurrentScreen("Landing", "Authentication");
  };

  render() {
    const {
      navigation: { navigate }
    } = this.props;

    return (
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.flex}
      >
        <SafeAreaView style={styles.flex}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              behavior="position"
              contentContainerStyle={styles.flex}
              style={styles.flex}
            >
              <View style={[styles.flex, styles.padded]}>
                <View style={[styles.flex, styles.wrapper]}>
                  <View style={styles.container}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.heading}>
                      Get prepared for life after education, make confident
                      decisions about your future and land your ideal job – all
                      from this single app…
                    </Text>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.hollowBtn}
                      onPress={() => navigate("SignUp")}
                    >
                      <Text style={styles.hollowBtnText}>
                        {"Get started now".toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.linkContainer}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => navigate("Login")}
                  >
                    <Text style={styles.link}>
                      Already have an account? Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default Login;
