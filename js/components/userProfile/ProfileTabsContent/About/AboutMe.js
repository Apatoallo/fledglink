import React, { PureComponent } from "react";
import { Text } from "native-base";
import { View, StyleSheet } from "react-native";
import EditButton from "../../EditButton";
import { colors } from "../../../../configs/config";

const aboutMe = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 18,
    color: colors.black
  },
  aboutMeContentWrapper: {
    padding: 10
  },
  aboutMeText: {
    color: colors.grey
  }
});

export default class AboutMe extends PureComponent {
  getGenderedText = gender => {
    if (gender === "Male") {
      return "himself";
    } else if (gender === "Female") {
      return "herself";
    } else {
      return "themselves";
    }
  };

  render() {
    const { press, about, showEdit, name, userName, gender } = this.props;
    return (
      <View>
        <View style={aboutMe.container}>
          <Text style={aboutMe.title}>About Me</Text>
          {showEdit && <EditButton onClickHandler={press} />}
        </View>
        {name === "My CV" ? (
          <View style={aboutMe.aboutMeContentWrapper}>
            <Text style={aboutMe.aboutMeText}>
              {about || "You have added nothing about yourself"}
            </Text>
          </View>
        ) : (
          <View style={aboutMe.aboutMeContentWrapper}>
            <Text style={aboutMe.aboutMeText}>
              {about ||
                `${userName} has not added any detail about ${this.getGenderedText(
                  gender
                )}`}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
