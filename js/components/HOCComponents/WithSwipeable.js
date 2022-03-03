import React, { Component } from 'react';
import { Text } from 'native-base';
import { View } from 'react-native';
import Swipeable from 'react-native-swipeable';
import SwipeableRightButton from '../userProfile/ProfileTabsContent/About/SwipeableRightButton';

export default function withSwipeable(ListComponentItem) {
    return class WithSwipeable extends Component {
        rightButtonComponent = (item, elementIndex) => [
            <SwipeableRightButton item={item} elementIndex={elementIndex} deleteHandler={this.deleteItem} />,
        ];

        deleteItem = (item) => {
            const { deleteItemHandler, token, userId } = this.props;
            deleteItemHandler(token, userId, item.id);
        };

        render() {
            const { elementIndex, item } = this.props;
            return (
                <View>
                    <Swipeable rightButtonWidth={50} rightButtons={this.rightButtonComponent(item, elementIndex)}>
                        <ListComponentItem {...this.props} />
                    </Swipeable>
                </View>
            );
        }
    };
}
