import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "native-base";
import EditButton from "../../EditButton";
import ListComponent from "../About/ListComponent";
import ExperienceListItem from "./ExperienceListItem";
import { colors } from "../../../../configs/config";

const educationAndExperience = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 18,
    color: colors.black
  }
});

export default class ExperienceTab extends Component {
  render() {
    const {
      data,
      press,
      name,
      showEdit,
      navigation,
      onEnableScroll,
      enableScrollViewScroll
    } = this.props;
    return (
      <View>
        <View style={educationAndExperience.container}>
          <Text style={educationAndExperience.title}>{name}</Text>
          {showEdit && <EditButton onClickHandler={press} />}
        </View>
        <ListComponent
          ListItemComponent={ExperienceListItem}
          dataArray={data}
          navigation={navigation}
          onEnableScroll={onEnableScroll}
          enableScrollViewScroll={enableScrollViewScroll}
        />
      </View>
    );
  }
}
