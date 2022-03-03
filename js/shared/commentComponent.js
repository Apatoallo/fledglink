import React, { PureComponent } from "react";
import { Text, Icon, View, CardItem, Thumbnail } from "native-base";
import TimeAgo from "react-native-timeago";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import UserContent from "./userContent";
import UserContentLinkPreview from "./userContentLinkPreview";
import { colors } from "../configs/config";

const undefinedUser = require("../../images/no-profile-image.png");

class CommentsComponent extends PureComponent {
  liking = () => {
    const {
      comment: { id, isLiked, resourceId },
      likingComment
    } = this.props;
    likingComment(isLiked, id, resourceId);
  };

  render() {
    const {
      comment,
      disabledLikeComment,
      user,
      navigation,
      goToCommentUserProfile
    } = this.props;
    return (
      <CardItem>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start"
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={{ flexDirection: "row" }}
              onPress={goToCommentUserProfile(comment.createdBy.id)}
            >
              <View style={{ width: 80 }}>
                <Thumbnail
                  source={
                    comment.createdBy.userImage
                      ? { uri: comment.createdBy.userImage }
                      : undefinedUser
                  }
                />
              </View>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                activeOpacity={1}
                style={{ flexDirection: "row" }}
                onPress={goToCommentUserProfile(comment.createdBy.id)}
              >
                <Text>{comment.createdBy.fullName}</Text>
              </TouchableOpacity>
              <UserContent {...comment} user={user} navigation={navigation} />
              <UserContentLinkPreview
                message={comment}
                navigation={navigation}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10
                }}
              >
                <TouchableOpacity onPress={() => this.liking()}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start"
                    }}
                  >
                    <View>
                      <Text note>{comment.likesCount || 0}</Text>
                    </View>
                    <Icon
                      name="heart"
                      type="Feather"
                      style={{
                        color: comment.isLiked ? colors.red : colors.black,
                        fontSize: 16,
                        marginLeft: 5,
                        fontWeight: "200"
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <View>
                  <TimeAgo
                    time={comment.createdAt}
                    style={{ fontSize: 10, color: colors.grey }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </CardItem>
    );
  }
}

CommentsComponent.propTypes = {
  comment: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  likingComment: PropTypes.func.isRequired,
  disabledLikeComment: PropTypes.bool.isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
  goToCommentUserProfile: PropTypes.func.isRequired
};

export default CommentsComponent;
