import { Toast } from "native-base";
import { ScrollView } from "react-native";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";
import { trackQualityReferral } from "../../actions/analytics";
import ConnectIntro from "./ConnectIntro";
import ListInfo from "./ListInfo";
import MutualConnections from "../../shared/MutualConnections";

const network = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20
  }
});

class MyNetwork extends Component {
  componentDidMount = () => {
    FirebaseAnalytics.setCurrentScreen("Network", "Network");
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

  onBoostPress = () => {
    const {
      navigation: { navigate },
      user,
      trackQualityReferral
    } = this.props;

    trackQualityReferral();
    navigate("BoostQualities", { userId: user.id });
  };

  render() {
    const {
      user,
      navigation,
      connectionRequestsCount,
      pendingConnectionsLoaded,
      children
    } = this.props;
    const {
      id,
      connectionsCount,
      connectionRequestsCount: userConnectionRequestsCount
    } = user;
    const pendingConnectionsCount = pendingConnectionsLoaded
      ? connectionRequestsCount
      : userConnectionRequestsCount;
    return (
      <ScrollView style={network.container}>
        <ConnectIntro onBoostPress={this.onBoostPress} />
        <ListInfo
          connectionsCount={connectionsCount}
          searchConnection={this.redirectToSearch}
          connectionRequestsCount={pendingConnectionsCount}
          onPress={name => navigation.navigate(name)}
        />
        <MutualConnections navigation={navigation} />
        {children}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  userList: state.userStore.mutualConnectionsIds,
  loading: state.userStore.loading,
  userOptions: state.userOptions.userOptionsList,
  usersCount: state.userStore.mutualConnectionsIds.length,
  connectionRequestsCount: state.userStore.pendingConnectionsIds.length,
  pendingConnectionsLoaded: state.userStore.pendingConnectionsLoaded
});

function bindAction(dispatch) {
  return {
    trackQualityReferral: () => dispatch(trackQualityReferral())
  };
}

MyNetwork.propTypes = {
  navigation: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  connectionRequestsCount: PropTypes.number.isRequired,
  pendingConnectionsLoaded: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  bindAction
)(MyNetwork);
