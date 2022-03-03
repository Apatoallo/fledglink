import { serverUrl } from "../configs/config";
import { updateUserInFeed } from "./feed";
import ToastComponent from "../shared/ToastComponent";

export const GET_USER = "GET_USER";
export const GET_USER_FAIL = "GET_USER_FAIL";
export const SET_USER = "SET_USER";
export const UPDATE_WORK_EXPERIENCE = "UPDATE_WORK_EXPERIENCE";
export const UPDATE_EDUCATION = "UPDATE_EDUCATION";
export const EMPTY_ERROR = "EMPTY_ERROR";
export const DELETE_ACHIEVEMENT = "DELETE_ACHIEVEMENT";
export const ADD_ACHIEVEMENT = "ADD_ACHIEVEMENT";
export const PATCH_ACHIEVEMENT = "PATCH_ACHIEVEMENT";
export const DELETE_EDUCATION = "DELETE_EDUCATION";
export const ADD_EDUCATION = "ADD_EDUCATION";
export const PATCH_EDUCATION = "PATCH_EDUCATION";
export const DELETE_EXPERIENCE = "DELETE_EXPERIENCE";
export const ADD_EXPERIENCE = "ADD_EXPERIENCE";
export const PATCH_EXPERIENCE = "PATCH_EXPERIENCE";
export const ADD_HOBBY = "ADD_HOBBY";
export const DELETE_HOBBY = "DELETE_HOBBY";

function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function getUser() {
  return {
    type: GET_USER
  };
}

export function setUserToStore(user) {
  return dispatch => {
    dispatch(setUser(user));
  };
}

function updateWorkExperience(workExperiences) {
  return {
    type: UPDATE_WORK_EXPERIENCE,
    payload: workExperiences
  };
}

function updateEducations(education) {
  return {
    type: UPDATE_EDUCATION,
    payload: education
  };
}

function getUserFail() {
  return {
    type: GET_USER_FAIL,
    payload: false
  };
}

function emptyError(error) {
  return {
    type: EMPTY_ERROR,
    payload: error
  };
}

export function setEmptyError(error) {
  return dispatch => {
    dispatch(emptyError(error));
  };
}

export function setUserStore(user) {
  return dispatch => {
    dispatch(setUser(user));
  };
}

function deleteAchievementSuccess(achievementId) {
  return {
    type: DELETE_ACHIEVEMENT,
    payload: achievementId
  };
}

function addAchievementSuccess(achievement) {
  return {
    type: ADD_ACHIEVEMENT,
    payload: achievement
  };
}

function patchAchievementSuccess(achievement) {
  return {
    type: PATCH_ACHIEVEMENT,
    payload: achievement
  };
}

function deleteEducationSuccess(educationId) {
  return {
    type: DELETE_EDUCATION,
    payload: educationId
  };
}

function addEducationSuccess(education) {
  return {
    type: ADD_EDUCATION,
    payload: education
  };
}

function patchEducationSuccess(education) {
  return {
    type: PATCH_EDUCATION,
    payload: education
  };
}

function deleteExperienceSuccess(experienceId) {
  return {
    type: DELETE_EXPERIENCE,
    payload: experienceId
  };
}

function addExperienceSuccess(work) {
  return {
    type: ADD_EXPERIENCE,
    payload: work
  };
}

function patchExperienceSuccess(work) {
  return {
    type: PATCH_EXPERIENCE,
    payload: work
  };
}

function addHobbySuccess(hobby) {
  return {
    type: ADD_HOBBY,
    payload: hobby
  };
}

function deleteHobbySuccess(hobbyId) {
  return {
    type: DELETE_HOBBY,
    payload: hobbyId
  };
}

export function getUserStore(token) {
  return dispatch => {
    dispatch(getUser());
    fetch(`${serverUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        if (result.status >= 400 && result.status < 500) {
          throw new Error("unauthorize");
        }
        return result.json();
      })
      .then(result => {
        return dispatch(setUser(result));
      })
      .catch(error => {
        dispatch(getUserFail(error));
      });
  };
}

export function updateUser(token, body, onSuccess) {
  return dispatch => {
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
        if (result.id) {
          dispatch(setUserStore(result));
          if (onSuccess) onSuccess();
        } else {
          ToastComponent(result.message);
        }
      });
  };
}

export function deleteAchievement(token, userId, achievementId) {
  return dispatch => {
    fetch(`${serverUrl}/users/${userId}/achievements/${achievementId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        if (result.status === 204) {
          dispatch(deleteAchievementSuccess(achievementId));
          ToastComponent("Achievement was deleted", "success", 500);
        }
      })
      .catch(error => console.log(error));
  };
}

