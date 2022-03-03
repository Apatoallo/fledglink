import React, { PureComponent } from "react";
import { Icon } from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../../../configs/config";

const chipDeleteButton = StyleSheet.create({
  container: {
    marginLeft: 5
  },
  icon: {
    color: colors.grey,
    fontSize: 18
  }
});

export default class ChipDeleteButton extends PureComponent {
  render() {
    const { deleteHandler } = this.props;
    return (
      <TouchableOpacity
        onPress={deleteHandler}
        block
        iconLeft
        style={chipDeleteButton.container}
      >
        <Icon name="x" type="Feather" style={chipDeleteButton.icon} />
      </TouchableOpacity>
    );
  }
}
