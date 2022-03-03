import React, { PureComponent } from "react";
import { Text } from "native-base";
import { View, StyleSheet } from "react-native";
import EditButton from "../../EditButton";
import ListComponent from "./ListComponent";
import AchievementsListComponentItem from "./AchievementsListComponentItem";
import { colors } from "../../../../configs/config";

const achievementsStyles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 18,
    color: colors.black
  },
  hobbiesListWrapper: {
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  fillText: {
    color: colors.grey
  }
});

export default class Achievements extends PureComponent {
  render() {
    const { press, achievements, showEdit, name, userName } = this.props;
    return (
      <View>
        <View style={achievementsStyles.container}>
          <Text style={achievementsStyles.title}>Achievements</Text>
          {showEdit && <EditButton onClickHandler={press} />}
        </View>
        {achievements && achievements.length > 0 ? (
          <ListComponent
            ListItemComponent={AchievementsListComponentItem}
            dataArray={achievements}
          />
        ) : (
          <View style={{ margin: 10 }}>
            <Text style={achievementsStyles.fillText}>{`${
              name === "My CV"
                ? "You have added no achievements"
                : `${userName} has not added any achievements`
            }`}</Text>
          </View>
        )}
      </View>
    );
  }
}
