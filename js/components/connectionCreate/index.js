import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import { HeaderBackButton } from "react-navigation";
import { View, Spinner, Text, Toast } from "native-base";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";

import {
  createPendingConnection,
  acceptPendingConnection
} from "../../actions/userActions";
import { fetchUserById } from "../../actions/userConnections";

import BackgroundHeader from "../backgroundHeader/BackgroundHeader";
import ItemComponent from "../../shared/itemComponent";

import { colors, fonts } from "../../configs/config";

const styles = StyleSheet.create({
  headerWrapper: {
    marginHorizontal: 30,
    marginTop: 30
  },
  titleText: {
    fontFamily: fonts.bold,
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "rgb(60, 3, 85)"
  },
  subTitleText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "rgb(54, 54, 54)",
    marginTop: 7
  },
  descriptionWrapper: {
    marginHorizontal: 15,
    marginTop: 18,
    marginBottom: 24
  },
  loadingWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  navigationWrapper: {
    marginHorizontal: 30,
    marginBottom: 30
  },
  scrollViewWrapper: {
    flex: 1
  },
  scrollView: {
    height: "100%"
  },
  helpView: {
    alignSelf: "center",
    width: 208,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center"
  },
  helpText: {
    fontSize: 12,
    marginRight: 10,
    fontFamily: fonts.regular,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center"
  },
  helpTextColor: {
    color: colors.grey
  },
  helpTextRedirectColor: {
    color: colors.violet
  },
  connectionRequestText: {
    color: colors.violet,
    fontSize: 14,
    fontWeight: "400"
  },
  buttonWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 32
  },
  button: {
    borderWidth: 2,
    justifyContent: "center",
    alignContent: "center",
    height: 30,
    borderRadius: 20,
    backgroundColor: colors.violet,
    borderColor: colors.violet,
    paddingHorizontal: 15
  },
  buttonDisabled: {
    backgroundColor: colors.violetOpacity,
    borderColor: colors.violetOpacity
  },
  buttonText: {
    fontFamily: fonts.bold,
    textAlign: "center",
    fontSize: 12,
    color: colors.white
  },
  buttonTextDisabled: {
    color: colors.whiteOpacity
  },
  buttonIcon: {
    color: colors.violet,
    fontSize: 18,
    width: "100%",
    textAlign: "center"
  }
});

const initialState = {
  connectionFields: [
    {
      headTitle: "Add Connection",
      title: "Do you already know $fullName?",
      subTitle: "",
      options: [
        {
          id: 0,
          name: "Yes",
          value: "Yes",
          checked: false
        },
        {
          id: 1,
          name: "No",
          value: "No",
          checked: false
        }
      ],
      isMultiSelect: false
    },
    {
      headTitle: "Top Qualities",
      title: "Tell us five of $fullName's top qualities",
      subTitle:
        "It's important that we share feedback with one another. This helps us discover more about ourselves, build our confidence and get matched to careers. Select the five qualities that stand out for you when you think about $fullName",
      options: [],
      isMultiSelect: true
    }
  ],
  pageNumber: 0,
  currentOptions: [],
  selectedOptions: []
};

class ConnectionCreate extends Component {
  static navigationOptions = ({ navigation }) => {
    const back = navigation.getParam("back");
    return {
      headerLeft: <HeaderBackButton tintColor="#ffffff" onPress={back} />,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Text style={{ color: "#fff", paddingRight: 12 }}>Cancel</Text>
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      ...this.props.navigation.state.params
    };
  }

  componentDidMount() {
    const { connectionFields } = this.state;
    const {
      navigation,
      userOptions,
      id,
      user,
      token,
      fetchUserByIdAction
    } = this.props;
    const newConnectionFields = cloneDeep(connectionFields);

    if (!user || typeof user.isConnectionRequested !== "boolean") {
      fetchUserByIdAction(token, id);
    }

    newConnectionFields[1].options = userOptions.qualities;

    navigation.setParams({ back: this.goBack });

    this.setState({
      connectionFields: newConnectionFields
    });
  }

  componentWillReceiveProps = nextProps => {
    const {
      navigation: { popToTop },
      loading
    } = this.props;
    if (!nextProps.loading && loading) {
      popToTop();
    }
  };

  goBack = () => {
    const { pageNumber } = this.state;
    const { navigation } = this.props;
    if (pageNumber <= 0) {
      navigation.popToTop();
    } else {
      this.setState({
        pageNumber: pageNumber - 1
      });
    }
  };

  setQualitiesButtonClick = () => {
    const { pageNumber } = this.state;
    this.setState({
      pageNumber: pageNumber + 1
    });
  };

  sendRequest = () => {
    const {
      fetchSendRequestAction,
      acceptPendingConnectionAction,
      token,
      user: { id, isConnectionRequested }
    } = this.props;
    const { selectedOptions } = this.state;
    const options = selectedOptions.map(option => option.value);
    if (!isConnectionRequested) {
      fetchSendRequestAction(token, id, "", options, "");
    } else {
      acceptPendingConnectionAction(token, id, "", options, "");
    }
  };

