import {
  GET_USER_OPTIONS_SUCCESS,
  GET_USER_OPTIONS,
  GET_USER_OPTIONS_FAILS
} from "../actions/userOptions";

const initialState = {
  userOptionsList: {},
  error: "",
  loadOptions: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_OPTIONS:
      return {
        ...state,
        userOptionsList: action.payload,
        loadOptions: true
      };
    case GET_USER_OPTIONS_SUCCESS:
      return {
        ...state,
        loadOptions: false,
        userOptionsList: action.payload
      };
    case GET_USER_OPTIONS_FAILS:
      return {
        ...state,
        loadOptions: false,
        error: action.payload
      };
    default:
      return state;
  }
}
