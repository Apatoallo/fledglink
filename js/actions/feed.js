import { stringify } from "query-string";
import moment from "moment";
import { serverUrl, version } from "../configs/config";
import previewer from "../utils/previewer";
import ToastComponent from "../shared/ToastComponent";

export const GET_FEED_SUCCESS = "GET_FEED_SUCCESS";
export const GET_FEED_FAIL = "GET_FEED_FAIL";
export const GET_FEED = "GET_FEED";
export const ADD_LIKE = "ADD_LIKE";
export const ADD_DISLIKE = "ADD_DISLIKE";
export const LIKE_ACTION = "LIKE_ACTION";
export const SET_USERS_COUNT = "SET_USERS_COUNT";
export const SET_FEED_UPDATED_AT = "SET_FEED_UPDATED_AT";
export const DISABLE_FEED_FETCHING = "DISABLE_FEED_FETCHING";
export const ADD_COMMENTS_COUNT = "ADD_COMMENTS_COUNT";
export const UPDATE_SINGLE_FEED = "UPDATE_SINGLE_FEED";
export const UPDATE_FEED_CHANNELS = "UPDATE_FEED_CHANNELS";

function getFeed() {
  return { type: GET_FEED };
}

export function updateFeedChannels(inactive) {
  return {
    type: UPDATE_FEED_CHANNELS,
    payload: inactive
  };
}

function likeActionDisabled() {
  return { type: LIKE_ACTION };
}

function getFeedFail(error) {
  return { type: GET_FEED_FAIL, payload: error };
}

function getFeedSuccess(result) {
  return { type: GET_FEED_SUCCESS, payload: result };
}

function liked(id) {
  return { type: ADD_LIKE, payload: id };
}

function disliked(id) {
  return { type: ADD_DISLIKE, payload: id };
}

export function addCommentsCount(partialFeed) {
  return {
    type: ADD_COMMENTS_COUNT,
    payload: partialFeed
  };
}

function setFeedUpdatedAt(newDate) {
  return {
    type: SET_FEED_UPDATED_AT,
    payload: newDate
  };
}
function disableFeedFetching() {
  return {
    type: DISABLE_FEED_FETCHING
  };
}
function updateSingleFeedItem(feedToUpdate) {
  return {
    type: UPDATE_SINGLE_FEED,
    payload: {
      feedToUpdate
    }
  };
}

function getUserFeedRequest(addQuery, onSuccess) {
  return token => (dispatch, getState) => {
    dispatch(getFeed());
    const {
      userOptions: {
        userOptionsList: { newsChannels }
      },
      channels: { inactive },
      feed: { range, feedUpdatedAt }
    } = getState();
    const query = {
      ...addQuery(dispatch, getState)
    };
    query.filter =
      newsChannels && inactive && inactive.length > 0
        ? JSON.stringify({
            $or: [
              ...newsChannels
                .filter(channel => !inactive.includes(channel.title))
                .map(channel => ({ channel: channel.title })),
              { subType: "Opportunity" },
              { subType: "Event" }
            ]
          })
        : {};
    fetch(`${serverUrl}/news-items?${stringify(query)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        if (result.status === 200) {
          return result.json();
        }
        throw new Error(result.json());
      })
      .then(result => {
        if (typeof onSuccess === "function") {
          onSuccess(dispatch, getState, {
            result
          });
        }
      })
      .catch(error => dispatch(getFeedFail(error.message)));
  };
}

export const getUserFeed = getUserFeedRequest(
  (dispatch, getState) => {
    const {
      feed: { range, feedUpdatedAt }
    } = getState();
    return {
      filter: JSON.stringify({ ltCreatedAt: feedUpdatedAt }),
      range: JSON.stringify(range)
    };
  },
  (dispatch, getState, options) => {
    if (!options.result[0]) dispatch(disableFeedFetching());
    dispatch(getFeedSuccess(options.result));
  }
);

export const refreshUserFeed = getUserFeedRequest(
  (dispatch, getState) => {
    const {
      feed: { range, feedUpdatedAt }
    } = getState();
    return {
      filter: JSON.stringify({ gtCreatedAt: feedUpdatedAt })
    };
  },
  (dispatch, getState, options) => {
    if (options.result[0])
      dispatch(
        setFeedUpdatedAt(
          moment.utc(+new Date(options.result[0].createdAt) + 5).toISOString()
        )
      );
    dispatch(getFeedSuccess(options.result));
  }
);

export const getFeedByResourceId = function(resourceId) {
  return getUserFeedRequest(
    (dispatch, getState) => {
      const {
        feed: { range, feedUpdatedAt }
      } = getState();
      return {
        filter: JSON.stringify({ resource: resourceId })
      };
    },
    (dispatch, getState, options) => {
      dispatch(updateSingleFeedItem(options.result[0]));
    }
  );
};

export function likedActionPost(token, postId) {
  return dispatch => {
    dispatch(likeActionDisabled());
    return fetch(`${serverUrl}/posts/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      if (result.status === 204) {
        dispatch(liked(postId));
      }
    });
  };
}

export function dislikedActionPost(token, postId) {
  return dispatch => {
    dispatch(likeActionDisabled());
    return fetch(`${serverUrl}/posts/${postId}/dislike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      if (result.status === 204) {
        dispatch(disliked(postId));
      }
    });
  };
}
