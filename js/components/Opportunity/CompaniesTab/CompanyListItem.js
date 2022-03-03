import React, { PureComponent } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text, Body, View, Thumbnail } from "native-base";
import { stringify } from "query-string";
import { colors } from "../../../configs/config";
import Badge from "../Badge";

const removeMd = require("../../../utils/removeMarkdown");
const undefinedUser = require("../../../../images/no-company-image.png");

const companyListItem = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 0.5,
    marginHorizontal: 10
  },
  imageContainer: {
    padding: 5,
    borderRadius: 5,
    borderColor: colors.lightGrey,
    borderStyle: "solid",
    borderWidth: 1,
    marginVertical: 10
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
  descriptionText: {
    fontSize: 14,
    color: colors.black
  },
  badgesWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    paddingTop: 5
  }
});

export default class CompanyListItem extends PureComponent {
  openCompany = () => {
    const { companyClickHandler, item } = this.props;
    companyClickHandler(item.id, "corpId", item);
  };

  render() {
    const { item } = this.props;
    const { baseInfo, overview, badges } = item;
    return (
      <TouchableOpacity
        onPress={this.openCompany}
        style={companyListItem.container}
      >
        <View style={companyListItem.imageContainer}>
          <Thumbnail
            style={companyListItem.image}
            square
            resizeMode="contain"
            source={
              baseInfo && baseInfo.logo ? { uri: baseInfo.logo } : undefinedUser
            }
          />
        </View>
        <Body style={companyListItem.bodyBlock}>
          <View>
            <Text numberOfLines={1} style={companyListItem.titleText}>
              {baseInfo && baseInfo.name}
            </Text>
            {overview && (
              <Text
                note
                numberOfLines={2}
                style={companyListItem.descriptionText}
              >
                {removeMd(overview)}
              </Text>
            )}
          </View>
          <View style={companyListItem.badgesWrapper}>
            {badges &&
              badges.map(badge => (
                <Badge key={badge.id} text={badge.title} small />
              ))}
          </View>
        </Body>
      </TouchableOpacity>
    );
  }
}
