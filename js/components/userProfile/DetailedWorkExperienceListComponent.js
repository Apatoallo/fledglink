import React, { Component } from "react";
import {
  Text,
  List,
  Body,
  Thumbnail,
  ListItem,
  Content,
  Left
} from "native-base";
import { StyleSheet } from "react-native";

import getMonthAndfullYear from "../../utils/getMonthAndFullYear";
import { colors } from "../../configs/config";

const undefinedCompany = require("../../../images/no-company-image.png");

const detailedWorkExperienceListComponent = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#fff"
  },
  body: {
    borderBottomWidth: 0
  },
  title: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "500"
  },
  companyName: {
    fontSize: 16,
    color: colors.grey
  },
  startDate: {
    fontSize: 16,
    color: colors.grey
  },
  summaryText: {
    marginHorizontal: 20,
    marginVertical: 5,
    fontSize: 14,
    color: colors.grey
  }
});

export default class DetailedWorkExperienceListComponent extends Component {
  getEndDate = (endDate, present) => {
    if (present) {
      return "Present";
    }
    return getMonthAndfullYear(endDate);
  };

  render() {
    const { workData } = this.props;
    const endDate = this.getEndDate(
      workData.endDate,
      workData.isEndDatePresent
    );
    return (
      <Content style={detailedWorkExperienceListComponent.content}>
        <List>
          <ListItem thumbnail>
            <Left>
              <Thumbnail
                square
                resizeMode="contain"
                source={
                  workData.company.logo
                    ? { uri: workData.company.logo }
                    : undefinedCompany
                }
              />
            </Left>
            <Body style={detailedWorkExperienceListComponent.body}>
              <Text
                numberOfLines={2}
                style={detailedWorkExperienceListComponent.title}
              >
                {workData.name || workData.title}
              </Text>
              {workData.company && (
                <Text
                  style={detailedWorkExperienceListComponent.companyName}
                  note
                >
                  {workData.company.name}
                </Text>
              )}
              <Text note style={detailedWorkExperienceListComponent.date}>
                {`${getMonthAndfullYear(workData.startDate)} - ${endDate}`}
              </Text>
            </Body>
          </ListItem>
          <Text style={detailedWorkExperienceListComponent.summaryText}>
            {workData.summary}
          </Text>
        </List>
      </Content>
    );
  }
}
