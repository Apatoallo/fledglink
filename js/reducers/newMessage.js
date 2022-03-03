import formatMention from '../utils/formatMention';
import {
    SET_RESOURCE,
    ADD_IMAGE,
    CHANGE_CONTENT,
    REMOVE_IMAGE,
    ADD_MENTION,
    CHANGE_PREVIEW,
    SEND_MESSAGE,
    CLEAR_STORE,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILED,
    REMOVE_RESOURCE,
} from '../actions/newMessage';

const initialState = {
    content: '',
    image: '',
    resourceLink: '',
    linkType: '',
    createdPostId: '',
    error: '',
    disabledButton: false,
    mentions: [],
    preview: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_RESOURCE:
            return {
                ...state,
                resourceLink: action.payload.resource,
                linkType: action.payload.type,
            };
        case CHANGE_CONTENT:
            return {
                ...state,
                content: action.payload,
            };
        case ADD_IMAGE:
            return {
                ...state,
                image: action.payload,
            };
        case REMOVE_IMAGE:
            return {
                ...state,
                image: '',
            };
        case CHANGE_PREVIEW:
            return {
                ...state,
                preview: action.payload,
            };
        case ADD_MENTION: {
            const fullName = action.payload.fullName;
            const formattedMention = fullName.split(' ').length > 1 ? formatMention(fullName) : fullName;
            const trimmedContent = state.content.trim();
            const text = trimmedContent[trimmedContent.length - 1] === '@'
                ? `${trimmedContent.slice(0, -1)} @${formattedMention}`
                : `${state.content.trim()} @${formattedMention}`;
            return {
                ...state,
                mentions: [...new Set([...state.mentions, action.payload])],
                content: text,
            };
        }
        case REMOVE_RESOURCE:
            return {
                ...state,
                resourceLink: '',
            };
        case SEND_MESSAGE:
            return {
                ...state,
                disabledButton: true,
            };
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                disabledButton: false,
                createdPostId: action.payload,
            };
        case SEND_MESSAGE_FAILED:
            return {
                ...state,
                disabledButton: false,
                error: action.payload,
            };
        case CLEAR_STORE:
            return initialState;
        default:
            return state;
    }
}
