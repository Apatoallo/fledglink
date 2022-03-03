import {
    GET_PENDING_USER_LIST,
    GET_PENDING_USER_LIST_SUCCESS,
    GET_PENDING_USER_LIST_FAILED,
    SET_USERS_COUNT,
    CONNECTION_REQUEST_SEND,
    CREATE_PENDING_CONNECTION_REQUEST_SUCCESS,
    CONNECTION_REQUEST_FAILED,
    CONNECTION_ACCEPT_REQUEST_PENDING,
    CONNECTION_ACCEPT_REQUEST_SUCCESS,
    CONNECTION_ACCEPT_REQUEST_PENDING_FAILED,
    CONNECTION_DECLINE_REQUEST_PENDING_FAILED,
    CONNECTION_DECLINE_REQUEST_PENDING,
    CONNECTION_DECLINE_REQUEST_SUCCESS,
    ADD_PENDING_IDS,
} from '../actions/userActions';

import {
    DELETE_PENDING_INVITATION_ITEM,
    SET_NEW_CONNECTION_REQUEST,
} from '../actions/notifications';

import { SET_DEFAULT_CONNECTION_STATUS } from '../actions/userConnections';

const initialState = {
    pendingConnection: [],
    error: '',
    tempUser: {},
    loading: false,
    disabledAcceptButton: false,
    usersCount: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PENDING_USER_LIST:
            return {
                ...state,
                pendingConnection: [...state.pendingConnection],
                loading: true,
                error: '',
            };

        case GET_PENDING_USER_LIST_SUCCESS:
            return {
                ...state,
                pendingConnection: [...action.payload],
                loading: false,
            };

        case GET_PENDING_USER_LIST_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        case CONNECTION_ACCEPT_REQUEST_PENDING:
        case CONNECTION_REQUEST_SEND:
            return {
                ...state,
                disabledAcceptButton: true,
                loading: true,
            };
        case ADD_PENDING_IDS:
        case SET_DEFAULT_CONNECTION_STATUS:
        case CONNECTION_REQUEST_FAILED: {
            return {
                ...state,
                loading: false,
            };
        }

        case SET_NEW_CONNECTION_REQUEST:
        case CREATE_PENDING_CONNECTION_REQUEST_SUCCESS: {
            const changeItemIndex = state.pendingConnection.findIndex(item => item.user.id === action.payload.id);
            if (~changeItemIndex) {
                const connectionsList = [...state.pendingConnection];
                connectionsList.push(action.payload);
                return {
                    ...state,
                    pendingConnection: [...state.pendingConnection],
                    loading: false,
                };
            }
            return {
                ...state,
                loading: false,
            };
        }

        case CONNECTION_ACCEPT_REQUEST_SUCCESS: {
            const foundItemIndex = state.pendingConnection.findIndex(item => item.user.id === action.payload.sender);
            if (~foundItemIndex) {
                const connectionsList = [...state.pendingConnection];
                connectionsList.splice(foundItemIndex, 1);
                return {
                    ...state,
                    pendingConnection: [...connectionsList],
                    disabledAcceptButton: false,
                    usersCount: state.usersCount - 1,
                    loading: false,
                };
            }
            return {
                ...state,
                loading: false,
            };
        }
        case DELETE_PENDING_INVITATION_ITEM: {
            const connections = [...state.pendingConnection];
            connections.splice(action.payload, 1);
            return {
                ...state,
                pendingConnection: [...connections],
            };
        }
        case CONNECTION_DECLINE_REQUEST_PENDING:
            return {
                ...state,
                disabledAcceptButton: true,
                loading: true,
            };

        case CONNECTION_ACCEPT_REQUEST_PENDING_FAILED:
            return {
                ...state,
                disabledAcceptButton: false,
                loading: false,
                error: action.payload,
            };

        case CONNECTION_DECLINE_REQUEST_PENDING_FAILED:
            return {
                ...state,
                disabledAcceptButton: false,
                loading: false,
                error: action.payload,
            };

        case CONNECTION_DECLINE_REQUEST_SUCCESS: {
            const changeItemIndex = state.pendingConnection.findIndex(item => item.user.id === action.payload);
            if (~changeItemIndex) {
                const connectionsList = [...state.pendingConnection];
                connectionsList.splice(changeItemIndex, 1);
                return {
                    ...state,
                    pendingConnection: [...connectionsList],
                    disabledAcceptButton: false,
                    loading: false,
                    usersCount: state.usersCount - 1,
                };
            }
            return {
                ...state,
                loading: false,
            };
        }

        case SET_USERS_COUNT:
            return {
                ...state,
                usersCount: action.payload,
            };

        default:
            return state;
    }
}
