import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { set } from "lodash";
import {
  updateResultFilter,
  clearAllFilters
} from "../../actions/opportunitiesFilters";
import FiltersBar from "../../shared/filters/FiltersBar";

class FilterOpportunities extends Component {
  static activeFilterReduceFunction(acc, value) {
    if (value.checked) acc.push(value.name);
    return acc;
  }

  backButtonClick = () => {
    const {
      navigation: { goBack },
      updateResultFilterAction
    } = this.props;
    updateResultFilterAction(this._getActiveFilters());
    goBack();
  };

  goBackButton = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  _getCheckedValues = activeFilter => {
    if (activeFilter.key === "Location") return activeFilter.data;
    return activeFilter.data.reduce(
      FilterOpportunities.activeFilterReduceFunction,
      []
    );
  };

  goToFilterOptions = (filterKey, filterTitle) => {
    const { navigation } = this.props;
    navigation.navigate("FilterOptions", { filterKey, filterTitle });
  };

  _getActiveFilters = () => {
    const { opportunityFilters } = this.props;
    const filterQuery = {};
    const activeFilters = opportunityFilters.filter(
      filterObj => filterObj.isActive
    );
    activeFilters.forEach(activeFilter => {
      set(
        filterQuery,
        activeFilter.serverKey,
        this._getCheckedValues(activeFilter)
      );
    });
    return filterQuery;
  };

  _clearAllActiveFilters = () => {
    const {
      clearAllFiltersAction,
      updateResultFilterAction,
      navigation: { goBack }
    } = this.props;

    clearAllFiltersAction();
    updateResultFilterAction({});
    goBack();
  };

  render() {
    const { navigation, opportunityFilters, filterResult } = this.props;

    return (
      <FiltersBar
        goToFilterOptions={this.goToFilterOptions}
        clearAllActiveFiltersAction={this._clearAllActiveFilters}
        filterResult={filterResult}
        filterOptions={opportunityFilters}
        applyFiltersClickHandler={this.backButtonClick}
        navigation={navigation}
        goBackButton={this.backButtonClick}
      />
    );
  }
}

FilterOpportunities.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  opportunityFilters: PropTypes.instanceOf(Object).isRequired,
  updateResultFilterAction: PropTypes.func.isRequired,
  filterResult: PropTypes.instanceOf(Object).isRequired,
  clearAllFiltersAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  filterResult: state.opportunitiesFilters.result,
  opportunityFilters: state.opportunitiesFilters.options
});

function bindActions(dispatch) {
  return {
    updateResultFilterAction: filter => dispatch(updateResultFilter(filter)),
    clearAllFiltersAction: () => dispatch(clearAllFilters())
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(FilterOpportunities);
