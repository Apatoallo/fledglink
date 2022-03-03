// import { AsyncStorage } from "react-native";
import { createStore, compose } from "redux";
import { persistStore, persistReducer, createTransform } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildConfiguration } from "./configs/config";
import reducer from "./reducers";
import { pages } from "./reducers/register";
import Middleware from "./Middleware";

const persistConfig = {
  key: `fledglink_${buildConfiguration}`,
  storage: AsyncStorage,
  whitelist: ["token", "register", "nearPeople", "auth", "channels"],
  transforms: [
    createTransform((inboundState, key) => {
      if (key === "register") {
        return {
          ...inboundState,
          registrationSuccess: false,
          requestLoading: false,
          pages
        };
      } else {
        return inboundState;
      }
    })
  ]
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureStore(onCompletion) {
  const store = createStore(persistedReducer, compose(Middleware));
  persistStore(store, { store: AsyncStorage }, onCompletion);
  return store;
}
