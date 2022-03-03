import { differenceBy } from 'lodash';
import {
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAIL,
    ADD_LIKE,
    ADD_DISLIKE,
    LIKE_ACTION,
    createNewContainer,
} from '../actions/comments';

const initialState = {
    containers: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COMMENTS_SUCCESS: {
            const activeContainer = state.containers[action.payload.containerId] || createNewContainer(action.payload.containerId);
            const commentsToAdd = differenceBy(action.payload.comments, activeContainer.comments, 'id');
            return {
                ...state,
                containers: {
                    ...state.containers,
                    [action.payload.containerId]: Object.assign({}, activeContainer, {
                        comments: [...activeContainer.comments, ...commentsToAdd].sort((a, b) => +parseInt(a.fullSlug) - parseInt(b.fullSlug)),
                        range: action.payload.fromServer ? [activeContainer.range[0] + commentsToAdd.length, activeContainer.range[1] + commentsToAdd.length] : [...activeContainer.range],
                        loading: false,
                        isCommentsFetchingDisabled: action.payload.fromServer ? (action.payload.comments.length < activeContainer.maxToLoad) : activeContainer.isCommentsFetchingDisabled,
                    }),
                },
            };
        }

        case GET_COMMENTS_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case LIKE_ACTION:
            return {
                ...state,
                // disabledLikeAction: true,
            };
        case ADD_DISLIKE: {
            if (!action.payload.containerId) {
                console.warn(`no containerId was sent for action ${action.payload.type}`);
                return state;
            }
            const activeContainer = state.containers[action.payload.containerId] || createNewContainer(action.payload.containerId);
            const dislikedPost = new Array(...activeContainer.comments);
            return {
                ...state,
                disabledLikeAction: false,
                containers: {
                    [action.payload.containerId]: Object.assign({}, activeContainer, {
                        comments: dislikedPost.map((item) => {
                            if (item.id === action.payload.id) {
                                return {
                                    ...item,
                                    likesCount: --item.likesCount,
                                    isLiked: false,
                                };
                            }
                            return item;
                        }),


                    }),
                },
            };
        }
        case ADD_LIKE: {
            if (!action.payload.containerId) {
                console.warn(`no containerId was sent for action ${action.payload.type}`);
                return state;
            }
            const activeContainer = state.containers[action.payload.containerId] || createNewContainer(action.payload.containerId);
            const likedPost = new Array(...activeContainer.comments);
            return {
                ...state,
                disabledLikeAction: false,
                containers: {
                    [action.payload.containerId]: Object.assign({}, activeContainer, {
                        comments: likedPost.map((item) => {
                            if (item.id === action.payload.id) {
                                return {
                                    ...item,
                                    likesCount: ++item.likesCount,
                                    isLiked: true,
                                };
                            }
                            return item;
                        }),
                    }),
                },
            };
        }

        default:
            return state;
    }
}
