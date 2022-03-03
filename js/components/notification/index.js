import { View } from "native-base";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { FlatList, RefreshControl } from "react-native";
import { connect } from "react-redux";
import { HeaderBackButton } from "react-navigation";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";
import { colors } from "../../configs/config";
import {
  fetchNotificationsList,
  fetchMarkedNotificationRead
} from "../../actions/notifications";
import NotificationComponent from "./notificationComponent";
import { pushTypes } from "../../push/emitter/PushEmitter";
import {
  acceptPendingConnection,
  declinePendingConnection
} from "../../actions/userActions";

class NotificationsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <HeaderBackButton
        tintColor="#ffffff"
        onPress={() => navigation.navigate("Home")}
      />
    )
  });

  componentDidMount = () => {
    const { token, fetchNotificationsListAction, navigation } = this.props;
    this.didFocusSubscription = navigation.addListener("didFocus", () => {});
    FirebaseAnalytics.setCurrentScreen("Notifications", "Notifications");
    fetchNotificationsListAction(token, true);
  };

  componentWillUnmount = () => {
    this.didFocusSubscription.remove();
  };

  readingNotification = (id, isRead) => {
    const { token, fetchMarkedNotificationReadAction } = this.props;
    if (!isRead) {
      fetchMarkedNotificationReadAction(token, id);
    }
  };

  onRefresh = () => {
    const { token, fetchNotificationsListAction } = this.props;
    fetchNotificationsListAction(token, true);
  };

  getTypeNotification = type => {
    if (
      type === pushTypes.userNewComment ||
      type === pushTypes.userNewPostAuthorComment ||
      type === pushTypes.userNewPostLike ||
      type === pushTypes.userMention ||
      type === pushTypes.userMentionInComment
    ) {
      return "Post";
    }
    return type;
  };

  goToTarget = item => {
    const { target, id, isRead, type } = item;
    const {
      navigation: { navigate }
    } = this.props;
    if (target || type === pushTypes.userConnectionRequestAccepted) {
      let targetId = target;
      if (typeof target === "object" && target.id) {
        targetId = target.id;
      }
      navigate("UserProfileMotif", { userId: targetId });
      this.readingNotification(id, isRead);
    }
    if (type === pushTypes.flAnnounce) {
      navigate("FlAnnounceNotif", { id });
      this.readingNotification(id, isRead);
    }
  };

  render() {
    const {
      navigation: { navigate, goBack },
      notificationList,
      loading,
      children,
      fetchNotificationsListAction,
      declinePendingConnection,
      acceptPendingConnection,
      token,
      canRequest
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.galleryOpacity
        }}
      >
        {children}
        <FlatList
          data={notificationList}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
          }
          onEndReachedThreshold={0.4}
          onEndReached={() => {
            if (loading || !canRequest) return;
            fetchNotificationsListAction(token);
          }}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <NotificationComponent
              item={item}
              showTargetUser={() => this.goToTarget(item)}
              navigateTo={navigate}
              declinePendingConnectionAction={declinePendingConnection}
              acceptPendingConnectionAction={id =>
                navigate("ConnectionCreate", { userId: id })
              }
              type={this.getTypeNotification(item.type)}
              readingNotificationAction={(id, isRead) =>
                this.readingNotification(id, isRead)
              }
            />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  notificationList: state.notifications.notificationList,
  loading: state.notifications.loading,
  token: state.token.token,
  canRequest: state.notifications.canRequest,
  userOptions: state.userOptions.userOptionsList
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
        acceptPendingConnection(
          token,
          id,
          acquaintance,
          qualities,
          notAcquaintance
        )
      ),
    fetchMarkedNotificationReadAction: (token, id) =>
      dispatch(fetchMarkedNotificationRead(token, id)),
    fetchNotificationsListAction: (token, newNotification) =>
      dispatch(fetchNotificationsList(token, newNotification)),
    declinePendingConnection: id => dispatch(declinePendingConnection(id))
  };
}

NotificationsScreen.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  token: PropTypes.string.isRequired,
  toggleModal: PropTypes.func,
  fetchMarkedNotificationReadAction: PropTypes.func.isRequired,
  declinePendingConnection: PropTypes.func,
  acceptPendingConnection: PropTypes.func,
  fetchNotificationsListAction: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  notificationList: PropTypes.instanceOf(Object).isRequired
};

NotificationsScreen.defaultProps = {
  toggleModal: () => {},
  declinePendingConnection: () => {},
  acceptPendingConnection: () => {}
};

export default connect(
  mapStateToProps,
  bindAction
)(NotificationsScreen);
