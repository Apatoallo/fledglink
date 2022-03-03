import { colors } from "../configs/config";
import defaultStyle from "./default";

const React = require("react-native");
const { StyleSheet, Dimensions } = React;
const { height, width } = Dimensions.get("window");

export default {
  colorInput: {
    ...defaultStyle.input,
    color: colors.white
  },
  inputPrimary: {
    ...defaultStyle.input,
    color: colors.black
  }
};
