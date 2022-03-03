import React, { PureComponent } from 'react';
import { Text, View } from 'native-base';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';

const dashboardListButton = StyleSheet.create({
    button: {
        height: 20,
    },
    buttonText: {
        color: '#8501DF',
        fontSize: 14,
    },
});

export default class ToggleDashboardListButton extends PureComponent {
    buttonClickHandler = () => {
        const { clickHandler } = this.props;
        clickHandler();
    };

    render() {
        const { shouldShown, buttonText } = this.props;
        return (
            <View>
                {shouldShown && (
                    <TouchableWithoutFeedback
                        onPress={this.buttonClickHandler}
                        transparent
                        style={dashboardListButton.button}
                    >
                        <Text style={dashboardListButton.buttonText}>{buttonText}</Text>
                    </TouchableWithoutFeedback>
                )}
            </View>
        );
    }
}
