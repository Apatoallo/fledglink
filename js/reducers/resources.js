import {
    GET_RESOURCES_SUCCESS,
    RESOURCES_LOAD_IN_PROGRESS,
    ALL_RESOURCES_LOADED,
    RESET_RESOURCES_RANGE,
    RESET_RESOURCES,
    RESET_RANGE,
    SET_SEARCH_TEXT,
    RESET_SEARCH_TEXT,
} from '../actions/resources';

const initialState = {
    resources: [],
    range: [0, 10],
    allResourcesLoaded: false,
    resourcesLoaded: false,
    searchText: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RESOURCES_SUCCESS: {
            return {
                ...state,
                resources: [...state.resources, ...action.payload],
                range: [state.range[0] + action.payload.length, state.range[1] + action.payload.length],
                resourcesLoaded: true,
            };
        }
        case RESOURCES_LOAD_IN_PROGRESS: {
            return {
                ...state,
                resourcesLoaded: false,
            };
        }
        case ALL_RESOURCES_LOADED: {
            return {
                ...state,
                allResourcesLoaded: true,
            };
        }
        case RESET_RESOURCES_RANGE: {
            return {
                ...state,
                range: [0, 10],
            };
        }
        case RESET_RESOURCES: {
            return {
                ...state,
                resources: [],
                allResourcesLoaded: false,
            };
        }
        case RESET_RANGE:
            return {
                ...state,
                range: [0, 10],
            };
        case SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.payload,
            };
        case RESET_SEARCH_TEXT:
            return {
                ...state,
                searchText: '',
            };
        default:
            return state;
    }
}
