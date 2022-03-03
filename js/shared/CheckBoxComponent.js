import React, { PureComponent } from "react";
import { StyleSheet, Platform, TouchableWithoutFeedback } from "react-native";
import { View, Text, CheckBox } from "native-base";
import Toggle from "./Toggle";
import PropTypes from "prop-types";
import { colors } from "../configs/config";

const checkBoxComponent = StyleSheet.create({
  checkBoxWrapper: {
    flexDirection: "row",
    paddingRight: 50,
    alignItems: "center"
  },
  checkBox: {
    marginLeft: -10,
    marginRight: 20,
    borderColor: colors.violet
  },
  label: {
    color: colors.grey,
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0
  }
});

export default class CheckBoxComponent extends PureComponent {
  render() {
    const { label, value, onChange } = this.props;
    return (
      <View>
        {Platform.OS === "ios" ? (
          <TouchableWithoutFeedback onPress={onChange}>
            <View style={checkBoxComponent.checkBoxWrapper}>
              <Toggle
                pointerEvents="none"
                style={{ marginRight: 10 }}
                value={value}
              />
              <Text style={checkBoxComponent.label}>{label}</Text>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View style={checkBoxComponent.checkBoxWrapper}>
            <CheckBox
              color={colors.violet}
              style={checkBoxComponent.checkBox}
              onPress={onChange}
              checked={value}
            />
            <Text style={checkBoxComponent.label}>{label}</Text>
          </View>
        )}
      </View>
    );
  }
}

CheckBoxComponent.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};
