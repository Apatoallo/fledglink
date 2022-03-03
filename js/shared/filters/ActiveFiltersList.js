import React, { PureComponent } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, View, Button, Icon } from "native-base";
import PropTypes from "prop-types";
import ActiveFilter from "./ActiveFilter";
import { colors } from "../../configs/config";

const activeFiltersList = StyleSheet.create({
  container: {
    flex: 1
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  subContainerButton: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: "transparent"
  },
  subContainerButtonText: {
    color: colors.grey,
    fontSize: 16
  },
  subContainerButtonIcon: {
    color: colors.grey,
    fontSize: 22
  },
  disabledColor: {
    color: colors.lightGrey
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600"
  },
  applyButton: {
    height: 30,
    paddingHorizontal: 10,
    justifyContent: "center",
    margin: 10,
    borderRadius: 15,
    backgroundColor: colors.violet
  }
});

export default class ActiveFiltersList extends PureComponent {
  getActiveFilters = filterOptions =>
    filterOptions.filter(option => option.isActive);

  render() {
    const {
      filterOptions,
      applyFiltersClickHandler,
      clearAllActiveFiltersAction,
      goToFilterOptions
    } = this.props;
    const activeFiltersCounter = this.getActiveFilters(filterOptions).length;
    return (
      <View style={activeFiltersList.container}>
        <View style={activeFiltersList.subContainer}>
          <TouchableOpacity
            style={activeFiltersList.applyButton}
            onPress={applyFiltersClickHandler}
          >
            <Text style={activeFiltersList.applyButtonText}>
              {"Apply Filters".toUpperCase()}
            </Text>
          </TouchableOpacity>
          <View>
            <Button
              style={activeFiltersList.subContainerButton}
              onPress={clearAllActiveFiltersAction}
              transparent
              disabled={activeFiltersCounter === 0}
            >
              <Text style={activeFiltersList.subContainerButtonText}>
                Clear All
              </Text>
              <Icon
                style={activeFiltersList.subContainerButtonIcon}
                type="Feather"
                name="x"
              />
            </Button>
          </View>
        </View>
        <FlatList
          data={this.getActiveFilters(filterOptions)}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <ActiveFilter
              onClickHandler={goToFilterOptions}
              filterData={item}
            />
          )}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}

ActiveFiltersList.propTypes = {
  filterOptions: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
  clearAllActiveFiltersAction: PropTypes.func.isRequired,
  applyFiltersClickHandler: PropTypes.func.isRequired
};
