import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, View, Input } from "native-base";
import { FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { addResourceToMessage } from "../../../actions/newMessage";
import { fetchGetUserConnectionsList } from "../../../actions/connectionsList";
import { colors } from "../../../configs/config";
import PlaceholderComponent from "../../../shared/PlaceholderComponent";
import AddToPostListItem from "./AddToPostListItem";

const undefinedUser = require("../../../../images/no-profile-image.png");

const selectComponent = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: colors.white
  },
  searchWrapper: {
    flex: 1
  },
  searchFieldWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: colors.lightGrey,
    borderColor: colors.grey,
    borderWidth: 1,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5
  },
  searchField: {
    backgroundColor: "#fff",
    marginLeft: 10,
    height: 30,
    borderRadius: 5,
    borderWidth: 0,
    paddingHorizontal: 10,
    fontSize: 16,
    padding: 0,
    margin: 0
  },
  leftBlock: {
    flex: 0.9,
    flexDirection: "row",
    alignItems: "center"
  },
  searchIcon: {
    color: "#fff",
    fontSize: 30
  },
  closeButton: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    alignSelf: "center"
  },
  closeIcon: {
    color: "#fff",
    fontSize: 20
  }
});

class AddUserMention extends Component {
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

  componentDidMount = () => {
    const { getConnectionsByUserId, token, user } = this.props;
    getConnectionsByUserId(token, "");
  };

  listItemClick = item => {
    const {
      navigation: { goBack },
      addResourceToMessage
    } = this.props;
    addResourceToMessage(item.user, "users");
    goBack();
  };

  render() {
    const {
      getConnectionsByUserId,
      navigation,
      usersCount,
      connections,
      token,
      connectionsLoaded,
      allConnectionsLoaded
    } = this.props;
    return (
      <View style={selectComponent.mainWrapper}>
        <View style={selectComponent.searchWrapper}>
          <View style={selectComponent.searchFieldWrapper}>
            <View style={selectComponent.leftBlock}>
              <Icon style={selectComponent.searchIcon} name="ios-search" />
              <Input
                autoCorrect={false}
                onChangeText={text => getConnectionsByUserId(token, text)}
                style={selectComponent.searchField}
                placeholder="search"
              />
            </View>
            {/* <Button style={selectComponent.closeButton} transparent onPress={this.closeList}>
                            <Icon style={selectComponent.closeIcon} type="Feather" name="x" />
                        </Button> */}
          </View>
          <FlatList
            data={connections}
            keyExtractor={item => item.id}
            scrollEventThrottle={300}
            onEndReached={() => {
              if (!connectionsLoaded && connections.length < usersCount) {
                getConnectionsByUserId(token);
              }
            }}
            onEndReachedThreshold={0.3}
            ListEmptyComponent={
              <PlaceholderComponent
                count={connections.length}
                onReady={connectionsLoaded}
                height={45}
              />
            }
            renderItem={({ item }) => (
              <AddToPostListItem
                content={item.user.fullName}
                image={
                  item.user.userImage
                    ? { uri: item.user.userImage }
                    : undefinedUser
                }
                item={item}
                resizeMode="cover"
                clickHandler={this.listItemClick}
              />
            )}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  token: state.token.token,
  usersCount: state.connectionsList.usersCount,
  connections: state.connectionsList.connectionsList,
  connectionsLoaded: state.connectionsList.loading
});

function bindAction(dispatch) {
  return {
    addResourceToMessage: (item, type) =>
      dispatch(addResourceToMessage(item, type)),
    getConnectionsByUserId: (token, text) =>
      dispatch(fetchGetUserConnectionsList(token, text))
  };
}

export default connect(
  mapStateToProps,
  bindAction
)(AddUserMention);
