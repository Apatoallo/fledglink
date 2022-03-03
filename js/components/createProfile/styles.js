const React = require("react-native");
const { Dimensions } = React;
import { colors, fonts } from "../../configs/config";
const { height, width } = Dimensions.get("window");

export default {
  container: {
    height: height,
    width: width
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    paddingBottom: 20
  },
  title: {
    fontSize: 25,
    color: colors.gallery,
    marginTop: 20,
    alignSelf: "center"
  },
  input: {
    paddingBottom: 0,
    paddingLeft: 0,
    color: colors.white
  },
  nextButton: {
    justifyContent: "center",
    backgroundColor: colors.violet,
    height: 60,
    width: "100%",
    borderRadius: 25
  },
  btnText: {
    color: colors.gallery,
    fontSize: 18
  },
  logoText: {
    marginTop: 20,
    alignSelf: "center",
    width: width / 2.5,
    resizeMode: "contain"
  },
  headerWrapper: {
    marginHorizontal: 30
  },
  hint: {
    marginHorizontal: 30,
    fontFamily: fonts.bold,
    fontSize: 10,
    color: colors.darkViolet
  },
  loadingWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  navigationWrapper: {
    marginHorizontal: 30,
    marginBottom: 30
  },
  scrollViewWrapper: {
    flex: 1,
    paddingVertical: 10
  },
  scrollView: {
    height: "100%"
  },
  helpView: {
    marginHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  helpText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    letterSpacing: 0,
    textAlign: "center",
    color: colors.darkerViolet
  },
  helpTextLink: {
    fontSize: 10,
    marginLeft: 5,
    textDecorationLine: "underline"
  },
  modalWrapper: {
    margin: 20,
    padding: 20,
    borderRadius: 5,
    backgroundColor: colors.lightPink,
    alignSelf: "center"
  },
  modalHeading: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.bold,
    marginVertical: 20
  },
  modalText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginBottom: 20
  },
  screenshot: {
    width: 252,
    height: 313,
    alignSelf: "center",
    marginBottom: 10
  },
  section: {
    marginHorizontal: 30,
    paddingVertical: 20
  },
  toggleSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: colors.grey
  },
  toggleText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.warmGrey
  },
  smallHint: {
    fontFamily: fonts.bold,
    fontSize: 10,
    color: colors.darkViolet
  },
  sectionHeading: {
    marginTop: 20,
    marginHorizontal: 30,
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.darkerViolet,
    textTransform: "uppercase"
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 14
  },
  selectButton: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5
  },
  selectText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    marginLeft: 10,
    color: colors.black
  },
  selectedOption: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.darkerViolet,
    marginLeft: 10
  },
  multiselect: {
    marginHorizontal: 30,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5
  },
  labelText: {
    color: colors.darkerViolet,
    fontFamily: fonts.bold,
    padding: 5
  },
  errorText: {
    fontFamily: fonts.bold,
    color: colors.red,
    fontSize: 12,
    marginTop: -10,
    marginBottom: 20
  },
  datePickerWrapper: {
    margin: 20,
    padding: 20,
    borderRadius: 5,
    backgroundColor: colors.white,
    alignSelf: "center"
  },
  confirmButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
    alignSelf: "flex-end"
  },
  picker: {
    paddingTop: 12,
    paddingRight: 5,
    paddingLeft: 15,
    paddingBottom: 0,
    marginTop: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5
  }
};
