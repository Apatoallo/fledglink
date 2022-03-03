import React, { Component } from "react";
import { Text, View } from "native-base";
import { StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { colors } from "../../configs/config";
import UserAction from "./UserAction";
import { fetchDeleteConnection } from "../../actions/userConnections";

const userActionsPage = StyleSheet.create({
  pageContainer: {
    backgroundColor: colors.white,
    flex: 1
  },
  contentContainer: {
    paddingHorizontal: 10
  },
  title: {
    color: colors.darkestViolet,
    fontSize: 16,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: colors.grey
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

class UserActionsPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam("userName");

    return {
      headerTitle: name
    };
  };

  render() {
    const { userName, userId } = this.props.navigation.state.params;
    const { deleteConnection, token, navigation } = this.props;
    const userOptionsList = [
      {
        optionName: "Remove connection",
        iconName: "user-x",
        clickHandler() {
          deleteConnection(token, userId);
          navigation.navigate("ShowConnectionUserProfile", { userId });
        }
      },
      {
        optionName: "Report profile",
        iconName: "alert-circle",
        clickHandler() {
          navigation.navigate("ShowConnectionUserProfile", { userId });
        }
      }
    ];

    return (
      <View style={userActionsPage.pageContainer}>
        <View style={userActionsPage.contentContainer}>
          <Text style={userActionsPage.title}>More options</Text>
          <View>
            <FlatList
              data={userOptionsList}
              renderItem={({ item }) => <UserAction data={item} />}
            />
          </View>
        </View>
      </View>
    );
  }
}

UserActionsPage.propTypes = {
  userName: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
  deleteConnection: PropTypes.func.isRequired
};

function bindAction(dispatch) {
  return {
    deleteConnection: (token, id) => dispatch(fetchDeleteConnection(token, id))
  };
}
const mapStateToProps = state => ({
  token: state.token.token,
  successMessage: state.userConnections.message
});

export default connect(
  mapStateToProps,
  bindAction
)(UserActionsPage);
