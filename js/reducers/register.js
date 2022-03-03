import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
  CLEAR_ERROR,
  SET_PROFILE_DATA,
  SELECT_AVATAR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  PREVIOUS_PAGE,
  SELECT_USER_OPTION,
  UPDATE_PAGE,
  CREATING_PROFILE_INPUT_CHANGE,
  UPDATE_USER_FAIL,
  REGISTRATION_FINISH,
  GET_NEXT_PAGE_WIZARD,
  UPDATE_OCCUPATION_TYPE,
  COMPLETE_ONBOARDING
} from "../actions/register";
import ToastComponent from "../shared/ToastComponent";
import jobLocations from "../configs/jobLocations";

import { GET_USER_OPTIONS_SUCCESS } from "../actions/userOptions";

export const pages = [
  {
    title: "What types of opportunities are you interested in?",
    canMultiSelect: true,
    mainButtonName: "next",
    disabledBackButton: true,
    data: "",
    serverFieldName: "oppType",
    originalName: "oppType",
    selectPicker: true,
    selectData: []
  },
  {
    title: "What would you like to hear about?",
    canMultiSelect: true,
    mainButtonName: "next",
    data: "",
    serverFieldName: "jobInterest",
    originalName: "jobInterest",
    selectPicker: true,
    selectData: []
  },
  {
    title: "Where are you looking for opportunities?",
    canMultiSelect: true,
    mainButtonName: "next",
    data: { selectedUser: "" },
    serverFieldName: "jobLocations",
    originalName: "jobLocations",
    modalSelect: true,
    profileData: true,
    selectData: []
  },
  {
    title: "And so we can help you further...",
    mainButtonName: "finish",
    data: {},
    profileData: true,
    selectData: []
  }
];

const initialState = {
  registrationSuccess: false,
  registrationError: "",
  pageNumber: 0,
  requestLoading: false,
  onboardingCompleted: false,
  profileSetUp: false,
  tempUser: {},
  pages
};

