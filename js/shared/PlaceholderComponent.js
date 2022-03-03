import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import Placeholder from 'rn-placeholder';
import { colors } from '../configs/config';

const placeholderComponent = StyleSheet.create({
    placeholderWrapper: {
        paddingTop: 10,
        marginHorizontal: 10,
        borderBottomColor: colors.grey,
        borderBottomWidth: 0.5,
    },
});

export default class PlaceholderComponent extends PureComponent {
    render() {
        const { onReady, height, lineNumber } = this.props;
        const defaultOptions = {
            size: height - 20,
            animate: 'fade',
            lineSpacing: 5,
            lastLineWidth: '30%',
        };
        const { count } = this.props;
        return (
            <View>
                {[...Array(count || 1).keys()].map(() => (
                    <View style={[placeholderComponent.placeholderWrapper, { height }]}>
                        <Placeholder.ImageContent
                            {...defaultOptions}
                            onReady={onReady}
                            lineNumber={lineNumber || 4}
                        >
                        </Placeholder.ImageContent>
                    </View>
                ))}
            </View>
        );
    }
}
