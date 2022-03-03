import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "native-base";
import { accessPolicy, cancelPolicy } from "../../actions/policy";
import styles from "./styles";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";

import { isIphoneX } from "react-native-iphone-x-helper";

import Pdf from "react-native-pdf";

class ResultPDF extends Component {
  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam("name");

    return {
      title: name
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      ...this.props.navigation.state.params
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const { name, accessing } = this.state;

    navigation.setParams({
      show:
        (name === "Terms and Conditions" || name === "Data Policy") &&
        accessing,
      accept: this.onAccept
    });

    switch (this.state.name) {
      case "Personality Activity":
        return FirebaseAnalytics.setCurrentScreen("Personality", "Activity");
      case "Result PDF":
        return FirebaseAnalytics.setCurrentScreen("Result PDF", "PDF");
      case "Data Policy":
        return FirebaseAnalytics.setCurrentScreen("Data Policy", "PDF");
      case "Terms and Conditions":
        return FirebaseAnalytics.setCurrentScreen(
          "Terms and Conditions",
          "PDF"
        );
    }
  };

  navigationBack = needAccept => () => {
    if (needAccept) {
      this.props.cancelPolicy();
      this.props.navigation.navigate("SignUp", { cancelPolicy: true });
    } else {
      this.props.navigation.goBack();
    }
  };

  onAccept = () => {
    const { navigation, accessPolicy } = this.props;
    const { name } = this.state;

    if (name === "Terms and Conditions") {
      this.setState(
        {
          name: "Data Policy",
          url:
            "https://fledglink-staging.ams3.digitaloceanspaces.com/terms_and_conditions/Fledglink%20-%20App%20Privacy%20Notice.pdf"
        },
        () => navigation.setParams({ name: this.state.name })
      );
    } else if (name === "Data Policy") {
      accessPolicy();
      navigation.goBack();
    }
  };

  render() {
    const { url } = this.state;
    return (
      <Container
        style={{ ...styles.container, paddingBottom: isIphoneX() ? 40 : 0 }}
      >
        <Pdf
          source={{ uri: url }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          style={styles.pdf}
        />
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    accessPolicy: () => dispatch(accessPolicy()),
    cancelPolicy: () => dispatch(cancelPolicy())
  };
}
const mapStateToProps = state => ({
  token: state.token.token,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  bindAction
)(ResultPDF);
