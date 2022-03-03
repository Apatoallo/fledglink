import { colors, fonts } from "../../configs/config";

const React = require("react-native");

const { StyleSheet } = React;

export default StyleSheet.create({
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
  helpView: {
    flex: 1,
    alignSelf: "center",
    paddingHorizontal: 30,
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center"
  },
  helpText: {
    fontSize: 12,
    marginRight: 10,
    fontFamily: fonts.regular,
    letterSpacing: 0,
    textAlign: "center",
    color: colors.grey
  },
  violet: {
    color: colors.violet
  },
  forgotPasswordModal: {
    height: 150,
    paddingHorizontal: 15,
    paddingTop: 15,
    borderRadius: 5,
    width: "98%",
    backgroundColor: "white",
    alignSelf: "center"
  },
  text: {
    justifyContent: "center",
    fontFamily: fonts.regular,
    color: colors.grey,
    fontSize: 18,
    marginBottom: 10
  },
  modalButtonsWrapper: {
    marginTop: 10
  },
  modalDeleteBtn: {
    fontSize: 16,
    height: 30,
    backgroundColor: colors.violet
  },
  modalDeleteBtnText: {
    color: colors.white
  },
  modalCancelBtn: {
    fontSize: 16,
    height: 30,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  modalCancelBtnIcon: {
    fontSize: 18,
    color: colors.grey
  },
  modalCancelBtnText: {
    color: colors.grey,
    fontSize: 18
  }
});
