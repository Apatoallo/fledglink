import React, { Component } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "native-base";
import { stringify } from "query-string";
import { decode } from "he";
import { colors, fonts } from "../../configs/config";

const badge = StyleSheet.create({
  wrapper: {
    borderRadius: 18,
    marginTop: 6,
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.pink
  },
  centre: {
    marginRight: 8,
    marginLeft: 8,
    paddingHorizontal: 14
  },
  text: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.white
  },
  small: {
    fontSize: 9
  }
});

export default class Badge extends Component {
  onClick = () => {
    const { badge, onClickHandler } = this.props;
    if (!badge) return;
    onClickHandler(badge.policyDescription, badge.title);
  };

  render() {
    const { text, small, centre } = this.props;
    return (
      <TouchableOpacity
        onPress={this.onClick}
        style={[badge.wrapper, centre && badge.centre]}
      >
        <Text uppercase style={[badge.text, small && badge.small]}>
          {decode(text)}
        </Text>
      </TouchableOpacity>
    );
  }
}
