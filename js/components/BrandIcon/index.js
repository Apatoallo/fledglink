import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { brandIcon } from "../../styles/tabs";

const style = StyleSheet.create({
  icon: {
    fontFamily: brandIcon,
    textAlign: "center"
  }
});

const type = {
  home: "🏠",
  notifications: "🏳",
  career: "🏆",
  cv: "📝",
  grow: "🧠",
  learn: "🗂",
  network: "👥",
  calendar: "📅"
};

const Icon = ({ name, color, size, lineHeight }): React.Node => (
  <Text
    style={StyleSheet.flatten([
      style.icon,
      { color: color, fontSize: size || 24, lineHeight: lineHeight || 30 }
    ])}
  >
    {type[name]}
  </Text>
);

export default Icon;
