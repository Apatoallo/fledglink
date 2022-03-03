import React, { PureComponent } from 'react';
import {
    Card, CardItem, Left, Body,
} from 'native-base';
import PropTypes from 'prop-types';
import TimeAgo from 'react-native-timeago';
import { colors } from '../configs/config';

export default class CardNotificationComponent extends PureComponent {
    render() {
        const {
            thumbnailComponent,
            bodyComponent,
            updatedAt,
        } = this.props;
        return (
            <Card
                transparent
                style={{
                    flexWrap: 'nowrap',
                    marginLeft: 10,
                    marginRight: 10,
                    borderWidth: 0,
                    borderRadius: 10,
                    backgroundColor: colors.white,
                }}
            >
                <CardItem
                    button
                    style={{
                        flexWrap: 'nowrap',
                        borderRadius: 10,
                        backgroundColor: colors.white,
                    }}
                >
                    <Left
                        style={{
                            alignItems: 'flex-start',
                        }}
                    >
                        {thumbnailComponent}
                        <Body>
                            {bodyComponent}
                            <TimeAgo time={updatedAt} />
                        </Body>
                    </Left>
                </CardItem>
            </Card>
        );
    }
}

CardNotificationComponent.propTypes = {
    thumbnailComponent: PropTypes.instanceOf(Object).isRequired,
    bodyComponent: PropTypes.instanceOf(Object).isRequired,
    updatedAt: PropTypes.string.isRequired,
};
