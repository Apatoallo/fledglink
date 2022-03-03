import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Spinner, Title, Icon, Text, View } from "native-base";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableWithoutFeedback
} from "react-native";
import moment from "moment";
import PropTypes from "prop-types";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { resourceShare } from "../../utils/shareResource";
import { getHeaderHeight } from "../../App";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";
import { subscribeToEvent, fetchEventById } from "../../actions/events";
import { trackEventAttendance } from "../../actions/analytics";
import MarkDownComponent from "../../shared/MarkDownComponent";
import TitleComponent from "./Components/TitleComponent";
import SwitcherEvent from "./Components/SwitcherEvent";
import Schedule from "./Components/Schedule";
import styles from "./styles";
import { colors } from "../../configs/config";

const backgroundProfile = require("../../../images/headerImage.png");

class EventPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const externalShare = navigation.getParam("externalShare");
    return {
      headerRight: (
        <View style={{ flexDirection: "row", marginRight: 12 }}>
          <TouchableWithoutFeedback transparent onPress={externalShare}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 6
              }}
            >
              <Icon
                style={{ color: "white", fontSize: 24 }}
                name="share"
                type="Feather"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      )
    };
  };

  componentDidMount = () => {
    const { navigation, event, fetchEventById, id } = this.props;

    if (!event) {
      fetchEventById(id);
    }

    navigation.setParams({
      externalShare: this.externalShared
    });
  };

  subscribeToEvent = () => {
    const { event, subscribeToEvent, trackEventAttendance } = this.props;
    trackEventAttendance(event);
    subscribeToEvent(event.id, event.isSubscribed);
  };

  externalShared = () => {
    const {
      event: { id }
    } = this.props;
    FirebaseAnalytics.setCurrentScreen("Share", "Opportunity");
    resourceShare("events", id);
  };

  parallaxForeground = () => {
    const {
      event: { logo }
    } = this.props;
    return (
      <View style={styles.parallaxForeground}>
        <View style={styles.parallaxOverlay}>
          <View style={styles.innerBlock}>
            <Image
              source={{ uri: logo }}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
        </View>
      </View>
    );
  };

  parallaxBackground = () => {
    const {
      event: { backgroundTakeover }
    } = this.props;
    return (
      <View>
        <Image
          source={{ uri: backgroundTakeover }}
          style={styles.parallaxBackgroundImage}
        />
        <View style={styles.parallaxBackgroundImageOverlay} />
      </View>
    );
  };

  parallaxStickyHeader = () => (
    <ImageBackground
      source={backgroundProfile}
      style={{ height: getHeaderHeight(), width: null }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Title style={{ color: colors.white }}>Event</Title>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );

  renderSchedule = () => {
    const {
      event: { schedule }
    } = this.props;
    const days = Object.keys(schedule);
    return days.map(this.renderScheduleForDay);
  };

  renderScheduleForDay = day => {
    const {
      event: { schedule }
    } = this.props;
    const dateText = moment(day).format("dddd Do MMMM YYYY");
    return (
      <View>
        <Text style={styles.dayText}>{dateText}</Text>
        <Schedule schedule={schedule[day]} />
      </View>
    );
  };

  render() {
    const { event, navigation, loading } = this.props;
    return (
      <Container style={{ backgroundColor: "#fff", paddingBottom: 10 }}>
        {(loading && <Spinner />) || (
          <ParallaxScrollView
            headerBackgroundColor="white"
            parallaxHeaderHeight={300}
            stickyHeaderHeight={getHeaderHeight()}
            backgroundSpeed={10}
            scrollIndicatorInsets={{ right: 1 }}
            renderForeground={this.parallaxForeground}
            renderBackground={this.parallaxBackground}
            renderStickyHeader={this.parallaxStickyHeader}
          >
            <View style={{ overflow: "visible", paddingTop: 5 }}>
              <TitleComponent styles={styles} {...event} />
              <SwitcherEvent
                styles={styles}
                isSubscribed={event.isSubscribed}
                subscribeToEvent={this.subscribeToEvent}
              />
              <View style={{ paddingHorizontal: 15 }}>
                <Text style={styles.fieldsTitle}>Event Overview</Text>
                <MarkDownComponent
                  navigation={navigation}
                  content={event.overview}
                />
              </View>
              <View style={{ paddingHorizontal: 15 }}>
                <Text style={styles.fieldsTitle}>Schedule</Text>
                {this.renderSchedule()}
              </View>
              <View style={{ paddingHorizontal: 15 }}>
                <Text style={styles.fieldsTitle}>Event Overview</Text>
                <MarkDownComponent
                  navigation={navigation}
                  content={event.content}
                />
              </View>
            </View>
          </ParallaxScrollView>
        )}
      </Container>
    );
  }
}

EventPage.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  event: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool
};

EventPage.defaultProps = {
  loading: true
};

function bindActions(dispatch) {
  return {
    fetchEventById: id => dispatch(fetchEventById(id)),
    subscribeToEvent: (id, isSubscribe) =>
      dispatch(subscribeToEvent(id, isSubscribe)),
    trackEventAttendance: event => dispatch(trackEventAttendance(event))
  };
}

const mapStateToProps = (state, props) => {
  const {
    navigation: {
      state: {
        params: { id }
      }
    }
  } = props;
  const event = state.eventsStore.eventsList.find(item => item.id === id);
  return {
    token: state.token.token,
    loading: event ? state.eventsStore.loadingEvent : true,
    event,
    id
  };
};

export default connect(
  mapStateToProps,
  bindActions
)(EventPage);
