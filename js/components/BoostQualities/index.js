import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, List, ListItem, Icon } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import {
  fetchGetUserMutualConnection,
  createPendingConnection
} from "../../actions/userActions";
import { trackQualityReferral } from "../../actions/analytics";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";
import MutualConnections from "../../shared/MutualConnections";
import { colors, fonts } from "../../configs/config";
import { shareContent } from "../../utils/shareResource";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15
  },
  optionIcon: {
    fontSize: 24,
    color: colors.violet,
    minWidth: 25
  },
  optionText: {
    color: colors.darkViolet,
    fontSize: 18,
    marginLeft: 10
  },
  titleText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.black
  },
  listWrapper: {
    width: "100%",
    height: 50,
    marginLeft: 0,
    paddingRight: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  listOptionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  actionIcon: {
    color: colors.violet,
    fontSize: 20
  },
  actionWrapper: {
    backgroundColor: colors.violet,
    justifyContent: "center",
    textAlign: "center",
    width: 83,
    height: 30,
    borderRadius: 20
  },
  actionText: {
    color: colors.white,
    fontSize: 14,
    textAlign: "center",
    fontFamily: fonts.bold
  }
});

class BoostQualities extends Component {
  componentDidMount = () => {
    FirebaseAnalytics.setCurrentScreen("BoostQualities", "Profile");
  };

  renderListItem = ({
    icon,
    iconType,
    text,
    action,
    actionText,
    navigation
  }) => (
    <ListItem style={styles.listWrapper}>
      <View style={styles.listOptionWrapper}>
        <Icon name={icon} type={iconType} style={styles.optionIcon} />
        <Text style={styles.optionText}>{text}</Text>
      </View>
      <TouchableOpacity style={styles.actionWrapper} onPress={action}>
        <Text uppercase style={styles.actionText}>
          {actionText}
        </Text>
      </TouchableOpacity>
    </ListItem>
  );

  trackQualityReferral = () => {
    const { trackQualityReferral } = this.props;

    trackQualityReferral();
  };

  share = () => {
    shareContent(
      "Hey! Could you help me out by rating my top qualities on Fledglink? We just need to connect via the app (it’s for building your career and finding work), you can download it here http://onelink.to/p5m3bm",
      this.trackQualityReferral
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Get feedback on what others think are your top qualities, by inviting
          friends, work-mates and family to connect with you. Use the invite
          options below to discover more about yourself, build your confidence
          and get matched to careers.
        </Text>
        <List style={{ marginVertical: 20 }}>
          {this.renderListItem({
            icon: "file-download",
            iconType: "MaterialIcons",
            text: "Send Invites to Join",
            action: this.share,
            actionText: "Invite",
            navigation
          })}
          {this.renderListItem({
            icon: "ios-search",
            iconType: "Ionicons",
            text: "Search in app",
            action: () => navigation.navigate("SearchInApp"),
            actionText: "Search",
            navigation
          })}
        </List>
        <MutualConnections navigation={navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token.token,
  userList: state.userStore.mutualConnectionsIds,
  loading: state.userStore.loading,
  userOptions: state.userOptions.userOptionsList,
  usersCount: state.userStore.mutualConnectionsIds.length,
  connectionRequestsCount: state.userStore.pendingConnectionsIds.length,
  pendingConnectionsLoaded: state.userStore.pendingConnectionsLoaded
});

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
    fetchGetUserMutualConnectionAction: token =>
      dispatch(fetchGetUserMutualConnection(token)),
    trackQualityReferral: () => dispatch(trackQualityReferral())
  };
}

BoostQualities.propTypes = {
  fetchGetUserMutualConnectionAction: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired
};

export default connect(
  mapStateToProps,
  bindAction
)(BoostQualities);
