import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import PropTypes from "prop-types";
import { colors } from "../../configs/config";

const filter = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomColor: colors.grey,
    borderBottomWidth: 0.5
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3E1154"
  },
  description: {
    fontSize: 14,
    color: colors.grey
  }
});

const Filter = ({ filterData, clickHandler }) => (
  <TouchableOpacity
    onPress={() => clickHandler(filterData.key, filterData.title)}
    style={filter.container}
  >
    <Text style={filter.title}>{filterData.title}</Text>
    <Text style={filter.description}>{filterData.description}</Text>
  </TouchableOpacity>
);

Filter.propTypes = {
  filterData: PropTypes.instanceOf(Object).isRequired,
  clickHandler: PropTypes.func.isRequired
};

export default Filter;
