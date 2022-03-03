import { stringify } from 'query-string';
import { serverUrl } from '../configs/config';
import { addCommentsCount } from './feed';
import previewer from '../utils/previewer';

export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAIL = 'GET_COMMENTS_FAIL';
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';
export const LIKE_ACTION = 'LIKE_ACTION';
export const ADD_LIKE = 'ADD_LIKE';
export const ADD_DISLIKE = 'ADD_DISLIKE';


function clearCommentsSuccess(comments, range) {
    return {
        type: CLEAR_COMMENTS,
        payload: { comments, range },
    };
}


function likeActionDisabled() {
    return { type: LIKE_ACTION };
}


function liked(id, resourceId) {
    return {
        type: ADD_LIKE,
        payload: {
            containerId: resourceId,
            id,
        },
    };
}

function disliked(id, resourceId) {
    return {
        type: ADD_DISLIKE,
        payload: {
            containerId: resourceId,
            id,
        },
    };
}

function getCommentsFail(error) {
    return {
        type: GET_COMMENTS_FAIL,
        payload: error,
    };
}

export function getCommentsSuccess({ id: containerId, result: comments, fromServer }) {
    return (dispatch, getState) => {
        dispatch(addCommentsCount({
            resourceId: containerId,
            additionalCount: !fromServer ? comments.length : 0,
        }));
        dispatch({
            type: GET_COMMENTS_SUCCESS,
            payload: { containerId, comments, fromServer },
        });
    };
}

export function clearComments() {
    return function (dispatch) {
        const comments = [];
        const range = [0, 4];
        return dispatch(clearCommentsSuccess(comments, range));
    };
}

export function createNewContainer(id) {
    const maxToLoad = 4;
    return {
        maxToLoad,
        id,
        comments: [],
        range: [0, maxToLoad],
        loading: false,
        error: '',
        isCommentsFetchingDisabled: false,
    };
}

export function getCommentsById(token, id, range) {
    return function (dispatch) {
        const query = {
            range: JSON.stringify(range),
        };
        fetch(`${serverUrl}/posts/${id}/comments?${stringify(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(result => result.json())
            .then((result) => {
                if (!result.message) {
                    Promise.all(result.map((el) => {
                        return previewer(el.content)
                            .then((previewObj) => {
                                el.preview = previewObj;
                                return el;
                            });
                    }));
                    dispatch(getCommentsSuccess({ id, result, fromServer: true }));
                } else {
                    dispatch(getCommentsFail(result.message));
                }
            })
            .catch(error => dispatch(getCommentsFail(error)));
    };
}

export function likedActionComment(token, postId, resourceId) {
    return function (dispatch) {
        dispatch(likeActionDisabled());
        return fetch(`${serverUrl}/comments/${postId}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then((result) => {
            if (result.status === 204) {
                dispatch(liked(postId, resourceId));
            }
        });
    };
}

export function dislikedActionComment(token, postId, resourceId) {
    return function (dispatch) {
        dispatch(likeActionDisabled());
        return fetch(`${serverUrl}/comments/${postId}/dislike`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then((result) => {
            if (result.status === 204) {
                dispatch(disliked(postId, resourceId));
            }
        });
    };
}
