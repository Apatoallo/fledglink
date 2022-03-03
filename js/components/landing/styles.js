const React = require("react-native");
import { colors, fonts } from "../../configs/config";
const { Dimensions } = React;
const { width, height } = Dimensions.get("window");

const fontSizing = () => {
  if (height < 568) {
    return {
      fontSize: 14,
      lineHeight: 20
    };
  }

  if (height === 568) {
    return {
      fontSize: 16,
      lineHeight: 22
    };
  }

  return {
    fontSize: 18,
    lineHeight: 24
  };
};

export default {
  flex: {
    flex: 1
  },
  padded: {
    marginHorizontal: 20
  },
  logo: {
    width: width <= 320 ? 123.5 : 247,
    height: width <= 320 ? 38.5 : 77,
    marginBottom: height < 568 ? 10 : 30
  },
  heading: {
    ...(width > 320 && { maxWidth: 320 }),
    ...fontSizing(),
    color: colors.white,
    fontFamily: fonts.bold,
    textAlign: "center"
  },
  hollowBtn: {
    backgroundColor: colors.white,
    borderRadius: 25,
    borderWidth: 1,
    height: width <= 320 ? 40 : 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderColor: colors.white,
    paddingHorizontal: 30,
    marginTop: height < 568 ? 10 : 30,
    marginBottom: 10
  },
  hollowBtnText: {
    fontSize: width <= 320 ? 14 : 16,
    fontFamily: fonts.bold,
    letterSpacing: 0,
    textAlign: "center",
    color: colors.darkViolet
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "space-around"
  },
  container: { width: "100%", alignItems: "center" },
  linkContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  link: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fonts.regular
  }
};
