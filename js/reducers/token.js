import { SET_TOKEN, CLEAR_TOKEN } from '../actions/token';

const initialState = {
    token: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case CLEAR_TOKEN:
            return {
                ...state,
                token: '',
            };
        default:
            return state;
    }
}
