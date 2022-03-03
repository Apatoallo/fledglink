import React, { Component } from "react";
import { List, View } from "native-base";
import { FlatList, Platform, ScrollView } from "react-native";
import OpportunityListItem from "./OpportunityListItem";

export default class OpportunityList extends Component {
  opportunityClick = itemId => {
    const { onPress } = this.props;
    onPress(itemId);
  };

  render() {
    const { opportunities, company, loadMore, loaded } = this.props;
    return (
      <View>
        {opportunities.length > 0 &&
          opportunities.map(opportunity => (
            <OpportunityListItem
              clickHandler={this.opportunityClick}
              company={company}
              opportunity={opportunity}
            />
          ))}
      </View>
    );
  }
}
