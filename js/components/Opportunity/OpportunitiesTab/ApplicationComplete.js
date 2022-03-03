import React, { PureComponent } from "react";
import { Container, Content, Text, View, Button } from "native-base";
import { Image, ImageBackground, StyleSheet } from "react-native";
import { colors } from "../../../configs/config";

const applicationComplete = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: null,
    height: null,
    paddingBottom: 20
  },
  logoWrapper: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  logo: {
    marginTop: 20,
    width: 80,
    height: 80,
    alignSelf: "center"
  },
  titleText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#fff",
    marginTop: 10
  },
  textBlock: {
    flex: 0.4,
    justifyContent: "space-around",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    textAlign: "center"
  },
  buttonsBlock: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "space-around"
  },
  violetButton: {
    backgroundColor: colors.violet,
    alignSelf: "center"
  },
  whiteButton: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: colors.white
  },
  buttonText: {
    color: colors.white
  }
});

const background = require("../../../../images/loadingBG.png");
const logo = require("../../../../images/Bird.png");

export default class ApplicationComplete extends PureComponent {
  moreOpportunities = () => {
    const { navigation } = this.props;
    navigation.navigate("Opportunity");
  };

  goHome = () => {
    const { navigation } = this.props;
    navigation.navigate("Home");
  };

  render() {
    return (
      <Container>
        <ImageBackground
          style={applicationComplete.imageBackground}
          source={background}
        >
          <Content contentContainerStyle={{ flex: 1 }} padder>
            <View style={applicationComplete.logoWrapper}>
              <Image source={logo} style={applicationComplete.logo} />
              <Text style={applicationComplete.titleText}>
                Application Received
              </Text>
            </View>
            <View style={applicationComplete.textBlock}>
              <Text style={applicationComplete.text}>
                Thank you for applying for this Opportunity.
              </Text>
              <Text style={applicationComplete.text}>
                The company will be in touch shortly to inform you of your
                progress.
              </Text>
              <Text style={applicationComplete.text}>
                Don't stop here, whilst you wait to hear from them, apply for
                another role.
              </Text>
            </View>
            <View style={applicationComplete.buttonsBlock}>
              <Button
                rounded
                style={applicationComplete.violetButton}
                onPress={this.moreOpportunities}
              >
                <Text uppercase style={applicationComplete.buttonText}>
                  more opportunities
                </Text>
              </Button>
              <Button
                rounded
                transparent
                style={applicationComplete.whiteButton}
                onPress={this.goHome}
              >
                <Text uppercase style={applicationComplete.buttonText}>
                  back home
                </Text>
              </Button>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
