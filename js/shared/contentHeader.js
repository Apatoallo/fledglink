import React, { Component } from "react";
import { ImageBackground } from "react-native";
import { Header, Title, Left, Body, Right, Icon, Button } from "native-base";
import { isIphoneX } from "react-native-iphone-x-helper";
import PropTypes from "prop-types";
import { getHeaderHeight } from "../App";
import { colors } from "../configs/config";

const headerImage = require("../../images/HeaderBackground.png");

class ContentHeader extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.props.navigation.state.params
    };
  }

  render() {
    const { navigation, title } = this.props;
    return (
      <ImageBackground
        source={headerImage}
        style={{
          height: getHeaderHeight(),
          width: null
        }}
      >
        <Header
          noShadow
          style={{
            backgroundColor: "transparent",
            height: getHeaderHeight(),
            borderBottomWidth: 0
          }}
        >
          <Left
            style={{
              marginRight: 15,
              flex: 1,
              marginTop: isIphoneX() ? 20 : 0
            }}
          >
            <Button
              transparent
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon
                name="ios-arrow-back"
                style={{
                  color: colors.white
                }}
              />
            </Button>
          </Left>
          <Body style={{ flex: 4, marginTop: isIphoneX() ? 20 : 0 }}>
            <Title
              style={{
                color: colors.white
              }}
            >
              {title}
            </Title>
          </Body>
          <Right style={{ flex: 1, marginTop: isIphoneX() ? 20 : 0 }} />
        </Header>
      </ImageBackground>
    );
  }
}

ContentHeader.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired
};

export default ContentHeader;
