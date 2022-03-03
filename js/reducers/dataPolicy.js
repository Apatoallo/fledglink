import { ACCESS_POLICY_SUCCESS, ACCESS_POLICY_CANCEL } from "../actions/policy";

const initialState = {
  accessDataPolicy: false
};

export default function(state = initialState, action) {
  if (action.type === ACCESS_POLICY_SUCCESS) {
    return {
      ...state,
      accessDataPolicy: action.payload
    };
  }
  if (action.type === ACCESS_POLICY_CANCEL) {
    return {
      ...state,
      accessDataPolicy: action.payload
    };
  }
  return state;
}
