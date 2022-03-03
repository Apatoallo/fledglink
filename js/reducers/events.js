import moment from "moment";
import { uniqBy } from "lodash";
import {
  GET_EVENTS_LIST,
  GET_EVENTS_LIST_FAIL,
  GET_EVENTS_LIST_SUCCESS,
  TOGGLE_FILTER_EVENTS_OPTION,
  TOGGLE_GLOBAL_FILTER_EVENTS_OPTION,
  UPDATE_RESULT_FILTER_EVENTS,
  SET_LOCATION_EVENT_FILTER,
  SET_LOCATION_RADIUS_EVENT_FILTER,
  CLEAR_ALL_ACTIVE_FILTERS_EVENT_FILTER,
  CLEAR_ALL_SUB_FILTERS_EVENT_FILTER,
  REQUEST_FOR_SUBSCRIBE,
  REQUEST_FOR_SUBSCRIBE_FAILD,
  REQUEST_FOR_SUBSCRIBE_SUCCESS,
  GET_EVENT_BY_ID,
  GET_EVENT_BY_ID_SUCCESS,
  GET_EVENT_BY_ID_FAIL
} from "../actions/events";
import { GET_USER_OPTIONS_SUCCESS } from "../actions/userOptions";

const initialState = {
  eventsList: [],
  loadingEvent: false,
  result: {},
  isEventsListFull: false,
  lastUpdateTime: moment.utc(new Date()).toISOString(),
  loadingEvents: false,
  options: [
    {
      title: "Location",
      description: "Filter by region, city or town",
      activeStateText: [],
      isActive: false,
      key: "Location",
      originalKey: "location",
      serverKey: "location",
      data: { center: [], radius: 0 }
    },
    {
      title: "Event Type",
      description: "Fairs, talks & lectures, social etc.",
      activeStateText: [],
      isActive: false,
      key: "EventType",
      originalKey: "eventTypes",
      serverKey: "eventTypes",
      data: []
    }
  ]
};

function getActiveFilterText(data) {
  const filteredData = [];
  data.forEach(item => {
    if (item.checked) filteredData.push(item.name);
  });
  return filteredData.join(", ");
}

function updateCheckedOption(checkedValue) {
  return item => ({
    ...item,
    checked: checkedValue
  });
}

function getUpdatedOption(option, action) {
  let updatedOptionData;
  if (action.payload.name === "All" && !option.data[0].checked) {
    updatedOptionData = option.data.map(updateCheckedOption(true));
  } else if (action.payload.name === "All" && option.data[0].checked) {
    updatedOptionData = option.data.map(updateCheckedOption(false));
  } else {
    updatedOptionData = option.data.map(item => ({
      ...item,
      checked: item.name === action.payload.name ? !item.checked : item.checked
    }));
  }
  return {
    data: updatedOptionData,
    activeStateText: getActiveFilterText(updatedOptionData)
  };
}

function resetAllSubFilters(option) {
  return {
    isActive: false,
    data: option.data.map(subFilter => ({
      ...subFilter,
      checked: false
    }))
  };
}

function setLocation(option, { center, description }) {
  return {
    data: { ...option.data, center },
    activeStateText: description
  };
}

function setLocationRadius(option, radius) {
  return {
    data: { ...option.data, radius: radius || option.data.radius }
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_FOR_SUBSCRIBE_SUCCESS: {
      return {
        ...state,
        eventsList: state.eventsList.map(event =>
          event.id !== action.payload
            ? event
            : { ...event, isSubscribed: !event.isSubscribed }
        )
      };
    }
    case GET_EVENT_BY_ID: {
      return {
        ...state,
        loadingEvent: true
      };
    }
    case GET_EVENT_BY_ID_SUCCESS: {
      return {
        ...state,
        loadingEvent: false,
        eventsList: [...state.eventsList, action.payload].sort(
          (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
        )
      };
    }
    case GET_EVENTS_LIST: {
      const eventList = [...state.eventsList];
      const eventLength = action.payload;
      let lastUpdateTime;
      if (typeof eventLength !== "undefined") {
        lastUpdateTime = state.lastUpdateTime;
      } else {
        lastUpdateTime = moment.utc(new Date()).toISOString();
      }
      return {
        ...state,
        eventsList: [...eventList],
        lastUpdateTime,
        loadingEvents: true
      };
    }
    case GET_EVENTS_LIST_FAIL:
      return {
        ...state,
        loadingEvents: false
      };
    case GET_EVENTS_LIST_SUCCESS:
      return {
        ...state,
        loadingEvents: false,
        isEventsListFull: !action.payload.eventsList.length,
        eventsList: uniqBy(
          [...state.eventsList, ...action.payload.eventsList],
          event => event.id
        ).sort((a, b) => +new Date(b.startDate) - +new Date(a.startDate))
      };
    case CLEAR_ALL_ACTIVE_FILTERS_EVENT_FILTER:
      return {
        ...state,
        options: state.options.map(option => ({
          ...option,
          isActive: false
        })),
        result: {}
      };
    case CLEAR_ALL_SUB_FILTERS_EVENT_FILTER:
      return {
        ...state,
        options: state.options.map(option => ({
          ...option,
          ...(option.key !== action.payload ? {} : resetAllSubFilters(option))
        }))
      };
    case GET_USER_OPTIONS_SUCCESS: {
      const userOptionKeys = Object.keys(action.payload);
      return {
        ...state,
        options: state.options.map(option => {
          const existingOptionKey =
            userOptionKeys.find(
              userOption => option.originalKey === userOption
            ) || "";
          return {
            ...option,
            data: action.payload[existingOptionKey] || option.data
          };
        })
      };
    }
    case TOGGLE_FILTER_EVENTS_OPTION:
      return {
        ...state,
        options: state.options.map(option => ({
          ...option,
          ...(option.key !== action.payload.filterKey
            ? {}
            : getUpdatedOption(option, action))
        }))
      };
    case TOGGLE_GLOBAL_FILTER_EVENTS_OPTION: {
      return action.payload.isActive
        ? {
            ...state,
            options: state.options.map(option => ({
              ...option,
              ...(option.key !== action.payload.filterKey
                ? {}
                : { isActive: true })
            }))
          }
        : {
            ...state,
            options: state.options.map(option => ({
              ...option,
              ...(option.key !== action.payload.filterKey
                ? {}
                : { isActive: false })
            }))
          };
    }
    case UPDATE_RESULT_FILTER_EVENTS:
      return {
        ...state,
        result: action.payload
      };
    case SET_LOCATION_EVENT_FILTER:
      return {
        ...state,
        options: state.options.map(option => ({
          ...option,
          ...(option.key === "Location"
            ? setLocation(option, action.payload)
            : getUpdatedOption(option, action))
        }))
      };
    case SET_LOCATION_RADIUS_EVENT_FILTER:
      return {
        ...state,
        options: state.options.map(option => ({
          ...option,
          ...(option.key === "Location"
            ? setLocationRadius(option, action.payload)
            : getUpdatedOption(option, action))
        }))
      };
    default:
      return state;
  }
}
