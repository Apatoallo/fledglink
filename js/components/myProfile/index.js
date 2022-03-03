import React, { Component } from "react";
import { connect } from "react-redux";
import { Toast } from "native-base";
import { getUserStore } from "../../actions/user";
import UserProfile from "../userProfile";
import ToastComponent from "../../shared/ToastComponent";

class MyProfile extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount = () => {
    const { token, getUserAction } = this.props;
    getUserAction(token);
  };

  componentWillReceiveProps = nextProps => {
    const { error } = this.props;
    if (nextProps.error && nextProps.error !== error) {
      ToastComponent(nextProps.error.message);
    }
  };

  goToConnectionsList = userId => {
    this.props.navigation.navigate("ConnectionsListSelf", { userId });
  };

  render() {
    return (
      <UserProfile
        {...this.props}
        navigateToConnectionsList={this.goToConnectionsList}
      />
    );
  }
}
function bindAction(dispatch) {
  return {
    getUserAction: token => dispatch(getUserStore(token))
  };
}
const mapStateToProps = state => ({
  token: state.token.token,
  error: state.user.error,
  user: state.user.user,
  name: "My CV",
  loading: state.user.loading,
  myProfile: true
});

export default connect(
  mapStateToProps,
  bindAction
)(MyProfile);
