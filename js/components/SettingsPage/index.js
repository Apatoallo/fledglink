import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, List, ListItem, View, Text } from "native-base";
import PropTypes from "prop-types";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";
import { removeToken } from "../../actions/token";
import { clearUser, logoutUser } from "../../actions/user";

class SettingsPage extends Component {
  static propTypes = {
    token: PropTypes.string
  };

  componentDidMount = () => {
    FirebaseAnalytics.setCurrentScreen("ViewProfileSettings", "Profile");
  };

  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Content
          contentContainerStyle={{
            flex: 1,
            paddingBottom: 50
          }}
        >
          <List style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                height: "100%",
                justifyContent: "space-between"
              }}
            >
              <View>
                <ListItem
                  onPress={() =>
                    this.props.navigation.navigate("ChangePassword")
                  }
                >
                  <View>
                    <Text>Change Password</Text>
                    <Text note>
                      Protect your account with a unique password
                    </Text>
                  </View>
                </ListItem>
                <ListItem
                  onPress={() =>
                    this.props.navigation.navigate("ResultPDF", {
                      name: "Terms and Conditions",
                      url:
                        "https://fledglink-staging.ams3.digitaloceanspaces.com/terms_and_conditions/Fledglink%20-%20Consumer%20Terms.pdf"
                    })
                  }
                >
                  <View>
                    <Text>Terms and Conditions</Text>
                    <Text note>View the terms and conditions</Text>
                  </View>
                </ListItem>
                <ListItem
                  onPress={() =>
                    this.props.navigation.navigate("ResultPDF", {
                      name: "Data Policy",
                      url:
                        "https://fledglink-staging.ams3.digitaloceanspaces.com/terms_and_conditions/Fledglink%20-%20App%20Privacy%20Notice.pdf"
                    })
                  }
                >
                  <View>
                    <Text>Data Policy</Text>
                    <Text note>We keep your data safe! Read now</Text>
                  </View>
                </ListItem>
                {/* <ListItem onPress={() => console.log('Ok')}> */}
                {/* <View> */}
                {/* <Text>Information request</Text> */}
                {/* <Text note>Request an export of all that we know about you</Text> */}
                {/* </View> */}
                {/* </ListItem> */}
              </View>
              <View>
                <ListItem
                  onPress={() => this.props.navigation.navigate("CloseAccount")}
                >
                  <View>
                    <Text>Close account</Text>
                    <Text note>All the options for your account info</Text>
                  </View>
                </ListItem>
                <ListItem
                  onPress={() => {
                    this.props.removeToken();
                    this.props.clearUser();
                    this.props.logoutUser();
                  }}
                >
                  <View>
                    <Text>Log out</Text>
                    <Text note>
                      Sign off, you'll need to sign back in later
                    </Text>
                  </View>
                </ListItem>
              </View>
            </View>
          </List>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    clearUser: () => dispatch(clearUser()),
    removeToken: () => dispatch(removeToken()),
    logoutUser: () => dispatch(logoutUser())
  };
}

const mapStateToProps = state => ({
  token: state.token.token
});

export default connect(
  mapStateToProps,
  bindAction
)(SettingsPage);
