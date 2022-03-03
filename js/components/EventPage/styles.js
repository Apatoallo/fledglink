import { Dimensions } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { colors, fonts } from "../../configs/config";

const { width } = Dimensions.get("window");

export default {
  parallaxForeground: {
    height: 300,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  parallaxOverlay: {
    backgroundColor: colors.white,
    borderRadius: 10,
    width: 210,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    marginTop: isIphoneX() ? 50 : 0
  },
  innerBlock: {
    alignSelf: "center",
    overflow: "visible",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    borderRadius: 10
  },
  image: {
    height: 100,
    width: 125,
    borderRadius: 10
  },
  parallaxBackgroundImage: {
    width: null,
    height: 300
  },
  parallaxBackgroundImageOverlay: {
    position: "absolute",
    top: 0,
    width,
    backgroundColor: "rgba(0,0,0,0.4)",
    height: 300
  },
  parallaxFixedHeader: {
    position: "absolute",
    bottom: 5,
    left: 5,
    right: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textWrapper: {
    paddingHorizontal: 10,
    paddingTop: 10
  },
  titleWrapper: {
    marginTop: 5,
    marginHorizontal: 25
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: colors.darkestViolet
  },
  locationAndDate: {
    ontFamily: fonts.regular,
    fontSize: 18,
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: colors.black
  },
  types: {
    fontFamily: fonts.bold,
    fontSize: 18,
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: colors.pink
  },
  subscribeWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    marginTop: 15,
    backgroundColor: colors.lighterGrey
  },
  subscribeText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: colors.black
  },
  switcherText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    fontStyle: "normal",
    marginHorizontal: 10,
    letterSpacing: 0,
    color: colors.violet
  },
  switcherWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 40
  },
  fieldsTitle: {
    fontFamily: fonts.regular,
    fontSize: 18,
    marginTop: 10,
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.black
  },
  fieldsText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.warmGrey
  },
  dayText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.black,
    marginVertical: 10
  }
};
