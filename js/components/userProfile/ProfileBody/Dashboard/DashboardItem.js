import React, { PureComponent } from "react";
import { Text, View } from "native-base";
import { StyleSheet } from "react-native";
import EditButton from "../../EditButton";
import ToggleDashboardListButton from "./ToggleDashboardListButton";
import { colors } from "../../../../configs/config";

const dashboardItem = StyleSheet.create({
  itemWrapper: {
    borderBottomColor: colors.gallery,
    marginTop: 5,
    flex: 1,
    paddingBottom: 5,
    flexDirection: "row"
  },
  leftBlock: {
    flex: 0.3,
    justifyContent: "center"
  },
  leftBlockText: {
    fontSize: 13,
    color: colors.grey
  },
  centerBlock: {
    flex: 0.7
  },
  rightBlock: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default class DashboardItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showAllList: false
    };
  }

  toggleList = () => this.setState({ showAllList: !this.state.showAllList });

  getDisplayedData = () => {
    const { itemData } = this.props;
    const dataArray = Array.isArray(itemData) ? itemData : [itemData];
    if (this.state.showAllList) return dataArray;
    if (dataArray.length <= 3) return dataArray;
    return dataArray.slice(0, 3);
  };

  render() {
    const {
      itemKey,
      navigationHandler,
      displayName,
      itemData,
      lastItem
    } = this.props;
    const buttonText = this.state.showAllList ? "Hide" : "See all";
    const dataList = this.getDisplayedData();
    return (
      <View
        style={[
          dashboardItem.itemWrapper,
          { borderBottomWidth: lastItem ? 0 : 1 }
        ]}
      >
        <View style={dashboardItem.leftBlock}>
          <Text style={dashboardItem.leftBlockText}>{displayName}</Text>
        </View>
        <View style={dashboardItem.centerBlock}>
          <Text style={{ color: colors.purple }}>{dataList.join(", ")}</Text>
          <ToggleDashboardListButton
            shouldShown={Array.isArray(itemData) && itemData.length > 3}
            buttonText={buttonText}
            clickHandler={this.toggleList}
          />
        </View>
        <View style={dashboardItem.rightBlock}>
          <EditButton
            onClickHandler={() =>
              navigationHandler("EditIntro", itemKey, displayName)
            }
          />
        </View>
      </View>
    );
  }
}
