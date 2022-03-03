import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import ScheduleItem from './ScheduleItem';

export default class Schedule extends PureComponent {
    render() {
        const {
            schedule,
        } = this.props;
        return (
            <FlatList
                data={schedule}
                renderItem={({ item }) => <ScheduleItem hour={item} />}
            />
        );
    }
}

Schedule.propTypes = {
    schedule: PropTypes.instanceOf(Object).isRequired,
};
