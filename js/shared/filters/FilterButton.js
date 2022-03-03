import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text, Icon } from "native-base";
import PropTypes from "prop-types";
import { colors, fonts } from "../../configs/config";

const editFilters = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    padding: 5,
    borderRadius: 4,
    borderColor: colors.grey,
    borderStyle: "solid",
    borderWidth: 1
  },
  subContainerText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.grey,
    marginLeft: 5
  },
  subContainerIcon: {
    fontSize: 24,
    color: colors.grey
  },
  text: {
    fontSize: 12,
    color: colors.grey
  }
});

export default class FilterButton extends PureComponent {
  render() {
    const { clickHandler, activeFiltersCounter, title } = this.props;
    return (
      <TouchableOpacity onPress={clickHandler} style={editFilters.container}>
        <Text style={editFilters.subContainerText}>
          {title}
          {Boolean(activeFiltersCounter && activeFiltersCounter > 0) &&
            ` (${activeFiltersCounter} Filter${
              activeFiltersCounter !== 1 ? "s" : ""
            } Applied)`}
        </Text>
        <Icon
          name="chevron-right"
          type="MaterialCommunityIcons"
          style={editFilters.subContainerIcon}
        />
      </TouchableOpacity>
    );
  }
}

FilterButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  activeFiltersCounter: PropTypes.number,
  title: PropTypes.string.isRequired
};
