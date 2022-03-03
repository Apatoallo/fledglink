import { Spinner, Text, View } from "native-base";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  fetchGetUserMutualConnection,
  createPendingConnection
} from "../actions/userActions";
import UserList from "./userList";
import { colors, fonts } from "../configs/config";

const styles = StyleSheet.create({
  containerStyle: {
    paddingBottom: 90
  },
  heading: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.midGrey
  }
});

class MutualConnections extends Component {
  componentDidMount = () => {
    const { token, fetchGetUserMutualConnectionAction } = this.props;
    fetchGetUserMutualConnectionAction(token);
  };

  render() {
    const {
      loading,
      navigation,
      usersCount,
      fetchGetUserMutualConnectionAction,
      token,
      userList,
      containerStyle = {}
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {!loading && userList.length === 0 ? null : (
          <View>
            <View style={{ marginTop: 15 }}>
              <Text style={styles.heading}>People you may know</Text>
            </View>
            <View style={[styles.containerStyle, containerStyle]}>
              <UserList
                onPress={id =>
                  navigation.navigate("UserDetails", { userId: id })
                }
                acceptConnection={user =>
                  navigation.navigate("ConnectionCreate", { userId: user.id })
                }
                screenName="mutualConnections"
                usersCount={usersCount}
                loading={loading}
                loadMore={() => fetchGetUserMutualConnectionAction(token)}
                userList={userList}
              />
            </View>
          </View>
        )}
        {loading && <Spinner />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token.token,
  userList: state.userStore.mutualConnectionsIds,
  loading: state.userStore.loading,
  userOptions: state.userOptions.userOptionsList,
  usersCount: state.userStore.mutualConnectionsIds.length
});

function bindAction(dispatch) {
  return {
    fetchSendRequestAction: (
      token,
      id,
      acquaintance,
      qualities,
      notAcquaintance
    ) =>
      dispatch(
        createPendingConnection(
          token,
          id,
          acquaintance,
          qualities,
          notAcquaintance
        )
      ),
    fetchGetUserMutualConnectionAction: token =>
      dispatch(fetchGetUserMutualConnection(token))
  };
}

MutualConnections.propTypes = {
  fetchGetUserMutualConnectionAction: PropTypes.func.isRequired,
  navigation: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  usersCount: PropTypes.number.isRequired,
  userList: PropTypes.instanceOf(Array).isRequired,
  loading: PropTypes.bool.isRequired,
  containerStyle: PropTypes.instanceOf(Object).isRequired
};

export default connect(
  mapStateToProps,
  bindAction
)(MutualConnections);
