import React, { Component } from 'react';
import {
    Icon, View, Input, Button,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { colors } from '../../../configs/config';
import searchWithDelay from '../../../utils/searchWithDelay';

const searchBar = StyleSheet.create({
    searchFieldWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: colors.lightGrey,
        borderColor: colors.grey,
        borderWidth: 1,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
    },
    searchField: {
        backgroundColor: '#fff',
        marginLeft: 10,
        height: 30,
        borderRadius: 5,
        borderWidth: 0,
        paddingHorizontal: 10,
        fontSize: 16,
        padding: 0,
        margin: 0,
    },
    leftBlock: {
        flex: 0.9,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        color: '#fff',
        fontSize: 30,
    },
    closeButton: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        alignSelf: 'center',
    },
    closeIcon: {
        color: '#fff',
        fontSize: 20,
    },
});

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        };
    }

    onChangeText = (text) => {
        const { onChangeHandler } = this.props;
        this.setState({ searchText: text });
        onChangeHandler(this.state.searchText);
    };

    onChangeWithDelay = searchWithDelay(this.onChangeText);

    render() {
        return (
            <View style={searchBar.searchFieldWrapper}>
                <View style={searchBar.leftBlock}>
                    <Icon style={searchBar.searchIcon} name="ios-search" />
                    <Input
                        autoCorrect={false}
                        onChangeText={this.onChangeWithDelay}
                        style={searchBar.searchField}
                        placeholder="search"
                    />
                </View>
            </View>
        );
    }
}
