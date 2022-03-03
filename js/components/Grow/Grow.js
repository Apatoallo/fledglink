import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Tabs, Tab } from "native-base";
import { colors } from "../../configs/config";
import AssessmentHub from "./AssessmentHub/AssessmentHub";
import ResourcesList from "./resourcesList/ResourcesList";
import styles from "../../styles/tabs";

class Grow extends Component {
  navigate = (route, data, key) => {
    this.props.navigation.navigate(route, { [key]: data });
  };

  render() {
    const { user, navigation } = this.props;
    return (
      <Container style={{ backgroundColor: colors.white }}>
        <Tabs locked {...styles.tabsStyles}>
          <Tab heading="Assessment" {...styles.tabStyles}>
            <AssessmentHub navigation={navigation} />
          </Tab>
          <Tab heading="Learn" {...styles.tabStyles}>
            <ResourcesList navigation={navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Grow);
