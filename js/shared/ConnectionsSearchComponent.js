import React, { Component } from "react";
import { View, Input } from "native-base";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import searchWithDelay from "../utils/searchWithDelay";
import { colors } from "../configs/config";

const searchComponent = StyleSheet.create({
  searchWrapper: {
    backgroundColor: "white",
    paddingHorizontal: 10
  },
  searchFieldWrapper: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.darkBlack,
    height: 50
  },
  searchField: {
    backgroundColor: colors.white,
    marginLeft: 10,
    height: 30,
    borderRadius: 5,
    fontSize: 16,
    padding: 0,
    margin: 0
  }
});

export default class ConnectionsSearchComponent extends Component {
  onChangeHandler = text => {
    this.props.onChangeHandler(text);
  };

  onChangeWithDelay = searchWithDelay(this.onChangeHandler);

  render() {
    const { placeHolder } = this.props;
    return (
      <View style={searchComponent.searchWrapper}>
        <View style={searchComponent.searchFieldWrapper}>
          <Input
            onChangeText={this.onChangeWithDelay}
            style={searchComponent.searchField}
            placeholder={placeHolder}
          />
        </View>
      </View>
    );
  }
}

ConnectionsSearchComponent.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired
};
