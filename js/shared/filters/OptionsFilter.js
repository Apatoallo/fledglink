import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { Container, Content } from "native-base";
import PropTypes from "prop-types";
import BackgroundHeader from "../../components/backgroundHeader/BackgroundHeader";
import Location from "./Location";
import ExtendedFilters from "./ExtendedFilters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default class OptionsFilter extends PureComponent {
  render() {
    const { filterKey, filterOptions, addFiltersHandler } = this.props;
    return (
      <Container style={styles.container}>
        <Content>
          {filterKey === "Location" ? (
            <Location {...this.props} location={filterOptions} />
          ) : (
            <ExtendedFilters {...this.props} />
          )}
        </Content>
      </Container>
    );
  }
}

OptionsFilter.propTypes = {
  toggleFilterOptionAction: PropTypes.func.isRequired,
  toggleGlobalFilterOptionAction: PropTypes.func.isRequired,
  clearAllSubFiltersAction: PropTypes.func.isRequired,
  setLocationAction: PropTypes.func.isRequired,
  setLocationRadiusAction: PropTypes.func.isRequired
};
