import { stringify } from 'query-string';
import { serverUrl } from '../configs/config';

export const GET_SEARCH_USER_LIST = 'GET_SEARCH_USER_LIST';
export const GET_SEARCH_USER_LIST_SUCCESS = 'GET_SEARCH_USER_LIST_SUCCESS';
export const GET_SEARCH_USER_LIST_FAILED = 'GET_SEARCH_USER_LIST_FAILED';
export const SET_USERS_COUNT = 'SET_USERS_COUNT';
export const RESET_RANGE = 'RESET_RANGE';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const RESET_USER_LIST = 'RESET_USER_LIST';
export const SET_NEW_USERS_SEARCH = 'SET_NEW_USERS_SEARCH';

function getUserList() {
    return {
        type: GET_SEARCH_USER_LIST,
    };
}

function setUsersCount(count) {
    return {
        type: SET_USERS_COUNT,
        payload: count,
    };
}

function getUserListSuccess(list, shouldRangeChange) {
    return {
        type: GET_SEARCH_USER_LIST_SUCCESS,
        payload: { list, shouldRangeChange },
    };
}

function getUserListFailed(error) {
    return {
        type: GET_SEARCH_USER_LIST_FAILED,
        payload: error,
    };
}

function resetRange() {
    return {
        type: RESET_RANGE,
    };
}

function setSearchText(text) {
    return {
        type: SET_SEARCH_TEXT,
        payload: text,
    };
}

function resetUserList() {
    return {
        type: RESET_USER_LIST,
    };
}

function getUsersSuccess(list) {
    return {
        type: SET_NEW_USERS_SEARCH,
        payload: list,
    };
}

function getUsersId(array) {
    const userIds = [];
    array.map(item => userIds.push(item.id));
    return userIds;
}

export function fetchGetUsersList(token, text = '') {
    return (dispatch, getState) => {
        dispatch(getUserList());
        let shouldRangeChange = getState().searchConnections.searchText === text;
        if(!shouldRangeChange) {
            dispatch(resetRange());
            dispatch(resetUserList());
        }
        dispatch(setSearchText(text));
        const range = getState().searchConnections.range;
        const query = {
            range: JSON.stringify(range),
        };
        if (text) Object.assign(query, { search: text });
        fetch(`${serverUrl}/users/?${stringify(query)}`, {
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
                    return result.json();
                }
                throw new Error(result.json());
            })
            .then((result) => {
                const userIds = getUsersId(result);
                dispatch(getUsersSuccess(result));
                return dispatch(getUserListSuccess(userIds, shouldRangeChange));
            })
            .catch(error => dispatch(getUserListFailed(error.message)));
    };
}
