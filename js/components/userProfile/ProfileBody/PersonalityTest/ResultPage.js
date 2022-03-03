import React, { PureComponent } from 'react';
import { Text, View } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const personalityBar = require('../../../../../images/personality-bars.png');

export default class ResultPage extends PureComponent {
    render() {
        const { navigationHandler } = this.props;
        return (
            <TouchableOpacity
                onPress={navigationHandler}
                style={styles.wrapper}
            >
                <View style={{ ...styles.bgWrapper, ...styles.bgWrapperViolet }}>
                    <View style={styles.innerBlockWrapper}>
                        <Image
                            style={styles.image}
                            source={personalityBar}
                        />
                        <View>
                            <Text style={styles.text}>View your Personality Test</Text>
                            <Text style={styles.text}>Have a look at the results</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
