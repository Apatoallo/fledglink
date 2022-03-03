import React, { PureComponent, Component } from "react";
import { Box, Label, Input } from "native-base";
import { StyleSheet, Keyboard, Text, View } from "react-native";
import PropTypes from "prop-types";

const inputStyles = StyleSheet.create({
  iconsWrapper: {
    position: "absolute",
    top: 20,
    right: 0,
    flexDirection: "row",
    backgroundColor: "green",
    flex: 1
  },
  inputWrapper: {
    alignItems: "center"
  }
});

export default class InputComponent extends PureComponent {
  
  render() {

    const {
      getRef,
      activeColor,
      autoCapitalize,
      inactiveColor,
      value,
      onChangeText,
      label,
      onSubmitEditing,
      onFocus,
      children,
      returnKeyType,
      onBlur,
      type
    } = this.props;



    return (
      <View style={inputStyles.inputWrapper}>
        <Input/>
        <Box
          floatingLabel
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: value ? activeColor : inactiveColor
          }}
        >
          <Text
            style={{
              color: value ? activeColor : inactiveColor,
              paddingLeft: 0,
              fontSize: 14
            }}
          >
            {label}
          </Text>
          <Input
            onSubmitEditing={onSubmitEditing}
            getRef={getRef}
            autoCapitalize={autoCapitalize}
            returnKeyType={returnKeyType}
            secureTextEntry={type === "password"}
            keyboardType={type === "email" ? "email-address" : "default"}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            value={value}
            style={{
              color: activeColor,
              paddingLeft: 0
            }}
          />
        </Box>
        <View style={inputStyles.iconsWrapper}>{children}</View>
      </View>
    );
  }
}

InputComponent.propTypes = {
  activeColor: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  inactiveColor: PropTypes.string.isRequired,
  onSubmitEditing: PropTypes.func,
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string,
  onFocus: PropTypes.func,
  returnKeyType: PropTypes.string,
  children: PropTypes.element,
  type: PropTypes.string
};

InputComponent.defaultProps = {
  value: "",
  type: "text",
  onBlur: () => {},
  onFocus: () => {},
  onSubmitEditing: () => {},
  autoCapitalize: "none",
  returnKeyType: "default",
  children: undefined
};
