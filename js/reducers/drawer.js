import { OPEN_DRAWER, CLOSE_DRAWER, CHANGE_ROUTE } from "../actions/drawer";

const initialState = {
  drawerState: "closed",
  drawerDisabled: true,
  initialRoute: "Home"
};

export default function(state = initialState, action) {
  if (action.type === OPEN_DRAWER) {
    return {
      ...state,
      drawerState: "opened"
    };
  }

  if (action.type === CLOSE_DRAWER) {
    return {
      ...state,
      drawerState: "closed"
    };
  }

  if (action.type == CHANGE_ROUTE) {
    return {
      ...state,
      initialRoute: action.payload
    };
  }

  return state;
}
