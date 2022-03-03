import React, { Component } from 'react';
import { View, Thumbnail } from 'native-base';

const undefinedUser = require('../../../../images/no-profile-image.png');

export default class AvatarComponent extends Component {
    render() {
        const { userImage, styles } = this.props;
        return (
            <View style={styles.avatarContainer}>
                <Thumbnail
                    source={userImage ? { uri: userImage } : undefinedUser}
                    style={styles.avatar}
                />
            </View>
        );
    }
}
