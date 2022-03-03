import { View, Text } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { colors, fonts } from "../../configs/config.js";

const rocketImage = require("../../../images/rocket.png");

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    padding: 15,
    borderRadius: 4,
    backgroundColor: colors.darkViolet
  },
  heading: {
    fontFamily: fonts.bold,
    textAlign: "center",
    fontSize: 16,
    color: colors.white
  },
  intro: {
    fontFamily: fonts.regular,
    textAlign: "center",
    fontSize: 12,
    color: colors.white,
    marginTop: 8
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 174,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.violet,
    marginTop: 11
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 10,
    fontFamily: fonts.bold
  },
  image: {
    marginRight: 6,
    height: 19,
    width: 19
  }
});

class ConnectIntro extends Component {
  render() {
    const { onBoostPress } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Connect with peers to boost your top qualities and grow your network
        </Text>
        <Text style={styles.intro}>
          Can’t find your friends? Invite them to Fledglink to boost your
          qualities. Find your Top Qualities in 'My CV'.
        </Text>
        <TouchableOpacity style={styles.button} onPress={onBoostPress}>
          <Image style={styles.image} source={rocketImage} />
          <Text style={styles.buttonText}>BOOST YOUR QUALITIES</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ConnectIntro;
