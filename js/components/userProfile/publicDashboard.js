import React, { PureComponent } from "react";
import { Text, View, Icon } from "native-base";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../configs/config";

const feather1 = require("../../../images/feathers/1.png");
const feather2 = require("../../../images/feathers/2.png");
const feather3 = require("../../../images/feathers/3.png");
const feather4 = require("../../../images/feathers/4.png");
const feather5 = require("../../../images/feathers/5.png");

const publicDashboard = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 140
  },
  containerInnerBlock: {
    flex: 0.5,
    flexDirection: "column",
    height: 80,
    alignItems: "center",
    justifyContent: "center"
  },
  containerInnerBlockRight: {
    backgroundColor: colors.gallery,
    width: 1,
    height: "70%"
  },
  containerInnerBlockIcon: {
    color: colors.darkestViolet
  },
  containerInnerBlockText: {
    fontSize: 20,
    color: colors.darkestViolet
  }
});

export default class PublicDashboard extends PureComponent {
  getProfileScoreImage = () => {
    const profileScoreImagesUrls = {
      1: feather1,
      2: feather2,
      3: feather3,
      4: feather4,
      5: feather5
    };
    return <Image source={profileScoreImagesUrls[this.props.profileScore]} />;
  };

  goToConnections = () => {
    this.props.navigateToConnectionsList(this.props.userId);
  };

  render() {
    const { connectionsCount } = this.props;
    return (
      <View style={publicDashboard.container}>
        <TouchableOpacity
          style={publicDashboard.containerInnerBlock}
          onPress={this.goToConnections}
        >
          <Icon
            name="user"
            type="Feather"
            style={publicDashboard.containerInnerBlockIcon}
          />
          <Text style={publicDashboard.containerInnerBlockText}>
            {`${connectionsCount || 0} Connections`}
          </Text>
        </TouchableOpacity>
        <View style={[publicDashboard.containerInnerBlockRight]} />
        <View style={[publicDashboard.containerInnerBlock]}>
          <View style={{ height: 30 }}>{this.getProfileScoreImage()}</View>
          <Text style={publicDashboard.containerInnerBlockText}>
            Profile Score
          </Text>
        </View>
      </View>
    );
  }
}

PublicDashboard.propTypes = {
  connectionsCount: PropTypes.number.isRequired,
  profileScore: PropTypes.number.isRequired,
  navigateToConnectionsList: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};
