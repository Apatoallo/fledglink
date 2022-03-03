import React, { Component } from "react";
import { Container } from "native-base";
import BackgroundHeader from "../components/backgroundHeader/BackgroundHeader";
import DetailedWorkExperienceListComponent from "../components/userProfile/DetailedWorkExperienceListComponent";

export default class WorkDetailedInformation extends Component {
  static navigationOptions = ({ navigation }) => {
    const workExperience = navigation.getParam("workExperience");

    return {
      headerTitle: workExperience.title
    };
  };

  render() {
    const workExperience = this.props.navigation.state.params.workExperience;
    return (
      <Container>
        <DetailedWorkExperienceListComponent workData={workExperience} />
      </Container>
    );
  }
}
