import React, { Component } from "react";
import { View, Text } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, DeviceEventEmitter } from "react-native";
import {
  toggleWatchPosition,
  deletePendingConnection,
  getterNearUsers,
  fetchSendRequest,
  fetchAcceptRequest,
  declinePendingConnection
} from "../../actions/nearPeople";
import Toggle from "../../shared/Toggle";
import UserList from "../../shared/userList";
import { colors, fonts } from "../../configs/config";

const peopleNear = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  contentWrapper: {
    paddingHorizontal: 15,
    marginTop: 15
  },
  titleText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    letterSpacing: 0,
    color: colors.black
  },
  subTitleText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    letterSpacing: 0,
    color: colors.grey
  }
});

class PeopleNear extends Component {
  componentDidMount = () => {
    const { watchingGeoPosition, getterNearUsers } = this.props;
    if (watchingGeoPosition) {
      getterNearUsers();
    }
  };

  componentWillUnmount = () => {
    DeviceEventEmitter.removeListener("updateLocation");
  };

  togglePositionWatch = async () => {
    const { toggleWatchPosition } = this.props;
    await toggleWatchPosition();
  };

  render() {
    const {
      navigation,
      children,
      deletePendingConnectionAction,
      declinePendingConnectionAction,
      token,
      watchingGeoPosition,
      nearPeopleUsersList,
      loading,
      getterNearUsers
    } = this.props;
    return (
      <View style={peopleNear.container}>
        <View style={peopleNear.contentWrapper}>
          <Text style={peopleNear.titleText}>
            These Fledglink users have all been within your vicinity in the last
            24 hours. If you're at an event, on campus or at college - why not
            reach out and connect?
          </Text>
          <TouchableOpacity
            onPress={this.togglePositionWatch}
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginVertical: 10
            }}
          >
            <Toggle
              disabled
              style={{ marginRight: 10 }}
              value={watchingGeoPosition}
            />
            <Text style={peopleNear.subTitleText}>
              {`Geo-location is ${watchingGeoPosition ? "on" : "off"}`}
            </Text>
          </TouchableOpacity>
          <Text style={peopleNear.subTitleText}>People recently near you</Text>
        </View>
        <View style={{ paddingBottom: 90 }}>
          {watchingGeoPosition && nearPeopleUsersList && !loading && (
            <UserList
              onPress={id => navigation.navigate("UserDetails", { userId: id })}
              acceptConnection={user =>
                navigation.navigate("ConnectionCreate", { userId: user.id })
              }
              getNewUsers={getterNearUsers}
              screenName="nearPeople"
              usersCount={nearPeopleUsersList.length}
              loading={loading}
              userList={nearPeopleUsersList}
              declinePendingConnection={id =>
                declinePendingConnectionAction(id)
              }
              deletePendingConnection={id =>
                deletePendingConnectionAction(token, id)
              }
            />
          )}
          {watchingGeoPosition && !nearPeopleUsersList && (
            <Text style={peopleNear.subTitleText}>No one is nearby</Text>
          )}
        </View>
        {children}
      </View>
    );
  }
}

PeopleNear.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  watchingGeoPosition: PropTypes.bool.isRequired,
  toggleWatchPosition: PropTypes.func.isRequired,
  nearPeopleUsersList: PropTypes.instanceOf(Array).isRequired,
  loading: PropTypes.bool.isRequired
};

function bindAction(dispatch) {
  return {
    deletePendingConnection: (token, id) =>
      dispatch(deletePendingConnection(token, id)),
    declinePendingConnectionAction: id =>
      dispatch(declinePendingConnection(id)),
    fetchSendRequestAction: (
      token,
      id,
      acquaintance,
      qualities,
      notAcquaintance
    ) =>
      dispatch(
        fetchSendRequest(token, id, acquaintance, qualities, notAcquaintance)
      ),
    fetchAcceptRequestAction: (
      token,
      id,
      acquaintance,
      qualities,
      notAcquaintance
    ) =>
      dispatch(
        fetchAcceptRequest(token, id, acquaintance, qualities, notAcquaintance)
      ),
    toggleWatchPosition: () => dispatch(toggleWatchPosition()),
    getterNearUsers: () => dispatch(getterNearUsers())
  };
}

const mapStateToProps = state => ({
  watchingGeoPosition: state.nearPeople.watchingGeoPosition,
  nearPeopleUsersList: state.nearPeople.nearPeopleUsersList,
  loading: state.nearPeople.loading,
  token: state.token.token,
  userOptions: state.userOptions.userOptionsList
});

export default connect(
  mapStateToProps,
  bindAction
)(PeopleNear);
