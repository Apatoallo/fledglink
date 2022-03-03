import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "native-base";
import PushReceiverComponent from "./PushReceiverComponent";
import PushEmitter, { pushTypes } from "../emitter/PushEmitter";

export default class BadgeIcon extends PushReceiverComponent {

  constructor(props) {
    super(props);
    this.state = {
      pushCount: this._getPushCountByTag()
    };
  }

  _listener = () => this.setState({ pushCount: this._getPushCountByTag() });

  componentDidMount() {
    PushEmitter.instance.subscribe(pushTypes.all, this._listener);
  }

  componentWillUnmount() {
    PushEmitter.instance.unsubscribe(pushTypes.all, this._listener);
  }

  render() {
    const { children, badgeColor, onPress, textColor } = this.props;
    const { pushCount } = this.state;

    return (
      <View>
        {children}
        {!!pushCount && (
          <View
            style={{
              left: 12,
              top: 3,
              width: 20,
              height: 20,
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              borderColor: badgeColor,
              borderRadius: 10,
              backgroundColor: badgeColor
            }}
          >
            <Text
              style={{
                color: textColor,
                fontSize: 10,
                textAlign: "center"
              }}
            >
              {pushCount}
            </Text>
          </View>
        )}
      </View>
    );
  }

  _getPushCountByTag() {
    const { pushTags } = this.props;
    let count = 0;
    pushTags.forEach(element => {
      count += PushEmitter.instance.notificationCount(element);
    });
    return count;
  }
}

BadgeIcon.propTypes = {
  pushTags: PropTypes.instanceOf(Array).isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  badgeColor: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  onPress: PropTypes.func,
  textColor: PropTypes.string
};

BadgeIcon.defaultProps = {
  name: "info",
  type: "AntDesign",
  badgeColor: "red",
  iconColor: "white",
  textColor: "white",
  iconSize: 26,
  pushTags: [pushTypes.all],
  onPress: () => {}
};
