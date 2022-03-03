import React, { PureComponent } from "react";
import { Text, View } from "native-base";
import PropTypes from "prop-types";
import { decode } from "he";
import { Image, StyleSheet, Dimensions } from "react-native";
import { colors, fonts } from "../configs/config";

const logo = require("../../images/color-bird.png");

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  logo: {
    width: 34.5,
    height: 46
  },
  secondaryText: {
    marginTop: 15,
    fontSize: 14,
    fontFamily: fonts.bold,
    letterSpacing: 0,
    marginBottom: 5
  },
  secondaryTextColor: {
    color: colors.darkerViolet
  },
  primaryText: {
    fontSize: width > 350 ? 24 : 22,
    fontFamily: fonts.bold,
    letterSpacing: 0
  },
  primaryTextColor: {
    color: colors.black
  }
});

export default class RegistrationHeader extends PureComponent {
  render() {
    const {
      secondaryText,
      primaryText,
      logoImage,
      secondaryTextStyles,
      primaryTextStyles,
      logo = true
    } = this.props;
    return (
      <View style={styles.container}>
        {logo && <Image source={logoImage} style={styles.logo} />}
        <Text style={[styles.secondaryText, secondaryTextStyles]}>
          {secondaryText}
        </Text>
        <Text style={[styles.primaryText, primaryTextStyles]}>
          {decode(primaryText)}
        </Text>
      </View>
    );
  }
}

RegistrationHeader.propTypes = {
  secondaryText: PropTypes.string.isRequired,
  primaryText: PropTypes.string.isRequired,
  logoImage: PropTypes.number,
  secondaryTextStyles: PropTypes.instanceOf(Object),
  primaryTextStyles: PropTypes.instanceOf(Object)
};

RegistrationHeader.defaultProps = {
  logoImage: logo,
  secondaryTextStyles: styles.secondaryTextColor,
  primaryTextStyles: styles.primaryTextStyles
};
