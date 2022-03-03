import { stringify } from 'query-string';
import { serverUrl } from '../configs/config';
import ToastComponent from '../shared/ToastComponent';

export const GET_MUTUAL_USER_LIST = 'GET_MUTUAL_USER_LIST';
export const GET_MUTUAL_USER_LIST_SUCCESS = 'GET_MUTUAL_USER_LIST_SUCCESS';
export const GET_MUTUAL_USER_FAILED = 'GET_MUTUAL_USER_FAILED';

export const GET_PENDING_USER_LIST = 'GET_PENDING_USER_LIST';
export const GET_PENDING_USER_LIST_SUCCESS = 'GET_PENDING_USER_LIST_SUCCESS';
export const GET_PENDING_USER_LIST_FAILED = 'GET_PENDING_USER_LIST_FAILED';

export const CONNECTION_REQUEST_SEND = 'CONNECTION_REQUEST_SEND';
export const CREATE_PENDING_CONNECTION_REQUEST_SUCCESS = 'CREATE_PENDING_CONNECTION_REQUEST_SUCCESS';
export const CONNECTION_REQUEST_FAILED = 'CONNECTION_REQUEST_FAILED';

export const CONNECTION_ACCEPT_REQUEST_PENDING = 'CONNECTION_ACCEPT_REQUEST_PENDING';
export const CONNECTION_ACCEPT_REQUEST_SUCCESS = 'CONNECTION_ACCEPT_REQUEST_SUCCESS';

export const CONNECTION_DECLINE_REQUEST_PENDING = 'CONNECTION_DECLINE_REQUEST_PENDING';
export const CONNECTION_DECLINE_REQUEST_SUCCESS = 'CONNECTION_DECLINE_REQUEST_SUCCESS';

export const CONNECTION_ACCEPT_REQUEST_PENDING_FAILED = 'CONNECTION_ACCEPT_REQUEST_PENDING_FAILED';
export const CONNECTION_DECLINE_REQUEST_PENDING_FAILED = 'CONNECTION_DECLINE_REQUEST_PENDING_FAILED';

export const ADD_MUTUAL_IDS = 'ADD_MUTUAL_IDS';
export const ADD_PENDING_IDS = 'ADD_PENDING_IDS';
export const ADD_CONNECTION_IDS = 'ADD_CONNECTION_IDS';
export const ADD_OTHER_CONNECTION_IDS = 'ADD_OTHER_CONNECTION_IDS';
export const SET_OTHER_CONNECTION_IDS = 'SET_OTHER_CONNECTION_IDS';

export const SET_NEW_USERS = 'SET_NEW_USERS';

export const GET_CONNECTIONS_USER_LIST = 'GET_CONNECTIONS_USER_LIST';
export const GET_CONNECTIONS_USER_LIST_SUCCESS = 'GET_CONNECTIONS_USER_LIST_SUCCESS';
export const GET_CONNECTIONS_USER_LIST_FAILED = 'GET_CONNECTIONS_USER_LIST_FAILED';

function addMutualIds(ids) {
    return {
        type: ADD_MUTUAL_IDS,
        payload: ids,
    };
}

export function addPendingIds(ids, newUsers) {
    return {
        type: ADD_PENDING_IDS,
        payload: { ids, newUsers },
    };
}

function getPendingUsers() {
    return {
        type: GET_PENDING_USER_LIST,
    };
}

function getUsersSuccess(list) {
    return {
        type: SET_NEW_USERS,
        payload: list,
    };
}

function getPendingUsersFailed(error) {
    return {
        type: GET_PENDING_USER_LIST_FAILED,
        payload: error,
    };
}

function getMutualUsers() {
    return {
        type: GET_MUTUAL_USER_LIST,
    };
}

function addConnectionIds(ids, newUsers) {
    return {
        type: ADD_CONNECTION_IDS,
        payload: { ids, newUsers },
    };
}

function addOtherConnectionIds(ids, newUsers) {
    return {
        type: ADD_OTHER_CONNECTION_IDS,
        payload: { ids, newUsers },
    };
}

