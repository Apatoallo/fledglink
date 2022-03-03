import React, { Component } from "react";
import { connect } from "react-redux";
import { ImageBackground } from "react-native";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { isIphoneX } from "react-native-iphone-x-helper";
import styles from "./styles";
import { colors } from "../../configs/config";
import { getHeaderHeight } from "../../App";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";

import Pdf from "react-native-pdf";

const headerImage = require("../../../images/HeaderBackground.png");

class ResultPDF extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: ""
    };
  }

  componentDidMount = () => {
    FirebaseAnalytics.setCurrentScreen("Personality", "Activity");
  };

  render() {
    const { user } = this.props;
    return (
      <Container style={styles.container}>
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
            <Left style={{ flex: 1, marginTop: isIphoneX() ? 20 : 0 }}>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon style={{ color: colors.white }} name="ios-arrow-back" />
              </Button>
            </Left>
            <Body style={{ flex: 4, marginTop: isIphoneX() ? 20 : 0 }}>
              <Title style={{ color: colors.white }}>
                Personality Activity
              </Title>
            </Body>
            <Right style={{ flex: 1, marginTop: isIphoneX() ? 20 : 0 }} />
          </Header>
        </ImageBackground>
        <Pdf
          source={{
            uri:
              "https://fledglink.ams3.digitaloceanspaces.com/assessment/FledglinkActivity.pdf"
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          style={styles.pdf}
        />
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    removeToken: () => dispatch(removeToken()),
    setEmptyError: error => dispatch(setEmptyError(error)),
    setIndex: index => dispatch(setIndex(index))
  };
}
const mapStateToProps = state => ({
  token: state.token.token,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  bindAction
)(ResultPDF);
