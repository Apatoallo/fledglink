import React, { Component } from 'react';
import { Item, Icon, Text, View } from 'native-base';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { colors } from '../configs/config';

const headerSearch = StyleSheet.create({
    container: {
        height: 30,
        width: '100%',
    },
    input: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        height: 30,
        paddingHorizontal: 10,
    },
    searchText: {
        marginLeft: 5,
        fontSize: 12,
        color: colors.grey,
    },
    searchIcon: {
        fontSize: 18,
        color: colors.grey,
    },
});

export default class HeaderSearch extends Component {
    onClickHandler = () => {
        const { navigation } = this.props;
        navigation.navigate('SearchPage');
    };

    render() {
        return (
            <View style={headerSearch.container}>
                <TouchableWithoutFeedback
                    style={{flex: 1}}
                    onPress={this.onClickHandler}
                >
                    <View style={headerSearch.input}>
                        <Icon style={headerSearch.searchIcon} name="ios-search" />
                        <Text style={headerSearch.searchText}>Search Fledglink</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