  getSelectedOptionsCount = options =>
    options.reduce((acc, option) => (option.checked ? acc + 1 : acc), 0);

  toggleChecked = item => {
    const { connectionFields, pageNumber } = this.state;
    if (pageNumber === 0) {
      if (item === "Yes") {
        this.setState({
          pageNumber: 1
        });
      }
      if (item === "No") {
        this.sendRequest();
      }

      return;
    }
    const newConnectionFields = cloneDeep(connectionFields);
    const page = newConnectionFields[pageNumber];
    if (page.isMultiSelect) {
      page.options = page.options.map(option => {
        if (option.value === item) {
          return {
            ...option,
            checked: !option.checked
          };
        }
        return {
          ...option
        };
      });
      const count = this.getSelectedOptionsCount(page.options);
      if (count > 5) {
        return;
      }
    } else {
      page.options = page.options.map(option => {
        if (option.value === item) {
          return {
            ...option,
            checked: !option.checked
          };
        }
        return {
          ...option,
          checked: false
        };
      });
    }

    this.setState({
      connectionFields: newConnectionFields,
      selectedOptions: newConnectionFields[pageNumber].options.filter(
        option => option.checked
      )
    });
  };

  renderButtons = () => {
    const { loading } = this.props;
    const { pageNumber, selectedOptions } = this.state;
    if (pageNumber === 1) {
      const count = selectedOptions.length;
      const isDisabled = count < 5 || loading;
      return (
        <TouchableOpacity
          disabled={isDisabled}
          transparent
          onPress={this.sendRequest}
          style={[styles.button, isDisabled ? styles.buttonDisabled : {}]}
        >
          <Text
            style={[
              styles.buttonText,
              isDisabled ? styles.buttonTextDisabled : {}
            ]}
          >
            SEND REQUEST
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  render() {
    const {
      loading,
      userLoading,
      navigation: { popToTop },
      user: { fullName }
    } = this.props;
    const { pageNumber, connectionFields } = this.state;
    const page = connectionFields[pageNumber];
    const titleText = page.title.replace(/\$fullName/g, fullName);
    const subTitleText = page.subTitle.replace(/\$fullName/g, fullName);
    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            {userLoading ? (
              <View style={styles.loadingWrapper}>
                <Spinner color={colors.violet} />
              </View>
            ) : (
              <View>
                <View style={styles.descriptionWrapper}>
                  {!!titleText && (
                    <Text style={styles.titleText}>{titleText}</Text>
                  )}
                  {!!subTitleText && (
                    <Text style={styles.subTitleText}>{subTitleText}</Text>
                  )}
                </View>
                <FlatList
                  data={connectionFields[pageNumber].options}
                  keyExtractor={item => `${item.id}`}
                  renderItem={({ item }) => (
                    <ItemComponent
                      clickHandler={this.toggleChecked}
                      styles={{ paddingHorizontal: 15, marginBottom: 0 }}
                      {...item}
                    />
                  )}
                  onEndReachedThreshold={0.1}
                />
              </View>
            )}
            {loading && (
              <View style={styles.loadingWrapper}>
                <Spinner color={colors.violet} />
              </View>
            )}
          </ScrollView>
          <View style={styles.buttonWrapper}>{this.renderButtons()}</View>
        </View>
      </View>
    );
  }
}

ConnectionCreate.defaultProps = {
  user: {}
};

ConnectionCreate.propTypes = {
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  userLoading: PropTypes.bool.isRequired,
  user: PropTypes.instanceOf(Object),
  userOptions: PropTypes.instanceOf(Object).isRequired,
  fetchSendRequestAction: PropTypes.func.isRequired,
  acceptPendingConnectionAction: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    popToTop: PropTypes.func.isRequired
  }).isRequired
};

function bindAction(dispatch) {
  return {
    fetchUserByIdAction: (token, id) => dispatch(fetchUserById(token, id)),
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
    acceptPendingConnectionAction: (
      token,
      id,
      acquaintance,
      qualities,
      notAcquaintance
    ) =>
      dispatch(
        acceptPendingConnection(
          token,
          id,
          acquaintance,
          qualities,
          notAcquaintance
        )
      )
  };
}
const mapStateToProps = (state, props) => {
  const { userId } = props.navigation.state.params;
  return {
    id: userId,
    token: state.token.token,
    error: state.pendingConnections.error,
    user: state.userStore.userContainers[userId],
    name: "Add Connection",
    userOptions: state.userOptions.userOptionsList,
    loading: state.pendingConnections.loading,
    userLoading: state.user.loading
  };
};

export default connect(
  mapStateToProps,
  bindAction
)(ConnectionCreate);
