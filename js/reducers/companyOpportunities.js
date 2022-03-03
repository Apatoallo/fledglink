import {
    GET_OPPORTUNITY_BY_ID,
    GET_COMPANY_OPPORTUNITIES,
    GET_COMPANY_OPPORTUNITIES_SUCCESS,
    GET_COMPANY_OPPORTUNITIES_FAIL,
    INCREMENT_SAVE_COUNT,
    DECREMENT_SAVE_COUNT,
    INCREMENT_APPLY_COUNT,
    DECREMENT_APPLY_COUNT,
    SET_SAVED_OPPORTUNITIES_COUNTER,
    SET_APPLIED_OPPORTUNITIES_COUNTER,
    GET_OPPORTUNITIES_SUCCESS,
    OPPORTUNITIES_LOAD_IN_PROGRESS,
    ALL_OPPORTUNITIES_LOADED,
    RESET_RANGE,
    RESET_DATA_LIST,
    SET_SEARCH_TEXT,
    RESET_SEARCH_TEXT,
} from '../actions/companyOpportunities';

const initialState = {
    opportunities: [],
    allOpportunities: [],
    opportunity: {},
    savedOpportunities: 0,
    appliedOpportunities: 0,
    error: '',
    opportunitiesLoaded: false,
    allOpportunitiesLoaded: false,
    range: [0, 10],
    searchText: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_OPPORTUNITY_BY_ID:
            return {
                ...state,
                opportunity: action.payload,
            };
        case GET_COMPANY_OPPORTUNITIES: {
            const opportunities = [...state.opportunities];
            if (action.payload === 0) {
                opportunities.length = 0;
            }
            return {
                ...state,
                range: action.payload > 0 ? [state.range[0], state.range[1]] : [0, 10],
                opportunitiesLoaded: false,
                opportunities,
            };
        }
        case GET_COMPANY_OPPORTUNITIES_SUCCESS:
            return {
                ...state,
                range: [state.range[0] + action.payload.length, state.range[1] + action.payload.length],
                opportunities: [...state.opportunities, ...action.payload],
                opportunitiesLoaded: true,
            };
        case GET_OPPORTUNITIES_SUCCESS:
            return {
                ...state,
                allOpportunities: [...state.allOpportunities, ...action.payload],
                range: [state.range[0] + action.payload.length, state.range[1] + action.payload.length],
            };
        case OPPORTUNITIES_LOAD_IN_PROGRESS:
            return {
                ...state,
                opportunitiesLoaded: false,
            };
        case ALL_OPPORTUNITIES_LOADED: {
            return {
                ...state,
                allOpportunitiesLoaded: true,
            };
        }
        case GET_COMPANY_OPPORTUNITIES_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case INCREMENT_SAVE_COUNT:
            return {
                ...state,
                savedOpportunities: state.savedOpportunities + 1,
            };
        case DECREMENT_SAVE_COUNT:
            return {
                ...state,
                savedOpportunities: state.savedOpportunities - 1,
            };
        case INCREMENT_APPLY_COUNT:
            return {
                ...state,
                appliedOpportunities: state.appliedOpportunities + 1,
            };
        case DECREMENT_APPLY_COUNT:
            return {
                ...state,
                appliedOpportunities: state.appliedOpportunities - 1,
            };
        case SET_SAVED_OPPORTUNITIES_COUNTER:
            return {
                ...state,
                savedOpportunities: action.payload,
            };
        case SET_APPLIED_OPPORTUNITIES_COUNTER:
            return {
                ...state,
                appliedOpportunities: action.payload,
            };
        case RESET_RANGE:
            return {
                ...state,
                range: [0, 10],
            };
        case RESET_DATA_LIST:
            return {
                ...state,
                allOpportunities: [],
                allOpportunitiesLoaded: false,
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
