import React, { Component } from "react";
import { StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { Text, View, Icon } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { colors, fonts } from "../../../configs/config";

const SFJPlogo = require("../../../../images/SFJP-logo-white.png");

const virtualAssessmentCard = StyleSheet.create({
  cardWrapper: {
    flexWrap: "nowrap",
    marginBottom: 20
  },
  cardInnerWrapper: {
    padding: 15
  },
  logo: {
    height: 12,
    width: 243,
    marginBottom: 15
  },
  bodyText: {
    fontFamily: fonts.regular,
    color: colors.white,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 15
  },
  footerBlock: {
    flexDirection: "row",
    alignItems: "center"
  },
  footerText: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: 12
  },
  footerIcon: {
    color: colors.white,
    marginLeft: 10,
    fontSize: 14
  }
});

export default class VirtualAssessmentCard extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        style={virtualAssessmentCard.cardWrapper}
        onPress={this.props.clickHandler}
      >
        <LinearGradient
          colors={["rgb(63,4,77)", "rgb(156,36,199)"]}
          style={{ borderRadius: 4, marginBottom: 10 }}
        >
          <View style={virtualAssessmentCard.cardInnerWrapper}>
            <Image source={SFJPlogo} style={virtualAssessmentCard.logo} />
            <View>
              <Text style={virtualAssessmentCard.bodyText}>
                By 2035 it is estimated that 40% of today’s professions will
                have disappeared. Are you prepared for this future world of
                work? Take our fun quiz to discover more about your role in this
                exciting future.
              </Text>
            </View>
            <View style={virtualAssessmentCard.footerBlock}>
              <Text uppercase style={virtualAssessmentCard.footerText}>
                Play the game now
              </Text>
              <Icon
                name="arrow-right"
                type="Feather"
                style={virtualAssessmentCard.footerIcon}
              />
            </View>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }
}
