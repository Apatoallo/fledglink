import {
  GET_USER,
  SET_USER,
  UPDATE_WORK_EXPERIENCE,
  UPDATE_EDUCATION,
  DELETE_ACHIEVEMENT,
  ADD_ACHIEVEMENT,
  PATCH_ACHIEVEMENT,
  DELETE_EDUCATION,
  DELETE_EXPERIENCE,
  ADD_EDUCATION,
  PATCH_EDUCATION,
  ADD_EXPERIENCE,
  PATCH_EXPERIENCE,
  ADD_HOBBY,
  DELETE_HOBBY
} from "../actions/user";
import { REGISTRATION_SUCCESS } from "../actions/register";
import { CONNECTION_REQUEST_SUCCESS } from "../actions/mutualConnections";
import {
  CREATE_PENDING_CONNECTION_REQUEST_SUCCESS,
  CONNECTION_ACCEPT_REQUEST_SUCCESS,
  CONNECTION_DECLINE_REQUEST_SUCCESS,
  ADD_PENDING_IDS
} from "../actions/userActions";
import {
  DELETE_PENDING_INVITATION_ITEM,
  SET_NEW_CONNECTION_REQUEST,
  DECRIMENT_PENDING
} from "../actions/notifications";
import {
  SEND_REQUEST_CONNECTION_SUCCESS,
  POST_CANCEL_REQUEST_SUCCESS,
  POST_DELETE_CONNECTION_SUCCESS,
  POST_ACCEPT_REQUEST_SUCCESS
} from "../actions/userConnections";
import { SET_NEW_CONNECTION } from "../actions/notifications";

const initialState = {
  user: {},
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        loading: true
      };
    case REGISTRATION_SUCCESS:
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case UPDATE_WORK_EXPERIENCE:
      return {
        ...state,
        user: {
          ...state.user,
          workExperience: action.payload
        }
      };
    case UPDATE_EDUCATION:
      return {
        ...state,
        user: {
          ...state.user,
          educationInstitutions: action.payload
        }
      };
    case ADD_PENDING_IDS:
    case CREATE_PENDING_CONNECTION_REQUEST_SUCCESS:
    case SEND_REQUEST_CONNECTION_SUCCESS:
    case CONNECTION_REQUEST_SUCCESS:
    case SET_NEW_CONNECTION_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          connectionRequestsCount: state.user.connectionRequestsCount + 1
        }
      };
    case CONNECTION_ACCEPT_REQUEST_SUCCESS:
    case SET_NEW_CONNECTION:
      return {
        ...state,
        user: {
          ...state.user,
          connectionRequestsCount: state.user.connectionRequestsCount - 1,
          connectionsCount: state.user.connectionsCount + 1
        }
      };
    case POST_CANCEL_REQUEST_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          connectionRequestsCount: state.user.connectionRequestsCount - 1
        }
      };
    case POST_DELETE_CONNECTION_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          connectionsCount: state.user.connectionsCount - 1
        }
      };
    case POST_ACCEPT_REQUEST_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          connectionRequestsCount: state.user.connectionRequestsCount - 1,
          connectionsCount: state.user.connectionsCount + 1
        }
      };

    case DELETE_PENDING_INVITATION_ITEM:
      return {
        ...state,
        user: {
          ...state.user,
          connectionRequestsCount: state.user.connectionRequestsCount - 1,
          connectionsCount: state.user.connectionsCount + 1
        }
      };
    case DECRIMENT_PENDING:
      return {
        ...state,
        user: {
          ...state.user,
          connectionRequestsCount: --state.user.connectionRequestsCount
        }
      };
    case CONNECTION_DECLINE_REQUEST_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          connectionRequestsCount: state.user.connectionRequestsCount - 1
        }
      };
    case DELETE_ACHIEVEMENT:
      return {
        ...state,
        user: {
          ...state.user,
          achievements: state.user.achievements.filter(
            ({ id }) => id !== action.payload
          )
        }
      };
    case ADD_ACHIEVEMENT:
      return {
        ...state,
        user: {
          ...state.user,
          achievements: [...state.user.achievements, action.payload]
        }
      };
    case PATCH_ACHIEVEMENT:
      return {
        ...state,
        user: {
          ...state.user,
          achievements: state.user.achievements.map(achievement => {
            return achievement.id !== action.payload.id
              ? achievement
              : action.payload;
          })
        }
      };
    case DELETE_EDUCATION:
      return {
        ...state,
        user: {
          ...state.user,
          educationInstitutions: state.user.educationInstitutions.filter(
            ({ id }) => id !== action.payload
          )
        }
      };
    case ADD_EDUCATION:
      return {
        ...state,
        user: {
          ...state.user,
          educationInstitutions: [
            ...state.user.educationInstitutions,
            action.payload
          ]
        }
      };
    case PATCH_EDUCATION:
      return {
        ...state,
        user: {
          ...state.user,
          educationInstitutions: state.user.educationInstitutions.map(
            education => {
              return education.id !== action.payload.id
                ? education
                : action.payload;
            }
          )
        }
      };
    case DELETE_EXPERIENCE:
      return {
        ...state,
        user: {
          ...state.user,
          workExperience: state.user.workExperience.filter(
            ({ id }) => id !== action.payload
          )
        }
      };
    case ADD_EXPERIENCE:
      return {
        ...state,
        user: {
          ...state.user,
          workExperience: [...state.user.workExperience, action.payload]
        }
      };
    case PATCH_EXPERIENCE:
      return {
        ...state,
        user: {
          ...state.user,
          workExperience: state.user.workExperience.map(work => {
            return work.id !== action.payload.id ? work : action.payload;
          })
        }
      };
    case ADD_HOBBY:
      return {
        ...state,
        user: {
          ...state.user,
          hobbies: [...state.user.hobbies, action.payload]
        }
      };
    case DELETE_HOBBY:
      return {
        ...state,
        user: {
          ...state.user,
          hobbies: state.user.hobbies.filter(({ id }) => id !== action.payload)
        }
      };
    default:
      return state;
  }
}
