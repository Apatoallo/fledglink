import { stringify } from 'query-string';
import { serverUrl } from '../configs/config';
import ToastComponent from '../shared/ToastComponent';

export const SET_SEARCH_DATA = 'SET_SEARCH_DATA';
export const SET_GLOBAL_SEARCH_TEXT = 'SET_GLOBAL_SEARCH_TEXT';
export const RESET_GLOBAL_RANGE = 'RESET_GLOBAL_RANGE';
export const RESET_DATA_LIST = 'RESET_DATA_LIST';
export const RESET_GLOBAL_SEARCH_TEXT = 'RESET_GLOBAL_SEARCH_TEXT';
export const FAILED_SEARCH_REQUEST='FAILED_SEARCH_REQUEST';

function setSearchData(list, shouldRangeChange) {
    return {
        type: SET_SEARCH_DATA,
        payload: { list, shouldRangeChange },
    };
}

function setGlobalSearchText(text) {
    return {
        type: SET_GLOBAL_SEARCH_TEXT,
        payload: text,
    };
}

function resetGlobalRange() {
    return {
        type: RESET_GLOBAL_RANGE,
    };
}

function resetDataList() {
    return {
        type: RESET_DATA_LIST,
    };
}

function failedRequest(error) {
    return {
        type: FAILED_SEARCH_REQUEST,
        payload: error,
    }
}

function resetGlobalSearchText() {
    return {
        type: RESET_GLOBAL_SEARCH_TEXT,
    };
}

export function resetGlobalSearchData() {
    return (dispatch, getState) => {
        dispatch(resetGlobalRange());
        dispatch(resetDataList());
        dispatch(resetGlobalSearchText());
    };
}

export function fetchGetUsersList(token, text = '') {
    return (dispatch, getState) => {
        let shouldRangeChange = getState().globalSearch.searchText === text;
        if(!shouldRangeChange) {
            dispatch(resetGlobalRange());
            dispatch(resetDataList());
        }
        dispatch(setGlobalSearchText(text));
        const range = getState().globalSearch.range;
        const query = {
            range: JSON.stringify(range),
        };
        fetch(`${serverUrl}/search/${text}?${stringify(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(result => result.json())
            .then((result) => {
                if (result.message) {
                    ToastComponent(result.message);
                    return dispatch(failedRequest(result.message));
                }
                return dispatch(setSearchData(result, shouldRangeChange));
            })
            .catch(error => console.log(error.message));
    };
}
