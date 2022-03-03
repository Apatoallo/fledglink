import React, { PureComponent } from 'react';
import { Text, View } from 'native-base';
import { Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

const headerImage = require('../../../../images/HeaderBackground.png');
const comingSoon = require('../../../../images/comingSoon.png');
const boostCircle = require('../../../../images/boost-circle.png');

const boostYourProfile = StyleSheet.create({
    container: {
        zIndex: 2,
        marginTop: 12,
    },
    imageContainer: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
    },
    innerWrapper:  {
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        marginRight: 15,
        height: 35,
        width: 35,
    },
    textBlockWrapper: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    overlayBlock: {
        flex: 1,
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(132, 1, 191,0.5)',
    },
    overlayBlockImage: {
        flex: 1,
        height: '70%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
    },
});

export default class BoostYourProfile extends PureComponent {
    render() {
        return (
            <TouchableOpacity
                style={boostYourProfile.container}
                disabled
            >
                <ImageBackground
                    source={headerImage}
                    style={boostYourProfile.imageContainer}
                >
                    <View style={boostYourProfile.innerWrapper}>
                        <Image
                            style={boostYourProfile.image}
                            source={boostCircle}
                        />
                        <View style={boostYourProfile.textBlockWrapper}>
                            <Text style={{ color: 'white' }}>Boost your profile</Text>
                            <Text numberOfLines={1} style={{ color: 'white' }}>Add an introductory video of yourself</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={boostYourProfile.overlayBlock}>
                    <Image style={boostYourProfile.overlayBlockImage} source={comingSoon} />
                </View>
            </TouchableOpacity>
        );
    }
}
