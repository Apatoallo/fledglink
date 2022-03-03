import React, { Component } from "react";
import { Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Content, Button, View, Icon } from "native-base";
import PropTypes from "prop-types";
import { colors, fonts } from "../../configs/config";
import ClearAllButton from "./ClearAllButton";

const extendedFilters = StyleSheet.create({
  filterElement: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  filterElementActive: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.gallery
  },
  filterElementText: {
    fontSize: 16,
    color: colors.darkBlack,
    marginHorizontal: 10
  },
  filterElementActiveText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.darkBlack,
    marginHorizontal: 10
  },
  filterElementIcon: {
    fontSize: 18,
    color: colors.green
  },
  button: {
    height: 30,
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: colors.violet
  },
  buttonText: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: 12
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
    marginHorizontal: 15
  },
  title: {
    fontSize: 18,
    color: colors.violet
  },
  subTitle: {
    fontSize: 12,
    marginHorizontal: 15,
    marginBottom: 10
  }
});

export default class ExtendedFilters extends Component {
  _shouldAddFilters = () => {
    const {
      filterOptions: { data }
    } = this.props;
    return data.some(el => el.checked);
  };

  renderCheckBox = ({ name, checked }) => (
    <TouchableWithoutFeedback onPress={() => this.onChangeHandler(name)}>
      <View
        style={
          checked
            ? extendedFilters.filterElementActive
            : extendedFilters.filterElement
        }
      >
        <Text
          style={
            checked
              ? extendedFilters.filterElementActiveText
              : extendedFilters.filterElementText
          }
        >
          {name}
        </Text>
        {checked && (
          <Icon
            style={extendedFilters.filterElementIcon}
            type="Feather"
            name="check"
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );

  onChangeHandler = name => {
    const { toggleFilterOptionAction, filterKey } = this.props;
    toggleFilterOptionAction(name, filterKey);
  };

  addFiltersClick = () => {
    const {
      addFiltersHandler,
      toggleGlobalFilterOptionAction,
      filterKey
    } = this.props;
    if (!this._shouldAddFilters()) return;
    toggleGlobalFilterOptionAction(filterKey, true);
    addFiltersHandler();
  };

  clearAllSubFilters = () => {
    const { filterOptions, clearAllSubFiltersAction } = this.props;
    clearAllSubFiltersAction(filterOptions.key);
  };

  render() {
    const { filterOptions, filterTitle } = this.props;
    return (
      <Content>
        <View style={extendedFilters.header}>
          <Text style={extendedFilters.title}>
            {`Filter by ${filterTitle}`}
          </Text>
          <ClearAllButton onClickHandler={this.clearAllSubFilters} />
        </View>
        <Text style={extendedFilters.subTitle}>Select as many as you like</Text>
        {filterOptions.data.map(filterOption => (
          <View key={filterOption.id}>{this.renderCheckBox(filterOption)}</View>
        ))}
        <Button
          style={extendedFilters.button}
          rounded
          onPress={this.addFiltersClick}
        >
          <Text style={extendedFilters.buttonText}>ADD FILTERS</Text>
        </Button>
      </Content>
    );
  }
}

ExtendedFilters.propTypes = {
  filterOptions: PropTypes.instanceOf(Object).isRequired,
  filterKey: PropTypes.string.isRequired,
  toggleFilterOptionAction: PropTypes.func.isRequired,
  toggleGlobalFilterOptionAction: PropTypes.func.isRequired,
  clearAllSubFiltersAction: PropTypes.func.isRequired,
  addFiltersHandler: PropTypes.func.isRequired,
  filterTitle: PropTypes.string.isRequired
};
