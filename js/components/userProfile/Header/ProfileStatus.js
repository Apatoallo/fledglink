import React, { PureComponent } from 'react';
import { View } from 'native-base';
import { Image } from 'react-native';

const profileStatusHidden = require('../../../../images/incognito.png');
const profileStatusPublic = require('../../../../images/public.png');
const profileStatusNetwork = require('../../../../images/profile-status-network.png');
const profileStatusMyNetwork = require('../../../../images/profile-status-my-network.png');

export default class ProfileStatus extends PureComponent {
    getImageByProfileStatus = () => {
        const { profileStatus } = this.props;
        const profileStatusImages = {
            'Public': profileStatusPublic,
            'Network Only': profileStatusNetwork,
            'My Network': profileStatusMyNetwork,
            'Hidden': profileStatusHidden,
        };
        return <Image source={profileStatusImages[profileStatus]} />;
    };

    render() {
        return (
            <View>{this.getImageByProfileStatus()}</View>
        );
    }
}
