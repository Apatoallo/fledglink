import React, { PureComponent } from "react";
import { Text } from "native-base";
import { View, StyleSheet } from "react-native";
import EditButton from "../../EditButton";
import Chip from "./Chip";
import { colors } from "../../../../configs/config";

const hobbiesStyles = StyleSheet.create({
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
  hobbiesListWrapper: {
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  fillText: {
    color: colors.grey
  }
});

export default class Hobbies extends PureComponent {
  render() {
    const { press, hobbies, showEdit, name, userName } = this.props;
    return (
      <View>
        <View style={hobbiesStyles.container}>
          <Text style={hobbiesStyles.title}>Hobbies and Interests</Text>
          {showEdit && <EditButton onClickHandler={press} />}
        </View>
        <View style={hobbiesStyles.hobbiesListWrapper}>
          {hobbies && hobbies.length > 0 ? (
            hobbies.map(item => <Chip key={item.id} text={item.name} />)
          ) : (
            <Text style={hobbiesStyles.fillText}>{`${
              name === "My CV"
                ? "You have added no hobbies"
                : `${userName} has not added any hobbies`
            }`}</Text>
          )}
        </View>
      </View>
    );
  }
}
