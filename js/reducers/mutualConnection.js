import {
    GET_MUTUAL_USER_LIST,
    GET_MUTUAL_USER_LIST_SUCCESS,
    GET_MUTUAL_USER_LIST_FAILED,
    SET_USERS_COUNT,
    CONNECTION_REQUEST,
    CONNECTION_REQUEST_SUCCESS,
    SET_USER_ID,
    CONNECTION_REQUEST_FAILED,
} from '../actions/mutualConnections';

import {
    SET_NEW_CONNECTION_REQUEST,
} from '../actions/notifications';
import PushEmitter from '../push/emitter/PushEmitter';

const initialState = {
    mutualConnection: [],
    usersCount: 0,
    range: [0, 9],
    error: '',
    loading: false,
    tempUser: {},
    disabledAcceptButton: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MUTUAL_USER_LIST:
            return {
                ...state,
                mutualConnection: [...state.mutualConnection],
                loading: true,
            };
        case CONNECTION_REQUEST:
            return {
                ...state,
                disabledAcceptButton: true,
            };
        case SET_USER_ID:
            return {
                ...state,
                tempUser: action.payload,
            };
        case CONNECTION_REQUEST_FAILED:
            return {
                ...state,
                disabledAcceptButton: false,
                error: action.payload,
            };
        case SET_NEW_CONNECTION_REQUEST:
        case CONNECTION_REQUEST_SUCCESS: {
            const mutualConnection = new Array(...state.mutualConnection);
            let deletingKey;
            deletingKey = mutualConnection.findIndex((item, key) => item.user.id === action.payload);
            if(~deletingKey) {
                mutualConnection.splice(deletingKey, 1);
                return {
                    ...state,
                    mutualConnection: [...mutualConnection],
                    disabledAcceptButton: false,
                    range: [state.range[0] - 1, state.range[1] - 1],
                    usersCount: state.usersCount - 1,
                };
            }
            PushEmitter.instance.addNotification(action.payload.type, action.payload.id);
            return {
                ...state,
            }
        }
        case GET_MUTUAL_USER_LIST_SUCCESS:
            const newUsers = [];
            if (action.payload.length) {
                action.payload.map((item) => {
                    newUsers.push({ user: { ...item } });
                });
            }
            return {
                ...state,
                mutualConnection: [...state.mutualConnection, ...newUsers],
                range: [state.range[0] + 10, state.range[1] + 10],
                loading: false,
            };
        case SET_USERS_COUNT:
            return {
                ...state,
                usersCount: action.payload,
            };
        case GET_MUTUAL_USER_LIST_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}
