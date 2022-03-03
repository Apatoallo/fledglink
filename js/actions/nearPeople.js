import { stringify } from 'query-string';
import LocationService from '../geolocation/LocationService';
import { serverUrl } from '../configs/config';
import ToastComponent from '../shared/ToastComponent';

export const CONNECTION_DECLINE_REQUEST_PENDING = 'CONNECTION_DECLINE_REQUEST_PENDING';
export const CONNECTION_DECLINE_REQUEST_SUCCESS = 'CONNECTION_DECLINE_REQUEST_SUCCESS';
export const CONNECTION_DECLINE_REQUEST_PENDING_FAILED = 'CONNECTION_DECLINE_REQUEST_PENDING_FAILED';
export const TURN_ON_WATCHING_POSITION = 'TURN_ON_WATCHING_POSITION';
export const TURN_OFF_WATCHING_POSITION = 'TURN_OFF_WATCHING_POSITION';
export const GET_NEAR_USERS = 'GET_NEAR_USERS';
export const GET_NEAR_USERS_SUCCESS = 'GET_NEAR_USERS_SUCCESS';
export const GET_NEAR_USERS_FAIL = 'GET_NEAR_USERS_FAIL';
export const CONNECTION_REQUEST_NEAR_PEOPLE = 'CONNECTION_REQUEST_NEAR_PEOPLE';
export const CONNECTION_REQUEST_NEAR_PEOPLE_SUCCESS = 'CONNECTION_REQUEST_NEAR_PEOPLE_SUCCESS';
export const CONNECTION_REQUEST_NEAR_PEOPLE_FAILED = 'CONNECTION_REQUEST_NEAR_PEOPLE_FAILED';
export const CONNECTION_ACCEPT_NEAR_PEOPLE = 'CONNECTION_ACCEPT_NEAR_PEOPLE';
export const CONNECTION_ACCEPT_NEAR_PEOPLE_SUCCESS = 'CONNECTION_ACCEPT_NEAR_PEOPLE_SUCCESS';
export const CONNECTION_ACCEPT_NEAR_PEOPLE_FAILED = 'CONNECTION_ACCEPT_NEAR_PEOPLE_FAILED';
export const SET_NEW_USERS_NEAR = 'SET_NEW_USERS_NEAR';

function turnOnWatchingPosition() {
    return {
        type: TURN_ON_WATCHING_POSITION,
    };
}

function turnOffWatchingPosition() {
    return {
        type: TURN_OFF_WATCHING_POSITION,
    };
}

function getNearUsers() {
    return {
        type: GET_NEAR_USERS,
    };
}

function getNearUsersSuccess(userList) {
    return {
        type: GET_NEAR_USERS_SUCCESS,
        payload: userList,
    };
}

function getNearUsersFail(error) {
    return {
        type: GET_NEAR_USERS_FAIL,
        payload: error,
    };
}

function connectionRequest() {
    return {
        type: CONNECTION_REQUEST_NEAR_PEOPLE,
    };
}

function connectionRequestSuccess(id) {
    return {
        type: CONNECTION_REQUEST_NEAR_PEOPLE_SUCCESS,
        payload: id,
    };
}

function connectionRequestFailed(error) {
    return {
        type: CONNECTION_REQUEST_NEAR_PEOPLE_FAILED,
        payload: error,
    };
}

function connectionAcceptRequest() {
    return {
        type: CONNECTION_ACCEPT_NEAR_PEOPLE,
    };
}

function connectionAcceptRequestSuccess(id) {
    return {
        type: CONNECTION_ACCEPT_NEAR_PEOPLE_SUCCESS,
        payload: id,
    };
}

function connectionAcceptRequestFailed(error) {
    return {
        type: CONNECTION_ACCEPT_NEAR_PEOPLE_FAILED,
        payload: error,
    };
}

function connectionDeclineRequestSuccess(id) {
    return {
        type: CONNECTION_DECLINE_REQUEST_SUCCESS,
        payload: id,
    };
}

function connectionDeclineRequest() {
    return {
        type: CONNECTION_DECLINE_REQUEST_PENDING,
    };
}

function connectionDeclineRequestFailed(error) {
    return {
        type: CONNECTION_DECLINE_REQUEST_PENDING_FAILED,
        payload: error,
    };
}

