import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Text, Body, ListItem, Thumbnail, View } from "native-base";
import { formatDate } from "../../utils/formatDate";
import { findLocations } from "../../utils/findLocations";
import { colors } from "../../configs/config";

const undefinedUser = require("../../../images/no-company-image.png");

const opportunityItem = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 0.5,
    marginHorizontal: 10
  },
  imageContainer: {
    padding: 5,
    borderRadius: 5,
    borderColor: colors.lightGrey,
    borderStyle: "solid",
    borderWidth: 1
  },
  image: {
    height: 45,
    width: 45
  },
  bodyBlock: {
    paddingLeft: 10,
    alignItems: "flex-start"
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: colors.violet
  },
  subTitleText: {
    fontSize: 14,
    marginBottom: 4,
    color: colors.black
  },
  subText: {
    fontSize: 12,
    color: colors.grey
  }
});

export default class OpportunityListItem extends Component {
  render() {
    const { opportunity, company, clickHandler } = this.props;
    return (
      <ListItem
        onPress={() => clickHandler(opportunity.id)}
        style={opportunityItem.wrapper}
      >
        <View style={opportunityItem.imageContainer}>
          <Thumbnail
            style={opportunityItem.image}
            square
            resizeMode="contain"
            source={
              company.baseInfo.logo
                ? { uri: company.baseInfo.logo }
                : undefinedUser
            }
          />
        </View>
        <Body style={opportunityItem.bodyBlock}>
          <View>
            <Text numberOfLines={1} style={opportunityItem.titleText}>
              {opportunity.jobTitle}
            </Text>
            <Text note style={opportunityItem.subTitleText}>
              {company.baseInfo.name}
            </Text>
            <Text note style={opportunityItem.subText}>
              {findLocations(opportunity).length > 0 &&
                findLocations(opportunity)
                  .map(location => location.name)
                  .join(", ")}
              {findLocations(opportunity).length > 0 &&
                opportunity.applicationDeadline &&
                "  •  "}
              {opportunity.applicationDeadline &&
                `Closes: ${formatDate(opportunity.applicationDeadline)}`}
            </Text>
          </View>
        </Body>
      </ListItem>
    );
  }
}
