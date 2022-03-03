import { stringify } from 'query-string';
import { serverUrl } from '../configs/config';

export const CONNECTIONS_LOAD_IN_PROGRESS = 'CONNECTIONS_LOAD_IN_PROGRESS';
export const ALL_CONNECTIONS_LOADED = 'ALL_CONNECTIONS_LOADED';
export const GET_CONNECTIONS_SUCCESS = 'GET_CONNECTIONS_SUCCESS';

function connectionsLoadInProgress() {
    return {
        type: CONNECTIONS_LOAD_IN_PROGRESS,
    };
}

function allConnectionsLoaded() {
    return {
        type: ALL_CONNECTIONS_LOADED,
    };
}

function getConnectionsSuccess(connections) {
    return {
        type: GET_CONNECTIONS_SUCCESS,
        payload: connections,
    };
}

export function getConnectionsByUserId(token, userId) {
    return (dispatch, getState) => {
        const { connections: { range } } = getState();
        const query = {
            range: JSON.stringify(range),
        };
        dispatch(connectionsLoadInProgress());
        fetch(`${serverUrl}/users/${userId}/connections?${stringify(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(result => result.json())
            .then((result) => {
                if (!result.length) dispatch(allConnectionsLoaded());
                dispatch(getConnectionsSuccess(result));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}
