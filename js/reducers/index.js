import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import PushEmitter from "../push/emitter/PushEmitter";
import token from "./token";
import user from "./user";
import feed from "./feed";
import userConnections from "./userConnections";
import drawer from "./drawer";
import notifications from "./notifications";
import comments from "./comments";
import pendingConnections from "./pendingConnections";
import connectionsList from "./connectionsList";
import connectionsListOtherUser from "./connectionsListOtherUser";
import auth from "./auth";
import company from "./company";
import newMessage from "./newMessage";
import companyOpportunities from "./companyOpportunities";
import dataPolicy from "./dataPolicy";
import opportunitiesFilters from "./opportunitiesFilters";
import userOptions from "./userOptions";
import searchConnections from "./userSearch";
import globalSearch from "./globalSearch";
import resources from "./resources";
import register from "./register";
import eventsStore from "./events";
import connections from "./connections";
import nearPeople from "./nearPeople";
import userStore from "./usersStore";
import channels from "./channels";

const appReducer = combineReducers({
  form: formReducer,
  token,
  userStore,
  comments,
  newMessage,
  user,
  auth,
  userConnections,
  drawer,
  notifications,
  dataPolicy,
  companyOpportunities,
  nearPeople,
  company,
  register,
  feed,
  pendingConnections,
  connectionsList,
  connectionsListOtherUser,
  searchConnections,
  opportunitiesFilters,
  eventsStore,
  userOptions,
  globalSearch,
  resources,
  connections,
  channels
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    Object.keys(state).forEach(key => {
      if (key !== "channels") AsyncStorage.removeItem(`persist:${key}`);
    });
    PushEmitter.instance.clearCache();
  }
  return appReducer(state, action);
};

export default rootReducer;
