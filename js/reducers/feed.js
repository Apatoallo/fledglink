import { merge, uniqBy, omit, cloneDeep } from "lodash";
import moment from "moment";
import {
  GET_FEED_SUCCESS,
  ADD_LIKE,
  ADD_DISLIKE,
  GET_FEED_FAIL,
  GET_FEED,
  LIKE_ACTION,
  SET_USERS_COUNT,
  SET_FEED_UPDATED_AT,
  DISABLE_FEED_FETCHING,
  ADD_COMMENTS_COUNT,
  UPDATE_SINGLE_FEED,
  REPORT_SUCCESS,
  UPDATE_USER_IN_FEED,
  UPDATE_FEED_CHANNELS,
  DELETE_POST_SUCCESS
} from "../actions/feed";

function getInitialState() {
  return {
    feed: [],
    range: [0, 4],
    feedUpdatedAt: moment.utc(new Date()).toISOString(),
    loading: false,
    disabledLikeAction: false,
    feedsCount: 0,
    error: "",
    isFeedFetchingDisabled: false
  };
}

export default function(state = getInitialState(), action) {
  switch (action.type) {
    case GET_FEED:
      return {
        ...state,
        loading: true
      };
    case UPDATE_USER_IN_FEED:
      return {
        ...state,
        feed: state.feed.map(feedItem => {
          if (
            feedItem.resource &&
            feedItem.resource.createdBy &&
            feedItem.resource.createdBy.id &&
            feedItem.resource.createdBy.id === action.payload.id
          ) {
            feedItem.resource.createdBy = {
              ...feedItem.resource.createdBy,
              fullName: action.payload.fullName,
              introLine: action.payload.introLine
            };
            if (action.payload.userImage) {
              feedItem.resource.createdBy.userImage = action.payload.userImage;
            }
          }
          return feedItem;
        })
      };
    case UPDATE_FEED_CHANNELS:
      return {
        ...state,
        feed: state.feed.filter(
          feedItem => !action.payload.includes(feedItem.channel)
        )
      };
    case REPORT_SUCCESS:
      const existingFeedItemIndex = state.feed.findIndex(
        feed => feed.resource.id == action.payload
      );
      const newFeed = [...state.feed];
      newFeed[existingFeedItemIndex].resource.isReported = !newFeed[
        existingFeedItemIndex
      ].resource.isReported;
      return {
        ...state,
        feed: [...state.newFeed],
        loading: false
      };
    case ADD_COMMENTS_COUNT: {
      const existingFeedItemIndex = state.feed.findIndex(
        feed => feed.resource.id == action.payload.resourceId
      );
      const existingFeedItem = state.feed[existingFeedItemIndex];
      if (existingFeedItem) {
        const newFeed = cloneDeep(state.feed);
        newFeed[existingFeedItemIndex].resource.commentsCount =
          parseInt(existingFeedItem.resource.commentsCount, 10) +
          action.payload.additionalCount;
        return {
          loading: false,
          ...state,
          feed: newFeed
        };
      }
      return {
        loading: false,
        ...state
      };
    }
    case UPDATE_SINGLE_FEED: {
      if (!action.payload.feedToUpdate)
        return {
          ...state,
          loading: false
        };
      const existingFeedItemIndex = state.feed.findIndex(
        feed => feed.id === action.payload.feedToUpdate.id
      );
      if (!state.feed[existingFeedItemIndex])
        return {
          ...state,
          feed: [...state.feed, action.payload.feedToUpdate].sort(
            (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
          ),
          loading: false
        };
      Object.assign(
        state.feed[existingFeedItemIndex].resource,
        omit(action.payload.feedToUpdate.resource, ["overview"])
      );
      const newFeed = [...state.feed];
      return {
        ...state,
        loading: false,
        feed: newFeed
      };
    }
    case GET_FEED_SUCCESS:
      return {
        ...state,
        loading: false,
        // Items of equal priority should appear most recent first
        feed: uniqBy([...state.feed, ...action.payload], feed => feed.id),
        feedUpdatedAt:
          state.range[0] == 0
            ? moment.utc(new Date()).toISOString()
            : state.feedUpdatedAt,
        range: [
          state.range[0] + action.payload.length,
          state.range[1] + action.payload.length
        ]
      };
    case LIKE_ACTION:
      return {
        ...state,
        disabledLikeAction: true
      };
    case SET_USERS_COUNT:
      return {
        ...state,
        feedsCount: action.payload
      };
    case SET_FEED_UPDATED_AT:
      return {
        ...state,
        feedUpdatedAt: action.payload
      };
    case DISABLE_FEED_FETCHING:
      return {
        ...state,
        isFeedFetchingDisabled: true
      };
    case ADD_DISLIKE:
      const dislikedPost = new Array(...state.feed);
      return {
        ...state,
        disabledLikeAction: false,
        feed: dislikedPost.map(item => {
          if (item.resource.id === action.payload) {
            const itemWithResource = {
              resource: {
                likesCount: --item.resource.likesCount,
                isLiked: false
              }
            };
            return merge({}, item, itemWithResource);
          }
          return item;
        })
      };
    case ADD_LIKE:
      const likedPost = new Array(...state.feed);
      return {
        ...state,
        disabledLikeAction: false,
        feed: likedPost.map(item => {
          if (item.resource.id === action.payload) {
            const itemWithResource = {
              resource: {
                likesCount: ++item.resource.likesCount,
                isLiked: true
              }
            };
            return merge({}, item, itemWithResource);
          }
          return item;
        })
      };
    case GET_FEED_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case DELETE_POST_SUCCESS: {
      const indexFeedToDelete = state.feed.findIndex(
        feed => feed.resource.id === action.payload
      );
      if (~indexFeedToDelete) {
        const usersFeed = [...state.feed];
        usersFeed.splice(indexFeedToDelete, 1);
        return {
          ...state,
          feed: usersFeed
        };
      }
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
