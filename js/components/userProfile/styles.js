const React = require("react-native");
import { colors } from "../../configs/config";

const { StyleSheet, Platform } = React;
export default {
  avatarContainer: {
    height: 150,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  avatar: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 50
  },
  input: {
    color: colors.grey
  },
  textArea: {
    color: colors.grey,
    paddingLeft: 0,
    fontSize: 20,
    paddingRight: 0
  },
  pencilIcon: {
    fontSize: 40,
    color: colors.purple
  },
  iconContainer: {
    height: 35,
    width: 35,
    backgroundColor: colors.gallery,
    position: "absolute",
    bottom: 10,
    right: 2,
    borderRadius: 50,
    elevation: 5
  }
};
