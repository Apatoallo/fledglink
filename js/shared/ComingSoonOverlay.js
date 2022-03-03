import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { View, Icon, Text } from 'native-base';

const comingSoonOverlay = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'rgba(132, 1, 191,0.5)',
    },
    innerBlock: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#380150',
    },
    innerBlockIcon: {
        alignSelf: 'center',
        color: '#fff',
    },
    innerBlockText: {
        fontWeight: '500',
        textAlign: 'center',
        color: '#fff',
    },
});

export default class ComingSoonOverlay extends PureComponent {
    render() {
        return (
            <View style={comingSoonOverlay.container}>
                <View style={comingSoonOverlay.innerBlock}>
                    <Icon
                        name="lock"
                        type="Feather"
                        style={comingSoonOverlay.innerBlockIcon}
                    />
                    <Text style={comingSoonOverlay.innerBlockText}>Coming Soon</Text>
                </View>
            </View>
        );
    }

}
