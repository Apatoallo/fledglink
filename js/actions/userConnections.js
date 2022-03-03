import { serverUrl } from '../configs/config';
import ToastComponent from '../shared/ToastComponent';

export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_FAILED = 'GET_USER_BY_ID_FAILED';
export const SEND_REQUEST_CONNECTION_SUCCESS = 'SEND_REQUEST_CONNECTION_SUCCESS';
export const GET_REQUEST_CONNECTION_SUCCESS = 'GET_REQUEST_CONNECTION_SUCCESS';
export const POST_DELETE_CONNECTION_SUCCESS = 'POST_DELETE_CONNECTION_SUCCESS';
export const POST_CANCEL_REQUEST_SUCCESS = 'POST_CANCEL_REQUEST_SUCCESS';
export const POST_ACCEPT_REQUEST_SUCCESS = 'POST_ACCEPT_REQUEST_SUCCESS';
export const SET_DEFAULT_CONNECTION_STATUS = 'SET_DEFAULT_CONNECTION_STATUS';
export const REQUEST_FAILED = 'REQUEST_FAILED';

function getUserById() {
    return {
        type: GET_USER_BY_ID,
    };
}

function setDefaultConnectionStatus() {
    return {
        type: SET_DEFAULT_CONNECTION_STATUS,
    };
}

function requestFailed(errorMessage) {
    return {
        type: REQUEST_FAILED,
        payload: errorMessage,
    };
}

export function postDeleteConnectionSuccess() {
    return {
        type: POST_DELETE_CONNECTION_SUCCESS,
    };
}

function postCancelConnectionSuccess() {
    return {
        type: POST_CANCEL_REQUEST_SUCCESS,
    };
}

export function postAcceptConnectionSuccess() {
    return {
        type: POST_ACCEPT_REQUEST_SUCCESS,
    };
}

function getUserByIdSuccess(user) {
    return {
        type: GET_USER_BY_ID_SUCCESS,
        payload: user,
    };
}

function getUserByIdFailed(error) {
    return {
        type: GET_USER_BY_ID_FAILED,
        payload: error,
    };
}

function sendRequestConnectionSuccess() {
    return {
        type: SEND_REQUEST_CONNECTION_SUCCESS,
    };
}

function getRequestConnectionSuccess(status) {
    return {
        type: GET_REQUEST_CONNECTION_SUCCESS,
        payload: status,
    };
}

function fetchGetConnectionRequest(userId, token) {
    return (dispatch, getState) => {
        dispatch(setDefaultConnectionStatus());
        const { user: { user: { id } } } = getState();
        fetch(`${serverUrl}/users/${userId}/connection-requests`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((result) => {
                if (result.status === 200) {
                    return result.json();
                }
                if (result.status === 404) {
                    dispatch(setDefaultConnectionStatus());
                }
                result.json().then((json) => { throw new Error(json); });
            })
            .then((result) => {
                const type = (result && result.receiver.id === id) ? 'receiver' : 'sender';
                if (result.status === 'finished') {
                    dispatch(getRequestConnectionSuccess(result.status));
                } else {
                    dispatch(getRequestConnectionSuccess(type));
                }
            })
            .catch((error) => {
                dispatch(getUserByIdFailed(error.message));
            });
    };
}

export function fetchUserById(token, id) {
    return (dispatch) => {
        dispatch(getUserById());
        fetch(`${serverUrl}/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((result) => {
                if (result.status === 200) {
                    return result.json();
                }
                throw new Error(result.json());
            })
            .then((result) => {
                dispatch(getUserByIdSuccess(result));
                dispatch(fetchGetConnectionRequest(result.id, token));
            })
            .catch(error => dispatch(getUserByIdFailed(error.message)));
    };
}

export function fetchSendRequest(token, id, acquaintance, qualities, notAcquaintance) {
    return (dispatch) => {
        dispatch(setDefaultConnectionStatus());
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
                    dispatch(sendRequestConnectionSuccess());
                }
                result.json().then((json) => { throw new Error(json.error); });
            })
            .catch(error => dispatch(requestFailed(error.message)));
    };
}

export function fetchCancelRequest(token, id) {
    return (dispatch) => {
        fetch(`${serverUrl}/users/${id}/connection-requests`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },

        })
            .then((result) => {
                if (result.status === 204) {
                    dispatch(postCancelConnectionSuccess());
                }
                result.json().then((json) => { throw new Error(json.error); });
            })
            .catch(error => dispatch(requestFailed(error.message)));
    };
}

export function fetchAcceptRequest(token, id, acquaintance, qualities, notAcquaintance) {
    return (dispatch) => {
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
                    dispatch(postAcceptConnectionSuccess());
                }
                result.json().then((json) => { throw new Error(json.error); });
            })
            .catch(error => dispatch(requestFailed(error.message)));
    };
}

export function fetchDeleteConnection(token, id) {
    return (dispatch) => {
        fetch(`${serverUrl}/users/${id}/connections`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },

        })
            .then((result) => {
                if (result.status === 204) {
                    dispatch(postDeleteConnectionSuccess());
                    ToastComponent('The user was deleted from your connections', 'success');
                }
                result.json().then((json) => { throw new Error(json.error); });
            })
            .catch(error => dispatch(requestFailed(error.message)));
    };
}
