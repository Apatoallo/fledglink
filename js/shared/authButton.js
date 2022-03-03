import React, { PureComponent } from "react";
import { StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Button, Text } from "native-base";
import PropTypes from "prop-types";
import { colors, fonts } from "../configs/config";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  button: {
    marginTop: 10
  },
  buttonText: {
    fontSize: width <= 320 ? 14 : 16,
    fontFamily: fonts.regular,
    letterSpacing: 0,
    textAlign: "center",
    padding: 10
  },
  buttonActive: {
    backgroundColor: colors.darkerViolet
  },
  buttonInactive: {
    backgroundColor: colors.violetOpacity
  },
  buttonTextActiveColor: {
    color: colors.gallery
  },
  buttonTextInactiveColor: {
    color: colors.galleryOpacity
  }
});

export default class AuthButton extends PureComponent {
  render() {
    const { loading, textButton, isDisable, pressButton } = this.props;
    return (
      <Button
        block
        transparent
        onPress={pressButton}
        disabled={isDisable || loading}
        style={[
          styles.button,
          isDisable ? styles.buttonInactive : styles.buttonActive
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            style={[
              styles.buttonText,
              isDisable
                ? styles.buttonTextInactiveColor
                : styles.buttonTextActiveColor
            ]}
          >
            {textButton.toUpperCase()}
          </Text>
        )}
      </Button>
    );
  }
}

AuthButton.propTypes = {
  pressButton: PropTypes.func.isRequired,
  textButton: PropTypes.string,
  isDisable: PropTypes.bool
};

AuthButton.defaultProps = {
  loading: false,
  textButton: "",
  isDisable: false
};
