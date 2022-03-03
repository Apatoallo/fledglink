import React, { Component } from 'react';
import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import formatMention from '../utils/formatMention';

const mentionComponent = StyleSheet.create({
    text: {
        color: '#0336ff',
    },
});

export default class MentionComponent extends Component {
    goToUserProfile = () => {
        const { mentionClickHandler, mention } = this.props;
        mentionClickHandler(mention);
    };

    render() {
        const { mention } = this.props;
        return (
            <Text
                style={mentionComponent.text}
                onPress={this.goToUserProfile}
            >
                { `@${formatMention(mention.fullName)} ` }
            </Text>
        );
    }
}

MentionComponent.propTypes = {
    mentionClickHandler: PropTypes.func.isRequired,
    mention: PropTypes.instanceOf(Object),
};
