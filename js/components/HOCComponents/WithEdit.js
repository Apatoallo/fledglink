import React, { Component } from 'react';
import { Text } from 'native-base';
import { View, StyleSheet } from 'react-native';
import EditButton from '../userProfile/EditButton';

const listItem = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        flex: 1,
        marginTop: 10,
    },
});

export default function withEdit(ListComponentItem) {
    return class WithEdit extends Component {
        render() {
            const { elementIndex, item, editClickHandler } = this.props;
            return (
                <View style={listItem.container}>
                    <ListComponentItem {...this.props} />
                    <EditButton onClickHandler={() => editClickHandler({ key: elementIndex, data: item })} />
                </View>
            );
        }
    };
}
