import { stringify } from 'query-string';
import { serverUrl } from '../configs/config';

export const GET_CONNECTIONS_USER_LIST = 'GET_CONNECTIONS_USER_LIST';
export const GET_CONNECTIONS_USER_LIST_SUCCESS = 'GET_CONNECTIONS_USER_LIST_SUCCESS';
export const GET_CONNECTIONS_USER_LIST_FAILED = 'GET_CONNECTIONS_USER_LIST_FAILED';
export const SET_USERS_COUNT = 'SET_USERS_COUNT';

function getUserList() {
    return {
        type: GET_CONNECTIONS_USER_LIST,
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
        type: GET_CONNECTIONS_USER_LIST_SUCCESS,
        payload: { list, shouldRangeChange },
    };
}

function getUserListFailed(error) {
    return {
        type: GET_CONNECTIONS_USER_LIST_FAILED,
        payload: error,
    };
}

let prevText = '';
export function fetchGetUserConnectionsList(token, text = '') {
    const shouldRangeChange = prevText === text;
    return (dispatch, getState) => {
        dispatch(getUserList());
        let newRange = [];
        const { connectionsList: { range } } = getState();
        if (shouldRangeChange) {
            newRange = range;
        } else {
            newRange = [0, 9];
        }
        const query = {
            range: JSON.stringify(newRange),
        };
        if (text) Object.assign(query, { search: text });
        return fetch(`${serverUrl}/users/me/connections?${stringify(query)}`, {
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
                    prevText = text;
                    return result.json();
                }
                throw new Error(result.json());
            })
            .then((result) => {
                dispatch(getUserListSuccess(result, shouldRangeChange));
            })
            .catch(error => dispatch(getUserListFailed(error.message)));
    };
}
