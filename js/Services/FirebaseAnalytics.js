import analytics from "@react-native-firebase/analytics";

class FirebaseAnalyticsManager {
  /*
    Log a custom event with optional params
        event: string
        params: Object
     */
  logEvent = (event, params) => analytics().logEvent(event, params);

  /*
    Sets the current screen name
        screenName: string
        screenClass: string
     */
  setCurrentScreen = (screenName, screenClass) => {
    analytics().logScreenView({
      screen_name: screenName,
      screen_class: screenClass
  });
  };
}

export default new FirebaseAnalyticsManager();
