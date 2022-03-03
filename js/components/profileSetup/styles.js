import { colors, fonts } from "../../configs/config";

const React = require("react-native");

const { StyleSheet } = React;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkerViolet,
    padding: 30
  },
  logo: {
    width: 34.5,
    height: 46,
    marginTop: 10
  },
  wrapper: {
    marginTop: 70,
    marginBottom: 20,
    marginHorizontal: 10
  },
  header: {
    fontSize: 48,
    fontFamily: fonts.bold,
    color: colors.white,
    textAlign: "center"
  },
  textStyle: {
    marginBottom: 40,
    fontSize: 22,
    fontFamily: fonts.regular,
    lineHeight: 28,
    letterSpacing: 0,
    color: colors.white,
    textAlign: "center",
    margin: 10
  },
  getStartedButton: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "white",
    marginVertical: 50
  },
  getStartedText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    letterSpacing: 0,
    textAlign: "center",
    color: colors.white
  }
});
