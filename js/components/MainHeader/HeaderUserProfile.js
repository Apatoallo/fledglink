import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { isIphoneX } from 'react-native-iphone-x-helper';
import MainHeader from './MainHeader';

const undefinedUser = require('../../../images/no-profile-image.png');

const MainHeaderUserProfile = (props) => {
    const { navigation, user: { userImage } } = props;
    return (
        <MainHeader
            leftButton={(
                <TouchableOpacity
                    style={{ marginTop: isIphoneX() ? 20 : 0 }}
                    onPress={() => { navigation.navigate('UserProfile'); }}
                >
                    <Image
                        source={userImage ? { uri: userImage } : undefinedUser}
                        style={{ height: 40, width: 40, borderRadius: 20 }}
                    />
                </TouchableOpacity>
            )}
            {...props}
        />
    );
};

MainHeaderUserProfile.propTypes = {
    navigation: PropTypes.instanceOf(Object).isRequired,
    user: PropTypes.instanceOf(Object).isRequired,
};

export default MainHeaderUserProfile;
