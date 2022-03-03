import { colors } from "../../configs/config";

const React = require("react-native");

export default {
  padded: {
    padding: 30
  },
  arrow: {
    alignItems: "flex-start"
  },
  back: {
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 10
  },
  icon: {
    fontSize: 24,
    color: colors.black
  },
  action: {
    marginTop: 20
  },
  hint: {
    marginTop: 20,
    padding: 20,
    paddingBottom: 0,
    backgroundColor: colors.darkViolet
  },
  hintText: {
    marginBottom: 20,
    fontSize: 12,
    color: colors.white
  }
};
