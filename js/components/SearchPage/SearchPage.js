import React, { Component } from "react";
import { Text, View } from "native-base";
import { StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SearchFor from "./SearchFor";
import SearchResultsList from "./SearchResultsList";
import searchWithDelay from "../../utils/searchWithDelay";
import {
  fetchGetUsersList,
  resetGlobalSearchData
} from "../../actions/globalSearch";
import Header from "../../Routers/Headers";
import { colors } from "../../configs/config";

const searchPage = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  contentContainer: {
    flex: 1
  },
  titleText: {
    color: colors.darkBlack,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 20
  },
  iconsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-around"
  }
});

class SearchPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const onChange = navigation.getParam("onChange");
    const cancel = navigation.getParam("cancel");
    return {
      header: props => (
        <Header.Search {...props} onChange={onChange} cancel={cancel} />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      onChange: this.onChangeWithDelay,
      cancel: this.goBack
    });
  }

  navigateToItem = ({ screen, id }) => {
    this.props.resetGlobalSearchData();
    this.props.navigation.navigate(screen, id);
  };

  onChangeHandler = text => {
    if (this.props.loading) return;
    this.setState({ searchText: text });
    this.props.fetchGetUsersList(this.props.token, text);
  };

  onChangeWithDelay = searchWithDelay(this.onChangeHandler);

  goBack = () => {
    this.props.navigation.goBack();
    this.props.resetGlobalSearchData();
  };

  render() {
    const searchForItems = [
      { id: 1, iconName: "users", text: "People" },
      { id: 2, iconName: "search", text: "Opportunities" }
    ];
    return (
      <View style={searchPage.container}>
        <View style={searchPage.contentContainer}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={65}
          >
            {this.props.data.length ? (
              <SearchResultsList
                listItemClickHandler={this.navigateToItem}
                dataSetState={this.props.data}
                onScrollHandler={() =>
                  this.onChangeHandler(this.state.searchText)
                }
              />
            ) : (
              <View>
                <View>
                  <Text style={searchPage.titleText}>Search for</Text>
                </View>
                <View style={searchPage.iconsWrapper}>
                  {searchForItems.map(el => (
                    <SearchFor iconName={el.iconName} text={el.text} />
                  ))}
                </View>
              </View>
            )}
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

SearchPage.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  resetGlobalSearchData: PropTypes.func.isRequired,
  fetchGetUsersList: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  token: state.token.token,
  data: state.globalSearch.dataList,
  loading: state.globalSearch.loading
});

function bindAction(dispatch) {
  return {
    fetchGetUsersList: (token, text) =>
      dispatch(fetchGetUsersList(token, text)),
    resetGlobalSearchData: () => dispatch(resetGlobalSearchData())
  };
}

export default connect(
  mapStateToProps,
  bindAction
)(SearchPage);
