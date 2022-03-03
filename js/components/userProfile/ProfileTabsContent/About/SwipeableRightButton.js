import React, { Component } from 'react';
import { View, TouchableHighlight, Alert, Platform, StyleSheet } from 'react-native';
import { Text, Icon } from 'native-base';
import { colors } from '../../../../configs/config';

const swipeableButton = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: colors.red,
    },
    textWrapper: {
        height: '100%',
        width: 75,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon: {
        color: colors.white,
        flex: 1,
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 12.5,
        fontSize: 24,
    },
});

export default class SwipeableRightButton extends Component {
    deleteButtonClick = () => {
        const { item, deleteHandler } = this.props;
        Alert.alert(
            'Delete item',
            `Are you sure you want to delete ${item.title || item.name} from your history?`,
            [
                { text: 'Sure', onPress: () => deleteHandler(item) },
                { text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
            ],
        );
    };

    render() {
        return (
            <TouchableHighlight
                style={swipeableButton.button}
                onPress={this.deleteButtonClick}
            >
                <View style={swipeableButton.textWrapper}>
                    <Icon
                        style={swipeableButton.icon}
                        name="trash-2"
                        type="Feather"
                    />
                </View>
            </TouchableHighlight>
        );
    }
};
