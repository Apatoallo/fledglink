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
  getResources,
  resetResourceSearchData
} from "../../../actions/resources";
import PlaceholderComponent from "../../../shared/PlaceholderComponent";
import AddToPostListItem from "./AddToPostListItem";
import SearchBar from "./SearchBar";
import styles from "./styles";

const undefinedCompany = require("../../../../images/no-company-image.png");

class AddResource extends Component {
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
    const { getResources, token } = this.props;
    getResources(token);
  };

  onChangeHandler = text => {
    const { getResources, token } = this.props;
    this.text = text;
    getResources(token, text);
  };

  listItemClick = item => {
    const {
      navigation: { goBack },
      addResourceToMessage
    } = this.props;
    addResourceToMessage(item, "resources");
    goBack();
  };

  navigateBack = () => {
    const { navigation, resetResourceSearchData } = this.props;
    resetResourceSearchData();
    navigation.goBack();
  };

  render() {
    const {
      getResources,
      resources,
      token,
      resourcesLoaded,
      allResourcesLoaded
    } = this.props;
    return (
      <View style={styles.mainWrapper}>
        <KeyboardAvoidingView behavior="padding" style={styles.searchWrapper}>
          <SearchBar onChangeHandler={this.onChangeHandler} />
          <FlatList
            contentContainerStyle={{ paddingBottom: 40 }}
            data={resources}
            keyExtractor={item => item.id}
            scrollEventThrottle={300}
            onEndReached={() => {
              if (!resourcesLoaded || allResourcesLoaded) return;
              getResources(token, this.text);
            }}
            onEndReachedThreshold={0.3}
            ListEmptyComponent={
              <PlaceholderComponent
                lineNumber={1}
                count={10}
                onReady={resourcesLoaded}
                height={45}
              />
            }
            renderItem={({ item }) => (
              <AddToPostListItem
                content={item.title}
                image={item.image ? { uri: item.image } : undefinedCompany}
                item={item}
                resizeMode="cover"
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
  resources: state.resources.resources,
  resourcesLoaded: state.resources.resourcesLoaded,
  allResourcesLoaded: state.resources.allResourcesLoaded
});

function bindAction(dispatch) {
  return {
    addResourceToMessage: (item, type) =>
      dispatch(addResourceToMessage(item, type)),
    getResources: (token, text) => dispatch(getResources(token, text)),
    resetResourceSearchData: () => dispatch(resetResourceSearchData())
  };
}

export default connect(
  mapStateToProps,
  bindAction
)(AddResource);
