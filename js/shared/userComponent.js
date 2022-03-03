import {
    Icon, Text, Thumbnail, View,
} from 'native-base';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import moment from 'moment';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../components/MyNetwork/styles';
import {
    createPendingConnection,
    deletePendingConnection,
    acceptPendingConnection,
    declinePendingConnection,
} from '../actions/userActions';
import UserComponentActionButtons from './userComponentActionButtons';

const undefinedUser = require('../../images/no-profile-image.png');

class UserComponent extends PureComponent {
    render() {
        const {
            user: {
                fullName,
                education,
                userImage,
                id,
                mutualConnectionsCount,
                createdAt,
            },
            deletePendingConnection,
            declinePendingConnection,
            // createdAt,
            token,
            screenName,
            onPress,
        } = this.props;
        return (
            <TouchableWithoutFeedback onPress={() => onPress(id)}>
                <View style={styles.wrapConnections}>
                    <View style={styles.wrapAvatar}>
                        <Thumbnail
                            source={
                                userImage ? { uri: userImage } : undefinedUser
                            }
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.wrapBaseInfo}>
                        <Text style={styles.userName} numberOfLines={1}>
                            {fullName}
                        </Text>
                        {
                            education && (
                                <Text style={styles.education} numberOfLines={1}>
                                    {education}
                                </Text>
                            )
                        }
                        {
                            screenName === 'mutualConnections' ? (
                                <Text
                                    style={styles.mutual}
                                    numberOfLines={
                                        1
                                    }
                                >
                                    {`${mutualConnectionsCount || 0}  Mutual connections`}
                                </Text>
                            ) : (
                                <Text
                                    style={styles.mutual}
                                    numberOfLines={1}
                                >
                                    {`Joined Fledglink on ${moment(
                                        new Date(createdAt),
                                    ).format('MMM Do YYYY')}`}

                                </Text>
                            )
                        }
                    </View>
                    <UserComponentActionButtons
                        {...this.props}
                        deletePendingConnection={id => deletePendingConnection(token, id)}
                        declinePendingConnection={declinePendingConnection}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

UserComponent.propTypes = {
    onPress: PropTypes.func,
    acceptConnection: PropTypes.func.isRequired,
};

function bindAction(dispatch) {
    return {
        createPendingConnection: (token, id, acquaintance, qualities, notAcquaintance) => dispatch(createPendingConnection(token, id, acquaintance, qualities, notAcquaintance)),
        acceptPendingConnection: (token, id, acquaintance, qualities, notAcquaintance) => dispatch(acceptPendingConnection(token, id, acquaintance, qualities, notAcquaintance)),
        deletePendingConnection: (token, id) => dispatch(deletePendingConnection(token, id)),
        declinePendingConnection: id => dispatch(declinePendingConnection(id)),
    };
}

const mapStateToProps = (state, props) => ({
    token: state.token.token,
    user: state.userStore.userContainers[props.id] || state.nearPeople.usersContain[props.id],
});
export default connect(mapStateToProps, bindAction)(UserComponent);
