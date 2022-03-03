import { authTypes } from "../configs/config";
import { GET_USER_FAIL, SET_USER } from "../actions/user";
import { REGISTRATION_SUCCESS } from "../actions/register";

const initialState = {
  auth: authTypes.RECOVERY
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        auth: authTypes.AUTHORIZED
      };
    case GET_USER_FAIL:
      return {
        ...state,
        auth: authTypes.UNAUTHORIZED
      };
    case "USER_LOGOUT":
      return {
        ...state,
        auth: authTypes.UNAUTHORIZED
      };
    default:
      return state;
  }
}
