import React, { PureComponent } from "react";
import { View, Icon } from "native-base";
import PropTypes from "prop-types";
import { TouchableOpacity, StyleSheet } from "react-native";
import { colors, fonts } from "../configs/config";

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 30,
    marginBottom: 0
  },
  activeText: {
    height: 22,
    fontFamily: fonts.bold,
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: "right",
    color: colors.warmGrey
  },
  inactiveText: {
    height: 22,
    opacity: 0.3,
    fontFamily: fonts.bold,
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: "right",
    color: colors.warmGrey
  }
});

export default class WizardNavigationButton extends PureComponent {
  render() {
    const { pressBack } = this.props;
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={pressBack}>
          <Icon name="ios-arrow-back" />
        </TouchableOpacity>
      </View>
    );
  }
}

WizardNavigationButton.propTypes = {
  disabledBackButton: PropTypes.bool,
  pressBack: PropTypes.func
};

WizardNavigationButton.defaultProps = {
  disabledBackButton: false,
  pressBack: () => {}
};
