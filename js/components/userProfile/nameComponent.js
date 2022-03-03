import React, { PureComponent } from "react";
import { Text, View, Icon } from "native-base";
import { isIphoneX } from "react-native-iphone-x-helper";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { colors } from "../../configs/config";
import { declinePendingConnection } from "../../actions/userActions";
import { postDeleteConnectionSuccess } from "../../actions/userConnections";

const userProfile = {
  connectionRequestText: {
    color: colors.violet,
    fontSize: 14,
    fontWeight: "400"
  },
  buttonsWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 50
  },
  button: {
    borderWidth: 2,
    justifyContent: "center",
    textAlign: "center",
    height: 30,
    borderRadius: 20,
    width: "15%",
    borderColor: colors.violet
  },
  buttonText: {
    textAlign: "center",
    fontSize: 12
  },
  buttonIcon: {
    color: colors.violet,
    fontSize: 18,
    width: "100%",
    textAlign: "center"
  }
};

const RequestButton = ({
  btnStyles = {},
  textStyles = {},
  text,
  isDisabled,
  press
}) => (
  <TouchableOpacity
    disabled={isDisabled}
    transparent
    onPress={press}
    style={{ ...userProfile.button, ...btnStyles }}
  >
    <Text style={{ ...userProfile.buttonText, ...textStyles }}>{text}</Text>
  </TouchableOpacity>
);

const requestButtonPropsContainer = {
  sender: {
    btnStyles: {
      borderColor: colors.violetOpacity,
      width: "30%",
      marginRight: 10
    },
    textStyles: {
      color: colors.violetOpacity,
      flexWrap: "nowrap"
    },
    text: "PENDING",
    isDisabled: true
  },
  receiver: {
    btnStyles: {
      borderColor: colors.violet,
      backgroundColor: colors.violet,
      width: "30%",
      marginRight: 10
    },
    textStyles: {
      color: "#fff"
    },
    text: "ACCEPT"
  },
  finished: {
    btnStyles: {
      borderColor: colors.violetOpacity,
      width: "30%",
      marginRight: 10
    },
    textStyles: {
      color: colors.violetOpacity,
      textAlign: "center"
    },
    text: "CONNECTED",
    isDisabled: true
  },
  default: {
    btnStyles: {
      borderColor: colors.violet,
      width: "30%",
      marginRight: 10
    },
    textStyles: {
      color: colors.violet,
      textAlign: "center"
    },
    text: "CONNECT"
  }
};

class NameComponent extends PureComponent {
  rejectConnection = () => {
    const { rejectConnection, userId, setFinishedStatus } = this.props;
    rejectConnection(userId);
    setFinishedStatus();
  };

  goToUserActions = () => {
    this.props.navigation.navigate("UserActionsPage", {
      userName: this.props.fullName,
      userId: this.props.userId
    });
  };

  render() {
    const {
      fullName,
      education,
      introLine,
      connectionStatus,
      showButtonsConnections,
      sendRequest
    } = this.props;

    return (
      <View
        style={{
          alignItems: "center",
          borderBottomColor: colors.gallery,
          zIndex: 0,
          borderBottomWidth: 1,
          paddingBottom: 20,
          flex: 1,
          marginTop: isIphoneX() ? 20 : 0
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 20,
            paddingHorizontal: 20
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: colors.darkestViolet
            }}
          >
            {fullName}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: colors.darkestViolet
            }}
          >
            {education}
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: colors.grey
            }}
          >
            {introLine}
          </Text>
        </View>
        {connectionStatus === "receiver" ? (
          <View>
            <Text style={userProfile.connectionRequestText}>
              {fullName} has sent a connection request
            </Text>
          </View>
        ) : null}
        {showButtonsConnections && (
          <View style={userProfile.buttonsWrapper}>
            <RequestButton
              {...requestButtonPropsContainer[connectionStatus]}
              press={sendRequest}
            />
            {connectionStatus === "receiver" && (
              <TouchableOpacity
                transparent
                onPress={this.rejectConnection}
                style={{
                  ...userProfile.button,
                  borderColor: colors.violet,
                  width: "30%",
                  marginRight: 10
                }}
              >
                <Text
                  style={{
                    color: colors.violet,
                    textAlign: "center",
                    fontSize: 12
                  }}
                >
                  REJECT
                </Text>
              </TouchableOpacity>
            )}
            {connectionStatus === "finished" && (
              <TouchableOpacity
                transparent
                style={userProfile.button}
                onPress={this.goToUserActions}
              >
                <Icon
                  type="Feather"
                  name="more-horizontal"
                  style={userProfile.buttonIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    rejectConnection: id => dispatch(declinePendingConnection(id)),
    setFinishedStatus: () => dispatch(postDeleteConnectionSuccess())
  };
}

const mapStateToProps = state => ({
  token: state.token.token
});

export default connect(
  mapStateToProps,
  bindAction
)(NameComponent);
