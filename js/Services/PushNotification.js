import { Platform } from "react-native";
import firebase from "@react-native-firebase/app";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

function getDeviceToken() {
  return new Promise(resolve => {
    if (Platform.OS === "ios") {
      function register(token) {
        PushNotificationIOS.removeEventListener("register", register);
        resolve({ ios: { token } });
      }

      PushNotificationIOS.addEventListener("register", register);
      PushNotificationIOS.requestPermissions();
    } else {
      firebase
        .messaging()
        .getToken()
        .then(token => {
          resolve({ android: { token } });
        });
    }
  });
}

export default { getDeviceToken };
