import React, { Component } from "react";
import { Icon } from "native-base";
import PropTypes from "prop-types";
import RNPopover from "react-native-popover-menu";
import { colors } from "../configs/config";

const icon = name => (
  <Icon family="FontAwesome" name={name} color={colors.black} size={16} />
);

export default class PopoverMenu extends Component {
  shouldComponentUpdate(nextProps) {
    const { visible } = this.props;
    return visible !== nextProps.visible;
  }

  render() {
    const { visible, reference, onPress, onCancel, options } = this.props;
    return (
      <RNPopover
        visible={visible}
        reference={reference}
        onDone={onPress}
        onCancel={onCancel()}
        borderColor="#dcdcdc"
      >
        {options.map(item => (
          <RNPopover.Menu key={item.text}>
            <RNPopover.Menu label={item.text} icon={icon(item.icon)} />
          </RNPopover.Menu>
        ))}
      </RNPopover>
    );
  }
}

PopoverMenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  reference: PropTypes.instanceOf(Object).isRequired
};
