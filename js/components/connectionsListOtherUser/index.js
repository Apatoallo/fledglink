import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGetOtherUserConnectionsList } from "../../actions/userActions";
import ConnectionsList from "../connectionsList";

class ConnectionsListOtherUser extends Component {
  getUserConnectionsList = (token, text) => {
    const {
      getUserConnectionsListAction,
      navigation: {
        state: { params: { userId } = {} }
      }
    } = this.props;
    getUserConnectionsListAction(token, text, userId);
  };

  render() {
    return (
      <ConnectionsList
        {...this.props}
        getUserConnectionsList={this.getUserConnectionsList}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    getUserConnectionsListAction: (token, text, userId) =>
      dispatch(fetchGetOtherUserConnectionsList(token, text, userId))
  };
}
const mapStateToProps = state => ({
  userList: state.userStore.connectionListOtherUser,
  token: state.token.token,
  error: state.connectionsListOtherUser.error,
  user: state.userConnections.user,
  name: "Connections List",
  loading: state.userStore.loading
});

export default connect(
  mapStateToProps,
  bindAction
)(ConnectionsListOtherUser);
