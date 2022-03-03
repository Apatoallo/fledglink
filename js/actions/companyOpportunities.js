import { stringify } from "query-string";
import { serverUrl } from "../configs/config";
import ToastComponent from "../shared/ToastComponent";

export const GET_COMPANY_OPPORTUNITIES = "GET_COMPANY_OPPORTUNITIES";
export const GET_COMPANY_OPPORTUNITIES_SUCCESS =
  "GET_COMPANY_OPPORTUNITIES_SUCCESS";
export const GET_COMPANY_OPPORTUNITIES_FAIL = "GET_COMPANY_OPPORTUNITIES_FAIL";
export const GET_OPPORTUNITY_BY_ID = "GET_OPPORTUNITY_BY_ID";
export const INCREMENT_SAVE_COUNT = "INCREMENT_SAVE_COUNT";
export const DECREMENT_SAVE_COUNT = "DECREMENT_SAVE_COUNT";
export const INCREMENT_APPLY_COUNT = "INCREMENT_APPLY_COUNT";
export const DECREMENT_APPLY_COUNT = "DECREMENT_APPLY_COUNT";
export const SET_SAVED_OPPORTUNITIES_COUNTER =
  "SET_SAVED_OPPORTUNITIES_COUNTER";
export const SET_APPLIED_OPPORTUNITIES_COUNTER =
  "SET_APPLIED_OPPORTUNITIES_COUNTER";
export const GET_OPPORTUNITIES_SUCCESS = "GET_OPPORTUNITIES_SUCCESS";
export const OPPORTUNITIES_LOAD_IN_PROGRESS = "OPPORTUNITIES_LOAD_IN_PROGRESS";
export const ALL_OPPORTUNITIES_LOADED = "ALL_OPPORTUNITIES_LOADED";
export const RESET_RANGE = "RESET_RANGE";
export const RESET_DATA_LIST = "RESET_DATA_LIST";
export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
export const RESET_SEARCH_TEXT = "RESET_SEARCH_TEXT";

function getOpportunityByIdSuccess(opportunity) {
  return {
    type: GET_OPPORTUNITY_BY_ID,
    payload: opportunity
  };
}

function getCompanyOpportunities(length) {
  return {
    type: GET_COMPANY_OPPORTUNITIES,
    payload: length
  };
}

function getCompanyOpportunitiesSuccess(opportunities) {
  return {
    type: GET_COMPANY_OPPORTUNITIES_SUCCESS,
    payload: opportunities
  };
}

function incrementSaveCount() {
  return {
    type: INCREMENT_SAVE_COUNT
  };
}

function decrementSaveCount() {
  return {
    type: DECREMENT_SAVE_COUNT
  };
}

function incrementApplyCount() {
  return {
    type: INCREMENT_APPLY_COUNT
  };
}

function decrementApplyCount() {
  return {
    type: DECREMENT_APPLY_COUNT
  };
}

export function getCompanyOpportunitiesFail(error) {
  return {
    type: GET_COMPANY_OPPORTUNITIES_FAIL,
    payload: error
  };
}

function getOpportunitiesSuccess(opportunities) {
  return {
    type: GET_OPPORTUNITIES_SUCCESS,
    payload: opportunities
  };
}

function opportunitiesLoadInProgress() {
  return {
    type: OPPORTUNITIES_LOAD_IN_PROGRESS
  };
}

function allOpportunitiesLoaded() {
  return {
    type: ALL_OPPORTUNITIES_LOADED
  };
}

