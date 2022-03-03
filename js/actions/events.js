import { stringify } from "query-string";
import moment from "moment";
import { escape } from "lodash";
import { serverUrl } from "../configs/config";
import ToastComponent from "../shared/ToastComponent";

export const GET_EVENT_BY_ID = "GET_EVENT_BY_ID";
export const GET_EVENT_BY_ID_SUCCESS = "GET_EVENT_BY_ID_SUCCESS";
export const GET_EVENT_BY_ID_FAIL = "GET_EVENT_BY_ID_FAIL";
export const REQUEST_FOR_SUBSCRIBE = "REQUEST_FOR_SUBSCRIBE";
export const REQUEST_FOR_SUBSCRIBE_FAILD = "REQUEST_FOR_SUBSCRIBE_FAILD";
export const REQUEST_FOR_SUBSCRIBE_SUCCESS = "REQUEST_FOR_SUBSCRIBE_SUCCESS";
export const GET_EVENTS_LIST = "GET_EVENTS_LIST";
export const GET_EVENTS_LIST_FAIL = "GET_EVENTS_LIST_FAIL";
export const GET_EVENTS_LIST_SUCCESS = "GET_EVENTS_LIST_SUCCESS";
export const SET_EVENTS_FILTER_OPTIONS = "SET_EVENTS_FILTER_OPTIONS";
export const TOGGLE_FILTER_EVENTS_OPTION = "TOGGLE_FILTER_EVENTS_OPTION";
export const TOGGLE_GLOBAL_FILTER_EVENTS_OPTION =
  "TOGGLE_GLOBAL_FILTER_EVENTS_OPTION";
export const UPDATE_RESULT_FILTER_EVENTS = "UPDATE_RESULT_FILTER_EVENTS";
export const SET_LOCATION_EVENT_FILTER = "SET_LOCATION_EVENT_FILTER";
export const SET_LOCATION_RADIUS_EVENT_FILTER =
  "SET_LOCATION_RADIUS_EVENT_FILTER";
export const CLEAR_ALL_ACTIVE_FILTERS_EVENT_FILTER =
  "CLEAR_ALL_ACTIVE_FILTERS_EVENT_FILTER";
export const CLEAR_ALL_SUB_FILTERS_EVENT_FILTER =
  "CLEAR_ALL_SUB_FILTERS_EVENT_FILTER";

export function setOpportunityFilterOptions(options) {
  return {
    type: SET_EVENTS_FILTER_OPTIONS,
    payload: options
  };
}

export function toggleFilterOption({ name, filterKey }) {
  return {
    type: TOGGLE_FILTER_EVENTS_OPTION,
    payload: { name, filterKey }
  };
}

export function toggleGlobalFilterOption({ filterKey, isActive }) {
  return {
    type: TOGGLE_GLOBAL_FILTER_EVENTS_OPTION,
    payload: { filterKey, isActive }
  };
}

export function clearAllActiveFilters() {
  return {
    type: CLEAR_ALL_ACTIVE_FILTERS_EVENT_FILTER
  };
}

export function clearAllSubFilters(filterKey) {
  return {
    type: CLEAR_ALL_SUB_FILTERS_EVENT_FILTER,
    payload: filterKey
  };
}

export function updateResultFilter(filter) {
  return {
    type: UPDATE_RESULT_FILTER_EVENTS,
    payload: filter
  };
}

export function setLocation({ center, description }) {
  return {
    type: SET_LOCATION_EVENT_FILTER,
    payload: { center, description }
  };
}

export function setLocationRadius(radius) {
  return {
    type: SET_LOCATION_RADIUS_EVENT_FILTER,
    payload: radius
  };
}

function getEventsList(eventsLength) {
  return {
    type: GET_EVENTS_LIST,
    payload: eventsLength
  };
}

function requestForSubscribe() {
  return {
    type: REQUEST_FOR_SUBSCRIBE
  };
}

function requestForSubscribeSuccess(id) {
  return {
    type: REQUEST_FOR_SUBSCRIBE_SUCCESS,
    payload: id
  };
}

function requestForSubscribeFaild() {
  return {
    type: REQUEST_FOR_SUBSCRIBE_FAILD
  };
}

function getEventsListSuccess(eventsList, range) {
  return {
    type: GET_EVENTS_LIST_SUCCESS,
    payload: { eventsList, range }
  };
}

function getEventsListFail() {
  return {
    type: GET_EVENTS_LIST_FAIL
  };
}

function getEventById() {
  return {
    type: GET_EVENT_BY_ID
  };
}

function getEventByIdSuccess(event) {
  return {
    type: GET_EVENT_BY_ID_SUCCESS,
    payload: event
  };
}

function getEventByIdFail() {
  return {
    type: GET_EVENT_BY_ID_FAIL
  };
}

export function subscribeToEvent(id, isSubscribe) {
  return (dispatch, getState) => {
    dispatch(requestForSubscribe());
    const {
      token: { token }
    } = getState();
    const link = isSubscribe ? "unsubscribe" : "subscribe";
    fetch(`${serverUrl}/events/${id}/${link}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      if (result.status === 204) {
        return dispatch(requestForSubscribeSuccess(id));
      }
      ToastComponent("Something went wrong!");
      return dispatch(requestForSubscribeFaild());
    });
  };
}

export function fetchEventById(id) {
  return (dispatch, getState) => {
    const {
      token: { token }
    } = getState();
    dispatch(getEventById());
    fetch(`${serverUrl}/events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => result.json())
      .then(result => {
        if (!result.message) {
          return dispatch(getEventByIdSuccess(result));
        }
        ToastComponent(result.message);
        return dispatch(getEventByIdFail());
      })
      .catch(error => ToastComponent(error));
  };
}

export function requestForEventsList(eventsLength) {
  return (dispatch, getState) => {
    const {
      token: { token },
      eventsStore: { lastUpdateTime, result }
    } = getState();
    const filterEventTypes =
      Object.keys(result).length > 0 ? result : undefined;
    const query = {
      sort: JSON.stringify(["startDate", "desc"])
    };
    const filter = { ...filterEventTypes };
    const arrayFilters = Object.keys(filter);
    if (arrayFilters.length) {
      arrayFilters.map(item => {
        if (item === "location") {
          filter[item] = { ...filter[item] };
        } else {
          filter[item] = filter[item].map(option => escape(option));
        }
        filter.type = "and";
        return item;
      });
    }
    dispatch(getEventsList(eventsLength));
    if (typeof eventsLength !== "undefined") {
      const firstRange = eventsLength === 0 ? eventsLength : eventsLength + 1;
      query.range = JSON.stringify([firstRange, eventsLength + 3]);
      query.filter = JSON.stringify({ ltCreatedAt: lastUpdateTime, ...filter });
    } else {
      query.filter = JSON.stringify({ gtCreatedAt: lastUpdateTime, ...filter });
    }
    fetch(`${serverUrl}/events?${stringify(query)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => result.json())
      .then(result => {
        if (!result.message) {
          return dispatch(getEventsListSuccess(result, 4));
        }
        ToastComponent(result.message);
        return dispatch(getEventsListFail());
      })
      .catch(error => ToastComponent(error));
  };
}
