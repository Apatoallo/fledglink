import React, { PureComponent } from "react";
import { View } from "native-base";
import { StyleSheet, ImageBackground } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import AvatarComponent from "./AvatarComponent";
import EditButton from "../EditButton";
import { colors } from "../../../configs/config";

const backgroundProfile = require("../../../../images/headerImage.png");

const avatarComponentStyles = {
  avatarContainer: {
    alignSelf: "center",
    position: "absolute",
    zIndex: 2,
    overflow: "visible",
    top: isIphoneX() ? 50 : 30,
    height: 126,
    width: 126,
    borderRadius: 75
  },
  avatar: {
    height: 126,
    width: 126,
    borderRadius: 63
  }
};

const profileHeader = StyleSheet.create({
  componentContainer: {
    height: 180,
    position: "relative"
  },
  innerContainer: {
    width: null,
    height: 130,
    overflow: "visible"
  },
  buttonsWrapper: {
    marginTop: 100,
    height: 30,
    backgroundColor: colors.gallery,
    zIndex: 0,
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center"
  }
});

export default class ProfileHeader extends PureComponent {
  render() {
    const { showEdit, user, editButtonClickHandler } = this.props;
    return (
      <View style={profileHeader.componentContainer}>
        <ImageBackground
          source={backgroundProfile}
          style={profileHeader.innerContainer}
        >
          <AvatarComponent
            showEdit={showEdit}
            userImage={user.userImage}
            profileStatus={user.profileStatus}
            styles={avatarComponentStyles}
          />
          <View style={profileHeader.buttonsWrapper}>
            {showEdit && (
              <EditButton
                onClickHandler={() =>
                  editButtonClickHandler("EditIntro", "main")
                }
              />
            )}
          </View>
        </ImageBackground>
      </View>
    );
  }
}
