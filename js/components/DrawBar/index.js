import React from "react";
import { connect } from "react-redux";
import { ImageBackground, TouchableOpacity, Image } from "react-native";
import { Text, Container, Content, View, Icon } from "native-base";
import { clearUser } from "../../actions/user";
import { removeToken } from "../../actions/token";
import { colors } from "../../configs/config";

const routes = [
  {
    title: "Home Feed",
    route: "Home"
  },
  {
    title: "Opportunity",
    route: "Careers"
  },
  {
    title: "Assessment",
    route: "AssessmentHub"
  },
  {
    title: "Resources",
    route: "ResourcesList"
  }
];

const navBackground = require("../../../images/navigation-background.png");
const undefinedUser = require("../../../images/no-profile-image.png");
const logo = require("../../../images/Bird.png");

class DrawBar extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const {
      user,
      navigation: {
        state: { index, routes }
      },
      renderIcon,
      getLabel
    } = this.props;
    const activeTintColor = "#fff";
    const inactiveTintColor = colors.black;
    return (
      <Container>
        <Content
          contentContainerStyle={{
            height: "100%",
            backgroundColor: colors.gallery
          }}
        >
          <ImageBackground
            source={navBackground}
            style={{ width: "100%", height: "100%" }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("UserProfile")}
            >
              <View
                style={{
                  height: 200,
                  alignSelf: "stretch",
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
              >
                {user.userImage ? (
                  <Image
                    square
                    style={{
                      height: 140,
                      width: 140,
                      borderRadius: 70
                    }}
                    source={{
                      uri: user.userImage
                    }}
                  />
                ) : (
                  <Image
                    square
                    style={{
                      height: 140,
                      borderRadius: 70,
                      width: 140
                    }}
                    source={undefinedUser}
                  />
                )}
                <Text
                  style={{
                    color: colors.darkestViolet,
                    fontFamily: fonts.bold,
                    fontSize: 20
                  }}
                >
                  {user.fullName}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                marginHorizontal: 15
              }}
            >
              <View
                style={{
                  flex: 0.6
                }}
              >
                {routes.map((route, idx) => {
                  const focused = index === idx;
                  return (
                    <TouchableOpacity
                      style={{
                        marginHorizontal: 5,
                        borderRadius: 15,

                        height: 40,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        backgroundColor: focused ? colors.pink : "transparent"
                      }}
                      onPress={() => this.props.navigation.navigate(route.key)}
                    >
                      <View
                        style={{
                          flex: 0.2,
                          alignItems: "center"
                        }}
                      >
                        {focused ? (
                          <Image
                            source={logo}
                            style={{ width: 25, height: 25 }}
                          />
                        ) : (
                          renderIcon({
                            route,
                            focused: index === idx,
                            tintColor: focused
                              ? activeTintColor
                              : inactiveTintColor
                          })
                        )}
                      </View>
                      <View style={{ flex: 0.8 }}>
                        <Text
                          style={{
                            color: focused ? activeTintColor : inactiveTintColor
                          }}
                        >
                          {getLabel({
                            route
                          })}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View
                style={{
                  flex: 0.4,
                  justifyContent: "flex-start",
                  borderTopColor: inactiveTintColor,
                  borderTopWidth: 0.5
                }}
              >
                <TouchableOpacity
                  style={{
                    marginHorizontal: 5,
                    marginBottom: 15,
                    borderRadius: 15,
                    height: 40,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "flex-start"
                  }}
                  onPress={() => {
                    this.props.removeToken();
                    this.props.clearUser();
                  }}
                >
                  <View
                    style={{
                      flex: 0.2,
                      alignItems: "center"
                    }}
                  >
                    <Icon
                      name="power"
                      style={{ color: inactiveTintColor, fontSize: 24 }}
                    />
                  </View>
                  <View style={{ flex: 0.8 }}>
                    <Text
                      style={{
                        color: inactiveTintColor
                      }}
                    >
                      Log out
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
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

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  bindAction
)(DrawBar);