function setOtherConnectionIds(ids, isAddIds, isReplaceIds) {
    return {
        type: SET_OTHER_CONNECTION_IDS,
        payload: { ids, isAddIds, isReplaceIds },
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

function connectionRequest() {
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

function getUserListFailed(error) {
    return {
        type: GET_MUTUAL_USER_LIST_FAILED,
        payload: error,
    };
}

export function getUsersId(array) {
    const userIds = [];
    array.map(item => userIds.push(item.id));
    return userIds;
}

function getUsers(array) {
    const users = [];
    const ids = [];
    array.map((item) => {
        users.push(item.user);
        ids.push(item.user.id);
        return item;
    });
    return { users, ids };
}


function getUserList() {
    return {
        type: GET_CONNECTIONS_USER_LIST,
    };
}

function getUserListSuccess(list, shouldRangeChange) {
    return {
        type: GET_CONNECTIONS_USER_LIST_SUCCESS,
        payload: { list, shouldRangeChange },
    };
}

let prevSelfText = '';
let prevSelfId = '';
export function fetchGetUserConnectionsList(token, text = '', userId = 'me') {
    const shouldRangeReset = prevSelfText !== text;
    const isOldUserConnectionsList = prevSelfId === userId;
    return (dispatch, getState) => {
        dispatch(getUserList());
        let newRange = [];
        const { userStore: { userConnectionsIds } } = getState();
        if (shouldRangeReset || !isOldUserConnectionsList) {
            newRange = [0, 10];
        } else {
            newRange = [userConnectionsIds.length, userConnectionsIds.length + 10];
        }
        const query = {
            range: JSON.stringify(newRange),
        };
        if (text) Object.assign(query, { search: text });
        return fetch(`${serverUrl}/users/${userId}/connections?${stringify(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(result => result.json())
            .then((result) => {
                if (!result.message) {
                    prevSelfId = userId;
                    prevSelfText = text;
                    const userList = getUsers(result);
                    dispatch(getUsersSuccess(userList.users));
                    return dispatch(addConnectionIds(userList.ids, shouldRangeReset));
                }
            })
            .catch(error => dispatch(getUserListFailed(error.message)));
    };
}

let prevTextOther = '';
let prevIdOther = '';
export function fetchGetOtherUserConnectionsList(token, text = '', userId) {
    const shouldRangeReset = prevTextOther !== text;
    const isSameId = prevIdOther === userId;
    return (dispatch, getState) => {
        dispatch(getUserList());
        let newRange = [];
        const { userStore: { connectionListOtherUser } } = getState();
        if (shouldRangeReset || !isSameId) {
            newRange = [0, 10];
        } else {
            newRange = [connectionListOtherUser.length, connectionListOtherUser.length + 10];
        }
        const query = {
            range: JSON.stringify(newRange),
        };
        if (text) Object.assign(query, { search: text });
        return fetch(`${serverUrl}/users/${userId}/connections?${stringify(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(result => result.json())
            .then((result) => {
                if (!result.message) {
                    prevIdOther = userId;
                    prevTextOther = text;
                    const userList = getUsers(result);
                    dispatch(getUsersSuccess(userList.users));
                    return dispatch(setOtherConnectionIds(userList.ids, shouldRangeReset || isSameId, !isSameId));
                }
            })
            .catch(error => dispatch(getUserListFailed(error.message)));
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

export function fetchGetUserMutualConnection(token) {
    return (dispatch, getState) => {
        dispatch(getMutualUsers());
        const { userStore: { mutualConnectionsIds } } = getState();
        const query = {
            range: JSON.stringify([mutualConnectionsIds.length, mutualConnectionsIds.length + 9]),
        };
        fetch(`${serverUrl}/users/me/mutual-connections?${stringify(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(result => result.json())
            .then((result) => {
                if (result.message) {
                    ToastComponent(result.message);
                    return dispatch(getUserListFailed(result.message));
                }
                const userIds = getUsersId(result);
                dispatch(getUsersSuccess(result));
                return dispatch(addMutualIds(userIds));
            })
            .catch(error => dispatch(getUserListFailed(error)));
    };
}

export function createPendingConnection(token, id, acquaintance, qualities, notAcquaintance) {
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
