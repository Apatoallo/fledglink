import { stringify } from 'query-string';
import { serverUrl } from '../configs/config';
import PushEmitter, { pushTypes } from '../push/emitter/PushEmitter';

export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAIL = 'GET_NOTIFICATIONS_FAIL';
export const GET_NOTIFICATIONS_COUNT = 'GET_NOTIFICATIONS_COUNT';
export const GET_NOTIFICATIONS_COUNT_SUCCESS = 'GET_NOTIFICATIONS_COUNT_SUCCESS';
export const GET_NOTIFICATIONS_COUNT_FAIL = 'GET_NOTIFICATIONS_COUNT_FAIL';
export const PATCH_NOTIFICATION_IS_READ = 'PATCH_NOTIFICATION_IS_READ';
export const PATCH_NOTIFICATION_IS_READ_SUCCESS = 'PATCH_NOTIFICATION_IS_READ_SUCCESS';
export const PATCH_NOTIFICATION_IS_READ_FAILED = 'PATCH_NOTIFICATION_IS_READ_FAILED';
export const SET_PUSH = 'SET_PUSH';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';
export const DELETE_PENDING_INVITATION_ITEM = 'DELETE_PENDING_INVITATION_ITEM';
export const SET_NEW_CONNECTION = 'SET_NEW_CONNECTION';
export const SET_NEW_CONNECTION_REQUEST = 'SET_NEW_CONNECTION_REQUEST';
export const DECRIMENT_PENDING = 'DECRIMENT_PENDING';

function getNotificationsCounts() {
    return {
        type: GET_NOTIFICATIONS_COUNT,
    };
}

function getNotificationsCountsSuccess(count) {
    return {
        type: GET_NOTIFICATIONS_COUNT_SUCCESS,
        payload: count,
    };
}

function getNotificationsCountsFail(error) {
    return {
        type: GET_NOTIFICATIONS_COUNT_FAIL,
        payload: error,
    };
}

function getNotifications() {
    return {
        type: GET_NOTIFICATIONS,
    };
}

function getNotificationsSuccess(notifications, newNotification) {
    return {
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: { notifications, newNotification },
    };
}

function getNotificationsFail(error) {
    return {
        type: GET_NOTIFICATIONS_FAIL,
        payload: error,
    };
}

function markedReadingNotification() {
    return {
        type: PATCH_NOTIFICATION_IS_READ,
    };
}

function markedReadingNotificationSuccess(id) {
    return {
        type: PATCH_NOTIFICATION_IS_READ_SUCCESS,
        payload: id,
    };
}

function markedReadingNotificationfailed(error) {
    return {
        type: PATCH_NOTIFICATION_IS_READ_FAILED,
        payload: error,
    };
}

function setPush(data) {
    return {
        type: SET_PUSH,
        payload: data,
    };
}

function deleteNotification(data) {
    return {
        type: DELETE_NOTIFICATION,
        payload: data,
    };
}

export function fetchNotificationsCounts(token) {
    return (dispatch) => {
        dispatch(getNotificationsCounts());
        fetch(`${serverUrl}/users/me/notifications/count`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(result => result.json())
            .then((result) => {
                if (!result.message) {
                    PushEmitter.instance.cache._recoverCache(result);
                    dispatch(getNotificationsCountsSuccess(result));
                } else {
                    dispatch(getNotificationsCountsFail(result.message));
                }
            })
            .catch((error) => {
                dispatch(getNotificationsCountsFail(error.message));
            });
    };
}

export function fetchNotificationsList(token, newNotification) {
    return (dispatch, getState) => {
        dispatch(getNotifications());
        const { notifications: { range } } = getState();
        const query = {
            sort: JSON.stringify(['updatedAt', 'desc']),
            range: JSON.stringify(newNotification ? [0, 9] : range),
        };
        fetch(`${serverUrl}/users/me/notifications?${stringify(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(result => result.json())
            .then((result) => {
                if (!result.message) {
                    dispatch(getNotificationsSuccess(result, newNotification));
                    // fetch(`${serverUrl}/users/me/notifications/read-all`, {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         Authorization: `Bearer ${token}`,
                    //     },
                    // })
                    //     .then(result => console.log(result));
                } else {
                    dispatch(getNotificationsFail(result.message));
                }
            })
            .catch((error) => {
                dispatch(getNotificationsFail(error.message));
            });
    };
}

export function fetchMarkedNotificationRead(token, id) {
    return (dispatch) => {
        dispatch(markedReadingNotification());
        fetch(`${serverUrl}/users/me/notifications/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                isRead: true,
            }),
        })
            .then(result => result.json())
            .then((result) => {
                if (!result.message) {
                    PushEmitter.instance.removeNotification(result.type, result.id);
                    dispatch(markedReadingNotificationSuccess(id));
                } else {
                    dispatch(markedReadingNotificationfailed(result.message));
                }
            })
            .catch((error) => {
                dispatch(markedReadingNotificationfailed(error.message));
            });
    };
}

function deletePendingInvitationItem(index) {
    return {
        type: DELETE_PENDING_INVITATION_ITEM,
        payload: index,
    };
}

function decrementCount() {
    return {
        type: DECRIMENT_PENDING,
    };
}

function newConnection(data) {
    return {
        type: SET_NEW_CONNECTION,
        payload: data,
    };
}

function newConnectionRequest(data) {
    return {
        type: SET_NEW_CONNECTION_REQUEST,
        payload: data,
    };
}

export function setPushNotification(data) {
    return (dispatch, getState) => {
        if (data.isRemoved) {
            if (data.type === pushTypes.userConnectionRequest) {
                dispatch(decrementCount(data));
            }
            return dispatch(deleteNotification(data));
        }
        dispatch(setPush(data));
        switch (data.type) {
            case pushTypes.userConnectionRequestAccepted: {
                const { pendingConnections: { pendingConnection } } = getState();
                const itemConnection = pendingConnection.findIndex(item => item.user.id === data.target.id);
                if (~itemConnection) {
                    dispatch(deletePendingInvitationItem(itemConnection));
                }
                return dispatch(newConnection(data));
            }
            case pushTypes.userConnectionRequest: {
                dispatch(setPush(data));
                return dispatch(newConnectionRequest(data));
            }


            default:
                break;
        }
    };
}
