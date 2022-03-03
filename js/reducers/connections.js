import {
    CONNECTIONS_LOAD_IN_PROGRESS,
    ALL_CONNECTIONS_LOADED,
    GET_CONNECTIONS_SUCCESS,
} from '../actions/connections';

const initialState = {
    connections: {},
    connectionsLoaded: false,
    allConnectionsLoaded: false,
    range: [0, 10],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CONNECTIONS_SUCCESS:
            return {
                ...state,
                connections: [...state.connections, ...action.payload],
                range: [state.range[0] + action.payload.length, state.range[1] + action.payload.length],
                connectionsLoaded: true,
            };
        case CONNECTIONS_LOAD_IN_PROGRESS:
            return {
                ...state,
                connectionsLoaded: false,
            };
        case ALL_CONNECTIONS_LOADED:
            return {
                ...state,
                allConnectionsLoaded: true,
            };
        default:
            return state;
    }
}
