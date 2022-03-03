import {
    View,
} from 'native-base';
import React, { PureComponent } from 'react';
import {
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import PlaceholderComponent from './PlaceholderComponent';
import UserComponent from './userComponent';

export default class UserList extends PureComponent {
    render() {
        const {
            userList,
            loadMore,
            usersCount,
            loading,
            getNewUsers,
            acceptConnection,
            declinePendingConnection,
            deletePendingConnection,
            onPress,
            screenName,
        } = this.props;
        return (
            <FlatList
                style={{ height: '100%' }}
                data={userList}
                refreshControl={(
                    <RefreshControl loading={loading} onRefresh={getNewUsers} />
                )}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <UserComponent
                        onPress={onPress}
                        id={item}
                        acceptConnection={acceptConnection}
                        screenName={screenName}
                    />
                )}
                onEndReachedThreshold={0.1}
                onEndReached={() => {
                    if (!loading) {
                        loadMore();
                    }
                }}
            />
        );
    }
}

UserList.propTypes = {
    userList: PropTypes.instanceOf(Array).isRequired,
    loadMore: PropTypes.func,
    loading: PropTypes.bool.isRequired,
    usersCount: PropTypes.number.isRequired,
    getNewUsers: PropTypes.func,
    acceptConnection: PropTypes.func.isRequired,
};

UserList.defaultProps = {
    getNewUsers: () => {},
    loadMore: () => {},
};
