import {
    GET_NOTIFICATIONS,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAIL,
    GET_NOTIFICATIONS_COUNT,
    GET_NOTIFICATIONS_COUNT_SUCCESS,
    GET_NOTIFICATIONS_COUNT_FAIL,
    PATCH_NOTIFICATION_IS_READ,
    PATCH_NOTIFICATION_IS_READ_SUCCESS,
    PATCH_NOTIFICATION_IS_READ_FAILED,
    SET_PUSH,
    DELETE_NOTIFICATION,
} from '../actions/notifications';
import PushEmitter from '../push/emitter/PushEmitter';

import {
    CONNECTION_ACCEPT_REQUEST_SUCCESS,
    CONNECTION_DECLINE_REQUEST_SUCCESS,
} from '../actions/userActions';

const initialState = {
    notificationList: [],
    notificationsCounts: {},
    error: '',
    range: [0, 10],
    canRequest: true,
    loading: false,
};

const sortNotifications = (a, b) => {
    if (a.updatedAt < b.updatedAt) {
        return 1;
    }
    if (a.updatedAt > b.updatedAt) {
        return -1;
    }
    return 0;
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_NOTIFICATIONS:
            return {
                ...state,
                loading: true,
            };
        case GET_NOTIFICATIONS_SUCCESS:
        let emptyResult;
            if(action.payload.notifications.length) {
                emptyResult = false
            } else {
                emptyResult = true
            }

            return {
                ...state,
                loading: false,
                canRequest: !emptyResult,
                range: action.payload.newNotification? [10, 19] : [state.range[0] + action.payload.notifications.length, state.range[1] + action.payload.notifications.length],
                notificationList: action.payload.newNotification ? [...action.payload.notifications] : [...state.notificationList, ...action.payload.notifications].sort(sortNotifications),
            };
        case SET_PUSH: {
            const updatingItemNotification = state.notificationList.findIndex(item => item.id === action.payload.id);
            if (~updatingItemNotification) {
                const notifications = [...state.notificationList];
                if (notifications[updatingItemNotification].isRead) {
                    PushEmitter.instance.addNotification(action.payload.type, action.payload.id);
                }
                notifications[updatingItemNotification] = { ...notifications[updatingItemNotification], ...action.payload };
                return {
                    ...state,
                    notificationList: [...notifications],
                };
            }
            PushEmitter.instance.addNotification(action.payload.type, action.payload.id);
            return {
                ...state,
                notificationList: [...state.notificationList, action.payload].sort(sortNotifications),
            };
        }
        case DELETE_NOTIFICATION: {
            PushEmitter.instance.removeNotification(action.payload.type, action.payload.id);
            return {
                ...state,
                notificationList: [...state.notificationList].filter(notification => notification.id !== action.payload.id),
            };
        }

        case GET_NOTIFICATIONS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case GET_NOTIFICATIONS_COUNT:
            return {
                ...state,
                loading: true,
            };

        case GET_NOTIFICATIONS_COUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                notificationsCounts: action.payload,
            };

        case CONNECTION_ACCEPT_REQUEST_SUCCESS: {
            const changedItemIndex = state.notificationList.findIndex(item => item.resource && item.resource.sender && item.resource.sender.id === action.payload.sender);
            if (~changedItemIndex) {
                const notifications = [...state.notificationList];
                notifications[changedItemIndex].resource.status = 'finished';
                return {
                    ...state,
                    notificationList: [...notifications],
                };
            }
            return {
                ...state,
            };
        }

        case CONNECTION_DECLINE_REQUEST_SUCCESS: {
            const changedItemIndex = state.notificationList.findIndex(item => item.resource && item.resource.sender && item.resource.sender.id === action.payload);
            if (~changedItemIndex) {
                const notifications = [...state.notificationList];
                notifications.splice(changedItemIndex, 1);
                return {
                    ...state,
                    notificationList: [...notifications],
                };
            }
            return {
                ...state,
            };
        }

        case GET_NOTIFICATIONS_COUNT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case PATCH_NOTIFICATION_IS_READ:
            return {
                ...state,
                loading: true,
            };

        case PATCH_NOTIFICATION_IS_READ_SUCCESS: {
            const changedItemIndex = state.notificationList.findIndex(item => item.id === action.payload);
            if (~changedItemIndex) {
                const notifications = [...state.notificationList];
                notifications[changedItemIndex].isRead = true;
                return {
                    notificationList: [...notifications],
                    loading: false,
                };
            }
            return {
                ...state,
                loading: false,
            };
        }

        case PATCH_NOTIFICATION_IS_READ_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}
