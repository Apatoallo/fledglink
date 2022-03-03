import previewer from '../utils/previewer';
import formatMention from '../utils/formatMention';
import { serverUrl } from '../configs/config';
import { getFeedByResourceId } from './feed';
import { getCommentsSuccess } from './comments';
import ToastComponent from '../shared/ToastComponent';

export const SET_RESOURCE = 'SET_RESOURCE';
export const ADD_IMAGE = 'ADD_IMAGE';
export const CHANGE_CONTENT = 'CHANGE_CONTENT';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const REMOVE_RESOURCE = 'REMOVE_RESOURCE';
export const ADD_MENTION = 'ADD_MENTION';
export const CHANGE_PREVIEW = 'CHANGE_PREVIEW';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';
export const CLEAR_STORE = 'CLEAR_STORE';

function setResource(resource, type) {
    return {
        type: SET_RESOURCE,
        payload: { resource, type },
    };
}

function changeContentMessage(text) {
    return {
        type: CHANGE_CONTENT,
        payload: text,
    };
}

function addMention(mention) {
    return {
        type: ADD_MENTION,
        payload: mention,
    };
}

function addImage(image) {
    return {
        type: ADD_IMAGE,
        payload: image,
    };
}

function addPreview(preview) {
    return {
        type: CHANGE_PREVIEW,
        payload: preview,
    };
}

const _checkIfMention = word => word.charAt(0) === '@';

const findMentionsToSend = (mentions, content) => {
    const inlineMentions = content.split(/\s/gmi).filter(_checkIfMention);
    return mentions.filter(mention => inlineMentions.find(el => `@${formatMention(mention.fullName)}` === el));
};

export function removeImage() {
    return {
        type: REMOVE_IMAGE,
    };
}

export function clearStore() {
    return {
        type: CLEAR_STORE,
    };
}

export function removeResource() {
    return {
        type: REMOVE_RESOURCE,
    };
}

export function fetchMessage() {
    return {
        type: SEND_MESSAGE,
    };
}

export function fetchMessageSuccess(id) {
    return {
        type: SEND_MESSAGE_SUCCESS,
        payload: id,
    };
}

export function fetchMessageFailed(message) {
    return {
        type: SEND_MESSAGE_FAILED,
        payload: message,
    };
}

export function addResourceToMessage(item, type) {
    return (dispatch) => {
        if (item.fullName) {
            return dispatch(addMention(item));
        }
        return dispatch(setResource(item, type));
    };
}

export function addImageToMessage(image) {
    return dispatch => dispatch(addImage(image));
}

export function changeContent(text) {
    return (dispatch) => {
        dispatch(changeContentMessage(text));
        previewer(text)
            .then((result) => {
                dispatch(addPreview(result));
            });
    };
}

export function sendMessage(token, id) {
    return (dispatch, getState) => {
        dispatch(fetchMessage());
        const {
            newMessage: {
                image,
                resourceLink,
                content,
                linkType,
                mentions,
            },
        } = getState();
        const url = id ? `posts/${id}/comment` : 'users/me/posts';
        const mentionsToSend = findMentionsToSend(mentions, content);
        const body = {
            content,
            mentionsIds: mentionsToSend.map(mention => mention.id),
        };

        if (linkType && resourceLink.id) {
            body.link = {
                resourceId: resourceLink.id,
                resourceType: linkType,
            };
        }

        if (image) {
            body.image = image;
        }

        return fetch(`${serverUrl}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...body,
            }),
        })
            .then(result => result.json())
            .then((result) => {
                if (result.id) {
                    if (!id) {
                        dispatch(getFeedByResourceId(result.id)(token));
                    } else {
                        dispatch(getCommentsSuccess({ id, result: [result], fromServer: false }));
                    }
                    return dispatch(fetchMessageSuccess(result.id));
                }
                ToastComponent(result.message);
                return dispatch(fetchMessageFailed(result.message));
            })
            .catch(error => dispatch(fetchMessageFailed(error)));
    };
}
