import React, { PureComponent } from "react";
import { Text, View } from "native-base";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { colors } from "../../configs/config";

export default class MultiSelect extends PureComponent {
  render() {
    const {
      children,
      label,
      input: { onChange, value, ...inputProps }
    } = this.props;
    const baseColor = value.length ? colors.darkBlack : colors.grey;
    const selectText = value.length ? "Selected: " : label;
    return (
      <View
        style={{
          paddingBottom: 10,
          marginBottom: 10,
          borderBottomColor: colors.grey,
          borderBottomWidth: 0.5
        }}
      >
        {value.length ? (
          <Text style={{ color: colors.grey, marginBottom: 0 }}>{label}</Text>
        ) : null}
        <SectionedMultiSelect
          items={children}
          uniqueKey="name"
          displayKey="name"
          selectText={selectText}
          showDropDowns
          showChips={value.length !== 0}
          colors={{
            chipColor: colors.grey,
            text: colors.grey,
            primary: colors.violet,
            selectToggleTextColor: baseColor
          }}
          styles={{
            selectToggle: { height: 40 }
          }}
          onSelectedItemsChange={value => onChange(value)}
          selectedItems={value}
          searchPlaceholderText="Search..."
        />
      </View>
    );
  }
}
