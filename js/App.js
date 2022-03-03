import React, { Component } from "react";
import { Text, Platform, AppState, StatusBar } from "react-native";
import NetInfo from '@react-native-community/netinfo'

import 'react-native-gesture-handler';
// import SplashScreen from "react-native-smart-splash-screen";
import { connect } from "react-redux";
import { isIphoneX } from "react-native-iphone-x-helper";
import { setPushNotification } from "./actions/notifications";
import { authTypes, buildConfiguration } from "./configs/config";
import { getTokenStore } from "./actions/token";
import { setUserOptions } from "./actions/userOptions";
import { fetchNotificationsCounts } from "./actions/notifications";
// import MainStackRouter from "./Routers/MainStackRouter";
import MainStack from "./Routers/MainStack";

import AuthNav from "./Routers/MainStackRouter";
import Environment from "./components/Utilities/Environment";
import MixpanelManager from "./Services/Mixpanel";
import Login from "./components/login"
console.disableYellowBox = true;
export const getHeaderHeight = () => {
  if (Platform.OS === "ios") {
    if (isIphoneX()) {
      return 88;
    }
    return 64;
  }
  return 56;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalInternetConnectionShowing: false,
      initialRoute: "Home"
    };
  }

  handleConnectionNetwork = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        this.setState({ modalInternetConnectionShowing: true });
      } else {
        this.setState({ modalInternetConnectionShowing: false });
      }
    });
  };

  checkAuthorized = () => {
    const { getTokenStore } = this.props;
    getTokenStore();
  };

  handleStateChange = state => {
    if (state === "active") {
      const { token, getNotificationsCount } = this.props;
      getNotificationsCount(token);
    }
  };
 
  componentWillUnmount = () => {
    // NetInfo.removeEventListener(
    //   "connectionChange",
    //   this.handleConnectionNetwork
    // );
    NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    })
    AppState.addEventListener("change", this.handleStateChange);
  };

  componentWillReceiveProps = nextProps => {
    const { authType } = this.props;
    if (authType !== nextProps.authType && nextProps !== authTypes.RECOVERY) {
      
      // SplashScreen.hide({
      //   animationType: SplashScreen.animationType.scale,
      //   duration: 850,
      //   delay: 500
      // });
      console.log('splashscreen closed')
    }
  };

  componentDidMount = async () => {
    MixpanelManager.track("App Launch");
    NetInfo.addEventListener("connectionChange", this.handleConnectionNetwork);

    this.checkAuthorized();

    AppState.addEventListener("change", this.handleStateChange);
  };

  render() {

    console.log('it is authtype', this.props.authType)
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
          <MainStack
            authType={this.props.authType}
            initialRoute={this.state.initialRoute}
            networkModal={this.state.modalInternetConnectionShowing}
            profileSetUp={this.props.profileSetUp}
          />
        <Environment env={'production'} />
      </React.Fragment>
    );
  }
}

function bindAction(dispatch) {
  return {
    setUserOptions: token => dispatch(setUserOptions(token)),
    getTokenStore: () => dispatch(getTokenStore()),
    setPushNotificationAction: data => dispatch(setPushNotification(data)),
    getNotificationsCount: token => dispatch(fetchNotificationsCounts(token))
  };
}
const mapStateToProps = state => ({
  token: state.token.token,
  authType: state.auth.auth,
  initialRoute: state.drawer.initialRoute,
  profileSetUp: state.register.profileSetUp
});

export default connect(mapStateToProps,bindAction) (App);
