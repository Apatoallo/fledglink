import { colors, fonts } from "../configs/config";
const React = require("react-native");
const { StyleSheet, Dimensions } = React;
const { height, width } = Dimensions.get("window");

export default {
  input: {
    paddingBottom: 0,
    paddingLeft: 0
  },
  coloredBackground: {
    shadow: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: "cover"
    },
    bg: {
      flex: 1,
      paddingTop: 20,
      paddingBottom: 30
    },
    logo: {
      marginTop: height / 7,
      width: 80,
      height: 80,
      alignSelf: "center"
    },
    btnActive: {
      height: 60,
      borderRadius: 20,
      marginTop: 40,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: colors.violet
    },
    buttonTextActive: {
      color: colors.gallery,
      fontSize: 20
    },
    btn: {
      height: 60,
      borderRadius: 20,
      marginTop: 40,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: colors.violetOpacity
    },
    buttonText: {
      color: colors.galleryOpacity,
      fontSize: 20
    },
    inputInvalidWrapper: {
      backgroundColor: colors.red,
      elevation: 5,
      paddingLeft: 20,
      paddingRight: 20,
      borderColor: "transparent",
      marginTop: 15,
      marginBottom: 15
    },
    inputWrapper: {
      paddingHorizontal: 20,
      marginTop: 15,
      marginBottom: 15,
      borderBottomColor: 0.5
    }
  },
  markdown: {
    strong: {
      fontFamily: fonts.bold,
      color: colors.black
    },
    listUnorderedItem: {
      flexDirection: "row",
      color: colors.warmGrey
    },
    listUnorderedItemIcon: {
      fontWeight: "bold",
      marginHorizontal: 10,
      fontSize: 12
    },
    listOrderedItem: {
      flexDirection: "row",
      color: colors.warmGrey
    },
    image: {
      marginTop: 10,
      flex: 1
    },
    listOrderedItemIcon: {
      fontFamily: fonts.bold,
      marginHorizontal: 10,
      fontSize: 10,
      lineHeight: 15
    },
    link: {
      textDecorationLine: "underline",
      color: "blue"
    },
    heading1: {
      fontSize: 24,
      fontFamily: fonts.bold,
      color: colors.violet,
      paddingBottom: 20,
      marginVertical: 0
    },
    heading2: {
      fontSize: 18,
      fontFamily: fonts.bold,
      paddingBottom: 10,
      color: colors.black,
      marginTop: 25,
      marginBottom: 0
    },
    heading3: {
      fontSize: 16,
      fontFamily: fonts.bold,
      paddingBottom: 6,
      color: colors.black,
      marginVertical: 0
    },
    paragraph: {
      fontSize: 14,
      fontFamily: fonts.regular,
      paddingBottom: 8,
      color: colors.warmGrey
    }
  }
};
