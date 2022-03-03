import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, View } from "native-base";
import {
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";
import { addResourceToMessage } from "../../../actions/newMessage";
import {
  getOpportunities,
  resetOpportunitySearchData
} from "../../../actions/companyOpportunities";
import PlaceholderComponent from "../../../shared/PlaceholderComponent";
import AddToPostListItem from "./AddToPostListItem";
import SearchBar from "./SearchBar";
import styles from "./styles";

const undefinedCompany = require("../../../../images/no-company-image.png");

class AddOpportunity extends Component {
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
    const { getOpportunities, token } = this.props;
    getOpportunities(token);
  };

  onChangeHandler = text => {
    const { getOpportunities, token } = this.props;
    this.text = text;
    getOpportunities(token, text);
  };

  listItemClick = item => {
    const {
      navigation: { goBack },
      addResourceToMessage
    } = this.props;
    addResourceToMessage(item, "opportunities");
    goBack();
  };

  navigateBack = () => {
    const { navigation, resetOpportunitySearchData } = this.props;
    resetOpportunitySearchData();
    navigation.goBack();
  };

  render() {
    const {
      getOpportunities,
      opportunities,
      token,
      opportunitiesLoaded,
      allOpportunitiesLoaded
    } = this.props;
    return (
      <View style={styles.mainWrapper}>
        <KeyboardAvoidingView behavior="padding" style={styles.searchWrapper}>
          <SearchBar onChangeHandler={this.onChangeHandler} />
          <FlatList
            contentContainerStyle={{ paddingBottom: 40 }}
            data={opportunities}
            keyExtractor={item => item.id}
            scrollEventThrottle={300}
            onEndReached={() => {
              if (!opportunitiesLoaded || allOpportunitiesLoaded) return;
              getOpportunities(token, this.text);
            }}
            onEndReachedThreshold={0.3}
            ListEmptyComponent={
              <PlaceholderComponent
                lineNumber={1}
                count={10}
                onReady={opportunitiesLoaded}
                height={45}
              />
            }
            renderItem={({ item }) => (
              <AddToPostListItem
                content={item.jobTitle}
                image={
                  item.corporation.baseInfo.logo
                    ? { uri: item.corporation.baseInfo.logo }
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
  opportunities: state.companyOpportunities.allOpportunities,
  opportunitiesLoaded: state.companyOpportunities.opportunitiesLoaded,
  allOpportunitiesLoaded: state.companyOpportunities.allOpportunitiesLoaded
});

function bindAction(dispatch) {
  return {
    addResourceToMessage: (item, type) =>
      dispatch(addResourceToMessage(item, type)),
    getOpportunities: (token, text) => dispatch(getOpportunities(token, text)),
    resetOpportunitySearchData: () => dispatch(resetOpportunitySearchData())
  };
}

export default connect(
  mapStateToProps,
  bindAction
)(AddOpportunity);
