import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "native-base";
import { colors } from "../../configs/config";
import MarkDownComponent from "../../shared/MarkDownComponent";

const aboutTab = StyleSheet.create({
  title: {
    color: colors.black,
    fontSize: 18
  },
  text: {
    color: colors.warmGrey,
    fontSize: 14,
    paddingBottom: 8
  }
});

export default class About extends PureComponent {
  render() {
    const {
      about,
      companyName,
      companyValues,
      earlyCareers,
      additionalInfo,
      navigation
    } = this.props;
    return (
      <View style={{ padding: 15 }}>
        {about ? (
          <View>
            <Text style={aboutTab.title}>{`About ${companyName}`}</Text>
            <MarkDownComponent navigation={navigation} content={about} />
          </View>
        ) : null}
        {companyValues.length ? (
          <View style={{ paddingTop: 10 }}>
            <Text style={aboutTab.title}>Company Values</Text>
            {companyValues.map((item, i) => (
              <View key={i} style={{ flexDirection: "row" }}>
                <View>
                  <Text style={aboutTab.text}>{"   •   "}</Text>
                </View>
                <View>
                  <Text style={aboutTab.text}>{item.name}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}
        {earlyCareers.length ? (
          <View style={{ paddingTop: 10 }}>
            <Text style={aboutTab.title}>Early Careers</Text>
            {earlyCareers.map((item, i) => (
              <View key={i} style={{ flexDirection: "row" }}>
                <View>
                  <Text style={aboutTab.text}>{"   •   "}</Text>
                </View>
                <View>
                  <Text style={aboutTab.text}>{item}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}
        {additionalInfo ? (
          <View style={{ paddingTop: 10 }}>
            <MarkDownComponent
              navigation={navigation}
              content={additionalInfo}
            />
          </View>
        ) : null}
      </View>
    );
  }
}
