import React, { Component } from "react";
import { connect } from "react-redux";
import { Toast, View } from "native-base";
import {
  acceptPendingConnection,
  deletePendingConnection,
  fetchGetUserPendingConnection,
  declinePendingConnection
} from "../../actions/userActions";
import UserListComponent from "../usersListComponent";

class PendingConnectionList extends Component {
  componentDidMount = () => {
    const { fetchGetUserPendingConnectionAction, token } = this.props;
    fetchGetUserPendingConnectionAction(token);
  };

  componentWillReceiveProps = nextProps => {
    const { error } = this.props;
    if (nextProps.error && nextProps.error !== error) {
      Toast.show({
        text: nextProps.error,
        position: "absolute", //position: "top" Before
        type: "danger",
        duration: 5000
      });
    }
  };

  render() {
    const {
      fetchGetUserPendingConnectionAction,
      token,
      loading,
      declinePendingConnectionAction,
      deletePendingConnectionAction,
      children,
      navigation
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <UserListComponent
          acceptConnection={user =>
            navigation.navigate("ConnectionCreate", { userId: user.id })
          }
          loading={loading}
          getNewUsers={fetchGetUserPendingConnectionAction}
          declinePendingConnection={id => declinePendingConnectionAction(id)}
          fetchUsers={fetchGetUserPendingConnectionAction}
          deletePendingConnection={id =>
            deletePendingConnectionAction(token, id)
          }
          {...this.props}
        />
        {children}
      </View>
    );
  }
}
function bindAction(dispatch) {
  return {
    deletePendingConnectionAction: (token, id) =>
      dispatch(deletePendingConnection(token, id)),
    fetchGetUserPendingConnectionAction: (token, text) =>
      dispatch(fetchGetUserPendingConnection(token, text)),
    fetchSendRequestAction: (
      token,
      id,
      acquaintance,
      qualities,
      notAcquaintance
    ) =>
      dispatch(
        acceptPendingConnection(
          token,
          id,
          acquaintance,
          qualities,
          notAcquaintance
        )
      ),
    declinePendingConnectionAction: id => dispatch(declinePendingConnection(id))
  };
}
const mapStateToProps = state => ({
  token: state.token.token,
  // error: state.pendingConnections.error,
  user: state.user.user,
  name: "Pending Invitations",
  userList: state.userStore.pendingConnectionsIds,
  usersCount: state.userStore.pendingConnectionsIds.length,
  userOptions: state.userOptions.userOptionsList,
  loading: state.userStore.loading
});

export default connect(
  mapStateToProps,
  bindAction
)(PendingConnectionList);
