import {
    GET_CONNECTIONS_USER_LIST,
    GET_CONNECTIONS_USER_LIST_SUCCESS,
    GET_CONNECTIONS_USER_LIST_FAILED,
    SET_USERS_COUNT,
} from '../actions/connectionsList';

const initialState = {
    connectionsList: [],
    range: [0, 9],
    error: '',
    loading: false,
    usersCount: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CONNECTIONS_USER_LIST:
            return {
                ...state,
                connectionsList: [...state.connectionsList],
                loading: true,
                error: '',
            };
        case GET_CONNECTIONS_USER_LIST_SUCCESS:
            return {
                ...state,
                connectionsList: action.payload.shouldRangeChange ? [...state.connectionsList, ...action.payload.list] : [...action.payload.list],
                range: action.payload.shouldRangeChange ? [state.range[0] + action.payload.list.length, state.range[1] + action.payload.list.length] : [action.payload.list.length, action.payload.list.length + 10],
                loading: false,
            };
        case GET_CONNECTIONS_USER_LIST_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case SET_USERS_COUNT:
            return {
                ...state,
                usersCount: action.payload,
            };
        default:
            return state;
    }
}
