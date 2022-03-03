import { merge } from 'lodash';
import {
    TURN_OFF_WATCHING_POSITION,
    TURN_ON_WATCHING_POSITION,
    GET_NEAR_USERS_SUCCESS,
    GET_NEAR_USERS,
    GET_NEAR_USERS_FAIL,
    SET_NEW_USERS_NEAR,
} from '../actions/nearPeople';

const initialState = {
    usersContain: {},
    watchingGeoPosition: false,
    nearPeopleUsersList: [],
    loading: true,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TURN_ON_WATCHING_POSITION:
            return {
                ...state,
                watchingGeoPosition: true,
            };
        case SET_NEW_USERS_NEAR: {
            const updatingUsers = {};
            action.payload.map((item) => {
                updatingUsers[item.id] = merge({}, state.usersContain[item.id], item);
                return item;
            });
            return {
                ...state,
                usersContain: {
                    ...state.usersContain,
                    ...updatingUsers,
                },
            };
        }
        case GET_NEAR_USERS: {
            return {
                ...state,
                nearPeopleUsersList: [],
                loading: true,
            };
        }
        case GET_NEAR_USERS_SUCCESS: {
            return {
                ...state,
                nearPeopleUsersList: [...action.payload],
                loading: false,
            };
        }
        case GET_NEAR_USERS_FAIL: {
            return {
                ...state,
                loading: false,
            };
        }
        case TURN_OFF_WATCHING_POSITION:
            return {
                ...state,
                watchingGeoPosition: false,
            };
        default:
            return state;
    }
}
