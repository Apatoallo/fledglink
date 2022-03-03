import React, { PureComponent } from "react";
import { View, Text } from "native-base";
import moment from "moment";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { colors, fonts } from "../../../configs/config";

const styles = StyleSheet.create({
  dayWrapper: {
    marginVertical: 5
  },
  hourWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 14,
    letterSpacing: 0,
    color: colors.warmGrey
  },
  title: {
    fontFamily: fonts.bold
  },
  description: {
    fontFamily: fonts.regular
  }
});

export default class ScheduleItem extends PureComponent {
  renderDate = () => {
    const {
      hour: { startDate, endDate }
    } = this.props;
    const startTime = moment(startDate).format("HH:mm");
    const endTime = moment(endDate).format("HH:mm");
    const eventTime = `${startTime} - ${endTime}`;
    return eventTime;
  };

  render() {
    const {
      hour: { title, description }
    } = this.props;
    return (
      <View style={styles.dayWrapper}>
        <View style={styles.hourWrapper}>
          <View style={{ flex: 2 }}>
            <Text style={[styles.text, styles.description]}>
              {this.renderDate()}
            </Text>
          </View>
          <View style={{ flex: 4 }}>
            <Text style={[styles.text, styles.title]}>{title}</Text>
            <Text style={[styles.text, styles.description]}>{description}</Text>
          </View>
        </View>
      </View>
    );
  }
}

ScheduleItem.propTypes = {
  hour: PropTypes.instanceOf(Object).isRequired
};
