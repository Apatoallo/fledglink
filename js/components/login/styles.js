import { colors, fonts } from "../../configs/config";

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
    marginTop: 10
  },
  text: {
    fontSize: 12,
    marginRight: 10,
    fontFamily: fonts.regular,
    letterSpacing: 0,
    textAlign: "center",
    color: colors.grey
  },
  link: {
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: colors.violet,
    marginTop: 10,
    marginBottom: 10
  },
  helpView: {
    flex: 1,
    alignSelf: "center",
    paddingHorizontal: 30,
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center"
  }
};
