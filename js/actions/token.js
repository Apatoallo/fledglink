import { AsyncStorage } from "react-native";
import { getUserStore } from './user';
import { setUserOptions } from './userOptions';
import { getUserFeed } from './feed';
import { fetchNotificationsCounts } from './notifications';

export const SET_TOKEN = 'SET_TOKEN';
export const CLEAR_TOKEN = 'CLEAR_TOKEN';

function setToken(token) {
    return {
        type: SET_TOKEN,
        payload: token,
    };
}

function clearToken() {
    return {
        type: CLEAR_TOKEN,
    };
}

export function setTokenStore(token) {
    return (dispatch) => {
        AsyncStorage.setItem('token', JSON.stringify(token));
        return dispatch(setToken(token));
    };
}

export function getTokenStore() {
  return function(dispatch) {
    AsyncStorage.getItem("token")
      .then(result => {
        return JSON.parse(result);
      })
      .then(result => {
        dispatch(getUserStore(result))
        dispatch(setUserOptions(result));
        dispatch(getUserFeed(result));
        dispatch(fetchNotificationsCounts(result));
        return dispatch(setToken(result));
      })
      .catch(error => console.log(error));
  };
}

export function removeToken() {
    return (dispatch) => {
        AsyncStorage.removeItem('token');
        let token = '';
        return dispatch(clearToken(token));
    };
}
