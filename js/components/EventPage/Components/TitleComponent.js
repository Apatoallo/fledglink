import React, { PureComponent } from 'react';
import { View, Text } from 'native-base';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class TitleComponent extends PureComponent {
    getDate = () => {
        const { startDate, endDate } = this.props;
        const returnedStartDate = startDate ? `${moment(startDate).format('Do MMM')}` : 'Start date coming soon...';
        const returnedEndDate = endDate ? `${moment(endDate).format('Do MMM')}` : 'End date coming soon...';
        if (!startDate && !endDate) {
            return 'Event dates coming soon';
        }
        return `${returnedStartDate} - ${returnedEndDate}`;
    }

    render() {
        const {
            styles,
            title,
            startDate,
            endDate,
            location,
            eventTypes,
        } = this.props;
        return (
            <View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.locationAndDate}>{this.getDate()}</Text>
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.locationAndDate}>{location && location.name}</Text>
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.types}>{eventTypes.join(', ')}</Text>
                </View>
            </View>
        );
    }
}

TitleComponent.propTypes = {
    styles: PropTypes.instanceOf(Object).isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    eventTypes: PropTypes.instanceOf(Array).isRequired,
};
