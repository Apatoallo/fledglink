import React, { PureComponent } from "react";
import { Text } from "native-base";
import { View, StyleSheet } from "react-native";
import { colors } from "../../../../configs/config";

const chip = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 2,
    height: 24,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: colors.black
  },
  text: {
    color: colors.grey
  }
});

export default class Chip extends PureComponent {
  deleteHobby = () => {
    const { deleteButtonHandler, hobbyId } = this.props;
    deleteButtonHandler(hobbyId);
  };

  render() {
    const { text, DeleteButton } = this.props;
    return (
      <View style={chip.container}>
        <Text style={chip.text}>{text}</Text>
        {DeleteButton && <DeleteButton deleteHandler={this.deleteHobby} />}
      </View>
    );
  }
}
