import React, { PureComponent } from "react";
import { Container, Content } from "native-base";
import PropTypes from "prop-types";
import ActiveFiltersList from "./ActiveFiltersList";
import FiltersList from "./FiltersList";

export default class FiltersBar extends PureComponent {
  render() {
    const {
      navigation,
      applyFiltersClickHandler,
      filterOptions,
      goToFilterOptions,
      filterResult,
      clearAllActiveFiltersAction
    } = this.props;
    return (
      <Container style={{ backgroundColor: "white" }}>
        <Content>
          <ActiveFiltersList
            clearAllActiveFiltersAction={clearAllActiveFiltersAction}
            filterResult={filterResult}
            filterOptions={filterOptions}
            applyFiltersClickHandler={applyFiltersClickHandler}
            navigation={navigation}
            goToFilterOptions={goToFilterOptions}
          />
          <FiltersList
            filterOptions={filterOptions}
            goToFilterOptions={goToFilterOptions}
          />
        </Content>
      </Container>
    );
  }
}

FiltersBar.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  filterOptions: PropTypes.instanceOf(Object).isRequired,
  filterResult: PropTypes.instanceOf(Object).isRequired,
  clearAllActiveFiltersAction: PropTypes.func.isRequired,
  applyFiltersClickHandler: PropTypes.func.isRequired,
  goBackButton: PropTypes.func.isRequired
};
