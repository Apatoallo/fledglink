import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "native-base";
import { colors } from "../../configs/config";

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 15,
    alignSelf: "center"
  },
  button: {
    height: 35,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: colors.lightGrey
  },
  text: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "bold"
  }
});

export default class FollowedButton extends PureComponent {
  render() {
    const { text, onPress, disabledButton } = this.props;
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          disabled={disabledButton}
          onPress={onPress}
          style={styles.button}
        >
          <Text style={styles.text}>{text.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

FollowedButton.propTypes = {
  text: PropTypes.string.isRequired,
  disabledButton: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};
