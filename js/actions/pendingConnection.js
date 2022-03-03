import { stringify } from 'query-string';
import { serverUrl } from '../configs/config';

import {
    addPendingIds,
    getUsersId,
    getUsersSuccess,
    getPendingUsersFailed,
} from './userActions';

export const GET_PENDING_USER_LIST = 'GET_PENDING_USER_LIST';
export const GET_PENDING_USER_LIST_SUCCESS = 'GET_PENDING_USER_LIST_SUCCESS';
export const GET_PENDING_USER_LIST_FAILED = 'GET_PENDING_USER_LIST_FAILED';
export const SET_USERS_COUNT = 'SET_USERS_COUNT';
export const CONNECTION_REQUEST_SEND = 'CONNECTION_REQUEST_SEND';
export const CREATE_PENDING_CONNECTION_REQUEST_SUCCESS = 'CREATE_PENDING_CONNECTION_REQUEST_SUCCESS';
export const CONNECTION_REQUEST_FAILED = 'CONNECTION_REQUEST_FAILED';
export const CONNECTION_ACCEPT_REQUEST_PENDING = 'CONNECTION_ACCEPT_REQUEST_PENDING';
export const CONNECTION_ACCEPT_REQUEST_SUCCESS = 'CONNECTION_ACCEPT_REQUEST_SUCCESS';
export const CONNECTION_DECLINE_REQUEST_PENDING = 'CONNECTION_DECLINE_REQUEST_PENDING';
export const CONNECTION_DECLINE_REQUEST_SUCCESS = 'CONNECTION_DECLINE_REQUEST_SUCCESS';
export const CONNECTION_ACCEPT_REQUEST_PENDING_FAILED = 'CONNECTION_ACCEPT_REQUEST_PENDING_FAILED';
export const CONNECTION_DECLINE_REQUEST_PENDING_FAILED = 'CONNECTION_DECLINE_REQUEST_PENDING_FAILED';
export const SET_USER_ID = 'SET_USER_ID';

function getPendingUsers() {
    return {
        type: GET_PENDING_USER_LIST,
    };
}

export function setUserId(tempUser) {
    return {
        type: SET_USER_ID,
        payload: tempUser,
    };
}

function connectionRequestSend() {
    return {
        type: CONNECTION_REQUEST_SEND,
    };
}

function connectionRequestSuccess(id) {
    return {
        type: CREATE_PENDING_CONNECTION_REQUEST_SUCCESS,
        payload: id,
    };
}

function connectionRequestFailed(error) {
    return {
        type: CONNECTION_REQUEST_FAILED,
        payload: error,
    };
}

function connectionAcceptRequest() {
    return {
        type: CONNECTION_ACCEPT_REQUEST_PENDING,
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

function connectionAcceptRequestFailed(error) {
    return {
        type: CONNECTION_ACCEPT_REQUEST_PENDING_FAILED,
        payload: error,
    };
}

function connectionAcceptRequestSuccess(connection) {
    return {
        type: CONNECTION_ACCEPT_REQUEST_SUCCESS,
        payload: connection,
    };
}

function connectionDeclineRequestSuccess(id) {
    return {
        type: CONNECTION_DECLINE_REQUEST_SUCCESS,
        payload: id,
    };
}

let userNameForFilter = '';
export function fetchGetUserPendingConnection(token, text) {
    const shouldRangeChange = userNameForFilter !== text;
    return (dispatch, getState) => {
        dispatch(getPendingUsers());
        let newRange = [];
        const {
            userStore: { pendingConnectionsIds },
        } = getState();
        if (shouldRangeChange) {
            newRange = [0, 10];
        } else {
            newRange = [pendingConnectionsIds.length, pendingConnectionsIds.length + 10];
        }
        const query = {
            range: JSON.stringify(newRange),
        };
        if (text) Object.assign(query, { search: text });
        fetch(`${serverUrl}/users/me/connection-requested-users?${stringify(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(result => result.json())
            .then((result) => {
                if (!result.message) {
                    userNameForFilter = text;
                    const userIds = getUsersId(result);
                    dispatch(getUsersSuccess(result));
                    return dispatch(addPendingIds(userIds, shouldRangeChange));
                }
                throw new Error({ message: 'Something went wrong!' });
            })
            .catch(error => dispatch(getPendingUsersFailed(error.message)));
    };
}

export function createPendingConnection(token, id, acquaintance, qualities, notAcquaintance) {
    return (dispatch) => {
        dispatch(connectionRequestSend());
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

export function acceptPendingConnection(token, id, acquaintance, qualities, notAcquaintance) {
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
