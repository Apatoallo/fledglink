import React from 'react';
import { Text, View, Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../configs/config';

const searchFor = StyleSheet.create({
    iconBlock__icon: {
        color: colors.grey,
        alignSelf: 'center',
        fontSize: 40,
    },
    iconBlock__text: {
        alignSelf: 'center',
        fontSize: 18,
    },
});

const SearchFor = ({ iconName, text }) => (
    <View>
        <Icon style={searchFor.iconBlock__icon} name={iconName} type="Feather" />
        <Text style={searchFor.iconBlock__text}>{text}</Text>
    </View>
);


SearchFor.propTypes = {
    iconName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default SearchFor;
