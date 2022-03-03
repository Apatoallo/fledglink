import { AppEventsLogger } from "react-native-fbsdk";

class FacebookAnalyticsManager {
  /*
    Log a custom event with optional params
        event: string
        params: Object
     */
  logEvent = (event, params) => AppEventsLogger.logEvent(event, params);
}

export default new FacebookAnalyticsManager();
