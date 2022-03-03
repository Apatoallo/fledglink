import { stringify } from 'query-string';
import { serverUrl } from '../configs/config';

export const GET_CONNECTIONS_OTHER_USER_LIST = 'GET_CONNECTIONS_OTHER_USER_LIST';
export const GET_CONNECTIONS_OTHER_USER_LIST_SUCCESS = 'GET_CONNECTIONS_OTHER_USER_LIST_SUCCESS';
export const GET_CONNECTIONS_OTHER_USER_LIST_FAILED = 'GET_CONNECTIONS_OTHER_USER_LIST_FAILED';
export const SET_OTHER_USERS_COUNT = 'SET_OTHER_USERS_COUNT';

function getOtherUserList() {
    return {
        type: GET_CONNECTIONS_OTHER_USER_LIST,
    };
}

function setOtherUsersCount(count) {
    return {
        type: SET_OTHER_USERS_COUNT,
        payload: count,
    };
}

function getOtherUserListSuccess(list, shouldRangeChange, isOldUserConnectionsList) {
    return {
        type: GET_CONNECTIONS_OTHER_USER_LIST_SUCCESS,
        payload: { list, shouldRangeChange, isOldUserConnectionsList },
    };
}

function getOtherUserListFailed(error) {
    return {
        type: GET_CONNECTIONS_OTHER_USER_LIST_FAILED,
        payload: error,
    };
}

let prevText = '';
let prevId = '';
export function fetchGetOtherUserConnectionsList(token, text = '', userId = 'me') {
    const shouldRangeChange = prevText === text;
    const isSelfConnectionsList = userId === 'me';
    const isOldUserConnectionsList = prevId === userId;
    return (dispatch, getState) => {
        dispatch(getOtherUserList(isSelfConnectionsList));
        let newRange = [];
        const { connectionsListOtherUser: { range } } = getState();
        if (shouldRangeChange && isOldUserConnectionsList) {
            newRange = range;
        } else {
            newRange = [0, 9];
        }
        const query = {
            range: JSON.stringify(newRange),
        };
        if (text) Object.assign(query, { search: text });
        fetch(`${serverUrl}/users/${userId}/connections?${stringify(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((result) => {
                if (result.status === 200) {
                    const ranges = result.headers.map['content-range'][0].split('/');
                    dispatch(setOtherUsersCount(Number(ranges[1], isSelfConnectionsList)));
                    prevText = text;
                    prevId = userId;
                    return result.json();
                }
                throw new Error(result.json());
            })
            .then((result) => {
                dispatch(getOtherUserListSuccess(result, shouldRangeChange, isOldUserConnectionsList));
            })
            .catch(error => dispatch(getOtherUserListFailed(error.message)));
    };
}
