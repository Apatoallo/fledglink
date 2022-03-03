import React from "react";
import { Switch } from "react-native";
import { colors } from "../configs/config";

const Toggle = props => (
  <Switch
    ios_backgroundColor={props.value === true ? colors.violet : colors.grey}
    thumbColor={colors.white}
    trackColor={{ false: colors.grey, true: colors.violet }}
    {...props}
  />
);

export default Toggle;
