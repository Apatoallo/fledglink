import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, RefreshControl } from "react-native";
import { View, Spinner } from "native-base";
import PropTypes from "prop-types";
import { stringify } from "query-string";
import FirebaseAnalytics from "../../../Services/FirebaseAnalytics";
import { getCompanies } from "../../../actions/company";
import CompanyListItem from "./CompanyListItem";
import PlaceholderComponent from "../../../shared/PlaceholderComponent";

class Companies extends Component {
  static propTypes = {
    token: PropTypes.string
  };

  componentDidMount = () => {
    const { getCompanies, token } = this.props;
    FirebaseAnalytics.setCurrentScreen("Company List", "Company");
    getCompanies(token);
  };

  shouldComponentUpdate(nextProps) {
    return this.props.companies !== nextProps.companies;
  }

  companyNavigate = (itemId, key, item) => {
    this.props.navigate("CompanyProfile", itemId, key, item);
  };

  render() {
    const {
      companies,
      getCompanies,
      token,
      companiesLoaded,
      allCompaniesLoaded
    } = this.props;
    return (
      <View>
        <FlatList
          data={companies}
          keyExtractor={item => item.id}
          onEndReached={() => {
            if (!companiesLoaded || allCompaniesLoaded) return;
            getCompanies(token);
          }}
          onEndReachedThreshold={0.1}
          onRefresh={() => getCompanies(token)}
          refreshing={!companiesLoaded}
          ListEmptyComponent={
            <PlaceholderComponent
              count={4}
              onReady={companiesLoaded}
              height={100}
            />
          }
          renderItem={({ item }) => (
            <CompanyListItem
              item={item}
              companyClickHandler={this.companyNavigate}
            />
          )}
        />
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    getCompanies: token => dispatch(getCompanies(token))
  };
}
const mapStateToProps = state => ({
  token: state.token.token,
  companies: state.company.companies,
  companiesLoaded: state.company.companiesLoaded,
  allCompaniesLoaded: state.company.allCompaniesLoaded
});

export default connect(
  mapStateToProps,
  bindAction
)(Companies);
