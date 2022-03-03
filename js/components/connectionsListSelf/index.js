import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGetUserConnectionsList } from "../../actions/userActions";
import ConnectionsList from "../connectionsList";

class ConnectionsListSelf extends Component {
  render() {
    return <ConnectionsList {...this.props} />;
  }
}

function bindAction(dispatch) {
  return {
    getUserConnectionsList: (token, text) =>
      dispatch(fetchGetUserConnectionsList(token, text))
  };
}
const mapStateToProps = state => ({
  userList: state.userStore.userConnectionsIds,
  token: state.token.token,
  error: state.connectionsList.error,
  user: state.user.user,
  name: "My Connections List",
  loading: state.userStore.loading
});

export default connect(
  mapStateToProps,
  bindAction
)(ConnectionsListSelf);
