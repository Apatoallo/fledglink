import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, ImageBackground, TouchableWithoutFeedback } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Body,
  Card,
  CardItem,
  View
} from "native-base";
import styles from "./styles";
import ResultComponent from "./resultComponent";
import { colors, serverUrl } from "../../configs/config";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";
import { isIphoneX } from "react-native-iphone-x-helper";

const background = require("../../../images/loadingBG.png");
const yellowStar = require("../../../images/star/yellow.png");

class ResultPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: {
      color: colors.white
    },
    headerStyle: {
      backgroundColor: colors.violet
    },
    headerLeft: (
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 12
          }}
        >
          <Icon
            style={{ color: colors.white, fontSize: 24 }}
            name="x"
            type="Feather"
          />
        </View>
      </TouchableWithoutFeedback>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: ""
    };
  }

  componentDidMount = () => {
    FirebaseAnalytics.setCurrentScreen("Home", "Home");
  };

  render() {
    const { user } = this.props;
    return (
      <Container style={{ backgroundColor: "transparent" }}>
        <ImageBackground
          source={background}
          style={{ ...styles.shadow, paddingBottom: isIphoneX() ? 40 : 0 }}
        >
          <Content padder>
            <Card style={{ borderRadius: 5, flexWrap: "nowrap" }}>
              <CardItem
                style={{
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5
                }}
              >
                <Body style={{ alignSelf: "center" }}>
                  <Image
                    source={yellowStar}
                    style={{
                      alignSelf: "center",
                      width: 30,
                      height: 30
                    }}
                  />
                </Body>
              </CardItem>
              <CardItem>
                <Body style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "bold",
                      color: colors.black
                    }}
                  >
                    You have successfully completed the personality
                    questionnaire.
                  </Text>
                </Body>
              </CardItem>
              <CardItem
                style={{
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10
                }}
              >
                <Body>
                  <Text style={{ textAlign: "center", fontSize: 14 }}>
                    Congrats! This will boost your profile score and make it
                    easier to find good job ‘matches’ for you. Here’s your
                    results and an activity to help you think about your
                    likes/dislikes and how that links to job and company ‘fit’.
                  </Text>
                </Body>
              </CardItem>
            </Card>
            <Card
              style={{
                borderRadius: 5,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10
              }}
            >
              {user.sova.scores.competencies.map((item, key) => {
                if (key > 4) {
                  return null;
                }
                return <ResultComponent key={key} result={item} />;
              })}
              <CardItem
                style={{
                  borderBottomLeftRadius: 10,
                  justifyContent: "center",
                  borderBottomRightRadius: 10
                }}
              >
                <Button
                  onPress={() =>
                    this.props.navigation.navigate("ResultPDF", {
                      url: `${serverUrl}/users/me/test-report?token=${this.props.token}`,
                      name: "Result PDF"
                    })
                  }
                  transparent
                  style={{ alignSelf: "center" }}
                >
                  <Text style={{ color: colors.violet }}>VIEW FULL REPORT</Text>
                </Button>

                <Button
                  onPress={() =>
                    this.props.navigation.navigate("ResultPDF", {
                      url: `https://fledglink.ams3.digitaloceanspaces.com/assessment/FledglinkActivity.pdf`,
                      name: "Personality Activity"
                    })
                  }
                  transparent
                  style={{ alignSelf: "center" }}
                >
                  <Text style={{ color: colors.violet }}>Activity</Text>
                </Button>
              </CardItem>
            </Card>
          </Content>
        </ImageBackground>
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
)(ResultPage);
