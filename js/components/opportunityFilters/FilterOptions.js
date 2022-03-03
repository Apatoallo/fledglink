import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    toggleFilterOption,
    toggleGlobalFilterOption,
    clearAllSubFilters,
    setLocation,
    setLocationRadius,
} from '../../actions/opportunitiesFilters';
import OptionsFilter from '../../shared/filters/OptionsFilter';

class FilterOptions extends Component {
    backButtonClick = () => {
        const { navigation } = this.props;
        navigation.goBack();
    };

    getOptionsObject = () => {
        const { filterOptions, filterKey } = this.props;
        const key = filterKey || 'Location';
        return filterOptions.find(option => option.key === key);
    }

    render() {
        const {
            filterKey,
            filterTitle,
            toggleFilterOptionAction,
            toggleGlobalFilterOptionAction,
            clearAllSubFiltersAction,
            setLocationAction,
            setLocationRadiusAction,
        } = this.props;
        return (
            <OptionsFilter
                filterOptions={this.getOptionsObject()}
                addFiltersHandler={this.backButtonClick}
                filterKey={filterKey}
                filterTitle={filterTitle}
                toggleFilterOptionAction={toggleFilterOptionAction}
                toggleGlobalFilterOptionAction={toggleGlobalFilterOptionAction}
                clearAllSubFiltersAction={clearAllSubFiltersAction}
                setLocationAction={setLocationAction}
                setLocationRadiusAction={setLocationRadiusAction}
            />
        );
    }
}

FilterOptions.propTypes = {
    navigation: PropTypes.instanceOf(Object).isRequired,
    toggleFilterOptionAction: PropTypes.func.isRequired,
    toggleGlobalFilterOptionAction: PropTypes.func.isRequired,
    clearAllSubFiltersAction: PropTypes.func.isRequired,
    setLocationAction: PropTypes.func.isRequired,
    setLocationRadiusAction: PropTypes.func.isRequired,
};


const mapStateToProps = (state, props) => {
    const { filterKey, filterTitle } = props.navigation.state.params;
    return {
        filterOptions: state.opportunitiesFilters.options,
        filterKey,
        filterTitle,
    };
};

function bindActions(dispatch) {
    return {
        toggleFilterOptionAction: (name, filterKey) => dispatch(toggleFilterOption({ name, filterKey })),
        toggleGlobalFilterOptionAction: (filterKey, isActive) => dispatch(toggleGlobalFilterOption({ filterKey, isActive })),
        clearAllSubFiltersAction: filterKey => dispatch(clearAllSubFilters(filterKey)),
        setLocationAction: (center, description) => dispatch(setLocation({ center, description })),
        setLocationRadiusAction: radius => dispatch(setLocationRadius(radius)),
    };
}

export default connect(
    mapStateToProps,
    bindActions,
)(FilterOptions);
