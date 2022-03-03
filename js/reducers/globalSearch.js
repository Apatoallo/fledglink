import {
  SET_SEARCH_DATA,
  SET_GLOBAL_SEARCH_TEXT,
  RESET_GLOBAL_RANGE,
  RESET_DATA_LIST,
  RESET_GLOBAL_SEARCH_TEXT,
  FAILED_SEARCH_REQUEST
} from "../actions/globalSearch";

const initialState = {
  dataList: [],
  range: [0, 15],
  error: "",
  searchText: "",
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_DATA:
      return {
        ...state,
        dataList: action.payload.shouldRangeChange
          ? [...state.dataList, ...action.payload.list]
          : [...action.payload.list],
        range: [
          state.range[0] + action.payload.list.length,
          state.range[1] + action.payload.list.length
        ],
        loading: false
      };
    case SET_GLOBAL_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
        loading: true
      };
    case RESET_GLOBAL_RANGE:
      return {
        ...state,
        range: [0, 15]
      };
    case RESET_DATA_LIST:
      return {
        ...state,
        dataList: []
      };
    case RESET_GLOBAL_SEARCH_TEXT:
      return {
        ...state,
        searchText: ""
      };
    case FAILED_SEARCH_REQUEST:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
