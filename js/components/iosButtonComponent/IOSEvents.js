import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "native-base";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";
import Events from "../Opportunity/EventsTab/Events";
import MainHeaderIOs from "../MainHeader/HeaderIOs";

class IOSEvents extends Component {
  static navigationOptions = {
    header: null
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

  componentDidMount = () => {
    FirebaseAnalytics.setCurrentScreen("Home", "Home");
  };

  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      >
        <MainHeaderIOs navigation={navigation} />
        <Events
          redirectToEvent={this.redirectToEvent}
          filterNav={route => this.filterNav(route)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({ token: state.token.token });

export default connect(mapStateToProps)(IOSEvents);
