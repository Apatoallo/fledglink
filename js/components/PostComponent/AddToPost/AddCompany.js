import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, View } from "native-base";
import {
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";
import { addResourceToMessage } from "../../../actions/newMessage";
import SearchBar from "./SearchBar";
import { getCompanies, resetCompanySearchData } from "../../../actions/company";
import PlaceholderComponent from "../../../shared/PlaceholderComponent";
import AddToPostListItem from "./AddToPostListItem";
import styles from "./styles";

const undefinedCompany = require("../../../../images/no-company-image.png");

class AddCompany extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 12
          }}
        >
          <Icon
            style={{ color: "white", fontSize: 24 }}
            name="x"
            type="Feather"
          />
        </View>
      </TouchableWithoutFeedback>
    )
  });

  constructor(props) {
    super(props);
    this.text = "";
  }

  componentDidMount = () => {
    const { getCompanies, token } = this.props;
    getCompanies(token);
  };

  onChangeHandler = text => {
    const { getCompanies, token } = this.props;
    this.text = text;
    getCompanies(token, text);
  };

  listItemClick = item => {
    const {
      navigation: { goBack },
      addResourceToMessage
    } = this.props;
    addResourceToMessage(item, "corporations");
    goBack();
  };

  navigateBack = () => {
    const { navigation, resetCompanySearchData } = this.props;
    resetCompanySearchData();
    navigation.goBack();
  };

  render() {
    const {
      getCompanies,
      companies,
      token,
      companiesLoaded,
      allCompaniesLoaded
    } = this.props;
    return (
      <View style={styles.mainWrapper}>
        <KeyboardAvoidingView behavior="padding" style={styles.searchWrapper}>
          <SearchBar onChangeHandler={this.onChangeHandler} />
          <FlatList
            contentContainerStyle={{ paddingBottom: 40 }}
            data={companies}
            keyExtractor={item => item.id}
            scrollEventThrottle={300}
            onEndReached={() => {
              if (!companiesLoaded || allCompaniesLoaded) return;
              getCompanies(token, this.text);
            }}
            onEndReachedThreshold={0.3}
            ListEmptyComponent={
              <PlaceholderComponent
                count={10}
                lineNumber={1}
                onReady={companiesLoaded}
                height={45}
              />
            }
            renderItem={({ item }) => (
              <AddToPostListItem
                content={
                  (item.baseInfo && item.baseInfo.name) || item.companyName
                }
                image={
                  item.baseInfo.logo
                    ? { uri: item.baseInfo.logo }
                    : undefinedCompany
                }
                item={item}
                resizeMode="contain"
                clickHandler={this.listItemClick}
              />
            )}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  token: state.token.token,
  companies: state.company.companies,
  companiesLoaded: state.company.companiesLoaded,
  allCompaniesLoaded: state.company.allCompaniesLoaded
});

function bindAction(dispatch) {
  return {
    addResourceToMessage: (item, type) =>
      dispatch(addResourceToMessage(item, type)),
    getCompanies: (token, text) => dispatch(getCompanies(token, text)),
    resetCompanySearchData: () => dispatch(resetCompanySearchData())
  };
}

export default connect(
  mapStateToProps,
  bindAction
)(AddCompany);