export function addAchievement(token, userId, achievement, onSuccess) {
  return dispatch => {
    fetch(`${serverUrl}/users/${userId}/achievements/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(achievement)
    })
      .then(result => result.json())
      .then(result => {
        if (result.id) {
          dispatch(addAchievementSuccess(result));
          ToastComponent("Achievement was added", "success", 500);
          if (onSuccess) onSuccess();
        } else {
          ToastComponent(result.message);
        }
      })
      .catch(error => ToastComponent(error));
  };
}

export function patchAchievement(
  token,
  userId,
  achievementId,
  achievement,
  onSuccess
) {
  return dispatch => {
    fetch(`${serverUrl}/users/${userId}/achievements/${achievementId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(achievement)
    })
      .then(result => result.json())
      .then(result => {
        if (result.id) {
          dispatch(patchAchievementSuccess(result));
          ToastComponent("Achievement was updated", "success", 500);
          if (onSuccess) onSuccess();
        } else {
          ToastComponent(result.message);
        }
      })
      .catch(error => ToastComponent(error));
  };
}

export function deleteEducation(token, userId, itemId) {
  return dispatch => {
    fetch(`${serverUrl}/users/${userId}/education-institutions/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        if (result.status === 204) {
          dispatch(deleteEducationSuccess(itemId));
          ToastComponent("Education was deleted", "success", 500);
        }
      })
      .catch(error => console.log(error));
  };
}

export function addEducation(token, education, onSuccess) {
  return dispatch => {
    return fetch(`${serverUrl}/users/me/education-institutions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(education)
    })
      .then(result => result.json())
      .then(result => {
        if (result.id) {
          dispatch(addEducationSuccess(result));
          ToastComponent("Education was added", "success", 500);
          if (onSuccess) onSuccess();
        } else {
          ToastComponent(result.message);
        }
      })
      .catch(error => console.log(error));
  };
}

export function patchEducation(token, educationId, education, onSuccess) {
  return dispatch => {
    fetch(`${serverUrl}/users/me/education-institutions/${educationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(education)
    })
      .then(result => result.json())
      .then(result => {
        if (result.id) {
          dispatch(patchEducationSuccess(result));
          ToastComponent("Education was updated", "success", 500);
          if (onSuccess) onSuccess();
        } else {
          ToastComponent(result.message);
        }
      })
      .catch(error => ToastComponent(error));
  };
}

export function deleteExperience(token, userId, itemId) {
  return dispatch => {
    fetch(`${serverUrl}/users/${userId}/work-experiences/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        if (result.status === 204) {
          dispatch(deleteExperienceSuccess(itemId));
          ToastComponent("Experience was deleted", "success", 500);
        }
      })
      .catch(error => console.log(error));
  };
}

export function addExperience(token, work, onSuccess) {
  return dispatch => {
    return fetch(`${serverUrl}/users/me/work-experiences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(work)
    })
      .then(result => result.json())
      .then(result => {
        if (result.id) {
          dispatch(addExperienceSuccess(result));
          ToastComponent("Work was added", "success", 500);
          if (onSuccess) onSuccess();
        } else {
          ToastComponent(result.message);
        }
      })
      .catch(error => console.log(error));
  };
}

export function patchExperience(token, workId, work, onSuccess) {
  return dispatch => {
    fetch(`${serverUrl}/users/me/work-experiences/${workId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(work)
    })
      .then(result => result.json())
      .then(result => {
        if (result.id) {
          dispatch(patchExperienceSuccess(result));
          ToastComponent("Work was updated", "success", 500);
          if (onSuccess) onSuccess();
        } else {
          ToastComponent(result.message);
        }
      })
      .catch(error => ToastComponent(error));
  };
}

export function addHobby(token, hobby) {
  return dispatch => {
    fetch(`${serverUrl}/users/me/hobbies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(hobby)
    })
      .then(result => result.json())
      .then(result => {
        if (result.id) {
          dispatch(addHobbySuccess(result));
        }
      })
      .catch(error => console.log(error));
  };
}

export function deleteHobby(token, hobbyId) {
  return dispatch => {
    return fetch(`${serverUrl}/users/me/hobbies/${hobbyId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        if (result.status === 204) {
          dispatch(deleteHobbySuccess(hobbyId));
        }
      })
      .catch(error => console.log(error));
  };
}

export function addUserExperience(item, allItems) {
  return dispatch => {
    allItems.push(item);
    dispatch(updateWorkExperience(allItems));
  };
}

export function addUserEducation(item, allItems) {
  return dispatch => {
    allItems.push(item);
    dispatch(updateEducations(allItems));
  };
}

export function logoutUser() {
  return {
    type: "USER_LOGOUT"
  };
}

export function clearUser() {
  return dispatch => {
    dispatch(getUserFail());
  };
}
