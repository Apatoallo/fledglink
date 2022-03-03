import {
    GET_SEARCH_USER_LIST,
    GET_SEARCH_USER_LIST_SUCCESS,
    GET_SEARCH_USER_LIST_FAILED,
    SET_USERS_COUNT,
    RESET_RANGE,
    SET_SEARCH_TEXT,
    RESET_USER_LIST,
} from '../actions/userSearch';

const initialState = {
    userList: [],
    range: [0, 9],
    error: '',
    searchText: '',
    loading: false,
    usersCount: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SEARCH_USER_LIST:
            return {
                ...state,
                loading: true,
            };
        case GET_SEARCH_USER_LIST_SUCCESS:
            return {
                ...state,
                userList: action.payload.shouldRangeChange ? [...state.userList, ...action.payload.list] : [...action.payload.list],
                range: [state.range[0] + 10, state.range[1] + 10],
                loading: false,
            };
        case GET_SEARCH_USER_LIST_FAILED:
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
        case RESET_RANGE:
            return {
                ...state,
                range: [0, 9],
            };
        case RESET_USER_LIST:
            return {
                ...state,
                userList: [],
            };
        case SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.payload,
            };
        default:
            return state;
    }
}
