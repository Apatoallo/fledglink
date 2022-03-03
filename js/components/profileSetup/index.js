import React, { Component } from "react";
import { TouchableOpacity, ScrollView, Image } from "react-native";
import { View, Text } from "native-base";
import styles from "./styles";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";

const logo = require("../../../images/bird_120x120.png");

class ProfileSetup extends Component {
  componentWillMount = () => {
    FirebaseAnalytics.setCurrentScreen("Login", "Authentication");
  };

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    const logo = require("../../../images/Bird.png");

    return (
      <ScrollView style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.wrapper}>
          <Text style={styles.header}>Welcome to Fledglink</Text>
        </View>
        <Text style={styles.textStyle}>
          Create your profile to get matched to jobs, advice, events and boost
          your skills
        </Text>
        <View style={styles.wrapper}>
          <TouchableOpacity
            onPress={() => navigate("CreateProfile")}
            style={styles.getStartedButton}
          >
            <Text style={styles.getStartedText}>
              {"Let’s go!".toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default ProfileSetup;
