import React, { Component } from "react";
import { connect } from "react-redux";
import { Toast, View } from "native-base";
import { fetchGetUsersList } from "../../actions/userSearch";
import { createPendingConnection } from "../../actions/userActions";
import UserListComponent from "../usersListComponent";

class UserSearch extends Component {
  componentDidMount = () => {
    const { fetchGetUsersList, token } = this.props;
    fetchGetUsersList(token);
  };

  componentWillReceiveProps = nextProps => {
    const { error } = this.props;
    if (nextProps.error && nextProps.error !== error) {
      Toast.show({
        text: nextProps.error,
        position: "absolute",//position: "top" Before
        type: "danger",
        duration: 5000
      });
    }
  };

  render() {
    const {
      fetchGetUsersList,
      navigation: { navigate },
      children
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {children}
        <UserListComponent
          acceptConnection={user =>
            navigate("ConnectionCreate", { userId: user.id })
          }
          fetchUsers={fetchGetUsersList}
          {...this.props}
        />
      </View>
    );
  }
}
function bindAction(dispatch) {
  return {
    fetchSendRequestAction: (
      token,
      id,
      acquaintance,
      qualities,
      notAcquaintance
    ) =>
      dispatch(
        createPendingConnection(
          token,
          id,
          acquaintance,
          qualities,
          notAcquaintance
        )
      ),
    fetchGetUsersList: (token, text) => dispatch(fetchGetUsersList(token, text))
  };
}
const mapStateToProps = state => ({
  token: state.token.token,
  error: state.searchConnections.error,
  user: state.user.user,
  name: "Connections Search",
  userOptions: state.userOptions.userOptionsList,
  userList: state.searchConnections.userList,
  usersCount: state.searchConnections.usersCount,
  loading: state.searchConnections.loading
});

export default connect(
  mapStateToProps,
  bindAction
)(UserSearch);
