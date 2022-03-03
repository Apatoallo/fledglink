import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, Button, View, Text } from "native-base";
import { Alert } from "react-native";
import { clearUser } from "../../actions/user";
import { removeToken } from "../../actions/token";
import { serverUrl, colors } from "../../configs/config";
import { version } from "../../../package.json";

import PropTypes from "prop-types";

class CloseAccount extends Component {
  static propTypes = {
    token: PropTypes.string
  };

  removeProfile = () => {
    fetch(`${serverUrl}/users/${this.props.user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`
      }
    })
      .then(result => {
        if (result.status === 204) {
          this.props.removeToken();
          this.props.clearUser();
        }
      })
      .catch(e => {
        this.props.removeToken();
        this.props.clearUser();
      });
  };

  onPressRemove = () => {
    Alert.alert(
      "Delete account",
      "Deleting your account is permanent and cannot be undone. Do you want to delete your account?",
      [
        { text: "Confirm", onPress: () => this.removeProfile() },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
          style: "cancel"
        }
      ]
    );
  };

  deactivateProfile = () => {
    fetch(`${serverUrl}/users/${this.props.user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`
      },
      body: JSON.stringify({
        profileStatus: "De-activated"
      })
    })
      .then(result => result.json())
      .then(result => {
        if (result.profileStatus === "De-activated") {
          this.props.removeToken();
          this.props.clearUser();
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  onPressDeactivate = () => {
    this.deactivateProfile();
  };

  render() {
    return (
      <Container style={{ backgroundColor: "#fff", paddingBottom: 20 }}>
        <Content
          padder
          contentContainerStyle={{
            flex: 1
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.5 }}>
              <View
                style={{
                  flex: 0.6,
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "900" }}>
                  Suspend Account
                </Text>
                <Text style={{ fontSize: 16 }} note>
                  Temporary suspend your account, you will not appear in any
                  searches, you will not be notify and people will not be able
                  to view your profile
                </Text>
                <Text style={{ fontSize: 16 }} note>
                  Re-activate your account by logging back into the application.
                </Text>
              </View>
              <View style={{ flex: 0.4 }}>
                <Button
                  transparent
                  onPress={() => {
                    this.onPressDeactivate();
                  }}
                  style={{
                    borderColor: colors.violet,
                    borderWidth: 0.5,
                    height: 40,
                    marginTop: 10,
                    alignSelf: "flex-end",
                    borderRadius: 20
                  }}
                >
                  <Text style={{ color: colors.violet }}>DE-ACTIVATE</Text>
                </Button>
              </View>
            </View>
            <View style={{ flex: 0.5 }}>
              <View
                style={{
                  flex: 0.6,
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "900" }}>
                  Forget Me Forever
                </Text>
                <Text style={{ fontSize: 16 }} note>
                  Permanently remove all information about you from our systems.
                </Text>
                <Text style={{ fontSize: 16 }} note>
                  This can take up to 72 hours. You will be informed by a final
                  email once this has been completed
                </Text>
              </View>
              <View style={{ flex: 0.4 }}>
                <Button
                  onPress={() => {
                    this.onPressRemove();
                  }}
                  style={{
                    marginTop: 10,
                    borderColor: colors.red,
                    backgroundColor: "#ff3838",
                    borderWidth: 0.5,
                    height: 40,
                    alignSelf: "flex-end",
                    borderRadius: 20
                  }}
                >
                  <Text style={{ color: colors.white }}>DELETE ACCOUNT</Text>
                </Button>
              </View>
            </View>
          </View>
          <Text>Release Version: {version}</Text>
        </Content>
      </Container>
    );
  }
}
function bindAction(dispatch) {
  return {
    clearUser: () => dispatch(clearUser()),
    removeToken: () => dispatch(removeToken())
  };
}
const mapStateToProps = state => ({
  token: state.token.token,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  bindAction
)(CloseAccount);
