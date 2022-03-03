import React, { Component } from "react";
import { Button, Text, View } from "native-base";
import {
  ImageBackground,
  ScrollView,
  Dimensions,
  StyleSheet
} from "react-native";
import { decode } from "he";
import { colors } from "../../configs/config";

const backgroundModal = require("../../../images/loadingBG.png");

const { width, height } = Dimensions.get("window");

const companyProfileBadge = StyleSheet.create({
  wrapper: {
    width: width / 1.2,
    paddingTop: 30,
    maxHeight: height / 1.5,
    paddingBottom: 30,
    marginTop: height / 9,
    alignSelf: "center",
    borderRadius: 25
  },
  badge: {
    alignSelf: "center",
    width: "40%",
    backgroundColor: colors.white,
    borderRadius: 20,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 30
  },
  descriptionText: {
    color: colors.white,
    fontSize: 12,
    textAlign: "center",
    marginHorizontal: "5%"
  },
  closeButton: {
    alignSelf: "center",
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.white
  }
});

export default class CompanyProfileBadge extends Component {
  closeModal = () => {
    const { closeModalHandler } = this.props;
    closeModalHandler();
  };

  render() {
    const { titleModal, textModal } = this.props;
    return (
      <ImageBackground
        source={backgroundModal}
        style={companyProfileBadge.wrapper}
      >
        <View>
          <Text uppercase style={{ color: colors.lemon, alignSelf: "center" }}>
            Diversity badge
          </Text>
          <View style={companyProfileBadge.badge}>
            <Text uppercase style={{ color: colors.pink, fontSize: 16 }}>
              {decode(titleModal)}
            </Text>
          </View>
          <ScrollView style={{ height: 150 }}>
            <Text style={companyProfileBadge.descriptionText}>{textModal}</Text>
          </ScrollView>
          <Button
            transparent
            style={companyProfileBadge.closeButton}
            onPress={this.closeModal}
          >
            <Text
              uppercase
              style={{ textAlign: "center", color: colors.white }}
            >
              Close
            </Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}
