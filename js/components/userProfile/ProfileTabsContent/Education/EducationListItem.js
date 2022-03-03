import React, { PureComponent } from 'react';
import { Text, Body, ListItem } from 'native-base';
import { View, StyleSheet } from 'react-native';
import getMonthAndfullYear from '../../../../utils/getMonthAndFullYear';

const educationListItem = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        flex: 1,
        marginTop: 10,
    },
    innerBlock: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    course: {
        flex: 0.7,
    },
    grade: {
        flex: 0.2,
    },
});

export default class EducationListItem extends PureComponent {
    getEndDate = (endDate, present) => {
        return present ? 'Present' : getMonthAndfullYear(endDate);
    };

    render() {
        const { item } = this.props;
        const endDate = this.getEndDate(item.endDate, item.isEndDatePresent);
        return (
            <View style={educationListItem.container}>
                <Text numberOfLines={2}>{ item.name }</Text>
                <Text note>{ `${getMonthAndfullYear(item.startDate)} - ${endDate}` }</Text>
                <View>
                    <Text note>{ item.studying ? item.studying : 'What Studied' }</Text>
                    <View style={educationListItem.innerBlock}>
                        <View style={educationListItem.course}>
                            <Text note numberOfLines={1}>{ item.courses ? item.courses : 'What Studied' }</Text>
                        </View>
                        <View style={educationListItem.grade}>
                            <Text
                                note
                                numberOfLines={1}
                                style={{ textAlign: 'right' }}
                            >
                                { item.grade ? item.grade : 'Grade' }
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
