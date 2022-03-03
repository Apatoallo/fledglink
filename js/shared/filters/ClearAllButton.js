import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { colors } from '../../configs/config';

const clearAllButton = StyleSheet.create({
    subContainerButton: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: 'transparent',
    },
    subContainerButtonText: {
        color: colors.grey,
        fontSize: 16,
    },
    subContainerButtonIcon: {
        color: colors.grey,
        fontSize: 22,
    },
});

export default class ClearAllButton extends PureComponent {
    render() {
        const { onClickHandler } = this.props;
        return (
            <Button
                style={clearAllButton.subContainerButton}
                onPress={onClickHandler}
                transparent
            >
                <Text style={clearAllButton.subContainerButtonText}>Clear All</Text>
                <Icon style={clearAllButton.subContainerButtonIcon} type="Feather" name="x" />
            </Button>
        );
    }
}

ClearAllButton.propTypes = {
    onClickHandler: PropTypes.func.isRequired,
};
