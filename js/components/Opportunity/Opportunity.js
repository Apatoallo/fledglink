import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Tabs, Tab } from "native-base";
import { colors } from "../../configs/config";
import AllOpportunities from "./OpportunitiesTab/AllOportunities";
import Companies from "./CompaniesTab/Companies";
import Events from "./EventsTab/Events";
import styles from "../../styles/tabs";

class Opportunity extends Component {
  navigate = (route, data, key) => {
    this.props.navigation.navigate(route, { [key]: data });
  };

  filterNav = route => {
    this.props.navigation.navigate(route);
  };

  redirectToEvent = id => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("Event", { id });
  };

  getPage() {
    const initialPage = this.props.navigation.getParam("tab", "opportunities");
    const tabs = {
      opportunities: 0,
      organisations: 1,
      events: 2
    };

    return tabs[initialPage] ? tabs[initialPage] : 0;
  }

  render() {
    const { user, navigation } = this.props;
    return (
      <Container style={{ backgroundColor: colors.white }}>
        <Tabs locked {...styles.tabsStyles} initialPage={this.getPage()}>
          <Tab heading="Opportunities" {...styles.tabStyles}>
            <AllOpportunities
              filterNav={this.filterNav}
              navigate={this.navigate}
            />
          </Tab>
          <Tab heading="Organisations" {...styles.tabStyles}>
            <Companies navigate={this.navigate} />
          </Tab>
          <Tab heading="Events" {...styles.tabStyles}>
            <Events
              redirectToEvent={this.redirectToEvent}
              filterNav={this.filterNav}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Opportunity);
