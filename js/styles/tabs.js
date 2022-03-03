import { PixelRatio } from "react-native";

import { colors, fonts } from "../configs/config";
const brandIcon = "fledglink";

export default {
  tabsStyles: {
    activeTabStyle: { backgroundColor: colors.darkViolet },
    tabBarInactiveTextColor: colors.grey,
    tabBarUnderlineStyle: { backgroundColor: colors.darkViolet }
  },
  tabStyles: {
    tabStyle: { backgroundColor: colors.white },
    textStyle: {
      fontFamily: fonts.regular,
      color: colors.grey,
      fontSize: 14 / PixelRatio.getFontScale()
    },
    activeTextStyle: {
      fontFamily: fonts.bold,
      color: colors.darkViolet,
      fontSize: 14 / PixelRatio.getFontScale()
    },
    activeTabStyle: { backgroundColor: colors.white }
  }
};

export { brandIcon };
