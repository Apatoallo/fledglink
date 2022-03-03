import React, { Component } from "react";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Text, Icon, View } from "native-base";
import { colors, fonts } from "../../../configs/config";

const SFJPLogo = require("../../../../images/SFJP-logo-white.png");

const questionnaireCard = StyleSheet.create({
  cardWrapper: {
    flexWrap: "nowrap",
    marginBottom: 20
  },
  cardInnerWrapper: {
    backgroundColor: colors.lighterGrey,
    borderRadius: 4,
    padding: 15
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
  completeBadge: {
    paddingHorizontal: 5,
    color: colors.white,
    backgroundColor: colors.green
  },
  bodyText: {
    fontFamily: fonts.regular,
    color: colors.grey,
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
    color: colors.violet,
    fontSize: 12
  },
  footerIcon: {
    color: colors.violet,
    marginLeft: 10,
    fontSize: 14
  }
});

export default class QuestionnaireCard extends Component {
  render() {
    const { user, clickHandler } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={clickHandler}
        style={questionnaireCard.cardWrapper}
      >
        <View style={questionnaireCard.cardInnerWrapper}>
          <View style={questionnaireCard.headerBlock}>
            <Text style={questionnaireCard.headerText}>
              Personality Questionnaire
            </Text>
            {user.sova.testResultUrl && (
              <Text uppercase style={questionnaireCard.completeBadge} note>
                complete
              </Text>
            )}
          </View>
          <View>
            <Text style={questionnaireCard.bodyText}>
              Find out more about yourself and get better ‘matches’ to jobs and
              companies looking for you. Win, win!
            </Text>
          </View>
          <View style={questionnaireCard.footerBlock}>
            <Text uppercase style={questionnaireCard.footerText}>
              {user.sova.testResultUrl ? "view result" : "begin test"}
            </Text>
            <Icon
              name="arrow-right"
              type="Feather"
              style={questionnaireCard.footerIcon}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
