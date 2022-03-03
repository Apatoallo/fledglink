import React, { PureComponent } from "react";
import { formatDate } from "../../utils/formatDate";
import { findLocations } from "../../utils/findLocations";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text, Body, View, Thumbnail } from "native-base";
import { colors } from "../../configs/config";

const undefinedUser = require("../../../images/no-company-image.png");

const listItem = StyleSheet.create({
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
    padding: 10,
    alignItems: "flex-start"
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: colors.violet
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 4,
    color: colors.black
  },
  subText: {
    fontSize: 12,
    color: colors.grey
  }
});

export default class OpportunityTabListItem extends PureComponent {
  opportunityClick = () => {
    const { opportunity, clickHandler } = this.props;
    clickHandler(opportunity.id);
  };

  render() {
    const { opportunity } = this.props;
    return (
      <TouchableOpacity
        onPress={this.opportunityClick}
        style={listItem.wrapper}
      >
        <View style={listItem.imageContainer}>
          <Thumbnail
            style={listItem.image}
            square
            resizeMode="contain"
            source={
              opportunity.corporation?.baseInfo?.logo
                ? { uri: opportunity.corporation?.baseInfo?.logo }
                : undefinedUser
            }
          />
        </View>
        <Body style={listItem.bodyBlock}>
          <View>
            <Text numberOfLines={1} style={listItem.titleText}>
              {opportunity.jobTitle}
            </Text>
            <Text note style={listItem.subTitle}>
              {opportunity.corporation?.baseInfo?.name}
            </Text>
            <Text note style={listItem.subText}>
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
      </TouchableOpacity>
    );
  }
}
