import { colors, fonts } from "../../configs/config";

const React = require("react-native");

const { StyleSheet, Platform } = React;
export default {
  listWrapper: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  listTittleWrapper: {
    flex: 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  tittleText: {
    color: colors.darkestViolet,
    fontSize: 18,
    marginLeft: 10
  },
  tittleIcon: {
    color: colors.darkestViolet
  },
  actionWrapper: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 5,
    borderColor: colors.darkestViolet,
    borderWidth: 1,
    width: 70,
    height: 30
  },
  actionText: {
    color: colors.violet,
    fontSize: 14,
    marginRight: 10
  },
  actionIcon: {
    color: colors.violet,
    fontSize: 20
  },
  wrapConnections: {
    backgroundColor: colors.galleryOpacity,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 2,
    paddingHorizontal: 10,
    height: 95,
    justifyContent: "space-between"
  },
  wrapAvatar: {
    width: 65
  },
  image: {
    height: 65,
    borderRadius: 32.5,
    width: 65
  },
  wrapBaseInfo: {
    marginLeft: 10,
    flex: 1
  },
  userName: {
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: 16,
    marginBottom: 5
  },
  education: {
    fontFamily: fonts.regular,
    color: colors.grey,
    fontSize: 16,
    marginBottom: 5
  },
  mutual: {
    fontFamily: fonts.regular,
    color: colors.warmGrey,
    fontSize: 12
  },
  userActionWrapper: {
    flex: 0.2,
    height: 85,
    alignItems: "center",
    justifyContent: "center"
  },
  successAction: {
    backgroundColor: colors.violet,
    marginBottom: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  cancelAction: {
    backgroundColor: "transparent",
    borderColor: colors.warmGrey,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 15
  },
  successIcon: {
    color: colors.white,
    fontSize: 16
  },
  cancelIcon: {
    color: colors.warmGrey,
    fontSize: 16
  }
};
