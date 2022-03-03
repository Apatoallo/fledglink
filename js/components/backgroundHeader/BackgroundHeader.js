import React, { Component } from "react";
import { Text, ImageBackground, StyleSheet, Platform } from "react-native";
import { Body, Header, Title, Left, Right, Icon, Button } from "native-base";
import { isIphoneX } from "react-native-iphone-x-helper";
import PropTypes from "prop-types";
import { colors } from "../../configs/config";
import { getHeaderHeight } from "../../App";

const headerImage = require("../../../images/HeaderBackground.png");

const backgroundHeader = StyleSheet.create({
  left: {
    flex: Platform.OS === "ios" ? 2 : 1,
    marginTop: isIphoneX() ? 20 : 0
  },
  body: {
    flex: 4,
    marginTop: isIphoneX() ? 20 : 0
  },
  right: {
    flex: 2,
    marginTop: isIphoneX() ? 20 : 0
  },
  bodyTitle: {
    color: colors.white,
    textAlign: "left"
  },
  rightButtonText: {
    color: colors.white,
    fontSize: 15
  },
  leftButtonIcon: {
    color: colors.white
  }
});

export default class BackgroundHeader extends Component {
  backButtonClick = () => {
    const { backButtonClickHandler } = this.props;
    backButtonClickHandler();
  };

  cancelButtonClick = () => {
    const { cancelButtonClickHandler, backButtonClickHandler } = this.props;
    if (cancelButtonClickHandler) {
      cancelButtonClickHandler();
    } else {
      backButtonClickHandler();
    }
  };

  render() {
    const { title } = this.props;
    return (
      <ImageBackground
        source={headerImage}
        style={{ height: getHeaderHeight(), width: null }}
      >
        <Header
          noShadow
          style={{
            backgroundColor: "transparent",
            height: getHeaderHeight(),
            borderBottomWidth: 0
          }}
        >
          <Left style={backgroundHeader.left}>
            <Button transparent onPress={this.backButtonClick}>
              <Icon
                style={backgroundHeader.leftButtonIcon}
                name="ios-arrow-back"
              />
            </Button>
          </Left>
          <Body style={backgroundHeader.body}>
            <Title style={backgroundHeader.bodyTitle}>{title}</Title>
          </Body>
          <Right style={backgroundHeader.right}>
            <Button transparent onPress={this.backButtonClick}>
              <Text style={backgroundHeader.rightButtonText}>CANCEL</Text>
            </Button>
          </Right>
        </Header>
      </ImageBackground>
    );
  }
}

BackgroundHeader.defaultProps = {
  cancelButtonClickHandler: null
};

BackgroundHeader.propTypes = {
  backButtonClickHandler: PropTypes.func.isRequired,
  cancelButtonClickHandler: PropTypes.func,
  title: PropTypes.string.isRequired
};
