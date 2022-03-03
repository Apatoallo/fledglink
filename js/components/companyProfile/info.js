import React, { Component } from "react";
import { Text, View } from "native-base";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../configs/config";
import { formatDate } from "../../utils/formatDate";
const removeMd = require("../../utils/removeMarkdown");

const infoTab = StyleSheet.create({
  wrapper: {
    padding: 15
  },
  titleText: {
    color: colors.black,
    marginTop: 15
  },
  text: {
    color: colors.warmGrey,
    fontSize: 14,
    paddingBottom: 8
  },
  companyWebsite: {
    color: colors.violet,
    textDecorationLine: "underline",
    fontSize: 14,
    paddingBottom: 8
  }
});

export default class Info extends Component {
  filter = location => location.isHeadquarters === true;

  findHeadquarter = locations => {
    if (locations && locations.length) {
      const resultFilter = locations.find(this.filter);
      return resultFilter ? resultFilter.name : null;
    }
  };

  openCompanyWebsite = () => {
    const { navigation, website } = this.props;
    navigation.navigate("WebViewBrowser", { url: website });
  };

  render() {
    const {
      industry,
      companyType,
      specialties,
      founded,
      website,
      locations
    } = this.props;
    return (
      <View style={infoTab.wrapper}>
        {website ? (
          <View>
            <Text style={infoTab.titleText}>Website</Text>
            <Text
              onPress={this.openCompanyWebsite}
              style={infoTab.companyWebsite}
            >
              {website}
            </Text>
          </View>
        ) : null}
        {industry ? (
          <View>
            <Text style={infoTab.titleText}>Industry</Text>
            <Text style={infoTab.text}>{industry}</Text>
          </View>
        ) : null}
        {companyType && companyType.length > 0 ? (
          <View>
            <Text style={infoTab.titleText}>Company Size</Text>
            {companyType.map((item, i) => (
              <Text key={i} style={infoTab.text}>
                {item}
              </Text>
            ))}
          </View>
        ) : null}
        {this.findHeadquarter(locations) ? (
          <View>
            <Text style={infoTab.titleText}>Headquarters</Text>
            <Text style={infoTab.text}>{this.findHeadquarter(locations)}</Text>
          </View>
        ) : null}
        {specialties && specialties.length > 0 ? (
          <View>
            <Text style={infoTab.titleText}>Specialties</Text>
            {specialties.map((item, i) => (
              <Text key={i} style={infoTab.text}>
                {removeMd(item)}
              </Text>
            ))}
          </View>
        ) : null}
        {founded ? (
          <View>
            <Text style={infoTab.titleText}>Founded</Text>
            <Text style={infoTab.text}>{formatDate(founded)}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

Info.propTypes = {
  companyWebSiteClickHandler: PropTypes.func.isRequired,
  website: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
