import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TouchableWithoutFeedback,
  Image,
  WebView,
  ScrollView,
  Dimensions,
  ImageBackground,
  StatusBar
} from "react-native";
import { Container, Spinner, View, Text, Icon } from "native-base";
import { serverUrl, colors } from "../../configs/config";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";
import { setUserToStore } from "../../actions/user";
import LinearGradient from "react-native-linear-gradient";
import { isIphoneX } from "react-native-iphone-x-helper";

const background = require("../../../images/loadingBG.png");
const logo = require("../../../images/Bird.png");
const textlogo = require("../../../images/textlogo-color.png");
const colorLogo = require("../../../images/color-bird.png");

const { width, height } = Dimensions.get("window");

class PersonalityTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      testing: true,
      postResult: false
    };
  }

  componentDidMount = () => {
    StatusBar.setBarStyle("dark-content", true);
    FirebaseAnalytics.setCurrentScreen("Personality Test", "Personality Test");
  };

  componentWillUnmount() {
    StatusBar.setBarStyle("light-content", true);
  }

  getResultTest = () => {
    fetch(`${serverUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`
      }
    })
      .then(result => result.json())
      .then(result => {
        if (result.sova.testResultUrl) {
          this.props.setUserToStore(result);
          this.setState({
            postResult: false
          });
        } else {
          this.getResultTest();
        }
      });
  };

  render() {
    const { user } = this.props;
    const { loading, testing, postResult } = this.state;
    return (
      <Container
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}
      >
        {loading ? (
          <View
            style={{
              position: "absolute",
              zIndex: 2,
              backgroundColor: colors.white,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "space-around"
              }}
            >
              <View style={{ flex: 0.1 }} />
              <View
                style={{
                  flex: 0.4,
                  alignSelf: "center",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "60%"
                }}
              >
                <Text
                  style={{
                    color: colors.darkestViolet,
                    fontSize: 24,
                    textAlign: "center",
                    fontWeight: "900"
                  }}
                >
                  Loading Your Questionnaire
                </Text>
                <Text style={{ textAlign: "center", color: colors.black }}>
                  Hold on! We need to go and fetch your questions, please be
                  patient while our little birdies work their magic. They'll
                  only take a moment
                </Text>
                <Spinner color={colors.grey} />
              </View>
              <View
                style={{
                  flex: 0.4,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image style={{ marginBottom: 20 }} source={colorLogo} />
                <Image source={textlogo} />
              </View>
            </View>
          </View>
        ) : null}

        {testing ? (
          <WebView
            style={{ marginVertical: isIphoneX() ? 35 : 0 }}
            onLoadEnd={() => this.setState({ loading: false })}
            onNavigationStateChange={e => {
              if (e.url == "https://www.sovaonline.com/sova/test/finished") {
                this.setState(
                  {
                    postResult: true,
                    testing: false
                  },
                  () => this.getResultTest()
                );
              }
            }}
            source={{ uri: user.sova.testUrl }}
          />
        ) : (
          <ImageBackground
            source={background}
            style={{ width: width, height: height }}
          >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  if (!postResult) {
                    this.props.navigation.navigate("Grow");
                  }
                }}
                style={{ height: height, width: width }}
              >
                <LinearGradient
                  colors={[colors.violet, colors.violetOpacity]}
                  style={{
                    flex: 1,
                    paddingLeft: 15,
                    paddingRight: 15
                  }}
                >
                  <View>
                    <Image
                      source={logo}
                      style={{
                        marginTop: height / 7,
                        width: 80,
                        height: 80,
                        alignSelf: "center"
                      }}
                    />
                    <View
                      style={{
                        alignSelf: "center"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 28,
                          color: colors.white
                        }}
                      >
                        Personality Test
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        flexDirection: "row",
                        alignSelf: "center"
                      }}
                    >
                      <Icon
                        name="check-circle"
                        type="Feather"
                        style={{
                          color: colors.white
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 28,
                          color: colors.white
                        }}
                      >
                        Complete
                      </Text>
                    </View>
                    <View
                      style={{
                        marginHorizontal: 25
                      }}
                    >
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 16,
                          marginTop: 20,
                          textAlign: "center"
                        }}
                      >
                        Well done!
                      </Text>
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: 16,
                          marginTop: 20,
                          textAlign: "center"
                        }}
                      >
                        You have completed the personality questionnaire -
                        boosting your C.V. score and helping us to better match
                        you to careers and employers. Your results might take a
                        minute or so to come back in, so sit tight and they will
                        be with you shortly!
                      </Text>
                      <View
                        style={{
                          marginVertical: 25
                        }}
                      >
                        {postResult ? (
                          <View>
                            <Spinner color={colors.white} />
                            <Text
                              style={{
                                color: colors.white,
                                textAlign: "center"
                              }}
                            >
                              Please wait...
                            </Text>
                          </View>
                        ) : (
                          <Text
                            style={{
                              color: colors.white,
                              fontSize: 20,
                              marginTop: 10,
                              textAlign: "center"
                            }}
                          >
                            TAP ANYWHERE TO FINISH
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </ScrollView>
          </ImageBackground>
        )}
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setUserToStore: user => dispatch(setUserToStore(user)),
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
)(PersonalityTest);
