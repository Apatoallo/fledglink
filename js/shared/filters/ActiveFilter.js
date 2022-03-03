import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "native-base";
import PropTypes from "prop-types";
import { colors } from "../../configs/config";

const activeFilter = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: colors.lighterGrey,
    paddingHorizontal: 15,
    marginBottom: 3
  },
  titleBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5
  },
  titleBlockFilterName: {
    color: "#3E1154",
    fontSize: 16,
    fontWeight: "500"
  },
  titleBlockFiltersCounter: {
    color: colors.grey,
    fontSize: 12
  },
  text: {
    fontSize: 14,
    color: "#3E1154"
  }
});

export default class ActiveFilter extends Component {
  activeFilterClick = () => {
    const { onClickHandler, filterData } = this.props;
    onClickHandler(filterData.key, filterData.title);
  };

  render() {
    const { filterData } = this.props;
    const activeSubFiltersCounter = Array.isArray(filterData.data)
      ? filterData.data.filter(el => el.checked).length
      : 1;
    return (
      <TouchableOpacity
        onPress={this.activeFilterClick}
        style={activeFilter.container}
      >
        <View style={activeFilter.titleBlock}>
          <Text style={activeFilter.titleBlockFilterName}>
            {filterData.title}
          </Text>
          <Text style={activeFilter.titleBlockFiltersCounter}>
            {`${activeSubFiltersCounter} Filter${
              activeSubFiltersCounter !== 1 ? "s" : ""
            } Applied`}
          </Text>
        </View>
        <Text numberOfLines={1} style={activeFilter.text}>
          {filterData.activeStateText}
        </Text>
      </TouchableOpacity>
    );
  }
}

ActiveFilter.propTypes = {
  filterData: PropTypes.instanceOf(Object).isRequired,
  onClickHandler: PropTypes.func.isRequired
};