function findUserSelectedField(arrayFields) {
  const foundObject = arrayFields.find(element => element.checked === true);
  if (foundObject) {
    return foundObject.value;
  }
  return null;
}

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_OCCUPATION_TYPE: {
      const thisPage = state.pages[state.pageNumber];
      const currentUserStatus =
        state.pages[state.pageNumber - 1].data.selectedUser;
      const educationUser = thisPage.data.selectedUser;
      const nextPage = getOccupationTypes(currentUserStatus, educationUser, {
        ...state.pages[state.pageNumber + 1]
      });
      const pages = [...state.pages];
      pages[state.pageNumber + 1] = {
        ...nextPage
      };
      return {
        ...state,
        pages
      };
    }
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        tempUser: action.payload,
        registrationSuccess: true
      };
    case REGISTRATION_FINISH:
      return {
        ...state,
        registrationSuccess: true,
        profileSetUp: true,
        tempUser: {}
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        requestLoading: false
      };
    case REGISTRATION_FAIL:
      return {
        ...state,
        registrationError: action.payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        registrationError: ""
      };
    case PREVIOUS_PAGE: {
      const pageNumber = state.pageNumber;
      const currentPage = state.pages[pageNumber];
      return {
        ...state,
        pageNumber: pageNumber - 1,
        requestLoading: false
      };
    }
    case GET_NEXT_PAGE_WIZARD: {
      const pageNumber = state.pageNumber;
      const currentPage = state.pages[pageNumber];
      return {
        ...state,
        pageNumber: pageNumber + 1,
        requestLoading: false
      };
    }
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        requestLoading: true
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        tempUser: action.payload,
        pageNumber: state.pageNumber + 1,
        requestLoading: false
      };
    case CREATING_PROFILE_INPUT_CHANGE: {
      const oldPages = [...state.pages];
      const currentPage = oldPages[state.pageNumber];
      oldPages[state.pageNumber] = {
        ...currentPage,
        inputValue: action.payload,
        data: { ...currentPage.data, inputData: action.payload }
      };
      return {
        ...state,
        pages: [...oldPages]
      };
    }
    case GET_USER_OPTIONS_SUCCESS: {
      const pages = state.pages.map(page => {
        const { selectData, originalName } = page;
        if (Array.isArray(selectData)) {
          const getData = () => {
            if (originalName) {
              return originalName === "jobLocations"
                ? jobLocations
                : [...action.payload[originalName]];
            }
            return selectData;
          };
          return {
            ...page,
            selectData: getData()
          };
        }
        return {
          ...page,
          optionsData: originalName
            ? { ...action.payload[originalName] }
            : selectData,
          selectData: originalName
            ? { ...action.payload[originalName] }
            : selectData
        };
      });
      return {
        ...state,
        pages
      };
    }
    case SET_PROFILE_DATA:
      return {
        ...state,
        pages: state.pages.map((page, key) => ({
          ...page,
          data:
            key === state.pageNumber
              ? {
                  ...page.data,
                  ...action.payload
                }
              : page.data
        })),
        tempUser: {
          ...state.tempUser,
          ...action.payload
        }
      };
    case SELECT_AVATAR:
      return {
        ...state,
        pages: state.pages.map((option, key) => ({
          ...option,
          data: key === state.pageNumber ? action.payload : option.data
        })),
        tempUser: {
          ...state.user,
          userImage: action.payload
        }
      };
    case UPDATE_PAGE: {
      const oldPages = [...state.pages];
      const changeablePageNumber = state.pageNumber + 1;
      const changeablePage = oldPages[changeablePageNumber];
      const currentPage = oldPages[state.pageNumber];
      const foundUserSelectValue = findUserSelectedField(
        currentPage.selectData
      );
      if (!foundUserSelectValue) {
        ToastComponent("Please select a status");
        return { ...state };
      }
      const options = getOptions(foundUserSelectValue, changeablePage.data);
      oldPages[changeablePageNumber] = {
        ...changeablePage,
        ...options,
        selectPicker: foundUserSelectValue === "In education"
      };
      return {
        ...state,
        pageNumber: state.pageNumber + 1,
        pages: oldPages
      };
    }
    case SELECT_USER_OPTION: {
      const oldSelectData = [...state.pages[state.pageNumber].selectData];
      let selectedUsers = {};
      const oldPages = [...state.pages];
      const currentPage = oldPages[state.pageNumber];
      if (currentPage.canMultiSelect) {
        selectedUsers = getItemsMultiSelection(
          oldSelectData,
          action.payload.value,
          action.payload.checked,
          currentPage.data.selectedUser
        );
      } else {
        selectedUsers = getItemSelection(
          oldSelectData,
          action.payload.value,
          action.payload.checked
        );
      }
      oldPages[state.pageNumber] = {
        ...currentPage,
        selectData: [...selectedUsers.items],
        data: { ...currentPage.data, selectedUser: selectedUsers.data }
      };
      return {
        ...state,
        pages: [...oldPages]
      };
    }
    case COMPLETE_ONBOARDING: {
      return {
        ...state,
        onboardingCompleted: true
      };
    }
    default:
      return state;
  }
}

function getItemSelection(array, itemName, checked) {
  const items = array.map(item => ({
    ...item,
    checked: item.value === itemName ? checked : false
  }));
  const data = itemName;
  return { items, data };
}

function updateCheckedOption(checkedValue) {
  return item => ({
    ...item,
    checked: checkedValue
  });
}

function getItemsMultiSelection(array, itemName, checked) {
  let items;
  if (itemName === "All" && !array[0].checked) {
    items = array.map(updateCheckedOption(true));
  } else if (itemName === "All" && array[0].checked) {
    items = array.map(updateCheckedOption(false));
  } else {
    items = array.map(item => ({
      ...item,
      checked: item.value === itemName ? checked : item.checked
    }));
  }
  const data = [];
  items.map(item => {
    if (item.checked) {
      data.push(item.value);
    }
  });
  return { items, data };
}
