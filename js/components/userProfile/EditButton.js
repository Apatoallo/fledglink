import React, { PureComponent } from "react";
import { Icon } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../configs/config";

const editButton = StyleSheet.create({
  button: {
    zIndex: 2
  },
  buttonIcon: {
    color: colors.purple
  }
});

export default class EditButton extends PureComponent {
  editProfile = () => {
    const { onClickHandler } = this.props;
    onClickHandler();
  };

  render() {
    const { style } = this.props;
    return (
      <TouchableOpacity
        onPress={this.editProfile}
        style={[style, editButton.button]}
      >
        <Icon type="EvilIcons" name="pencil" style={editButton.buttonIcon} />
      </TouchableOpacity>
    );
  }
}
