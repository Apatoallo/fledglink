import { stringify } from "query-string";
import { serverUrl } from "../configs/config";
import ToastComponent from "../shared/ToastComponent";

export const GET_COMPANY_SUCCESS = "GET_COMPANY_SUCCESS";
export const SUBSCRIBE_SUCCESS = "SUBSCRIBE_SUCCESS";
export const SUBSCRIBE = "SUBSCRIBE";
export const SUBSCRIBE_FAIL = "SUBSCRIBE_FAIL";
export const GET_COMPANIES_SUCCESS = "GET_COMPANIES_SUCCESS";
export const COMPANIES_LOAD_IN_PROGRESS = "COMPANIES_LOAD_IN_PROGRESS";
export const ALL_COMPANIES_LOADED = "ALL_COMPANIES_LOADED";
export const CLEAR_CURRENT_COMPANY = "CLEAR_CURRENT_COMPANY";
export const RESET_RANGE = "RESET_RANGE";
export const RESET_COMPANIES_LIST = "RESET_COMPANIES_LIST";
export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
export const RESET_SEARCH_TEXT = "RESET_SEARCH_TEXT";

function subscribeSuccess(companyId) {
  return {
    type: SUBSCRIBE_SUCCESS,
    payload: companyId
  };
}

function subscribeRequest() {
  return {
    type: SUBSCRIBE
  };
}
function subscribeFail() {
  return {
    type: SUBSCRIBE_FAIL
  };
}

function getCompanySuccess(company) {
  return {
    type: GET_COMPANY_SUCCESS,
    payload: company
  };
}

export function clearCurrentCompany() {
  return {
    type: CLEAR_CURRENT_COMPANY
  };
}

function getCompaniesSuccess(companies) {
  return {
    type: GET_COMPANIES_SUCCESS,
    payload: companies
  };
}

function companiesLoadInProgress() {
  return {
    type: COMPANIES_LOAD_IN_PROGRESS
  };
}

function allCompaniesLoaded() {
  return {
    type: ALL_COMPANIES_LOADED
  };
}

function resetRange() {
  return {
    type: RESET_RANGE
  };
}

function resetCompaniesList() {
  return {
    type: RESET_COMPANIES_LIST
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

export function resetCompanySearchData() {
  return dispatch => {
    dispatch(resetRange());
    dispatch(resetCompaniesList());
    dispatch(resetSearchText());
  };
}

export function getCompanyById(token, companyId) {
  return dispatch => {
    fetch(`${serverUrl}/corporations/${companyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => result.json())
      .then(result => {
        if (!result.message) {
          dispatch(getCompanySuccess(result));
        } else {
          dispatch(getCompanyFail(result.message));
        }
      })
      .catch(error => dispatch(getCompanyFail(error)));
  };
}

export function subscribeCompany(companyId, isSubscribed) {
  return (dispatch, getState) => {
    const {
      token: { token }
    } = getState();
    const link = isSubscribed ? "unsubscribe" : "subscribe";
    dispatch(subscribeRequest());
    fetch(`${serverUrl}/corporations/${companyId}/${link}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(result => {
        if (result.status === 204) {
          return dispatch(subscribeSuccess(companyId));
        }
        dispatch(subscribeFail());
        return ToastComponent(
          "Oops, something went wrong. Please try again or called to administrator"
        );
      })
      .catch(error => console.log(error));
  };
}

export function getCompanies(token, text = "") {
  return (dispatch, getState) => {
    const shouldRangeChange = getState().company.searchText === text;
    if (!shouldRangeChange) {
      dispatch(resetRange());
      dispatch(resetCompaniesList());
    }
    dispatch(setSearchText(text));
    const range = getState().company.range;

    const query = {
      range: JSON.stringify(range),
      sort: JSON.stringify(["createdAt", "desc"])
    };
    dispatch(companiesLoadInProgress());
    fetch(`${serverUrl}/corporations?search=${text}&${stringify(query)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(result => result.json())
      .then(result => {
        if (!result.length) dispatch(allCompaniesLoaded());
        dispatch(getCompaniesSuccess(result));
      })
      .catch(error => {
        console.log(error);
      });
  };
}
