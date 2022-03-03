import React, { PureComponent } from "react";
import { View, Text } from "native-base";
import { Switch } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../../configs/config";

export default class SwitcherEvent extends PureComponent {
  render() {
    const { styles, isSubscribed, subscribeToEvent } = this.props;
    return (
      <View style={styles.subscribeWrapper}>
        <Text style={styles.subscribeText}>
          Attending? Tell us and get exclusive updates:
        </Text>
        <View style={styles.switcherWrapper}>
          <Switch
            onValueChange={subscribeToEvent}
            value={isSubscribed}
            onTintColor={colors.violet}
            thumbTintColor={colors.white}
          />
          <Text style={styles.switcherText}>I’ll be there!</Text>
        </View>
      </View>
    );
  }
}

SwitcherEvent.propTypes = {
  styles: PropTypes.instanceOf(Object).isRequired,
  isSubscribed: PropTypes.bool.isRequired,
  subscribeToEvent: PropTypes.func.isRequired
};
