import { merge, uniq } from 'lodash';
import {
    GET_MUTUAL_USER_LIST,
    ADD_MUTUAL_IDS,
    GET_MUTUAL_USER_FAILED,
    CREATE_PENDING_CONNECTION_REQUEST_SUCCESS,
    CONNECTION_ACCEPT_REQUEST_SUCCESS,
    CONNECTION_DECLINE_REQUEST_SUCCESS,
    ADD_PENDING_IDS,
    ADD_CONNECTION_IDS,
    ADD_OTHER_CONNECTION_IDS,
    SET_OTHER_CONNECTION_IDS,
    SET_NEW_USERS,
} from '../actions/userActions';
import { SET_USER } from '../actions/user';
import { GET_USER_BY_ID_SUCCESS } from '../actions/userConnections';

import { SET_NEW_USERS_SEARCH } from '../actions/userSearch';

const initialState = {
    userContainers: {},
    userConnectionsIds: [],
    mutualConnectionsIds: [],
    pendingConnectionsIds: [],
    connectionListIds: [],
    connectionListOtherUser: [],
    loading: true,
    pendingConnectionsLoaded: false,
    error: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_NEW_USERS_SEARCH:
        case SET_NEW_USERS: {
            const updatingUsers = {};
            action.payload.map((item) => {
                updatingUsers[item.id] = merge({}, state.userContainers[item.id], item);
                return item;
            });
            return {
                ...state,
                userContainers: {
                    ...state.userContainers,
                    ...updatingUsers,
                },
                loading: false,
            };
        }
        case GET_USER_BY_ID_SUCCESS: {
            const updatingUsers = {};
            const item = action.payload;
            updatingUsers[item.id] = merge({}, state.userContainers[item.id], item);
            return {
                ...state,
                userContainers: {
                    ...state.userContainers,
                    ...updatingUsers,
                },
                loading: false,
            };
        }
        case GET_MUTUAL_USER_LIST:
            return {
                ...state,
                loading: true,
            };
        case ADD_MUTUAL_IDS:
            return {
                ...state,
                loading: false,
                mutualConnectionsIds: uniq([...state.mutualConnectionsIds, ...action.payload]),
            };
        case ADD_PENDING_IDS:
            return {
                ...state,
                loading: false,
                pendingConnectionsIds: action.payload.newUsers ? [...action.payload.ids] : uniq([...state.pendingConnectionsIds, ...action.payload.ids]),
                pendingConnectionsLoaded: true,
            };
        case GET_MUTUAL_USER_FAILED: {
            return {
                ...state,
                loading: false,
            };
        }
        case CREATE_PENDING_CONNECTION_REQUEST_SUCCESS: {
            const id = action.payload;
            const updatingUsers = {};
            updatingUsers[id] = merge({}, state.userContainers[id], { isConnectionRequested: true });
            return {
                ...state,
                mutualConnectionsIds: state.mutualConnectionsIds.filter(item => item !== id),
                pendingConnectionsIds: [...state.pendingConnectionsIds, id],
                loading: false,
                userContainers: {
                    ...state.userContainers,
                    ...updatingUsers,
                },
            };
        }
        case CONNECTION_DECLINE_REQUEST_SUCCESS:
            return {
                ...state,
                pendingConnectionsIds: state.pendingConnectionsIds.filter(item => item !== action.payload),
                loading: false,
            };
        case CONNECTION_ACCEPT_REQUEST_SUCCESS: {
            const id = action.payload.sender;
            const updatingUsers = {};
            updatingUsers[id] = merge({}, state.userContainers[id], { isConnected: true });
            return {
                ...state,
                userConnectionsIds: [...state.userConnectionsIds, action.payload.sender],
                pendingConnectionsIds: state.pendingConnectionsIds.filter(item => item !== action.payload.sender),
                loading: false,
                userContainers: {
                    ...state.userContainers,
                    ...updatingUsers,
                },
            };
        }
        case ADD_CONNECTION_IDS: {
            const updatingUsers = {};
            action.payload.ids.forEach((item) => {
                updatingUsers[item] = merge({}, state.userContainers[item], { isConnected: true });
            });
            return {
                ...state,
                userConnectionsIds: action.payload.newUsers ? [...action.payload.ids] : uniq([...state.userConnectionsIds, ...action.payload.ids]),
                userContainers: {
                    ...state.userContainers,
                    ...updatingUsers,
                },
            };
        }
        case ADD_OTHER_CONNECTION_IDS:
            return {
                ...state,
                connectionListOtherUser: action.payload.newUsers ? [...action.payload.ids] : uniq([...state.connectionListOtherUser, ...action.payload.ids]),
            };
        case SET_OTHER_CONNECTION_IDS: {
            if (action.payload.isAddIds) {
                return {
                    ...state,
                    connectionListOtherUser: uniq([...state.connectionListOtherUser, ...action.payload.ids]),
                };
            }
            if (action.payload.isReplaceIds) {
                return {
                    ...state,
                    connectionListOtherUser: uniq([...action.payload.ids]),
                };
            }
            return state;
        }
        default:
            return state;
    }
}
