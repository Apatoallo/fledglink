import React from 'react';
import { Button, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { colors } from '../../configs/config';
import MainHeader from './MainHeader';

const MainHeaderIOs = (props) => {
    const { navigation } = props;
    return (
        <MainHeader
            leftButton={(
                <Button
                    transparent
                    onPress={() => navigation.navigate('Home')}
                >
                    <Icon style={{ color: colors.white }} name="ios-arrow-back" />
                </Button>
            )}
            {...props}
        />
    );
};

MainHeaderIOs.propTypes = {
    navigation: PropTypes.instanceOf(Object).isRequired,
};

export default MainHeaderIOs;
