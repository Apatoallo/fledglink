import React, { Component } from "react";
import { connect } from "react-redux";
import { change } from "redux-form";
import { Container, Content, Text, Button, Icon, View } from "native-base";
import {
  ImageBackground,
  WebView,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { setUserOptions, setUserStore } from "../../actions/user";
import { trackQuestionnaireCommence } from "../../actions/analytics";
import styles from "./styles";
import PageOne from "./pageOne";
import PageTwo from "./pageTwo";
import PageFour from "./pageFour";
import PageThree from "./pageThree";
import { colors } from "../../configs/config";
import PropTypes from "prop-types";

const background = require("../../../images/loadingBG.png");

const { width, height } = Dimensions.get("window");

class DescriptionTest extends Component {
  static propTypes = {
    userOptions: PropTypes.object,
    token: PropTypes.string
  };

  static navigationOptions = ({ navigation }) => {
    const page = navigation.getParam("page");
    const skip = navigation.getParam("skip");
    const pages = [1, 2, 3, 4];

    return {
      headerTitleStyle: {
        color: "#fff"
      },
      headerStyle: {
        backgroundColor: colors.violet
      },
      headerTitle: (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {pages.map(item => (
            <View
              style={{
                width: item === page ? 14 : 10,
                height: item === page ? 14 : 10,
                borderRadius: item === page ? 7 : 5,
                backgroundColor: item === page ? "#f6a434" : "#fff",
                opacity: item < page ? 0.25 : 1,
                marginHorizontal: 3
              }}
            />
          ))}
        </View>
      ),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 12
            }}
          >
            <Icon
              style={{ color: "#fff", fontSize: 24 }}
              name="x"
              type="Feather"
            />
          </View>
        </TouchableOpacity>
      ),
      headerRight:
        page !== 4 ? (
          <TouchableOpacity onPress={skip}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 12
              }}
            >
              <Text style={{ color: "#fff" }}>Skip</Text>
            </View>
          </TouchableOpacity>
        ) : null
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { page } = this.state;
    navigation.setParams({
      page,
      skip: this.skip
    });
  }

  skip = () => {
    const { navigation } = this.props;
    this.setState({ page: 4 }, () => {
      navigation.setParams({
        page: 4
      });
    });
  };

  nextPage = () => {
    const { navigation } = this.props;
    const { page } = this.state;

    if (page === 4) {
      return;
    }

    this.setState({ page: page + 1 }, () => {
      navigation.setParams({
        page: page + 1
      });
    });
  };

  goToQuestionnaire = () => {
    const { navigation, trackQuestionnaireCommence } = this.props;

    trackQuestionnaireCommence();
    navigation.navigate("PersonalityTest");
  };

  render() {
    const { page } = this.state;
    return (
      <Container>
        <View style={styles.container}>
          <ImageBackground style={{ width, height }} source={background}>
            <LinearGradient
              colors={["rgb(132, 1, 191)", "rgba(132, 1, 191, 0.5)"]}
              style={styles.linearGradient}
            >
              <Content contentContainerStyle={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={() => this.nextPage()}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.7 }}>
                      {page === 1 && <PageOne key={page} />}
                      {page === 2 && <PageTwo key={page} />}
                      {page === 3 && <PageThree key={page} />}
                      {page === 4 && <PageFour key={page} />}
                    </View>
                    <View
                      style={{
                        flex: 0.3
                      }}
                    >
                      {this.state.page === 4 ? (
                        <Button
                          light
                          bordered
                          onPress={this.goToQuestionnaire}
                          style={{
                            color: colors.white,
                            borderRadius: 20,
                            alignSelf: "center",
                            paddingLeft: 25,
                            paddingRight: 25
                          }}
                        >
                          <Text style={{ fontSize: 12 }}>
                            START THE QUESTIONNAIRE
                          </Text>
                        </Button>
                      ) : (
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 12,
                            color: colors.white
                          }}
                        >
                          TAP ANYWHERE TO CONTINUE
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Content>
            </LinearGradient>
          </ImageBackground>
          <WebView
            style={{ width: 1, height: 1, opacity: 0, shadowOpacity: 0 }}
            onLoad={() => {
              console.log("loaded");
            }}
            source={{ uri: this.props.user.sova.testUrl }}
          />
        </View>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setUserOptions: token => dispatch(setUserOptions(token)),
    reduxFormChange: function() {
      dispatch(change(...arguments));
    },
    setUserStore: user => dispatch(setUserStore(user)),
    trackQuestionnaireCommence: () => dispatch(trackQuestionnaireCommence())
  };
}

const mapStateToProps = state => ({
  token: state.token.token,
  userOptions: state.user.userOptions,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  bindAction
)(DescriptionTest);
