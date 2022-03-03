import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View } from "native-base";
import { WebView } from "react-native-webview";
import PropTypes from "prop-types";

import Header from "../../Routers/Headers";

const WEBVIEW_REF = "WEBVIEW_REF";

const webViewBrowser = StyleSheet.create({
  pageWrapper: {
    flex: 1
  }
});

export default class WebViewBrowser extends Component {
  static navigationOptions = ({ navigation }) => {
    const pageTitle = navigation.getParam("pageTitle");
    const pageUrl = navigation.getParam("pageUrl");
    const canGoBack = navigation.getParam("canGoBack");
    const goBack = navigation.getParam("goBack");
    const canGoForward = navigation.getParam("canGoForward");
    const goForward = navigation.getParam("goForward");

    return {
      header: props => (
        <Header.Web
          {...props}
          cancel={() => navigation.goBack()}
          pageTitle={pageTitle}
          pageUrl={pageUrl}
          canGoBack={canGoBack}
          goBack={goBack}
          canGoForward={canGoForward}
          goForward={goForward}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "",
      pageUrl: "",
      canGoBack: false,
      canGoForward: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { pageTitle, pageUrl, canGoBack, canGoForward } = this.state;
    navigation.setParams({
      pageTitle,
      pageUrl,
      canGoBack,
      canGoForward,
      goForward: this.goForward,
      goBack: this.goBack
    });
  }

  onNavigationStateChange = webViewState => {
    const { navigation } = this.props;

    const domain = this._getUrlDomain(webViewState.url);
    this.setState(
      {
        pageTitle: webViewState.title,
        pageUrl: domain,
        canGoBack: webViewState.canGoBack,
        canGoForward: webViewState.canGoForward
      },
      () => {
        navigation.setParams({
          pageTitle: webViewState.title,
          pageUrl: domain,
          canGoBack: webViewState.canGoBack,
          canGoForward: webViewState.canGoForward
        });
      }
    );
  };

  closeBrowser = () => {
    this.props.navigation.goBack();
  };

  goBack = () => {
    this.refs[WEBVIEW_REF].goBack();
  };

  goForward = () => {
    this.refs[WEBVIEW_REF].goForward();
  };

  _getUrlDomain = url =>
    url
      .split("/")
      .splice(0, 3)
      .join("/");

  render() {
    const { url } = this.props.navigation.state.params;
    return (
      <View style={webViewBrowser.pageWrapper}>
        <WebView
          source={{ uri: url }}
          ref={WEBVIEW_REF}
          onNavigationStateChange={this.onNavigationStateChange}
        />
      </View>
    );
  }
}

WebViewBrowser.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired
};
