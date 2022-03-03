import React, { Component } from "react";
import { Text, View } from "native-base";
import { Dimensions } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Toggle from "../../shared/Toggle";
import styles from "./styles";
import { colors, fonts } from "../../configs/config";

const { width } = Dimensions.get("window");

class LocationFields extends Component {
  render() {
    const { data, fields, update } = this.props;
    const { jobLocations = [], remoteWorking, jobHuntStatus } = data;
    const selected = jobLocations.map(location => location.name);

    return (
      <>
        <View style={styles.multiselect}>
          <SectionedMultiSelect
            items={fields}
            uniqueKey="name"
            displayKey="name"
            selectText={selected.length > 0 ? "" : "Select from list ..."}
            showDropDowns
            showChips={selected.length > 0}
            colors={{
              chipColor: colors.darkerViolet,
              text: colors.grey,
              primary: colors.violet,
              selectToggleTextColor: colors.grey
            }}
            styles={{
              selectToggle: { height: 48, padding: 5 },
              selectToggleText: styles.selectText
            }}
            onSelectedItemsChange={items =>
              update({
                jobLocations: items.map(item =>
                  fields.find(field => field.name === item)
                )
              })
            }
            selectedItems={selected}
            searchPlaceholderText="Search..."
          />
        </View>
        <View
          style={[styles.section, styles.toggleSection, styles.borderBottom]}
        >
          <View style={{ maxWidth: width * 0.6 }}>
            <Text style={styles.toggleText}>
              Show me roles with remote working
            </Text>
            <Text style={styles.smallHint}>
              We’ll show you opportunities that enable you to work fully or
              partially from home
            </Text>
          </View>
          <Toggle
            value={remoteWorking}
            onValueChange={() => update({ remoteWorking: !remoteWorking })}
          />
        </View>
        <Text style={styles.sectionHeading}>Keep me up to date with ...</Text>
        <View style={[styles.section, styles.toggleSection]}>
          <Text style={styles.toggleText}>🔔 Job Alerts</Text>
          <Toggle
            value={jobHuntStatus === "Always interested"}
            onValueChange={value =>
              update({
                jobHuntStatus: value
                  ? "Always interested"
                  : "Not interested right now"
              })
            }
          />
        </View>
        <Text style={styles.hint}>
          Keep alerts on and we will let you know when we have new jobs and
          opportunities that match your interests
        </Text>
      </>
    );
  }
}

export default LocationFields;
