import React, { PureComponent } from "react";
import { View } from "native-base";
import { Dropdown } from "react-native-material-dropdown";
import { colors } from "../../configs/config";

export default class Select extends PureComponent {
  render() {
    const {
      data,
      label,
      input: { onChange, value, ...inputProps },
      ...pickerProps
    } = this.props;
    return (
      <View style={{ marginBottom: 10 }}>
        <Dropdown
          label={label}
          labelFontSize={15}
          textColor={colors.darkBlack}
          baseColor={colors.grey}
          onValueChange={value => onChange(value)}
          onChangeText={value => onChange(value)}
          value={value}
          data={data}
          {...inputProps}
          {...pickerProps}
        />
      </View>
    );
  }
}
