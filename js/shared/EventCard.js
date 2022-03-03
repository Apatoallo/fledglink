import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text, View, Thumbnail, Icon } from "native-base";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import { formatDate } from "../utils/formatDate";
import BrandIcon from "../components/BrandIcon";
import { colors, fonts } from "../configs/config";

const companyImage = require("../../images/no-company-image.png");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.darkViolet,
    padding: 20,
    marginBottom: 10
  },
  alert: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 2
  },
  alertName: {
    fontSize: 10,
    fontFamily: fonts.bold,
    color: colors.whiteOpacity,
    marginLeft: 2
  },
  imageContainer: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.white,
    marginRight: 10
  },
  image: {
    height: 45,
    width: 45
  },
  bodyBlock: {
    display: "flex",
    flexDirection: "row",
    margin: 0,
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  details: {
    flex: 4
  },
  titleText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.white
  },
  subTitle: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.white
  },
  subText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.white
  }
});

export default class EventCard extends PureComponent {
  render() {
    const { event, onPress } = this.props;
    return (
      <React.Fragment>
        {event && event.title ? (
          <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
              <View style={styles.alert}>
                <BrandIcon
                  name="calendar"
                  color={colors.whiteOpacity}
                  size={15}
                  lineHeight={19}
                />
                <Text style={styles.alertName}>UPCOMING EVENT</Text>
              </View>
              <View style={styles.bodyBlock}>
                <View style={styles.imageContainer}>
                  <Thumbnail
                    style={styles.image}
                    square
                    resizeMode="contain"
                    source={event.logo ? { uri: event.logo } : companyImage}
                  />
                </View>
                <View style={styles.details}>
                  <Text numberOfLines={1} style={styles.titleText}>
                    {event.title}
                  </Text>
                  {event.location && event.location.name && (
                    <Text numberOfLines={1} note style={styles.subTitle}>
                      {event.location.name}
                    </Text>
                  )}
                  <Text numberOfLines={1} note style={styles.subText}>
                    {formatDate(event.startDate)}
                    {event.endDate && ` - ${formatDate(event.endDate)}`}
                  </Text>
                </View>
                <Icon
                  style={{ color: "white" }}
                  type="MaterialCommunityIcons"
                  name="chevron-right"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        ) : null}
      </React.Fragment>
    );
  }
}
