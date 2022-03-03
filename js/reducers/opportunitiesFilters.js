import {
  TOGGLE_FILTER_OPTION,
  TOGGLE_GLOBAL_FILTER_OPTION,
  UPDATE_RESULT_FILTER,
  SET_LOCATION,
  SET_LOCATION_RADIUS,
  CLEAR_ALL_ACTIVE_FILTERS,
  CLEAR_ALL_SUB_FILTERS,
  CLEAR_ALL_FILTERS
} from "../actions/opportunitiesFilters";
import { GET_USER_OPTIONS_SUCCESS } from "../actions/userOptions";

const initialState = {
  result: {},
  options: [
    {
      title: "Location",
      description: "Filter by region, city or town",
      activeStateText: [],
      isActive: false,
      key: "Location",
      originalKey: "location",
      serverKey: "locations",
      data: { center: [], radius: 10 }
    },
    {
      title: "Opportunity level",
      description: "Apprenticeships, internships, jobs etc.",
      activeStateText: [],
      isActive: false,
      key: "OpportunityLevel",
      originalKey: "oppType",
      serverKey: "opportunityType",
      data: []
    },
    {
      title: "Job type",
      description: "Filter by type of work",
      activeStateText: [],
      isActive: false,
      key: "JobType",
      originalKey: "jobInterest",
      serverKey: "jobType",
      data: []
    },
    {
      title: "Sector",
      description: "Filter by industry sector",
      activeStateText: [],
      isActive: false,
      key: "Sector",
      originalKey: "sectorInterest",
      serverKey: "sectors",
      data: []
    },
    {
      title: "Business size",
      description: "Filter by the size of the company",
      activeStateText: [],
      isActive: false,
      key: "BusinessSize",
      originalKey: "companyType",
      serverKey: "companyType",
      data: []
    },
    {
      title: "Salary",
      description: "Salary",
      activeStateText: [],
      isActive: false,
      key: "Salary",
      originalKey: "salary",
      serverKey: "salary.monetary",
      data: []
    },
    {
      title: "Contract Type",
      description: "Full time. part time, voluntary etc",
      activeStateText: [],
      isActive: false,
      key: "ContractType",
      originalKey: "contractType",
      serverKey: "contractType",
      data: []
    },
    {
      title: "Diversity Focus",
      description: "Company diversity policies",
      activeStateText: [],
      isActive: false,
      key: "DiversityFocus",
      originalKey: "diversityLabels",
      serverKey: "badges.title",
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
  if (option.key === "Location") {
    return {
      isActive: false,
      data: { center: [], radius: 10 }
    };
  } else {
    return {
      isActive: false,
      data: option.data.map(subFilter => ({
        ...subFilter,
        checked: false
      }))
    };
  }
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
    case CLEAR_ALL_ACTIVE_FILTERS:
      return {
        ...state,
        result: {},
        options: state.options.map(option => ({
          ...option,
          isActive: false
        }))
      };
    case CLEAR_ALL_SUB_FILTERS:
      return {
        ...state,
        options: state.options.map(option => ({
          ...option,
          ...(option.key !== action.payload ? {} : resetAllSubFilters(option))
        }))
      };
    case CLEAR_ALL_FILTERS:
      return {
        ...state,
        options: state.options.map(option => ({
          ...option,
          ...resetAllSubFilters(option)
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
    case TOGGLE_FILTER_OPTION:
      return {
        ...state,
        options: state.options.map(option => ({
          ...option,
          ...(option.key !== action.payload.filterKey
            ? {}
            : getUpdatedOption(option, action))
        }))
      };
    case TOGGLE_GLOBAL_FILTER_OPTION: {
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
    case UPDATE_RESULT_FILTER:
      return {
        ...state,
        result: action.payload
      };
    case SET_LOCATION:
      return {
        ...state,
        options: state.options.map(option => ({
          ...option,
          ...(option.key === "Location"
            ? setLocation(option, action.payload)
            : getUpdatedOption(option, action))
        }))
      };
    case SET_LOCATION_RADIUS:
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
