const React = require("react-native");
import { colors } from "../../configs/config";

const { StyleSheet } = React;
export default {
  container: {
    backgroundColor: colors.gallery
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
  }
};
