import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { keyApis, colors, fonts } from "../configs/config";

export default class LocationComponent extends PureComponent {
  render() {
    const {
      onChange,
      locationInput,
      validateLocationSearch,
      level = "city",
      placeholder = "Town or Borough",
      containerStyle = {},
      inputStyle = {},
      minLength = 2
    } = this.props;
    const types = {
      street: ["route", "postal_code"],
      district: [
        "sublocality_level_1",
        "sublocality",
        "political",
        "neighborhood"
      ],
      city: ["locality", "administrative_area_level_3"]
    };

    return (
      <GooglePlacesAutocomplete
        minLength={minLength}
        autoFocus={false}
        shadowColor="transparent"
        returnKeyType={"default"}
        fetchDetails={true}
        nearbyPlacesAPI="GoogleReverseGeocoding"
        styles={{
          textInputContainer: [
            locationStyle.textInputContainer,
            containerStyle
          ],
          textInput: [locationStyle.input, inputStyle]
        }}
        keyboardShouldPersistTaps="always"
        filterReverseGeocodingByTypes={types[level]}
        currentLocation={false}
        textInputProps={{
          onChangeText: validateLocationSearch,
          clearButtonMode: "never",
          placeholder,
          placeholderTextColor: colors.black
        }}
        onPress={(data, details = null) => {
          const result = {
            description: data.description,
            location: details.geometry.location
          };
          onChange(result);
        }}
        getDefaultValue={() => (locationInput ? locationInput : "")}
        query={{
          key: keyApis.googlePlace,
          language: "en",
          components: "country:uk"
        }}
      />
    );
  }
}

LocationComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  locationInput: PropTypes.string,
  validateLocationSearch: PropTypes.func.isRequired
};

const locationStyle = StyleSheet.create({
  textInputContainer: {
    paddingLeft: 0,
    marginLeft: 0,
    backgroundColor: "transparent",
    borderBottomWidth: 0.5,
    borderTopWidth: 0
  },
  input: {
    backgroundColor: "transparent",
    color: colors.darkBlack,
    fontSize: 16,
    paddingLeft: 0,
    marginLeft: 0,
    fontFamily: fonts.regular
  }
});
