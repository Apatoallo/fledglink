import React, { PureComponent } from "react";
import { View } from "native-base";
import { StyleSheet } from "react-native";
import Dashboard from "./Dashboard/Dashboard";
import PersonalityTest from "./PersonalityTest/PersonalityTest";
import { colors } from "../../../configs/config";

const profileBody = StyleSheet.create({
  container: {
    backgroundColor: colors.gallery,
    paddingHorizontal: 20,
    paddingVertical: 20
  }
});

export default class ProfileBody extends PureComponent {
  render() {
    const { user, shouldShown, navigationHandler } = this.props;
    return (
      <View>
        {shouldShown && (
          <View style={profileBody.container}>
            <Dashboard user={user} navigationHandler={navigationHandler} />
            <PersonalityTest
              navigationHandler={navigationHandler}
              user={user}
            />
          </View>
        )}
      </View>
    );
  }
}
