import {
  GET_COMPANY_SUCCESS,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE,
  SUBSCRIBE_FAIL,
  GET_COMPANIES_SUCCESS,
  COMPANIES_LOAD_IN_PROGRESS,
  ALL_COMPANIES_LOADED,
  CLEAR_CURRENT_COMPANY,
  RESET_RANGE,
  RESET_COMPANIES_LIST,
  SET_SEARCH_TEXT,
  RESET_SEARCH_TEXT
} from "../actions/company";
import { uniqBy } from "lodash";

const initialState = {
  company: {},
  companies: [],
  companiesLoaded: false,
  allCompaniesLoaded: false,
  error: "",
  range: [0, 10],
  disabledButton: false,
  searchText: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY_SUCCESS:
      return {
        ...state,
        company: action.payload
      };
    case SUBSCRIBE:
      return {
        ...state,
        disabledButton: true
      };
    case SUBSCRIBE_FAIL:
      return {
        ...state,
        disabledButton: false
      };
    case SUBSCRIBE_SUCCESS: {
      return {
        ...state,
        disabledButton: false,
        company: {
          ...state.company,
          isSubscribed: !state.company.isSubscribed
        },
        companies: state.companies.map(company =>
          company.id !== action.payload
            ? company
            : { ...company, isSubscribed: !company.isSubscribed }
        )
      };
    }
    case GET_COMPANIES_SUCCESS: {
      return {
        ...state,
        companies: uniqBy(
          [...state.companies, ...action.payload],
          company => company.id
        ),
        range: [
          state.range[0] + action.payload.length,
          state.range[1] + action.payload.length
        ],
        companiesLoaded: true
      };
    }
    case COMPANIES_LOAD_IN_PROGRESS: {
      return {
        ...state,
        companiesLoaded: false
      };
    }
    case ALL_COMPANIES_LOADED: {
      return {
        ...state,
        allCompaniesLoaded: true
      };
    }
    case CLEAR_CURRENT_COMPANY: {
      return {
        ...state,
        company: {}
      };
    }
    case RESET_RANGE:
      return {
        ...state,
        range: [0, 10]
      };
    case RESET_COMPANIES_LIST:
      return {
        ...state,
        companies: [],
        allCompaniesLoaded: false
      };
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload
      };
    case RESET_SEARCH_TEXT:
      return {
        ...state,
        searchText: ""
      };
    default:
      return state;
  }
}
