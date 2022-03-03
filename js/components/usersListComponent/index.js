import React, { PureComponent } from "react";
import { View } from "native-base";
import PropTypes from "prop-types";
import UserList from "../../shared/userList";
import ConnectionsSearchComponent from "../../shared/ConnectionsSearchComponent";

export default class UserListComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }

  connectionsSearch = text => {
    this.setState({ searchText: text });
    this.props.fetchUsers(this.props.token, text);
  };

  goToUserProfile = id => {
    const { user, navigation } = this.props;
    if (user.id !== id) {
      navigation.navigate("UserDetails", { userId: id });
    } else {
      navigation.navigate("UserProfile");
    }
  };

  render() {
    const {
      name,
      userList,
      loading,
      usersCount,
      acceptConnection,
      declinePendingConnection,
      deletePendingConnection,
      fetchUsers
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff"
        }}
      >
        <View style={{ height: "100%" }}>
          <ConnectionsSearchComponent
            placeHolder={
              name === "My Connections List"
                ? "Search connections"
                : "Search for new connections"
            }
            onChangeHandler={this.connectionsSearch}
          />
          {userList.length ? (
            <UserList
              acceptConnection={id => acceptConnection(id)}
              deletePendingConnection={id => deletePendingConnection(id)}
              declinePendingConnection={id => declinePendingConnection(id)}
              onPress={this.goToUserProfile}
              screenName={name}
              usersCount={usersCount}
              loading={loading}
              getNewUsers={() => this.props.getNewUsers(this.props.token)}
              loadMore={() =>
                fetchUsers(this.props.token, this.state.searchText)
              }
              userList={userList}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

UserListComponent.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  name: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  userList: PropTypes.instanceOf(Array).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  usersCount: PropTypes.number.isRequired,
  getNewUsers: PropTypes.func,
  user: PropTypes.instanceOf(Object).isRequired
};

UserListComponent.defaultProps = {
  getNewUsers: () => {}
};
