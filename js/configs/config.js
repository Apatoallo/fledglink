import Config from "react-native-config";

export const buildConfiguration = Config.ENV;
export const version = Config.API_VERSION;

export const mixpanelToken = Config.MIXPANEL_TOKEN;
export const serverUrl = Config.API_URL;
export const contentSiteUri = Config.CONTENT_URL;

export const keyApis = {
  googlePlace: Config.GOOGLE_PLACE_API_KEY
};

export const colors = {
  white: "rgb(255, 255, 255)",
  whiteOpacity: "rgba(255, 255, 255, 0.5)",
  purple: "rgb(132, 1, 223)",
  violet: "rgb(132, 1, 191)",
  violetOpacity: "rgba(132, 1, 191, 0.5)",
  darkViolet: "rgb(75, 32, 95)",
  darkerViolet: "rgb(87, 43, 111)",
  darkestViolet: "rgb(60, 3, 85)",
  pink: "rgb(214, 5, 128)",
  pinkOpacity: "rgb(214, 5, 128, 0.2)",
  lightPink: "rgb(192, 77, 209)",
  lemon: "rgb(254, 204, 33)",
  gold: "#F9CB21",
  green: "rgb(23, 157, 39)",
  red: "rgb(220, 29, 54)",
  redOpacity: "rgba(220, 29, 54, 0.7)",
  black: "rgb(54, 54, 54)",
  darkBlack: "#000",
  grey: "rgb(146, 146, 146)",
  warmGrey: "rgb(116, 116, 116)",
  midGrey: "rgb(199, 199, 199)",
  lightGrey: "#E0E0E0",
  lighterGrey: "rgb(245, 245, 245)",
  greyOpacity: "rgba(146, 146, 146, 0.2)",
  blackOpacity: "rgba(0, 0, 0, 0.1)",
  gallery: "rgb(237, 237, 237)",
  galleryOpacity: "rgba(237, 237, 237, 0.8)"
};

export const fonts = {
  regular: "Poppins-Light",
  bold: "Poppins-Medium"
};

export const authTypes = {
  AUTHORIZED: "AUTHORIZED",
  RECOVERY: "RECOVERY",
  UNAUTHORIZED: "UNAUTHORIZED"
};
