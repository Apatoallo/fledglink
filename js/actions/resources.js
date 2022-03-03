import { stringify } from 'query-string';
import { serverUrl } from '../configs/config';
import ToastComponent from '../shared/ToastComponent';

export const GET_RESOURCES_SUCCESS = 'GET_RESOURCES_SUCCESS';
export const RESOURCES_LOAD_IN_PROGRESS = 'RESOURCES_LOAD_IN_PROGRESS';
export const ALL_RESOURCES_LOADED = 'ALL_RESOURCES_LOADED';
export const RESET_RESOURCES_RANGE = 'RESET_RESOURCES_RANGE';
export const RESET_RESOURCES = 'RESET_RESOURCES';
export const RESET_RANGE = 'RESET_RANGE';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const RESET_SEARCH_TEXT = 'RESET_SEARCH_TEXT';

function getResourcesSuccess(resources) {
    return {
        type: GET_RESOURCES_SUCCESS,
        payload: resources,
    };
}

function resourcesLoadInProgress() {
    return {
        type: RESOURCES_LOAD_IN_PROGRESS,
    };
}

function allResourcesLoaded() {
    return {
        type: ALL_RESOURCES_LOADED,
    };
}

export function resetResourcesRange() {
    return {
        type: RESET_RESOURCES_RANGE,
    };
}

export function resetResources() {
    return {
        type: RESET_RESOURCES,
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

function resetSearchText() {
    return {
        type: RESET_SEARCH_TEXT,
    };
}

export function resetResourceSearchData() {
    return (dispatch) => {
        dispatch(resetRange());
        dispatch(resetResources());
        dispatch(resetSearchText());
    };
}

export function getResources(token, text = '') {
    return (dispatch, getState) => {
        const shouldRangeChange = getState().resources.searchText === text;
        if (!shouldRangeChange) {
            dispatch(resetRange());
            dispatch(resetResources());
        }
        dispatch(setSearchText(text));
        const range = getState().resources.range;
        const query = {
            range: JSON.stringify(range),
            sort: JSON.stringify(['createdAt', 'desc']),
        };
        dispatch(resourcesLoadInProgress());
        fetch(`${serverUrl}/resources?search=${text}&${stringify(query)}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(result => result.json())
            .then((result) => {
                if (!result.length) dispatch(allResourcesLoaded());
                dispatch(getResourcesSuccess(result));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

export function getResourceById(token, resourceId, setResourceToState) {
    return (dispatch) => {
        dispatch(resourcesLoadInProgress());
        fetch(`${serverUrl}/resources/${resourceId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(result => result.json())
            .then((result) => {
                setResourceToState(result);
            })
            .catch((error) => {
                ToastComponent(error);
            });
    };
}