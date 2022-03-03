import React, { Component } from "react";
import { Text, View, Icon, Toast } from "native-base";
import ImagePicker from "react-native-image-picker";
import {
  TextInput,
  Dimensions,
  ScrollView,
  StyleSheet,
  Platform,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserContentLinkPreview from "../../shared/userContentLinkPreview";
import LinkActionComponent from "./linkActionComponent";
import { getHeaderHeight } from "../../App";
import { colors } from "../../configs/config";
import { refreshUserFeed } from "../../actions/feed";
import {
  addImageToMessage,
  changeContent,
  removeImage,
  sendMessage,
  removeResource,
  clearStore
} from "../../actions/newMessage";

const { height } = Dimensions.get("window");
const valueForOperationSystem = Platform.OS === "android" ? 75 : 50;

const postComponent = StyleSheet.create({
  contentWrapper: {
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  scrollViewBlock: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10
  },
  inputWrapper: {
    flex: 1,
    height: "100%"
  },
  input: {
    fontSize: 18,
    textAlignVertical: "top",
    height: "100%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    color: colors.grey
  },
  bottomPanelWrapper: {
    backgroundColor: "transparent",
    height: 70,
    width: "100%"
  },
  bottomPanel: {
    height: 70,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderTopColor: colors.grey,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  textBlock: {
    flex: 1
  },
  buttonsBlock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

class PostComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    const send = navigation.getParam("send");

    return {
      headerLeft: (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 12
            }}
          >
            <Icon
              style={{ color: colors.white, fontSize: 24 }}
              name="x"
              type="Feather"
            />
          </View>
        </TouchableWithoutFeedback>
      ),
      headerRight: (
        <TouchableWithoutFeedback onPress={send}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 12
            }}
          >
            <Icon
              style={{ color: colors.white, fontSize: 24 }}
              name="check"
              type="Feather"
            />
          </View>
        </TouchableWithoutFeedback>
      )
    };
  };

  constructor(props) {
    super(props);
    this.bottomActionLinks = [
      {
        clickHandler: () =>
          this.navigateToSelectResource("users", "mention", "Mentions"),
        name: "at-sign"
      },
      {
        clickHandler: this.selectPhotoTapped,
        name: "image"
      },
      {
        clickHandler: () =>
          this.navigateToSelectResource(
            "corporations",
            "briefcase",
            "Corporations"
          ),
        name: "briefcase"
      },
      {
        clickHandler: () =>
          this.navigateToSelectResource("resources", "box", "Resources"),
        name: "box"
      },
      {
        clickHandler: () =>
          this.navigateToSelectResource(
            "users/me/opportunities",
            "search",
            "Opportunities",
            "opportunities"
          ),
        name: "search"
      }
    ];
    this.state = {
      positionBottomBlock:
        Platform.OS === "android" ? getHeaderHeight() + 10 : getHeaderHeight(),
      ...this.props.navigation.state.params
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ send: this.sendingMessage });
  }

  componentWillReceiveProps = nextProps => {
    const {
      message: { error, createdPostId },
      navigation: { goBack },
      clearStore
    } = this.props;
    if (nextProps.message.error && nextProps.message.error !== error) {
      Toast.show({ message: nextProps.message.error });
    }

    if (
      nextProps.message.createdPostId &&
      nextProps.message.createdPostId !== createdPostId
    ) {
      clearStore();
      goBack();
    }
  };

  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    const { addImageToMessageAction } = this.props;

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = {
          uri: `data:image/jpeg;base64,${response.data}`
        };

        addImageToMessageAction(source.uri);
      }
    });
  };

  changePostText = text => {
    const { changeContentAction } = this.props;
    if (this.isPotentialMention(text)) {
      this.navigateToSelectResource("users", "mention", "Mentions");
    }
    changeContentAction(text);
  };

  isPotentialMention = text => {
    const lastChar = text[text.length - 1];
    const preLastChar = text[text.length - 2];
    const re = new RegExp("\\s");
    return (
      (text.length === 1 && text === "@") ||
      (lastChar === "@" && re.test(preLastChar))
    );
  };

  navigateToSelectResource = (link, iconName, name, type) => {
    const linkType = type || link;
    const {
      navigation: { navigate }
    } = this.props;
    const navigationRoute = {
      corporations: "AddCompany",
      resources: "AddResource",
      opportunities: "AddOpportunity",
      users: "AddUserMention"
    };
    navigate(navigationRoute[linkType]);
  };

  componentWillMount = () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
  };

  componentWillUnmount = () => {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };

  keyboardDidShow = e => {
    const newPosition =
      Platform.OS === "android"
        ? e.endCoordinates.height + getHeaderHeight() + 10
        : e.endCoordinates.height + getHeaderHeight();
    this.setState({
      positionBottomBlock: newPosition
    });
  };

  keyboardDidHide = () => {
    this.setState({
      positionBottomBlock:
        Platform.OS === "android" ? getHeaderHeight() + 10 : getHeaderHeight()
    });
  };

  sendingMessage = () => {
    const { sendMessageAction, token } = this.props;
    const { postId } = this.state;
    sendMessageAction(token, postId);
  };

  render() {
    const {
      message,
      removeImageAction,
      removeResourceAction,
      navigation
    } = this.props;
    const { image, resourceLink, linkType, content, preview } = message;

    const { positionBottomBlock, postId } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1
          }}
        >
          <View
            style={[
              postComponent.contentWrapper,
              { height: height - positionBottomBlock }
            ]}
          >
            <ScrollView style={postComponent.scrollViewBlock}>
              <UserContentLinkPreview
                message={{
                  image,
                  link: resourceLink,
                  preview,
                  showCanceling: true,
                  linkType
                }}
                navigation={navigation}
                showCanceling
                removeImageAction={removeImageAction}
                removeResourceAction={removeResourceAction}
              />
              <View
                style={[
                  postComponent.inputWrapper,
                  { minHeight: height - (positionBottomBlock + 65) }
                ]}
              >
                <TextInput
                  autoFocus
                  autoCorrect
                  multiline
                  onChangeText={this.changePostText}
                  value={content}
                  underlineColorAndroid="transparent"
                  style={postComponent.input}
                  placeholder="Type your message"
                />
              </View>
            </ScrollView>
            <SafeAreaView style={{ flexDirection: "row" }}>
              <View style={postComponent.bottomPanelWrapper}>
                <View style={postComponent.bottomPanel}>
                  <View style={postComponent.textBlock}>
                    <Text style={{ color: colors.black }}>
                      Add to your post
                    </Text>
                  </View>
                  <View style={postComponent.buttonsBlock}>
                    {this.bottomActionLinks.map(link => (
                      <LinkActionComponent
                        clickHandler={link.clickHandler}
                        size={22}
                        name={link.name}
                        type="Feather"
                      />
                    ))}
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </View>
    );
  }
}

PostComponent.propTypes = {
  removeImageAction: PropTypes.func.isRequired,
  removeResourceAction: PropTypes.func.isRequired,
  sendMessageAction: PropTypes.func.isRequired,
  changeContentAction: PropTypes.func.isRequired,
  addImageToMessageAction: PropTypes.func.isRequired,
  clearStore: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
  message: PropTypes.instanceOf(Object)
};

PostComponent.defaultProps = {
  message: {}
};

function bindAction(dispatch) {
  return {
    clearStore: () => dispatch(clearStore()),
    sendMessageAction: (token, id) => dispatch(sendMessage(token, id)),
    removeImageAction: () => dispatch(removeImage()),
    removeResourceAction: () => dispatch(removeResource()),
    changeContentAction: text => dispatch(changeContent(text)),
    addImageToMessageAction: image => dispatch(addImageToMessage(image)),
    getUserFeed: token => dispatch(refreshUserFeed(token))
  };
}
const mapStateToProps = state => ({
  token: state.token.token,
  user: state.user.user,
  userOptions: state.user.userOptions,
  initialValues: state.user.user,
  message: state.newMessage
});

export default connect(
  mapStateToProps,
  bindAction
)(PostComponent);
