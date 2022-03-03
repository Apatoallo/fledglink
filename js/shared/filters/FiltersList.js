import React, { PureComponent } from "react";
import { StyleSheet, FlatList } from "react-native";
import { View } from "native-base";
import PropTypes from "prop-types";
import Filter from "./Filter";

const filtersList = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10
  }
});

export default class FiltersList extends PureComponent {
  getDisabledFilters = filterOptions =>
    filterOptions.filter(option => !option.isActive);

  render() {
    const { filterOptions, goToFilterOptions } = this.props;
    return (
      <View style={filtersList.container}>
        <FlatList
          data={this.getDisabledFilters(filterOptions)}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <Filter clickHandler={goToFilterOptions} filterData={item} />
          )}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}

FiltersList.propTypes = {
  filterOptions: PropTypes.instanceOf(Object).isRequired,
  goToFilterOptions: PropTypes.func.isRequired
};
