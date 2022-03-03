import React, { PureComponent } from 'react';
import {
    Text, Body, ListItem, Thumbnail,
} from 'native-base';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import getMonthAndfullYear from '../../../../utils/getMonthAndFullYear';

const undefinedCompany = require('../../../../../images/no-company-image.png');

const experienceListItem = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 10,
    },
    image: {
        marginRight: 10,
    },
});

export default class ExperienceListItem extends PureComponent {
    getEndDate = (endDate, present) => (present ? 'Present' : getMonthAndfullYear(endDate));

    showWorkAdditionalInformation = (workExperienceItem) => {
        const { navigation } = this.props;
        navigation.navigate('WorkDetailedInformation', { workExperience: workExperienceItem });
    };

    render() {
        const { item, style } = this.props;
        const endDate = this.getEndDate(item.endDate, item.isEndDatePresent);
        return (
            <TouchableOpacity
                onPress={() => this.showWorkAdditionalInformation(item)}
                style={[style, experienceListItem.container]}
            >
                {
                    item.company
                && (
                    <Thumbnail
                        style={experienceListItem.image}
                        square
                        size={160}
                        resizeMode="contain"
                        source={item.company.logo ? { uri: item.company.logo } : undefinedCompany}
                        StyleSheet
                    />
                )
                }
                <View style={{ flex: 1 }}>
                    <Text style={{ flexWrap: 'wrap' }} numberOfLines={2}>{item.title}</Text>
                    {
                        item.company
                    && <Text note>{item.company.name}</Text>
                    }
                    <Text note>{`${getMonthAndfullYear(item.startDate)} - ${endDate}`}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
