import React, { PureComponent, Fragment } from "react";
import { Text, Card, CardItem, Left, Thumbnail, Body } from "native-base";
import PropTypes from "prop-types";
import TimeAgo from "react-native-timeago";
import { colors, fonts } from "../../configs/config";
import ConnectionBody from "./connectionsBody";
import { pushTypes } from "../../push/emitter/PushEmitter";
import PostPreviewComponent from "./postPreviewComponent";
import ThumbnailFledglink from "../../shared/thumbnailFledglink";

const undefinedUser = require("../../../images/no-profile-image.png");

export default class NotificationComponent extends PureComponent {
  renderText = (title, text) => {
    if (title) {
      return (
        <Fragment>
          <Text
            style={{
              color: colors.black,
              fontFamily: fonts.bold
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: colors.black
            }}
          >
            {text}
          </Text>
        </Fragment>
      );
    }
    return (
      <Text
        style={{
          color: colors.black
        }}
      >
        {text}
      </Text>
    );
  };

  renderBodyNotification = () => {
    const { type, item } = this.props;
    const { resource } = item;
    switch (type) {
      case pushTypes.userConnectionRequest: {
        if (!resource || resource.status === "finished") return null;
        return (
          <ConnectionBody
            acceptConnection={this.acceptConnection}
            declineConnection={this.decliningConnection}
          />
        );
      }
      case "Post":
        return (
          <PostPreviewComponent data={resource} onPress={this.showTarget} />
        );
      default:
        return null;
    }
  };

  renderThumbnail = (userImage, type) => {
    if (type === pushTypes.flAnnounce) {
      return <ThumbnailFledglink />;
    }
    return (
      <Thumbnail source={userImage ? { uri: userImage } : undefinedUser} />
    );
  };

  showTarget = () => {
    const {
      navigateTo,
      item: { id, resource, isRead },
      readingNotificationAction
    } = this.props;
    navigateTo("DetailPostMotif", { idPost: resource.id });
    readingNotificationAction(id, isRead);
  };

  acceptConnection = () => {
    const {
      acceptPendingConnectionAction,
      readingNotificationAction,
      item: { target, id, isRead },
      navigation
    } = this.props;
    readingNotificationAction(id, isRead);
    acceptPendingConnectionAction(target.id);
  };

  decliningConnection = () => {
    const {
      declinePendingConnectionAction,
      readingNotificationAction,
      item: { id, isRead, target }
    } = this.props;
    readingNotificationAction(id, isRead);
    declinePendingConnectionAction(target.id);
  };

  render() {
    const { item, showTargetUser } = this.props;
    const { text, isRead, updatedAt, target, title, type } = item;
    let userImage;
    if (target && target.userImage) {
      userImage = target.userImage;
    }
    return (
      <Card
        transparent
        style={{
          flexWrap: "nowrap",
          marginLeft: 10,
          marginRight: 10,
          borderWidth: 0,
          borderRadius: 10,
          backgroundColor: isRead ? colors.white : colors.blackOpacity
        }}
      >
        <CardItem
          button
          onPress={showTargetUser}
          style={{
            flexWrap: "nowrap",
            borderRadius: 10,
            backgroundColor: isRead ? colors.white : colors.blackOpacity
          }}
        >
          <Left
            style={{
              alignItems: "flex-start"
            }}
          >
            {this.renderThumbnail(userImage, type)}
            <Body>
              {this.renderText(title, text)}
              {this.renderBodyNotification()}
              <TimeAgo time={updatedAt} />
            </Body>
          </Left>
        </CardItem>
      </Card>
    );
  }
}

NotificationComponent.propTypes = {
  type: PropTypes.string.isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
  renderBody: PropTypes.instanceOf(Object),
  acceptPendingConnectionAction: PropTypes.func.isRequired,
  declinePendingConnectionAction: PropTypes.func.isRequired
};

NotificationComponent.defaultProps = {
  renderBody: null
};
