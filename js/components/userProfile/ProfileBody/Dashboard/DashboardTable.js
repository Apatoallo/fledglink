import React, { PureComponent } from "react";
import { View } from "native-base";
import { StyleSheet } from "react-native";
import { pick } from "lodash";
import DashboardItem from "./DashboardItem";

const dashboardTable = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10
  }
});

export default class DashboardTable extends PureComponent {
  render() {
    const { user, navigationHandler } = this.props;
    user.jobLocations = user?.jobLocations?.map(item => item?.name) || [];
    const dashboardItems = pick(user, [
      "jobLocations",
      "oppType",
      "jobInterest",
      "jobHuntStatus"
    ]);
    const dashboardDisplayNames = [
      "Search Locations",
      "Job Type",
      "Interest",
      "Job Hunt Status"
    ];
    return (
      <View style={dashboardTable.container}>
        {Object.keys(dashboardItems).map((dashboardItem, i) => (
          <DashboardItem
            key={dashboardDisplayNames[i]}
            user={user}
            displayName={dashboardDisplayNames[i]}
            itemKey={dashboardItem}
            itemData={
              dashboardItem === "jobLocations"
                ? dashboardItems[dashboardItem].map(
                    item => item?.split(", ")[0]
                  )
                : dashboardItems[dashboardItem]
            }
            navigationHandler={navigationHandler}
            lastItem={i === Object.keys(dashboardItems).length - 1}
          />
        ))}
      </View>
    );
  }
}
