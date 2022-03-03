import React, { PureComponent } from 'react';
import { Text, View } from 'native-base';
import DashboardTitle from './DashboardTitle';
import DashboardTable from './DashboardTable';

export default class Dashboard extends PureComponent {
    render() {
        const { user, navigationHandler } = this.props;
        return (
            <View>
                <DashboardTitle />
                <DashboardTable user={user} navigationHandler={navigationHandler} />
            </View>
        );
    }
}
