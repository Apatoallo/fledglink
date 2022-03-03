import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { set } from 'lodash';
import { updateResultFilter, clearAllActiveFilters } from '../../actions/events';
import FiltersBar from '../../shared/filters/FiltersBar';

class FilterEvents extends Component {
    static activeFilterReduceFunction(acc, value) {
        if (value.checked) acc.push(value.name);
        return acc;
    }

    backButtonClick = () => {
        const { navigation: { goBack }, updateResultFilterAction } = this.props;
        updateResultFilterAction(this._getActiveFilters());
        goBack();
    };

    goToFilterOptions = (filterKey, filterTitle) => {
        const { navigation } = this.props;
        navigation.navigate('FilterEventsOptions', { filterKey, filterTitle });
    };

    goBackButton = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };

    _getCheckedValues = (activeFilter) => {
        if (activeFilter.key === 'Location') return activeFilter.data;
        return activeFilter.data.reduce(FilterEvents.activeFilterReduceFunction, []);
    };

    _getActiveFilters = () => {
        const { opportunityFilters } = this.props;
        const filterQuery = {};
        const activeFilters = opportunityFilters.filter(filterObj => filterObj.isActive);
        activeFilters.forEach((activeFilter) => {
            set(filterQuery, activeFilter.serverKey, this._getCheckedValues(activeFilter));
        });
        return filterQuery;
    };

    render() {
        const {
            navigation, opportunityFilters, filterResult, clearAllActiveFiltersAction,
        } = this.props;
        return (
            <FiltersBar
                clearAllActiveFiltersAction={clearAllActiveFiltersAction}
                filterResult={filterResult}
                filterOptions={opportunityFilters}
                applyFiltersClickHandler={this.backButtonClick}
                navigation={navigation}
                goBackButton={this.goBackButton}
                goToFilterOptions={this.goToFilterOptions}
            />
        );
    }
}

FilterEvents.propTypes = {
    navigation: PropTypes.instanceOf(Object).isRequired,
    opportunityFilters: PropTypes.instanceOf(Object).isRequired,
    updateResultFilterAction: PropTypes.func.isRequired,
    filterResult: PropTypes.instanceOf(Object).isRequired,
    clearAllActiveFiltersAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    filterResult: state.eventsStore.result,
    opportunityFilters: state.eventsStore.options,
});

function bindActions(dispatch) {
    return {
        updateResultFilterAction: filter => dispatch(updateResultFilter(filter)),
        clearAllActiveFiltersAction: () => dispatch(clearAllActiveFilters()),
    };
}

export default connect(
    mapStateToProps,
    bindActions,
)(FilterEvents);
