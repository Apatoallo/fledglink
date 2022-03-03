import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
    Text, View, ListItem, Icon, Thumbnail,
} from 'native-base';
import PropTypes from 'prop-types';
import SearchListItemImage from '../../shared/SearchListItemImage';
import { colors } from '../../configs/config';

const searchListItem = StyleSheet.create({
    listItem: {
        paddingBottom: 5,
        paddingTop: 5,
    },
    container: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    titleText: {
        fontSize: 18,
        color: colors.grey,
    },
    subtitleText: {
        fontSize: 12,
        color: colors.grey,
    },
});

class SearchListItem extends Component {
    getNavigationOptions = (itemType, itemId) => {
        const isCurrentUser = itemId === this.props.user.id;
        const navigationOptions = {
            resource: { screen: 'ResourceView', id: { id: itemId } },
            corporation: { screen: 'CompanyProfile', id: { corpId: itemId } },
            opportunity: { screen: 'OpportunityPage', id: { id: itemId } },
            user: isCurrentUser ? { screen: 'UserProfile', id: null } : { screen: 'ShowConnectionUserProfile', id: { userId: itemId } },
        };
        return navigationOptions[itemType];
    };

    redirectToItem = () => {
        const { type, id } = this.props.listItem;
        this.props.listItemClickHandler(this.getNavigationOptions(type, id));
    };

    render() {
        const { listItem } = this.props;
        return (
            <ListItem
                style={searchListItem.listItem}
                onPress={this.redirectToItem}
            >
                <View style={searchListItem.container}>
                    <SearchListItemImage itemType={listItem.type} image={listItem.image} />
                    <View style={searchListItem.textContainer}>
                        <Text style={searchListItem.titleText} numberOfLines={2}>{ listItem.name }</Text>
                        {listItem.subline ? <Text style={searchListItem.subtitleText} numberOfLines={1}>{ listItem.subline }</Text> : null}
                    </View>
                </View>
            </ListItem>
        );
    }
}

SearchListItem.propTypes = {
    listItem: PropTypes.instanceOf(Object).isRequired,
    listItemClickHandler: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.user.user,
});

export default connect(
    mapStateToProps,
)(SearchListItem);
