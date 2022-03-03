import React, { PureComponent } from 'react';
import {Text, View } from 'native-base';
import { Image, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './styles';

const headerImage = require('../../../../../images/HeaderBackground.png');
const featherWhite = require('../../../../../images/feathers/feather_white.png');

export default class DescriptionTest extends PureComponent {
    render() {
        const { navigationHandler } = this.props;
        return (
            <TouchableOpacity
                onPress={navigationHandler}
                style={styles.wrapper}
            >
                <ImageBackground
                    source={headerImage}
                    style={styles.bgWrapper}
                >
                    <View style={styles.innerBlockWrapper}>
                        <Image
                            style={styles.image}
                            source={featherWhite}
                        />
                        <View style={styles.textBlock}>
                            <Text style={styles.text}>Take your profile up a level</Text>
                            <Text style={styles.text}>Complete the Personality test</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}