export function getOpportunityListForCompany(token, corpId, length) {
  return (dispatch, getState) => {
    dispatch(getCompanyOpportunities(length));
    const {
      companyOpportunities: { range }
    } = getState();
    const query = {
      range: JSON.stringify(range)
    };
    fetch(
      `${serverUrl}/corporations/${corpId}/opportunities?${stringify(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(result => result.json())
      .then(result => {
        dispatch(getCompanyOpportunitiesSuccess(result));
      })
      .catch(error => {
        dispatch(getCompanyOpportunitiesFail(error.message));
      });
  };
}

export function setSavedOpportunitiesCounter(count) {
  return {
    type: SET_SAVED_OPPORTUNITIES_COUNTER,
    payload: count
  };
}

export function setAppliedOpportunitiesCounter(count) {
  return {
    type: SET_APPLIED_OPPORTUNITIES_COUNTER,
    payload: count
  };
}

function resetRange() {
  return {
    type: RESET_RANGE
  };
}

function resetDataList() {
  return {
    type: RESET_DATA_LIST
  };
}

function setSearchText(text) {
  return {
    type: SET_SEARCH_TEXT,
    payload: text
  };
}

function resetSearchText() {
  return {
    type: RESET_SEARCH_TEXT
  };
}

export function resetOpportunitySearchData() {
  return dispatch => {
    dispatch(resetRange());
    dispatch(resetDataList());
    dispatch(resetSearchText());
  };
}

export function getOpportunities(token, text = "") {
  return (dispatch, getState) => {
    const shouldRangeChange =
      getState().companyOpportunities.searchText === text;
    if (!shouldRangeChange) {
      dispatch(resetRange());
      dispatch(resetDataList());
    }
    dispatch(setSearchText(text));
    const range = getState().companyOpportunities.range;
    const query = {
      range: JSON.stringify(range)
    };
    dispatch(opportunitiesLoadInProgress());
    fetch(
      `${serverUrl}/users/me/opportunities?search=${text}&${stringify(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(result => result.json())
      .then(result => {
        if (!result.length) dispatch(allOpportunitiesLoaded());
        dispatch(getOpportunitiesSuccess(result));
      })
      .catch(error => {
        ToastComponent(error);
      });
  };
}

export function getOpportunityById(
  token,
  opportunityId,
  setOpportunityToState
) {
  return dispatch => {
    fetch(`${serverUrl}/users/me/opportunities/${opportunityId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => result.json())
      .then(result => {
        setOpportunityToState(result);
        dispatch(getOpportunityByIdSuccess(result));
      })
      .catch(error => {
        ToastComponent(error);
      });
  };
}

function getSavedOpportunitiesCounter(token) {
  const query = {
    filter: JSON.stringify({ isSaved: true })
  };
  return fetch(`${serverUrl}/users/me/opportunities?${stringify(query)}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
}

function getAppliedOpportunitiesCounter(token) {
  const query = {
    filter: JSON.stringify({ isApplied: true })
  };
  return fetch(`${serverUrl}/users/me/opportunities?${stringify(query)}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
}

export function getOpportunityCounters(token) {
  return dispatch => {
    Promise.all([
      getSavedOpportunitiesCounter(token),
      getAppliedOpportunitiesCounter(token)
    ])
      .then(result => {
        const savedCounter = result[0].headers.map["content-range"].split("/");
        const appliedCounter = result[1].headers.map["content-range"].split(
          "/"
        );
        dispatch(setSavedOpportunitiesCounter(parseInt(savedCounter[1])));
        dispatch(setAppliedOpportunitiesCounter(parseInt(appliedCounter[1])));
      })
      .catch(error => console.log(error));
  };
}

export function saveOpportunity(
  token,
  body,
  value,
  updateOpportunitySaveStatus
) {
  return dispatch => {
    fetch(`${serverUrl}/users/me/opportunities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
      .then(result => {
        if (Math.floor(result.status / 100) === 2) {
          updateOpportunitySaveStatus(value);
          value
            ? dispatch(incrementSaveCount())
            : dispatch(decrementSaveCount());
        }
      })
      .catch(error => {
        ToastComponent(error);
      });
  };
}

export function applyOpportunity(
  token,
  body,
  value,
  link,
  updateOpportunityApplyStatus
) {
  return dispatch => {
    fetch(`${serverUrl}/users/me/opportunities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
      .then(result => {
        if (Math.floor(result.status / 100) === 2) {
          value
            ? dispatch(incrementApplyCount())
            : dispatch(decrementApplyCount());
          updateOpportunityApplyStatus(value, link);
        }
      })
      .catch(error => {
        ToastComponent(error);
      });
  };
}
