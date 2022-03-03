import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View, Icon } from "native-base";
import Modal from "react-native-modal";
import DatePicker from "react-native-date-picker";
import { Dropdown } from "react-native-material-dropdown";
import LocationComponent from "../../shared/locationComponent";
import styles from "./styles";
import { colors, fonts } from "../../configs/config";

class DiversityFields extends Component {
  state = {
    datePickerOpen: false,
    homeLocationError: null
  };

  selectDate = date => {
    this.props.update({
      birthDate: new Date(date).toISOString().substring(0, 10)
    });
  };

  onLocationChange = ({ ...result }) => {
    const { update } = this.props;
    if (result.description) {
      this.setState({ homeLocationError: null });
      update({
        homeLocation: {
          name: result.description,
          geoposition: [result.location.lng, result.location.lat]
        }
      });
    } else {
      update({ homeLocation: null });
    }
  };

  validateLocationSearch = text => {
    const { data } = this.props;
    if (text?.length >= 5 && text !== data?.homeLocation?.name) {
      this.setState({
        homeLocationError: "Please select a location from the list."
      });
    } else {
      this.setState({ homeLocationError: null });
    }
  };

  render() {
    const { options, openDiversityModal, data, update, errors } = this.props;
    const { datePickerOpen, homeLocationError } = this.state;

    const Picker = ({ name, label, subHeading }) => {
      return (
        <>
          <Text style={styles.label}>{label}</Text>
          {subHeading && <Text style={styles.smallHint}>{subHeading}</Text>}
          <Dropdown
            labelHeight={0}
            placeholder="Select from dropdown ..."
            style={{
              fontFamily: data[name] ? fonts.bold : fonts.regular,
              fontSize: 12
            }}
            placeholderTextColor={colors.black}
            textColor={colors.darkViolet}
            fontSize={14}
            baseColor={colors.grey}
            onValueChange={value => update({ [name]: value })}
            onChangeText={value => update({ [name]: value })}
            value={data[name]}
            data={options[name]}
            containerStyle={styles.picker}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            itemTextStyle={{ fontFamily: fonts.regular }}
            selectedItemColor={colors.darkerViolet}
            dropdownOffset={{ top: 100, left: 8 }}
            renderAccessory={() => (
              <View style={{ marginTop: -4 }}>
                <Icon name="chevron-down" type="MaterialCommunityIcons" />
              </View>
            )}
          />
          {errors[name] && <Text style={styles.errorText}>{errors[name]}</Text>}
        </>
      );
    };

    const startDate = () => {
      let date = new Date();
      const year = date.getFullYear() - 13;
      return new Date(date.setFullYear(year));
    };

    return (
      <>
        <TouchableOpacity
          style={[styles.helpView, { alignSelf: "flex-start" }]}
          onPress={openDiversityModal}
        >
          <Text style={styles.helpText}>{"ⓘ"}</Text>
          <Text style={[styles.helpText, styles.helpTextLink]}>
            {"Why are we collecting this information?"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.sectionHeading}>
          Championing diverse workplaces
        </Text>
        <View style={[styles.section, styles.borderBottom]}>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity
            style={[styles.selectButton, { paddingVertical: 8 }]}
            onPress={() => this.setState({ datePickerOpen: true })}
          >
            <Text
              style={data.birthDate ? styles.selectedOption : styles.selectText}
            >
              {data.birthDate
                ? new Date(data.birthDate).toLocaleDateString("en-GB")
                : "Select"}
            </Text>
            <Icon name="chevron-down" type="MaterialCommunityIcons" />
          </TouchableOpacity>
          {errors?.birthDate && (
            <Text style={styles.errorText}>{errors.birthDate}</Text>
          )}
          <Modal
            animationIn="slideInUp"
            isVisible={datePickerOpen}
            onBackdropPress={() => this.setState({ datePickerOpen: false })}
          >
            <View style={styles.datePickerWrapper}>
              <DatePicker
                mode="date"
                date={data.birthDate ? new Date(data.birthDate) : startDate()}
                onDateChange={this.selectDate}
              />
              <TouchableOpacity
                onPress={() => this.setState({ datePickerOpen: false })}
                style={styles.confirmButton}
              >
                <Text>Confirm</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Picker name="ethnicity" label="Ethnicity" />
          <Picker name="gender" label="Gender" />
          <Picker
            name="disability"
            label="Do you identify as having a disability?"
            subHeading="This could be a learning, mental or physical disability"
          />
        </View>
        <Text style={styles.sectionHeading}>Supporting social mobility</Text>
        <View style={styles.section}>
          <Text style={styles.label}>What is your home postcode?</Text>
          {homeLocationError && (
            <Text style={[styles.errorText, { marginTop: 2, marginBottom: 0 }]}>
              {homeLocationError}
            </Text>
          )}
          <View style={[styles.selectButton, { paddingVertical: 3 }]}>
            <LocationComponent
              onChange={this.onLocationChange}
              validateLocationSearch={this.validateLocationSearch}
              placeholder="Enter your home postcode"
              level="street"
              containerStyle={{ borderBottomWidth: 0 }}
              inputStyle={
                data.homeLocation ? styles.selectedOption : styles.selectText
              }
              minLength={5}
            />
          </View>
          <Picker
            name="freeSchoolMeals"
            label="Have you ever received free school meals?"
            subHeading="Your family may have received financial support for school meals"
          />
        </View>
      </>
    );
  }
}

export default DiversityFields;
