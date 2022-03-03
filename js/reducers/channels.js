import { TOGGLE_CHANNEL } from "../actions/channels";

const initialState = {
  inactive: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CHANNEL:
      return {
        ...state,
        inactive: state.inactive.includes(action.payload)
          ? state.inactive.filter(channel => channel !== action.payload)
          : [...state.inactive, action.payload]
      };
    default:
      return state;
  }
}
