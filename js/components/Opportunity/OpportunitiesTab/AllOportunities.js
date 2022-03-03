import React, { Component } from "react";
import { connect } from "react-redux";
import { isEqual, escape } from "lodash";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { Text, View } from "native-base";
import { stringify } from "query-string";
import FirebaseAnalytics from "../../../Services/FirebaseAnalytics";
import { serverUrl, colors } from "../../../configs/config";
import { clearAllActiveFilters } from "../../../actions/opportunitiesFilters";
import { getOpportunityCounters } from "../../../actions/companyOpportunities";
import FilterButton from "../../../shared/filters/FilterButton";
import OpportunityTabListItem from "../OpportunityTabListItem";
import ToastComponent from "../../../shared/ToastComponent";

const allOpportunities = StyleSheet.create({
  filterTabs: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    backgroundColor: colors.lighterGrey
  },
  filterTabButton: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  filterTabButtonText: {
    color: colors.violet,
    fontSize: 16
  },
  separator: {
    borderLeftWidth: 1,
    borderLeftColor: "grey",
    height: "70%"
  }
});

const pagination = {
  current: 0,
  size: 10
};

class AllOpportunities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      loading: false,
      end_reached: false,
      data: [],
      filters: {},
      page: pagination
    };
  }

  setFilters = (options, callback) => {
    const filters = {};

    if (options) {
      Object.keys(options).forEach(item => {
        switch (item) {
          case "locations":
          case "salary": {
            filters[item] = { ...options[item] };
            break;
          }

          case "badges": {
            filters["badges.title"] = options[item].title;
            break;
          }

          default: {
            if (Array.isArray(filters[item])) {
              filters[item] = options[item].map(option => escape(option));
            } else {
              filters[item] = options[item];
            }
          }
        }
      });
    }

    this.setState(
      state => {
        return {
          end_reached: false,
          data: options ? state.data : [],
          filters,
          page: pagination
        };
      },
      () => {
        if (callback) callback();
      }
    );
  };

  getOpportunities = async (key = "loading") => {
    const { token } = this.props;
    const { filters, refreshing, loading, end_reached, page } = this.state;

    if (refreshing || loading || end_reached) {
      return;
    }

    const start = page.current * page.size;
    const end = start + (page.size - 1);

    this.setState({ [key]: true });

    const query = {
      range: JSON.stringify([start, end]),
      ...(Object.keys(filters).length && {
        filter: JSON.stringify({ ...filters, type: "and" })
      })
    };

    // TODO ask Artem about this
    const routeString = Object.keys(filters).length
      ? "/opportunities"
      : "/users/me/opportunities";

    const results = await fetch(
      `${serverUrl}${routeString}?${stringify(query)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
      .then(result => result.json())
      .then(result => {
        if (result.message) {
          ToastComponent(
            (result.errors && result.errors.radius) || result.message
          );
          throw new Error("Bad request error");
        }
        return result;
      })
      .catch(error => {
        console.log(error);
      });

    this.setState(state => {
      return {
        refreshing: false,
        loading: false,
        end_reached: results.length < page.size,
        page: {
          ...state.page,
          current: state.page.current + 1
        },
        data: key === "refreshing" ? [...results] : [...state.data, ...results]
      };
    });
  };

  componentDidMount = () => {
    const { token, getOpportunityCounters } = this.props;
    FirebaseAnalytics.setCurrentScreen("Opportunity List", "Opportunity");
    this.getOpportunities();
    getOpportunityCounters(token);
  };

  componentWillReceiveProps = nextProps => {
    const { opportunitiesFilter } = this.props;

    if (!isEqual(opportunitiesFilter, nextProps.opportunitiesFilter)) {
      const filters =
        Object.keys(nextProps.opportunitiesFilter).length > 0
          ? nextProps.opportunitiesFilter
          : null;

      this.setFilters(filters, () => this.onRefresh());
    }
  };

  onRefresh = () => {
    this.setState({ page: pagination, end_reached: false }, () =>
      this.getOpportunities("refreshing")
    );
  };

  opportunityClick = opportunityId => {
    const { navigate } = this.props;
    navigate("OpportunityPage", opportunityId, "id");
  };

  filterNav = route => {
    const { filterNav } = this.props;
    filterNav(route);
  };

  render() {
    const {
      savedOpportunities,
      appliedOpportunities,
      activeFiltersCounter,
      filterNav,
      token
    } = this.props;
    const { refreshing, loading, data } = this.state;

    return (
      <View style={{ flex: 1 }} removeClippedSubviews>
        <View style={allOpportunities.filterTabs}>
          <TouchableOpacity
            onPress={() => filterNav("Saved")}
            style={allOpportunities.filterTabButton}
          >
            <Text
              style={allOpportunities.filterTabButtonText}
            >{`${savedOpportunities} Saved`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => filterNav("Applied")}
            style={[
              allOpportunities.filterTabButton,
              allOpportunities.separator
            ]}
          >
            <Text
              style={allOpportunities.filterTabButtonText}
            >{`${appliedOpportunities} Applied`}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FilterButton
            clickHandler={() => this.filterNav("FilterOpportunities")}
            activeFiltersCounter={activeFiltersCounter}
            title="Filter results"
          />
        </View>
        {loading && !data.length && <ActivityIndicator size="large" />}
        <FlatList
          style={{ flex: 1 }}
          data={data}
          renderItem={({ item }) => (
            <OpportunityTabListItem
              opportunity={item}
              clickHandler={this.opportunityClick}
            />
          )}
          onEndReached={() => this.getOpportunities()}
          onEndReachedThreshold={0.25}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    clearAllActiveFilters: () => dispatch(clearAllActiveFilters()),
    getOpportunityCounters: token => dispatch(getOpportunityCounters(token))
  };
}
const mapStateToProps = state => {
  const filterOptions = state.opportunitiesFilters.options;
  const activeFilters = filterOptions.filter(option => option.isActive);
  return {
    token: state.token.token,
    appliedOpportunities: state.companyOpportunities.appliedOpportunities,
    savedOpportunities: state.companyOpportunities.savedOpportunities,
    opportunitiesFilter: state.opportunitiesFilters.result,
    activeFiltersCounter: activeFilters.length
  };
};

export default connect(
  mapStateToProps,
  bindAction
)(AllOpportunities);
