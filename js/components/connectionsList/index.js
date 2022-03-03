import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'native-base';
import UserListComponent from '../usersListComponent';

export default class ConnectionsList extends Component {
    componentDidMount = () => {
        const {
            getUserConnectionsList,
            token,
            text,
            userId,
        } = this.props;

        getUserConnectionsList(token, text, userId);
    };

    componentWillReceiveProps = (nextProps) => {
        const { error } = this.props;
        if (nextProps.error && nextProps.error !== error) {
            Toast.show({
                text: nextProps.error,
                position: 'top',
                type: 'danger',
                duration: 5000,
            });
        }
    }

    render() {
        const { getUserConnectionsList } = this.props;
        return (
            <UserListComponent
                fetchUsers={getUserConnectionsList}
                {...this.props}
            />
        );
    }
}
