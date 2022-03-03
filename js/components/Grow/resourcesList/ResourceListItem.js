import React, { PureComponent } from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { Text, Body, Thumbnail, View } from "native-base";
import { find } from "lodash";
import PropTypes from "prop-types";
import { colors } from "../../../configs/config";

const undefinedCompany = require("../../../../images/no-company-image.png");
const lockIcon = require("../../../../images/lock_icon.png");

const resourceItem = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 140,
    borderBottomColor: colors.grey,
    borderBottomWidth: 0.5,
    paddingLeft: 0,
    marginHorizontal: 20
  },
  resourceImage: {
    width: "40%",
    height: 120,
    borderRadius: 5,
    marginRight: 20,
    resizeMode: "cover"
  },
  bodyBlock: {
    width: "60%",
    alignItems: "flex-start"
  },
  titleText: {
    fontSize: 20,
    lineHeight: 22,
    marginBottom: 10,
    color: colors.violet
  },
  subText: {
    color: colors.grey,
    fontSize: 16
  },
  lockedOverlay: {
    position: "absolute",
    zIndex: 1,
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.4)"
  },
  lockedOverlayIcon: {
    marginLeft: 5
  }
});

export default class ResourceListItem extends PureComponent {
  static propTypes = {
    token: PropTypes.string
  };

  goToResource = () => {
    const { resource, resourceClickHandler } = this.props;
    resourceClickHandler(resource);
  };

  isResourceLocked = () => {
    const { tags } = this.props.resource;
    return find(tags, ["name", "Locked"]);
  };

  render() {
    const { resource } = this.props;
    return (
      <TouchableOpacity
        onPress={this.goToResource}
        style={resourceItem.container}
      >
        <Thumbnail
          square
          style={resourceItem.resourceImage}
          source={resource.image ? { uri: resource.image } : undefinedCompany}
        />
        <Body style={resourceItem.bodyBlock}>
          <View>
            <Text numberOfLines={2} style={resourceItem.titleText}>
              {resource.title}
            </Text>
            <Text note style={resourceItem.subText}>
              {resource.tags.length ? resource.tags[0].name : null}
            </Text>
          </View>
        </Body>
        {this.isResourceLocked() && (
          <View style={resourceItem.lockedOverlay}>
            <Image source={lockIcon} style={resourceItem.lockedOverlayIcon} />
          </View>
        )}
      </TouchableOpacity>
    );
  }
}
