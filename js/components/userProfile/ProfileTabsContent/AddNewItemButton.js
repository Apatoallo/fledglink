import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, View } from 'native-base';
import { colors } from '../../../configs/config';

const addNewItemButton = StyleSheet.create({
    buttonWrapper: {
        marginTop: 20,
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.violet,
    },
    buttonText: {
        color: '#fff',
    },
});

export default class AddNewItemButton extends Component {
    addItem = () => {
        const { clickHandler } = this.props;
        clickHandler();
    };

    render() {
        const { text } = this.props;
        return (
            <View style={addNewItemButton.buttonWrapper}>
                <Button
                    style={addNewItemButton.button}
                    onPress={this.addItem}
                >
                    <Text style={addNewItemButton.buttonText}>{text}</Text>
                </Button>
            </View>
        );
    }
}
