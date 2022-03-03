import React, { Component } from 'react';
import { Icon } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../configs/config';

const linkActionComponent = StyleSheet.create({
    icon: {
        color: colors.black,
    },
});

export default class LinkActionComponent extends Component {
    render() {
        const { name, type, size, clickHandler } = this.props;
        return (
            <TouchableOpacity onPress={clickHandler}>
                <Icon
                    name={name}
                    type={type}
                    style={[linkActionComponent.icon, { fontSize: size }]}
                />
            </TouchableOpacity>
        );
    }
}
