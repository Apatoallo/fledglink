import { stringify } from 'query-string';
import { times } from 'lodash';
import { serverUrl } from '../configs/config';
import ToastComponent from '../shared/ToastComponent';

export const GET_MUTUAL_USER_LIST = 'GET_MUTUAL_USER_LIST';
export const GET_MUTUAL_USER_LIST_SUCCESS = 'GET_MUTUAL_USER_LIST_SUCCESS';
export const GET_MUTUAL_USER_LIST_FAILED = 'GET_MUTUAL_USER_LIST_FAILED';
export const SET_USERS_COUNT = 'SET_USERS_COUNT';
export const CONNECTION_REQUEST = 'CONNECTION_REQUEST';
export const CONNECTION_REQUEST_SUCCESS = 'CONNECTION_REQUEST_SUCCESS';
export const CONNECTION_REQUEST_FAILED = 'CONNECTION_REQUEST_FAILED';
export const SET_USER_ID = 'SET_USER_ID';

function getUserList() {
    return {
        type: GET_MUTUAL_USER_LIST,
    };
}

function getUserListSuccess(list) {
    return {
        type: GET_MUTUAL_USER_LIST_SUCCESS,
        payload: list,
    };
}

function connectionRequest() {
    return {
        type: CONNECTION_REQUEST,
    };
}

function connectionRequestSuccess(id) {
    return {
        type: CONNECTION_REQUEST_SUCCESS,
        payload: id,
    };
}

function connectionRequestFailed(error) {
    return {
        type: CONNECTION_REQUEST_FAILED,
        payload: error,
    };
}

export function setUserId(tempUser) {
    return {
        type: SET_USER_ID,
        payload: tempUser,
    };
}

function setUsersCount(count) {
    return {
        type: SET_USERS_COUNT,
        payload: count,
    };
}

function getUserListFailed(error) {
    return {
        type: GET_MUTUAL_USER_LIST_FAILED,
        payload: error,
    };
}

export function fetchGetUserMutualConnection(token) {
    return (dispatch, getState) => {
        dispatch(getUserList());
        const { mutualConnections: { range } } = getState();
        const query = {
            range: JSON.stringify(range),
        };
        fetch(`${serverUrl}/users/me/mutual-connections?${stringify(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((result) => {
                if (result.status === 200) {
                    const ranges = result.headers.map['content-range'][0].split('/');
                    dispatch(setUsersCount(Number(ranges[1])));
                }
                return result.json();
            })
            .then((result) => {
                if (result.message) {
                    ToastComponent(result.message);
                    return dispatch(getUserListFailed(result.message));
                }
                return dispatch(getUserListSuccess(result));
            })
            .catch(error => dispatch(getUserListFailed(error.message)));
    };
}

export function acceptConnection(token, id, acquaintance, qualities, notAcquaintance) {
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
