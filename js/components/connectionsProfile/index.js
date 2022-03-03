import React, { Component } from "react";
import { connect } from "react-redux";
import { Toast, View } from "native-base";
import {
  fetchUserById,
  fetchSendRequest,
  fetchCancelRequest,
  fetchDeleteConnection,
  fetchAcceptRequest
} from "../../actions/userConnections";
import UserProfile from "../userProfile";
import ToastComponent from "../../shared/ToastComponent";

class BaseUserProfile extends Component {
  componentDidMount = () => {
    const { fetchUserByIdAction, token, id } = this.props;
    fetchUserByIdAction(token, id);
  };

  componentWillReceiveProps = nextProps => {
    const { fetchUserByIdAction, token, id } = this.props;
    if (nextProps.id !== id) {
      fetchUserByIdAction(token, nextProps.id);
    }
  };

  buttonAction = () => {
    const {
      connectionStatus,
      fetchCancelRequestAction,
      fetchDeleteConnectionAction,
      user,
      token,
      navigation: { navigate }
    } = this.props;
    switch (connectionStatus) {
      case "sender":
        return fetchCancelRequestAction(token, user.id);
      case "finished":
        return fetchDeleteConnectionAction(token, user.id);
      case "receiver":
        return navigate("ConnectionCreate", { userId: user.id });
      default:
        return navigate("ConnectionCreate", { userId: user.id });
    }
  };

  goToConnectionsList = userId => {
    this.props.navigation.navigate("ConnectionsListOtherUser", { userId });
  };

  render() {
    const { children } = this.props;
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <UserProfile
          fetchSendRequest={this.buttonAction}
          navigateToConnectionsList={this.goToConnectionsList}
          {...this.props}
        />
        {children}
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
        fetchSendRequest(token, id, acquaintance, qualities, notAcquaintance)
      ),
    fetchAcceptRequestAction: (
      token,
      id,
      acquaintance,
      qualities,
      notAcquaintance
    ) =>
      dispatch(
        fetchAcceptRequest(token, id, acquaintance, qualities, notAcquaintance)
      ),
    fetchUserByIdAction: (token, id) => dispatch(fetchUserById(token, id)),
    fetchCancelRequestAction: (token, id) =>
      dispatch(fetchCancelRequest(token, id)),
    fetchDeleteConnectionAction: (token, id) =>
      dispatch(fetchDeleteConnection(token, id))
  };
}
const mapStateToProps = (state, props) => ({
  id: props.navigation.state.params.userId,
  token: state.token.token,
  error: state.userConnections.error,
  user: state.userConnections.user,
  tempUser: state.userConnections.user,
  loadOptions: state.user.loadOptions,
  userOptions: state.userOptions.userOptionsList,
  loading: state.userConnections.loading,
  myProfile: false,
  name: "User Profile",
  connectionStatus: state.userConnections.connectionStatus
});

export default connect(
  mapStateToProps,
  bindAction
)(BaseUserProfile);
