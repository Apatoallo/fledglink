import React, { Component } from "react";
import { View, Text, Icon } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../configs/config";

const userAction = StyleSheet.create({
  listItemContainer: {
    height: 60,
    paddingVertical: 5
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderColor: colors.grey
  },
  listItemIcon: {
    color: colors.darkestViolet,
    alignContent: "center",
    fontSize: 22
  },
  listItemText: {
    marginLeft: 10,
    color: colors.darkestViolet,
    alignContent: "center"
  }
});

export default class UserAction extends Component {
  render() {
    const { optionName, iconName, clickHandler } = this.props.data;
    return (
      <TouchableOpacity
        style={userAction.listItemContainer}
        onPress={clickHandler}
      >
        <View style={userAction.listItem}>
          <Icon
            style={userAction.listItemIcon}
            name={iconName}
            type="Feather"
          />
          <Text style={userAction.listItemText}>{optionName}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

UserAction.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired
};
