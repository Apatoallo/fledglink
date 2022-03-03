import React, { PureComponent } from "react";
import { View } from "native-base";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { colors } from "../configs/config";

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  progressView: {
    margin: 3,
    width: 32,
    height: 12,
    borderRadius: 5
  },
  complete: {
    backgroundColor: colors.darkerViolet
  },
  incomplete: {
    backgroundColor: colors.grey
  }
});

export default class ProgressBarComponent extends PureComponent {
  render() {
    const { pageNumber, pageQuantity } = this.props;
    return (
      <View style={styles.wrapper}>
        {[...Array(pageQuantity).keys()].map(key => (
          <View
            key={key}
            style={[
              styles.progressView,
              key < pageNumber ? styles.complete : styles.incomplete
            ]}
          />
        ))}
      </View>
    );
  }
}

ProgressBarComponent.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  pageQuantity: PropTypes.number.isRequired
};
