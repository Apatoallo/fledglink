import React, { Component } from 'react';
import { ListItem, View, Text, Thumbnail } from 'native-base';
import { StyleSheet } from 'react-native';
import { colors } from '../../../configs/config';

const listItem = StyleSheet.create({
    listElement: {
        height: 45,
        marginRight: 20,
        marginLeft: 20,
    },
    listContent: {
        flex: 1,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    listItemText: {
        marginLeft: 15,
        color: colors.grey,
    },
    listItemIconWrapper: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItemIcon: {
        fontSize: 22,
        color: colors.grey,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default class AddToPostListItem extends Component {
    itemClick = () => {
        const { item, clickHandler } = this.props;
        clickHandler(item);
    };

    render() {
        const { content, image, resizeMode } = this.props;
        return (
            <ListItem
                style={listItem.listElement}
                onPress={this.itemClick}
            >
                <View style={listItem.listContent}>
                    <View style={listItem.listItemIconWrapper}>
                        <Thumbnail
                            style={listItem.userAvatar}
                            source={image}
                            resizeMode={resizeMode}
                        />
                    </View>
                    <Text
                        numberOfLines={1}
                        style={listItem.listItemText}
                    >
                        {content}
                    </Text>
                </View>
            </ListItem>
        );
    }
}
