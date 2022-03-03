import { Icon, View } from 'native-base';
import React, { PureComponent, Fragment } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../components/MyNetwork/styles';

const FeatherIconButton = ({
    onPress,
    actionStyle,
    iconStyle,
    icon,
}) => (
    <TouchableOpacity
        onPress={onPress}
        style={actionStyle}
    >
        <Icon
            name={icon}
            type="Feather"
            style={iconStyle}
        />
    </TouchableOpacity>
);

FeatherIconButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    actionStyle: PropTypes.instanceOf(Object).isRequired,
    iconStyle: PropTypes.instanceOf(Object).isRequired,
    icon: PropTypes.string.isRequired,
};

const AcceptConnectionRequestButton = ({ user: { id, fullName }, acceptConnection }) => (
    <FeatherIconButton
        onPress={() => acceptConnection({ id, fullName })}
        actionStyle={styles.successAction}
        iconStyle={styles.successIcon}
        icon="link"
    />
);

AcceptConnectionRequestButton.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        fullName: PropTypes.string,
    }).isRequired,
    acceptConnection: PropTypes.func.isRequired,
};

const RemoveConnectionRequestButton = ({
    user: { id },
    type,
    deletePendingConnection,
    declinePendingConnection,
}) => (
    <FeatherIconButton
        onPress={() => {
            if (type === 'receiver') {
                deletePendingConnection(id);
            } else {
                declinePendingConnection(id);
            }
        }}
        actionStyle={styles.cancelAction}
        iconStyle={styles.cancelIcon}
        icon="x"
    />
);

RemoveConnectionRequestButton.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        fullName: PropTypes.string,
    }).isRequired,
    type: PropTypes.string.isRequired,
    deletePendingConnection: PropTypes.func.isRequired,
    declinePendingConnection: PropTypes.func.isRequired,
};

export default class UserComponentActionButtons extends PureComponent {
    deleteAction = () => {
        const {
            deletePendingConnection,
            declinePendingConnection,
            user: { isConnectionRequestSender, id },
        } = this.props;
        if (isConnectionRequestSender) {
            declinePendingConnection(id);
            return;
        }
        deletePendingConnection(id);
    }

    acceptAction = () => {
        const { acceptConnection, user: { id, fullName, isConnectionRequested } } = this.props;
        if (isConnectionRequested) {
            acceptConnection({ id, fullName });
        }
        return acceptConnection(id, fullName);
    }

    renderActionButtons = () => {
        const {
            acceptConnection,
            user: {
                id,
                fullName,
                isConnectionRequested,
                isConnectionRequestSender,
                isConnected,
            },
        } = this.props;
        if (!isConnected) {
            return (
                <View>
                    {
                        (!isConnected && isConnectionRequested && !isConnectionRequestSender) ? null
                            : (
                                <FeatherIconButton
                                    onPress={() => acceptConnection({ id, fullName, isConnectionRequested })}
                                    actionStyle={styles.successAction}
                                    iconStyle={styles.successIcon}
                                    icon="link"
                                />
                            )
                    }

                    {
                        (!isConnected && isConnectionRequested) && (
                            <FeatherIconButton
                                onPress={this.deleteAction}
                                actionStyle={styles.cancelAction}
                                iconStyle={styles.cancelIcon}
                                icon="x"
                            />
                        )
                    }
                </View>
            );
        }
        return null;
    }

    render() {
        const {
            type,
            screenName,
            user: { isConnectionRequested, isConnectionRequestSender, isConnected },
        } = this.props;
        return screenName === 'nearPeople' && !isConnected ? (
            <View style={styles.userActionWrapper}>
                <AcceptConnectionRequestButton {...this.props} />
                {isConnectionRequested && <RemoveConnectionRequestButton {...this.props} />}
            </View>
        )
            : this.renderActionButtons();
    }
}

UserComponentActionButtons.propTypes = {
    type: PropTypes.string.isRequired,
    screenName: PropTypes.string.isRequired,
};
