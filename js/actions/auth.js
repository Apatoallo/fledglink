import firebase from "@react-native-firebase/app";
import { serverUrl } from "../configs/config";
import { incrementLoginCount } from "./analytics";
import { setUserStore } from "./user";
import { setTokenStore } from "./token";
import { setUserOptions } from "./userOptions";
import { getUserFeed } from "./feed";
import { fetchNotificationsCounts } from "./notifications";
import ToastComponent from "../shared/ToastComponent";


export default function getUserRequest(email, password, onSuccess, onError) {
  return dispatch => {
    fetch(`${serverUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(result => result.json())
      .then(result => {
        if (result.token) {
          dispatch(setTokenStore(result.token));
          dispatch(setUserStore(result.user));
          dispatch(setUserOptions(result.token));
          dispatch(getUserFeed(result.token));
          dispatch(fetchNotificationsCounts(result.token));
          dispatch(incrementLoginCount());
          if (onSuccess) onSuccess();
          return Promise.all([firebase.messaging().getToken(), result.token]);
        }
        const message = result.errors
          ? result.errors.email || result.errors.password
          : result.message;
        if (onError) onError();
        return ToastComponent(message);
      })
      .then(([deviceToken, jwtToken]) => {
        fetch(`${serverUrl}/users/me/device-tokens`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`
          },
          body: JSON.stringify({ deviceToken })
        });
      })
      .then(result => console.log("SEND DEVICE TOKEN: ", result))
      .catch(error => {
        if (onError) onError();
        console.log(error);
      });
  };
}
