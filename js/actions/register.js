import firebase from "@react-native-firebase/app";
import ImagePicker from "react-native-image-picker";
import { isEqual } from "lodash";
import { serverUrl } from "../configs/config";
import { setUserStore } from "./user";
import { setTokenStore } from "./token";
import { setUserOptions } from "./userOptions";
import { getUserFeed } from "./feed";
import { fetchNotificationsCounts } from "./notifications";
import ToastComponent from "../shared/ToastComponent";

export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAIL = "REGISTRATION_FAIL";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SET_PROFILE_DATA = "SET_PROFILE_DATA";
export const SELECT_AVATAR = "SELECT_AVATAR";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";
export const PREVIOUS_PAGE = "PREVIOUS_PAGE";
export const SELECT_USER_OPTION = "SELECT_USER_OPTION";
export const UPDATE_PAGE = "UPDATE_PAGE";
export const UPDATE_OCCUPATION_TYPE = "UPDATE_OCCUPATION_TYPE";
export const REGISTRATION_FINISH = "REGISTRATION_FINISH";
export const CREATING_PROFILE_INPUT_CHANGE = "CREATING_PROFILE_INPUT_CHANGE";
export const GET_NEXT_PAGE_WIZARD = "GET_NEXT_PAGE_WIZARD";
export const COMPLETE_ONBOARDING = "COMPLETE_ONBOARDING";

const fire = firebase.initializeApp();

function registrationSuccess(user) {
  return {
    type: REGISTRATION_SUCCESS,
    payload: user
  };
}

export function skipSetupProfile() {
  return (dispatch, getState) => {
    const {
      register: { tempUser },
      token: { token }
    } = getState();
    dispatch(setUserStore(tempUser));
    dispatch(getUserFeed(token));
    dispatch(fetchNotificationsCounts(token));
    return dispatch(setUserOptions(token));
  };
}

export function getNextStep() {
  return {
    type: GET_NEXT_PAGE_WIZARD
  };
}

function updateUserRequest() {
  return {
    type: UPDATE_USER_REQUEST
  };
}

function registrationFail(error) {
  return {
    type: REGISTRATION_FAIL,
    payload: error
  };
}

function clearError() {
  return {
    type: CLEAR_ERROR
  };
}

function setAvatar(avatar) {
  return {
    type: SELECT_AVATAR,
    payload: avatar
  };
}

function updateUserSuccess(user) {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: user
  };
}

function registerComplete(user) {
  return {
    type: REGISTRATION_FINISH,
    payload: user
  };
}

function updateUserFail() {
  return {
    type: UPDATE_USER_FAIL
  };
}

function updatePageCreatingProfile() {
  return {
    type: UPDATE_PAGE
  };
}

function updateOccupationType() {
  return {
    type: UPDATE_OCCUPATION_TYPE
  };
}

export function previousPage() {
  return {
    type: PREVIOUS_PAGE
  };
}

export function selectItem(value, checked) {
  return {
    type: SELECT_USER_OPTION,
    payload: { value, checked }
  };
}

export function handlerInputChange(data) {
  return {
    type: CREATING_PROFILE_INPUT_CHANGE,
    payload: data
  };
}

export function setProfileData(data) {
  return {
    type: SET_PROFILE_DATA,
    payload: data
  };
}

export function completeOnboarding() {
  return {
    type: COMPLETE_ONBOARDING
  };
}

export function registrationRequest(
  email,
  password,
  fullName,
  referralCode,
  onSuccess,
  onError
) {
  return dispatch => {
    dispatch(clearError());
    fetch(`${serverUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        fullName,
        referralCode
      })
    })
      .then(result => result.json())
      .then(result => {
        if (result.token) {
          dispatch(setTokenStore(result.token));
          dispatch(registrationSuccess({ ...result.user }));
          dispatch(finishedRegistration(result.user, result.token));
          if (onSuccess) onSuccess();
          return Promise.all([firebase.messaging().getToken(), result.token]);
        }
        dispatch(registrationFail(result.message));
        if (onError) onError();
        return ToastComponent(result.message);
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

export function selectPhotoTapped() {
  return dispatch => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = {
          uri: `data:image/jpeg;base64,${response.data}`
        };

        return dispatch(setAvatar(source.uri));
      }
    });
  };
}

function getBodyRequest(page) {
  const { data, serverFieldName, serverFieldNames, profileData } = page;

  if (profileData) return data;

  if (serverFieldNames) {
    const body = {};

    serverFieldNames.forEach(fieldName => {
      let filedData;
      switch (fieldName) {
        case "workExperience":
          filedData = {
            title: data.inputData
          };
          break;
        case "educationInstitutions":
          filedData = {
            name: data.inputData
          };
          break;
        default:
          filedData = undefined;
      }
      body[fieldName] = [
        {
          ...filedData
        }
      ];
    });

    return { ...body };
  }
  if (serverFieldName) {
    switch (serverFieldName) {
      case "workExperience":
        return {
          workExperience: [
            {
              title: data.inputData
            }
          ]
        };
      case "educationInstitutions":
        return {
          educationInstitutions: [
            {
              name: data.inputData
            }
          ]
        };
      default: {
        const fields = serverFieldName.split(".");
        if (fields.length === 2) {
          return {
            [fields[0]]: {
              [fields[1]]: data.selectedUser || data
            }
          };
        }
        return {
          [serverFieldName]: data.selectedUser || data
        };
      }
    }
  }
  return null;
}

function finishedRegistration(user, token) {
  return dispatch => {
    dispatch(setUserStore(user));
    dispatch(getUserFeed(token));
    dispatch(fetchNotificationsCounts(token));
  };
}

export function updateUser(handleErrors) {
  return (dispatch, getState) => {
    const {
      register: { pageNumber, pages },
      token: { token }
    } = getState();
    const body = getBodyRequest(pages[pageNumber]);
    if (pageNumber === 9) {
      dispatch(updateOccupationType());
    }
    if (!body) {
      return dispatch(updatePageCreatingProfile());
    }
    dispatch(updateUserRequest());
    return fetch(`${serverUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
      .then(result => result.json())
      .then(result => {
        if (result.message) {
          dispatch(updateUserFail());
          if (handleErrors && result.errors) handleErrors(result.errors);
          return ToastComponent(result.message);
        }
        if (pageNumber === pages.length - 1) {
          dispatch(registerComplete(result));
          return dispatch(finishedRegistration(result, token));
        }
        return dispatch(updateUserSuccess(result));
      })
      .catch(error => {
        dispatch(updateUserFail());
        return ToastComponent("We could not process this request right now");
      });
  };
}
