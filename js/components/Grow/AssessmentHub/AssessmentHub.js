import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Linking } from "react-native";
import { Container, Content, Text, View } from "native-base";
import FirebaseAnalytics from "../../../Services/FirebaseAnalytics";
import { colors } from "../../../configs/config";
import {
  trackQuestionnaireInteraction,
  trackPracticeTestInteraction,
  trackAssessmentInteraction
} from "../../../actions/analytics";
import QuestionnaireCard from "./QuestionnaireCard";
import TestsCard from "./TestsCard";
import VirtualAssessmentCard from "./VirtualAssessmentCard";

const assessmentHub = StyleSheet.create({
  contentWrapper: {
    padding: 15
  },
  cardWrapper: {
    marginBottom: 10
  }
});

class AssessmentHub extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount = () => {
    FirebaseAnalytics.setCurrentScreen("Assessments", "Hub");
  };

  onQuestionnairePress = () => {
    const { user, navigation, trackQuestionnaireInteraction } = this.props;
    const navigationRoute = user.sova.testResultUrl
      ? "ResultPage"
      : "DescriptionTest";

    trackQuestionnaireInteraction();
    navigation.navigate(navigationRoute);
  };

  onTestPress = () => {
    const { navigation, trackPracticeTestInteraction } = this.props;

    trackPracticeTestInteraction();
    navigation.navigate("WebViewBrowser", {
      url: "https://www.assessmentday.co.uk/"
    });
  };

  onVirtualAssessmentPress = () => {
    const { navigation, trackAssessmentInteraction } = this.props;

    trackAssessmentInteraction();
    navigation.navigate("WebViewBrowser", {
      url: "https://www.fledglink.com/superfuturejobpredictor"
    });
  };

  render() {
    const { user } = this.props;
    return (
      <Container>
        <Content style={assessmentHub.contentWrapper}>
          <View style={assessmentHub.cardWrapper}>
            <QuestionnaireCard
              user={user}
              clickHandler={this.onQuestionnairePress}
            />
          </View>
          <View style={assessmentHub.cardWrapper}>
            <TestsCard clickHandler={this.onTestPress} />
          </View>
          <View style={assessmentHub.cardWrapper}>
            <VirtualAssessmentCard
              clickHandler={this.onVirtualAssessmentPress}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    trackQuestionnaireInteraction: () =>
      dispatch(trackQuestionnaireInteraction()),
    trackPracticeTestInteraction: () =>
      dispatch(trackPracticeTestInteraction()),
    trackAssessmentInteraction: () => dispatch(trackAssessmentInteraction())
  };
}

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(
  mapStateToProps,
  bindAction
)(AssessmentHub);
