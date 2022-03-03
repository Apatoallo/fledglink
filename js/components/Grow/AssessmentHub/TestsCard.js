import React, { Component } from "react";
import { StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { Text, View, Icon } from "native-base";
import { colors, fonts } from "../../../configs/config";

const assessmentDayLogo = require("../../../../images/AssessmentDay.png");

const testCard = StyleSheet.create({
  cardWrapper: {
    flexWrap: "nowrap",
    marginBottom: 20
  },
  cardInnerWrapper: {
    backgroundColor: colors.lighterGrey,
    borderRadius: 4,
    padding: 15
  },
  logo: {
    width: 164,
    height: 42
  },
  headerBlock: {
    flexDirection: "column",
    alignItems: "flex-start"
  },
  headerText: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.black,
    marginBottom: 15
  },
  bodyText: {
    fontFamily: fonts.regular,
    color: colors.grey,
    fontSize: 14,
    marginBottom: 15
  },
  footerBlock: {
    flexDirection: "row",
    alignItems: "center"
  },
  footerText: {
    fontFamily: fonts.bold,
    color: colors.violet,
    fontSize: 12
  },
  footerIcon: {
    color: colors.violet,
    marginLeft: 10,
    fontSize: 14
  }
});

export default class TestsCard extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        style={testCard.cardWrapper}
        onPress={this.props.clickHandler}
      >
        <View style={testCard.cardInnerWrapper}>
          <Image source={assessmentDayLogo} style={testCard.logo} />
          <View style={testCard.headerBlock}>
            <Text style={testCard.headerText}>Put your brain to the test!</Text>
          </View>
          <View>
            <Text style={testCard.bodyText}>
              Try these practice cognitive ability tests, selected in
              partnership with Assessment Day. They will help you discover more
              about yourself and reduce your anxiety when doing them for real!
            </Text>
          </View>
          <View style={testCard.footerBlock}>
            <Text uppercase style={testCard.footerText}>
              Go to practice tests
            </Text>
            <Icon
              name="arrow-right"
              type="Feather"
              style={testCard.footerIcon}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