function getUsersSuccess(list) {
    return {
        type: SET_NEW_USERS_NEAR,
        payload: list,
    };
}

function getUsersId(array) {
    const userIds = [];
    array.map(item => userIds.push(item.id));
    return userIds;
}

function sendUserPosition(listeningPosition) {
    return (dispatch, getState) => {
        const { token: { token } } = getState();
        const body = {
            geoposition: listeningPosition.value ? [listeningPosition.coords.longitude, listeningPosition.coords.latitude] : null,
        };
        return fetch(`${serverUrl}/users/me/current-locations`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ currentLocation: listeningPosition.value ? { ...body } : null }),
        })
            .then(result => result.status === 200)
            .catch(() => ToastComponent('Something went wrong'));
    };
}

export function getterNearUsers() {
    return (dispatch, getState) => {
        dispatch(getNearUsers());
        const query = {
            radius: '5',
        };
        const { token: { token } } = getState();
        fetch(`${serverUrl}/users/me/near?${stringify(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(result => result.json())
            .then((result) => {
                if (!result.message) {
                    const userIds = getUsersId(result);
                    dispatch(getUsersSuccess(result));
                    return dispatch(getNearUsersSuccess(userIds));
                }
                ToastComponent(result.message);
                return dispatch(getNearUsersFail(result.message));
            });
    };
}

export function toggleWatchPosition() {
    return async (dispatch, getState) => {
        const { nearPeople: { watchingGeoPosition }, token: { token } } = getState();
        const resultPositionMethod = await LocationService.instance.getCurrentPosition(!watchingGeoPosition, token);
        if (!resultPositionMethod.value) {
            dispatch(sendUserPosition(resultPositionMethod));
            return dispatch(turnOffWatchingPosition());
        }
        const sendingPositionSuccess = await dispatch(sendUserPosition(resultPositionMethod));
        if (sendingPositionSuccess) {
            dispatch(getterNearUsers());
        }
        return dispatch(turnOnWatchingPosition());
    };
}

export function fetchSendRequest(token, id, acquaintance, qualities, notAcquaintance) {
    return (dispatch) => {
        dispatch(connectionRequest());
        fetch(`${serverUrl}/users/${id}/connection-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                receiverQualities: qualities.length ? [...qualities] : null,
                text: notAcquaintance || acquaintance,
            }),
        })
            .then((result) => {
                if (result.status === 201) {
                    dispatch(connectionRequestSuccess(id));
                }
                result.json().then((json) => { throw new Error(json); });
            })
            .catch(error => dispatch(connectionRequestFailed(error.message)));
    };
}

export function fetchAcceptRequest(token, id, acquaintance, qualities, notAcquaintance) {
    return (dispatch) => {
        dispatch(connectionAcceptRequest());
        fetch(`${serverUrl}/users/${id}/connection-requests/accept`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                senderQualities: qualities.length ? [...qualities] : null,
                text: notAcquaintance || acquaintance,
            }),
        })
            .then((result) => {
                if (result.status === 201) {
                    return result.json();
                }
            })
            .then((result) => {
                dispatch(connectionAcceptRequestSuccess(result));
            })
            .catch(error => dispatch(connectionAcceptRequestFailed(error.message)));
    };
}

export function deletePendingConnection(token, id) {
    return (dispatch) => {
        dispatch(connectionDeclineRequest());
        fetch(`${serverUrl}/users/${id}/connection-requests`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((result) => {
                if (result.status === 204) {
                    dispatch(connectionDeclineRequestSuccess(id));
                }
                result.json().then((json) => { throw new Error(json); });
            })
            .catch(error => dispatch(connectionDeclineRequestFailed(error.message)));
    };
}

export function declinePendingConnection(id) {
    return (dispatch, getState) => {
        const { token: { token } } = getState();
        dispatch(connectionDeclineRequest());
        fetch(`${serverUrl}/users/${id}/connection-requests/decline`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((result) => {
                if (result.status === 204) {
                    dispatch(connectionDeclineRequestSuccess(id));
                }
                result.json().then((json) => { throw new Error(json); });
            })
            .catch(error => dispatch(connectionDeclineRequestFailed(error.message)));
    };
}
