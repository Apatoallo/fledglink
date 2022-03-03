import React, { PureComponent } from 'react';
import {
    Icon, View, Thumbnail, Body, Text,
} from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../configs/config';

const undefinedUser = require('../../../images/no-company-image.png');
const undefinedCompany = require('../../../images/no-company-image.png');
const removeMd = require('../../utils/removeMarkdown');

const resourceLink = StyleSheet.create({
    wrapper: {
        width: '100%',
        position: 'relative',
        backgroundColor: 'rgba(0,0,0, 0.05)',
    },
    cancelButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 2,
        height: 30,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: colors.galleryOpacity,
    },
    innerBlock: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 120,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    imageWrapper: {
        width: '40%',
        marginRight: 10,
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
        resizeMode: 'contain',
    },
    textBlock: {
        width: '60%',
        alignItems: 'flex-start',
    },
    titleText: {
        fontSize: 20,
        lineHeight: 22,
        marginBottom: 10,
        color: colors.violet,
    },
});

export default class ResourceLinkComponent extends PureComponent {
    getLogoByItemType = (item, type) => {
        if (item.image) return { uri: item.image };
        switch (type) {
            case 'user':
                return item.userImage ? { uri: item.userImage } : undefinedUser;
            case 'events':
                return item.logo ? { uri: item.logo } : undefinedCompany;
            case 'corporations':
                return item.baseInfo && item.baseInfo.logo ? { uri: item.baseInfo.logo } : undefinedCompany;
            case 'opportunities':
                return item.corporation && item.corporation.baseInfo.logo ? { uri: item.corporation.baseInfo.logo } : undefinedCompany;
            case 'resources':
                return item.image ? { uri: item.image } : undefinedCompany;
            default:
                return 'box';
        }
    };

    redirectToResource = () => {
        const { navigation, item } = this.props;
        switch (item.resourceType) {
            case 'resources':
                return navigation.navigate('ResourceView', { id: item.resourceId });
            case 'opportunities':
                return navigation.navigate('OpportunityPage', { id: item.resourceId });
            case 'corporations':
                return navigation.navigate('CompanyProfile', { corpId: item.resourceId });
            case 'events':
                return navigation.navigate('Event', { id: item.resourceId });
            default:
                return null;
        }
    };

    render() {
        const {
            item, cancelLink, showCanceling, linkType,
        } = this.props;
        return (
            <TouchableOpacity
                onPress={this.redirectToResource}
                disabled={showCanceling}
                style={resourceLink.wrapper}
            >
                { !!showCanceling && (
                    <TouchableOpacity
                        style={resourceLink.cancelButton}
                        onPress={cancelLink}
                    >
                        <Icon
                            name="x"
                            type="Feather"
                            style={{ color: colors.grey }}
                        />
                    </TouchableOpacity>
                ) }
                <View style={resourceLink.innerBlock}>
                    <View style={resourceLink.imageWrapper}>
                        <Thumbnail
                            square
                            style={resourceLink.image}
                            source={this.getLogoByItemType(item, linkType)}
                        />
                    </View>
                    <View style={resourceLink.textBlock}>
                        <Text
                            numberOfLines={2}
                            style={resourceLink.titleText}
                        >
                            { item.title || item.jobTitle || item.baseInfo.name }
                        </Text>
                        <Text numberOfLines={2} note>
                            { removeMd(item.description || item.overview || item.content || item.jobDescription) }
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
