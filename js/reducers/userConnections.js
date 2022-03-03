import {
    GET_USER_BY_ID,
    GET_USER_BY_ID_SUCCESS,
    GET_USER_BY_ID_FAILED,
    SEND_REQUEST_CONNECTION_SUCCESS,
    GET_REQUEST_CONNECTION_SUCCESS,
    POST_CANCEL_REQUEST_SUCCESS,
    POST_DELETE_CONNECTION_SUCCESS,
    POST_ACCEPT_REQUEST_SUCCESS,
    SET_DEFAULT_CONNECTION_STATUS,
    REQUEST_FAILED,
} from '../actions/userConnections';

import {
    CREATE_PENDING_CONNECTION_REQUEST_SUCCESS,
    CONNECTION_ACCEPT_REQUEST_SUCCESS,
} from '../actions/userActions';

const initialState = {
    user: {},
    loading: true,
    error: '',
    connectionStatus: 'default',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_BY_ID:
            return {
                ...state,
                user: {},
                loading: true,
            };
        case GET_USER_BY_ID_SUCCESS:
            return {
                ...state,
                user: action.payload,
            };
        case GET_USER_BY_ID_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        case CONNECTION_ACCEPT_REQUEST_SUCCESS:
        case POST_ACCEPT_REQUEST_SUCCESS:
            return {
                ...state,
                connectionStatus: 'finished',
            };

        case CREATE_PENDING_CONNECTION_REQUEST_SUCCESS:
        case SEND_REQUEST_CONNECTION_SUCCESS:
            return {
                ...state,
                connectionStatus: 'sender',
            };
        case REQUEST_FAILED:
            return {
                ...state,
                error: action.payload,
            };
        case GET_REQUEST_CONNECTION_SUCCESS:
            return {
                ...state,
                connectionStatus: action.payload,
                loading: false,
            };
        case SET_DEFAULT_CONNECTION_STATUS:
        case POST_CANCEL_REQUEST_SUCCESS:
        case POST_DELETE_CONNECTION_SUCCESS:
            return {
                ...state,
                connectionStatus: 'default',
            };
        default:
            return state;
    }
}
