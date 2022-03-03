import React, { PureComponent } from "react";
import { Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { colors, fonts } from "../../../../configs/config";

const dashboardTitle = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  heading: {
    color: colors.black,
    fontFamily: fonts.bold,
    fontSize: 18
  },
  text: {
    color: colors.black,
    fontFamily: fonts.bold,
    fontSize: 12
  },
  hint: {
    color: colors.warmGrey,
    fontFamily: fonts.regular,
    fontSize: 12,
    marginBottom: 16
  }
});

export default class DashboardTitle extends PureComponent {
  render() {
    return (
      <>
        <View style={dashboardTitle.container}>
          <Text style={dashboardTitle.heading}>Your Dashboard</Text>
          <Text style={dashboardTitle.text}>Private to you</Text>
        </View>
        <Text style={dashboardTitle.hint}>
          Keep your dashboard up to date so we can smart match you with work and
          development opportunities.
        </Text>
        <Text style={dashboardTitle.hint}>
          Make sure you have your job hunt status set to 'Actively looking' or
          'Always interested' to receive job alerts.
        </Text>
      </>
    );
  }
}
