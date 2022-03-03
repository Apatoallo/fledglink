import React, { PureComponent } from "react";
import { Text, Button, Icon, Spinner } from "native-base";
import PropTypes from "prop-types";
import { TouchableOpacity, View, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { Dropdown } from "react-native-material-dropdown";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

import { colors } from "../configs/config";

export default class ConnectionDialog extends PureComponent {
  renderAcquaintanceDropdown = () => {
    const {
      dropdownSelected,
      fullName,
      qualities,
      dropdownSelectedAcquaintance,
      iDontKnowYou,
      onSelectedChange,
      onChangeDropdownAcquaintance,
      selectedItems
    } = this.props;
    if (dropdownSelected !== "I dont know you but...") {
      return (
        <ScrollView
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            width: "100%"
          }}
        >
          <View style={{ width: "100%" }}>
            <SectionedMultiSelect
              items={qualities}
              colors={{
                chipColor: colors.grey,
                text: colors.grey,
                primary: colors.violet,
                selectToggleTextColor: colors.grey
              }}
              styles={{
                selectToggle: {
                  height: 40,
                  paddingLeft: 5,
                  borderWidth: 1,
                  borderColor: colors.grey,
                  backgroundColor: colors.galleryOpacity
                }
              }}
              uniqueKey="name"
              displayKey="name"
              onSelectedItemsChange={onSelectedChange}
              selectedItems={selectedItems}
            />
          </View>
        </ScrollView>
      );
    }
    return (
      <View
        style={{
          flex: 0.4,
          width: "100%",
          paddingTop: 10
        }}
      >
        <Text
          style={{ color: colors.grey, paddingBottom: 5 }}
        >{`Why do you want to connect with ${fullName}`}</Text>
        <View
          style={{
            width: "100%",
            justifyContent: "flex-start",
            backgroundColor: colors.galleryOpacity,
            borderWidth: 1,
            borderColor: colors.grey
          }}
        >
          <Dropdown
            dropdownOffset={{ top: 10, left: 10 }}
            containerStyle={{
              height: 40,
              paddingLeft: 10
            }}
            baseColor={colors.grey}
            onChangeText={value => onChangeDropdownAcquaintance(value)}
            value={dropdownSelectedAcquaintance}
            data={[...iDontKnowYou]}
          />
        </View>
      </View>
    );
  };

  render() {
    const {
      showModal,
      dropdownSelected,
      fullName,
      iKnowYou,
      dataLength,
      onChangeDropdown,
      toggleModal,
      disabledButton,
      sendRequest
    } = this.props;
    return (
      <Modal
        animationIn="slideInUp"
        isVisible={showModal}
        onBackdropPress={toggleModal}
      >
        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 15,
            borderRadius: 5,
            height: 435,
            backgroundColor: colors.white,
            alignSelf: "center"
          }}
        >
          {dataLength > 0 ? (
            <View
              style={{
                flex: 1,
                alignItems: "flex-start"
              }}
            >
              <View
                style={{
                  height: 30
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.darkestViolet
                  }}
                >
                  Add Contact{" "}
                </Text>
              </View>
              <View style={{ width: "100%", marginBottom: 10 }}>
                <Text style={{ color: colors.grey }}>
                  {`How do you know  ${fullName}?`}
                </Text>
                <View
                  style={{
                    justifyContent: "flex-start",
                    backgroundColor: colors.galleryOpacity,
                    borderWidth: 1,
                    borderColor: colors.grey
                  }}
                >
                  <Dropdown
                    dropdownOffset={{ top: 10, left: 0, right: 0 }}
                    containerStyle={{
                      height: 40,
                      paddingLeft: 10
                    }}
                    pickerStyle={{
                      paddingTop: 25
                    }}
                    rippleCentered="true"
                    rippleInsets={{ top: -2, bottom: 0 }}
                    baseColor={colors.grey}
                    onChangeText={value => onChangeDropdown(value)}
                    value={dropdownSelected}
                    data={[...iKnowYou, { value: "I dont know you but..." }]}
                  />
                </View>
              </View>
              <View style={{ paddingBottom: 5, width: "100%" }}>
                <Text style={{ color: colors.grey }}>
                  {dropdownSelected === "I dont know you but..."
                    ? ""
                    : `Tell us five of ${fullName}'s best qualities`}
                </Text>
              </View>
              {this.renderAcquaintanceDropdown()}
              <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  backgroundColor: colors.white
                }}
              >
                <Button
                  transparent
                  onPress={sendRequest}
                  disabled={disabledButton}
                  rounded
                  style={{
                    backgroundColor: disabledButton
                      ? colors.violetOpacity
                      : colors.violet
                  }}
                >
                  <Text style={{ color: "white" }}>SEND REQUEST </Text>
                </Button>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 0
                  }}
                >
                  <Icon
                    style={{ color: colors.grey }}
                    name="arrow-left"
                    type="Feather"
                  />
                  <Text
                    style={{
                      color: colors.grey,
                      fontSize: 18
                    }}
                  >
                    Cancel{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Spinner />
          )}
        </View>
      </Modal>
    );
  }
}

ConnectionDialog.propTypes = {
  dropdownSelected: PropTypes.string,
  fullName: PropTypes.string.isRequired,
  qualities: PropTypes.instanceOf(Array).isRequired,
  dropdownSelectedAcquaintance: PropTypes.string,
  iDontKnowYou: PropTypes.instanceOf(Array).isRequired,
  onSelectedChange: PropTypes.instanceOf(Array),
  onChangeDropdownAcquaintance: PropTypes.func.isRequired,
  selectedItems: PropTypes.instanceOf(Array),
  showModal: PropTypes.bool.isRequired,
  iKnowYou: PropTypes.instanceOf(Array).isRequired,
  onChangeDropdown: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  disabledButton: PropTypes.bool.isRequired,
  sendRequest: PropTypes.func.isRequired
};

ConnectionDialog.defaultProps = {
  dropdownSelected: "",
  dropdownSelectedAcquaintance: [],
  onSelectedChange: [],
  selectedItems: []
};
