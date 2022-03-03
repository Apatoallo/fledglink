import React, { PureComponent } from 'react';
import { Text, View } from 'native-base';
import { ImageBackground } from 'react-native';
import { colors } from '../../configs/config';

const backgroundProfile = require('../../../images/loadingBG90deg.png');

export default class QualityComponent extends PureComponent {
    widthQualityView = (minWidth, countQuality, countQualities) => {
        const width = minWidth + (100 - minWidth) * countQuality / countQualities;
        return `${width}%`;
    }

    render() {
        const {
            name, count, votesCount,
        } = this.props;
        return (
            <View style={{
                width: this.widthQualityView.call(this, 50, count, votesCount),
                marginVertical: 5,
            }}
            >
                <ImageBackground
                    source={backgroundProfile}
                    style={{
                        height: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 18,
                        overflow: 'hidden',
                    }}
                >
                    {
                        name
                            ? (
                                <View
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 25,
                                            color: 'white',
                                            fontSize: 18,
                                        }}
                                    >
                                        {name}
                                    </Text>
                                    {/* <Text
                                        style={{
                                            marginRight: 25,
                                            color: 'white',
                                            fontSize: 18,
                                        }}
                                    >
                                        {count}
                                    </Text> */}
                                </View>
                            )
                            : (
                                <View
                                    style={{
                                        backgroundColor: colors.whiteOpacity,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            )
                    }
                </ImageBackground>
            </View>
        );
    }
}
