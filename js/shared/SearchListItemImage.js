import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Icon, Thumbnail } from 'native-base';
import PropTypes from 'prop-types';
import { colors } from '../configs/config';

const undefinedUser = require('../../images/no-profile-image.png');
const undefinedCompany = require('../../images/no-company-image.png');

const searchListItemImage = StyleSheet.create({
    imageContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.grey,
        marginRight: 10,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 22,
    },
});

export default class SearchListItemImage extends Component {
    getIconByType = (itemType) => {
        const { image } = this.props;
        switch (itemType) {
            case 'user':
                return image ? { uri: image } : undefinedUser;
            case 'corporation':
            case 'opportunity':
            case 'resource':
                return image ? { uri: image } : undefinedCompany;
            default:
                return 'box';
        }
    };

    render() {
        const { itemType } = this.props;
        return (
            <View style={searchListItemImage.imageContainer}>
                <Thumbnail
                    circle
                    style={searchListItemImage.image}
                    source={this.getIconByType(itemType)}
                />
            </View>
        );
    }
}

SearchListItemImage.propTypes = {
    itemType: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};
