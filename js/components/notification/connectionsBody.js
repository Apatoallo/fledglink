import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Button } from 'native-base';
import PropTypes from 'prop-types';
import { colors } from '../../configs/config';

export default class ConnectionBody extends PureComponent {
    render() {
        const { acceptConnection, declineConnection } = this.props;
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginVertical: 10,
                }}
            >
                <TouchableOpacity
                    onPress={acceptConnection}
                    transparent
                    style={{
                        flex: 0.4,
                        marginRight: 10,
                        height: 30,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.violet,
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 8 }}>ACCEPT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={declineConnection}
                    transparent
                    style={{
                        borderRadius: 15,
                        flex: 0.4,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 10,
                        borderColor: colors.violet,
                        borderWidth: 1,
                    }}
                >
                    <Text style={{ color: colors.violet, fontSize: 8 }}>
                                DECLINE
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

ConnectionBody.propTypes = {
    data: PropTypes.instanceOf(Object).isRequired,
    acceptConnection: PropTypes.func.isRequired,
    declineConnection: PropTypes.func.isRequired,
};
