import React, { PureComponent } from "react";
import { Text, Icon } from "native-base";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { colors, fonts } from "../configs/config";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  selectItemWrapper: {
    height: 40,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30
  },
  activeItem: {
    backgroundColor: colors.gallery
  },
  inactiveItem: {
    backgroundColor: "transparent"
  },
  textItem: {
    fontFamily: fonts.regular,
    fontSize: width > 350 ? 16 : 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: colors.black
  },
  checkIcon: {
    fontSize: 18,
    color: colors.green
  }
});

export default class ItemComponent extends PureComponent {
  handleClick = () => {
    const { value, checked, clickHandler } = this.props;
    clickHandler(value, !checked);
  };

  render() {
    const { value, checked, styles: inputStyles } = this.props;
    return (
      <TouchableOpacity
        onPress={this.handleClick}
        style={[
          styles.selectItemWrapper,
          checked ? styles.activeItem : styles.inactiveItem,
          inputStyles
        ]}
      >
        <Text style={styles.textItem}>{value}</Text>
        {checked && (
          <Icon style={styles.checkIcon} type="Feather" name="check" />
        )}
      </TouchableOpacity>
    );
  }
}

ItemComponent.propTypes = {
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
  paddingLeft: PropTypes.number
};

ItemComponent.defaultProps = {
  paddingLeft: 30
};
