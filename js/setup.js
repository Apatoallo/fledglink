import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";

import { StyleProvider } from "native-base";
import { Text } from "react-native";

import App from "./App";
import configureStore from "./configureStore";
import getTheme from "../native-base-theme/components";
import platform from "../native-base-theme/variables/platform";

class Setup extends React.Component {
  
    constructor() {
      super();
      this.state = {
        isLoading: false,
        store: configureStore(() => this.setState({ isLoading: false }))
      };
    }

    render() {
      return (
        // <StyleProvider style={getTheme(platform)}>
          <Provider store={this.state.store}>
            <App/>
          </Provider>
        // </StyleProvider>
      );
    }
}

export default Setup;
