import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text, Button, View, Thumbnail, Icon } from "native-base";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import BrandIcon from "../components/BrandIcon";
import { formatDate } from "../utils/formatDate";
import { colors, fonts } from "../configs/config";

const companyImage = require("../../images/no-company-image.png");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.violet,
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

export default class OpportunityCard extends React.Component {
  render() {
    const { opportunity, onPress } = this.props;
    return (
      <>
        {opportunity &&
        opportunity.jobTitle &&
        opportunity.corporation &&
        !opportunity.isArchived ? (
          <TouchableWithoutFeedback onPress={() => onPress(opportunity)}>
            <View style={styles.container}>
              <View style={styles.alert}>
                {/* <BrandIcon
                  name="career"
                  color={colors.whiteOpacity}
                  size={15}
                  lineHeight={19}
                /> */}
                <Text style={styles.alertName}>OPPORTUNITY ALERT</Text>
              </View>
              <View style={styles.bodyBlock}>
                <View style={styles.imageContainer}>
                  <Thumbnail
                    style={styles.image}
                    square
                    resizeMode="contain"
                    source={
                      opportunity.corporation.baseInfo &&
                      opportunity.corporation.baseInfo.logo
                        ? { uri: opportunity.corporation.baseInfo.logo }
                        : companyImage
                    }
                  />
                </View>
                <View style={styles.details}>
                  <Text numberOfLines={1} style={styles.titleText}>
                    {opportunity.jobTitle}
                  </Text>
                  {opportunity.corporation.baseInfo &&
                    opportunity.corporation.baseInfo.name && (
                      <Text numberOfLines={1} note style={styles.subTitle}>
                        {opportunity.corporation.baseInfo.name}
                      </Text>
                    )}
                  <Text numberOfLines={2} note style={styles.subText}>
                    {opportunity.locations &&
                      opportunity.locations.length > 0 &&
                      opportunity.locations
                        .map(location => location.name)
                        .join(", ")}
                    {opportunity.locations &&
                      opportunity.locations.length > 0 &&
                      opportunity.applicationDeadline &&
                      "  •  "}
                    {opportunity.applicationDeadline &&
                      `Closes: ${formatDate(opportunity.applicationDeadline)}`}
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
      </>
    );
  }
}

OpportunityCard.propTypes = {
  opportunity: PropTypes.object,
  clickHandler: PropTypes.func
};
