import React, { Component } from 'react';
import {
    Text, View, Body, Button, Header, Left, Right, Input, Content, ListItem, Spinner
} from 'native-base';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import Placeholder from 'rn-placeholder';
import { colors } from '../../configs/config';
import SearchListItem from './SearchListItem';

const searchResultsList = StyleSheet.create({
    listContainer: {
        height: 45,
        marginHorizontal: 10,
        paddingTop: 5,
        borderBottomColor:
        colors.grey,
        borderBottomWidth: 0.5,
    },
});

export default class SearchResultsList extends Component {
    onScrollList = (event) => {
        this.props.onScrollHandler(event);
    };

    render() {
        const { dataSetState } = this.props;
        return (
            <FlatList
                onEndReached={this.onScrollList}
                onEndReachedThreshold={0.3}
                keyboardShouldPersistTaps="handled"
                data={dataSetState}
                renderItem={({ item }) => <SearchListItem listItemClickHandler={this.props.listItemClickHandler} listItem={item} />}
            />
        );
    }
}

SearchResultsList.propTypes = {
    dataSetState: PropTypes.instanceOf(Object).isRequired,
    onScrollHandler: PropTypes.func.isRequired,
};
