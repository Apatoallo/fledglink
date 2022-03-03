export const SET_OPPORTUNITY_FILTER_OPTIONS = "SET_OPPORTUNITY_FILTER_OPTIONS";
export const TOGGLE_FILTER_OPTION = "TOGGLE_FILTER_OPTION";
export const TOGGLE_GLOBAL_FILTER_OPTION = "TOGGLE_GLOBAL_FILTER_OPTION";
export const UPDATE_RESULT_FILTER = "APPLY_FILTERS";
export const SET_LOCATION = "SET_LOCATION";
export const SET_LOCATION_RADIUS = "SET_LOCATION_RADIUS";
export const CLEAR_ALL_ACTIVE_FILTERS = "CLEAR_ALL_ACTIVE_FILTERS";
export const CLEAR_ALL_SUB_FILTERS = "CLEAR_ALL_SUB_FILTERS";
export const CLEAR_ALL_FILTERS = "CLEAR_ALL_FILTERS";

export function setOpportunityFilterOptions(options) {
  return {
    type: SET_OPPORTUNITY_FILTER_OPTIONS,
    payload: options
  };
}

export function toggleFilterOption({ name, filterKey }) {
  return {
    type: TOGGLE_FILTER_OPTION,
    payload: { name, filterKey }
  };
}

export function toggleGlobalFilterOption({ filterKey, isActive }) {
  return {
    type: TOGGLE_GLOBAL_FILTER_OPTION,
    payload: { filterKey, isActive }
  };
}

export function clearAllActiveFilters() {
  return {
    type: CLEAR_ALL_ACTIVE_FILTERS
  };
}

export function clearAllSubFilters(filterKey) {
  return {
    type: CLEAR_ALL_SUB_FILTERS,
    payload: filterKey
  };
}

export function clearAllFilters() {
  return {
    type: CLEAR_ALL_FILTERS
  };
}

export function updateResultFilter(filter) {
  return {
    type: UPDATE_RESULT_FILTER,
    payload: filter
  };
}

export function setLocation({ center, description }) {
  return {
    type: SET_LOCATION,
    payload: { center, description }
  };
}

export function setLocationRadius(radius) {
  return {
    type: SET_LOCATION_RADIUS,
    payload: radius
  };
}
