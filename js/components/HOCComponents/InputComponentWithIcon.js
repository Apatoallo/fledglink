import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { View, Icon } from 'native-base';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wrapperInput: {
        flex: 1,
    },
    wrapperIcon: {
        flex: 0,
    },
    inputIcon: {
        marginBottom: 10,
        fontSize: 24,
    },
});

export default function inputWithIconComponent(InputComponent) {
    return class InputWithIconComponent extends PureComponent {
        render() {
            const { iconName, onChangeInputType, activeColor } = this.props;
            return (
                <View style={styles.container}>
                    <View style={styles.wrapperInput}>
                        <InputComponent {...this.props} />
                    </View>
                    <View style={styles.wrapperIcon}>
                        <Icon style={[styles.inputIcon, { color: activeColor }]} onPress={onChangeInputType} name={iconName} type="Feather" />
                    </View>
                </View>
            );
        }
    };
}
