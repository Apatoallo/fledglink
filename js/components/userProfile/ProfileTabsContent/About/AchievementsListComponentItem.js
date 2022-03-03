import React, { PureComponent } from "react";
import { Text } from "native-base";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import { colors } from "../../../../configs/config";

const achievementsListItem = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    flex: 1,
    marginTop: 10
  },
  textBlock: {
    width: "75%"
  },
  dateBlock: {
    width: "20%"
  },
  dateText: {
    color: colors.grey,
    textAlign: "right"
  }
});

export default class AchievementsListComponentItem extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <View style={achievementsListItem.container}>
        <View style={achievementsListItem.textBlock}>
          <Text>{item.name}</Text>
          <Text note>{item.grade}</Text>
        </View>
        <View style={achievementsListItem.dateBlock}>
          <Text style={achievementsListItem.dateText}>
            {moment(item.achievedDate).format("MMM YYYY")}
          </Text>
        </View>
      </View>
    );
  }
}
