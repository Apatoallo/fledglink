import React, { PureComponent } from "react";
import moment from "moment";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { View, Text } from "native-base";
import { colors, fonts } from "../../../configs/config";

const styles = StyleSheet.create({
  event: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderBottomColor: "rgb(240, 236, 236)"
  },
  eventWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  titleEvent: {
    fontFamily: fonts.bold,
    fontSize: 16,
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.violet
  },
  marginTopElements: {
    marginTop: 5
  },
  eventDate: {
    fontFamily: fonts.bold,
    fontSize: 14,
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.black
  },
  eventText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 0,
    color: colors.black
  },
  eventTags: {
    fontFamily: fonts.bold,
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 0,
    color: colors.pink
  },
  button: {
    borderRadius: 16,
    backgroundColor: colors.violet,
    paddingHorizontal: 10,
    height: 32,
    width: 105,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: colors.white
  }
});

export default class EventComponent extends PureComponent {
  pressButtonHandler = () => {
    const { event, trackEventView, redirectToEvent } = this.props;

    trackEventView(event);
    redirectToEvent(event.id);
  };

  getDate = () => {
    const {
      event: { startDate, endDate }
    } = this.props;
    const returnedStartDate = startDate
      ? `${moment(startDate).format("Do MMM")}`
      : "Start date coming soon...";
    const returnedEndDate = endDate
      ? `${moment(endDate).format("Do MMM")}`
      : "End date coming soon...";
    if (!startDate && !endDate) {
      return "Event dates coming soon";
    }
    return `${returnedStartDate} - ${returnedEndDate}`;
  };

  render() {
    const {
      event: { title, logo, location, eventTypes, shortDescription }
    } = this.props;
    return (
      <View style={styles.event}>
        <View style={styles.eventWrapper}>
          <View style={{ flex: 2, alignItems: "center" }}>
            <Image source={{ uri: logo }} style={{ width: 80, height: 60 }} />
          </View>
          <View style={{ flex: 5 }}>
            <Text style={styles.titleEvent}>{title}</Text>
            <Text style={[styles.eventDate, styles.marginTopElements]}>
              {this.getDate()}
            </Text>
            <Text style={[styles.eventText, styles.marginTopElements]}>
              {location && location.name}
            </Text>
            <Text style={[styles.eventTags, styles.marginTopElements]}>
              {eventTypes.join(", ")}
            </Text>
            <Text style={[styles.eventText, styles.marginTopElements]}>
              {shortDescription}
            </Text>
            <TouchableOpacity
              onPress={this.pressButtonHandler}
              style={[styles.button, styles.marginTopElements]}
            >
              <Text uppercase style={styles.buttonText}>
                View more
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

EventComponent.propTypes = {
  event: PropTypes.instanceOf(Object).isRequired,
  redirectToEvent: PropTypes.func.isRequired
};
