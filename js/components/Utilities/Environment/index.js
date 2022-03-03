import * as React from "react";
import { isIphoneX } from "react-native-iphone-x-helper";
import { StyleSheet, View, Text } from "react-native";

const SAFE_AREA_BOTTOM = 34;

const envCheck = env => {
  switch (env) {
    case "staging":
      return "orange";
    case "edge":
      return "purple";
    case "production":
      return "red";
    default:
      return "green";
  }
};

const styles = StyleSheet.create({
  badge: {
    width: 16,
    height: 18,
    position: "absolute",
    right: 8,
    bottom: isIphoneX() ? SAFE_AREA_BOTTOM : 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4
  },
  text: {
    fontSize: 12,
    fontFamily: "System",
    fontWeight: "bold",
    color: "white"
  }
});

const Environment = ({ env }) => {
  if (env === "production") {
    return null;
  }

  return (
    <View
      style={StyleSheet.flatten([
        styles.badge,
        { backgroundColor: envCheck(env) }
      ])}
    >
      <Text style={styles.text}>{env.charAt(0).toUpperCase()}</Text>
    </View>
  );
};

export default Environment;
