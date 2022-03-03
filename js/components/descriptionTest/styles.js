const React = require("react-native");
const { StyleSheet, Platform, Dimensions } = React;

import { colors } from "../../configs/config";

const { height, width } = Dimensions.get("window");
const headerHeight = Platform.OS === "ios" ? 64 : 56;
export default {
  container: {
    backgroundColor: colors.gallery,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  row: {
    flex: 1,
    alignItems: "center"
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: "center"
  },
  mt: {
    marginTop: 18
  },
  linearGradient: {
    height: height,
    width: width
  },
  wrapper: {
    height: height / 2,
    alignSelf: "center",
    marginTop: height / 8,
    alignItems: "center"
  },
  title: {
    marginHorizontal: 50,
    color: colors.white,
    fontSize: 28,
    textAlign: "center"
  },
  description: {
    color: colors.white,
    marginTop: 20,
    marginHorizontal: 25,
    fontSize: 16,
    textAlign: "center"
  }
};
