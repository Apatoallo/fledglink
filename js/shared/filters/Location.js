import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Label, Text, Button } from "native-base";
import { Dropdown } from "react-native-material-dropdown";
import PropTypes from "prop-types";
import LocationComponent from "../locationComponent";
import ToastComponent from "../ToastComponent";
import { colors } from "../../configs/config";

const location = StyleSheet.create({
  container: {
    margin: 15
  },
  label: {
    fontSize: 12
  },
  button: {
    height: 30,
    marginVertical: 20,
    backgroundColor: colors.violet
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600"
  }
});

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationCenter: [],
      locationDescription: "",
      radius: 0
    };
  }

  locationChangeHandler = result => {
    const center = [result.location.lat, result.location.lng];
    this.setState({
      locationCenter: center,
      locationDescription: result.description
    });
  };

  selectChangeHandler = (value, index, data) => {
    this.setState({ radius: data[index].id });
  };

  setLocationFilter = () => {
    const { locationCenter, locationDescription, radius } = this.state;
    const {
      setLocationAction,
      setLocationRadiusAction,
      toggleGlobalFilterOptionAction,
      addFiltersHandler
    } = this.props;
    if (!locationCenter.length) {
      ToastComponent("You should choose location");
      return;
    }
    setLocationAction(locationCenter, locationDescription);
    setLocationRadiusAction(radius);
    toggleGlobalFilterOptionAction("Location", true);
    addFiltersHandler();
  };

  render() {
    const {
      location: {
        data: { radius }
      }
    } = this.props;
    const radiusData = [
      { value: "Within 5 miles", id: 5 },
      { value: "Within 10 miles", id: 10 },
      { value: "Within 20 miles", id: 20 },
      { value: "Within 50 miles", id: 50 },
      { value: "Within 100 miles", id: 100 },
      { value: "Within 150 miles", id: 150 },
      { value: "Within 200 miles", id: 200 },
      { value: "Within 250 miles", id: 250 },
      { value: "Within 300 miles", id: 300 }
    ];
    return (
      <View style={location.container}>
        <Label style={location.label}>Town or city</Label>
        <LocationComponent
          onChange={this.locationChangeHandler}
          value="location"
        />
        <View>
          <Dropdown
            label="Radius"
            labelFontSize={15}
            textColor={colors.darkBlack}
            baseColor={colors.grey}
            onChangeText={(value, index, data) =>
              this.selectChangeHandler(value, index, data)
            }
            data={radiusData}
            value={radius || ""}
          />
        </View>
        <Button
          style={location.button}
          rounded
          onPress={this.setLocationFilter}
        >
          <Text style={location.buttonText}>ADD FILTERS</Text>
        </Button>
      </View>
    );
  }
}

Location.propTypes = {
  setLocationAction: PropTypes.func.isRequired,
  setLocationRadiusAction: PropTypes.func.isRequired,
  addFiltersHandler: PropTypes.func.isRequired,
  toggleGlobalFilterOptionAction: PropTypes.func.isRequired,
  location: PropTypes.instanceOf(Object).isRequired
};
