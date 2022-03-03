import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Animated,
  Dimensions,
  UIManager,
  TextInput,
  Keyboard,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Content,
  Text,
  View,
  Item,
  Label,
  Input,
  Spinner,
  Toast
} from "native-base";
import PropTypes from "prop-types";
import { pick } from "lodash";
import { Field, reduxForm } from "redux-form";
import LocationComponent from "../../shared/locationComponent";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";
import { setUserStore, updateUser } from "../../actions/user";
import jobLocations from "../../configs/jobLocations";
import {
  trackUpdateDashboardSector,
  trackUpdateDashboardCompany,
  trackUpdateDashboardJobType,
  trackUpdateDashboardJobInterest,
  trackUpdateDashboardJobHuntStatus
} from "../../actions/analytics";
import MultiSelect from "../FormComponents/MultySelect";
import Select from "../FormComponents/Select";
import Textarea from "../FormComponents/Textarea";
import AvatarComponent from "../userProfile/Header/AvatarComponent";
import avatarWithImagePicker from "../HOCComponents/AvatarWithImagePicker";
import styles from "./styles";
import { colors } from "../../configs/config";

const AvatarWithImagePicker = avatarWithImagePicker(AvatarComponent);

const { State: TextInputState } = TextInput;

class EditIntro extends Component {
  static propTypes = {
    userOptions: PropTypes.object,
    setUserStore: PropTypes.func,
    token: PropTypes.string,
    openDrawer: PropTypes.func
  };

  static navigationOptions = ({ navigation }) => {
    const save = navigation.getParam("save");
    return {
      headerRight: (
        <TouchableOpacity onPress={save}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 12
            }}
          >
            <Text style={{ color: "#fff" }}>Save</Text>
          </View>
        </TouchableOpacity>
      )
    };
  };

  state = {
    avatar: this.props.user.userImage,
    type: this.props.navigation.state.params.type,
    shift: new Animated.Value(0),
    loading: false,
    homeLocationError: null
  };

  componentDidMount = () => {
    const { navigation, handleSubmit } = this.props;

    this.keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      this.handleKeyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      this.handleKeyboardDidHide
    );
    FirebaseAnalytics.setCurrentScreen("EditProfile", "Profile");

    navigation.setParams({ save: handleSubmit(this.submit.bind(this)) });
  };

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  submit = values => {
    const fieldToPick = [
      "fullName",
      "introLine",
      "profileStatus",
      "introduction",
      "sectorInterest",
      "companyType",
      "oppType",
      "jobHuntStatus",
      "jobInterest",
      "homeLocation",
      "jobLocations"
    ];
    const { homeLocationError } = this.state;
    if (homeLocationError) {
      Toast.show({
        text: homeLocationError,
        position: "bottom",
        type: "danger",
        duration: 2000
      });
    } else {
      const body = {
        ...pick(values, fieldToPick),
        userImage: this.state.avatar
      };
      body.jobLocations = body.jobLocations.map(name =>
        jobLocations.find(location => location.name === name)
      );
      this.setState({ loading: true });
      this.trackEvent(this.state.type, body);
      this.props.updateUser(this.props.token, body, () => {
        this.setState({ loading: false });
        this.props.navigation.goBack();
      });
    }
  };

  trackEvent(type, data) {
    const {
      trackUpdateDashboardSector,
      trackUpdateDashboardCompany,
      trackUpdateDashboardJobType,
      trackUpdateDashboardJobInterest,
      trackUpdateDashboardJobHuntStatus
    } = this.props;
    const payload = data[type];

    switch (type) {
      case "sectorInterest": {
        trackUpdateDashboardSector(payload);
        break;
      }
      case "companyType": {
        trackUpdateDashboardCompany(payload);
        break;
      }
      case "oppType": {
        trackUpdateDashboardJobType(payload);
        break;
      }
      case "jobInterest": {
        trackUpdateDashboardJobInterest(payload);
        break;
      }
      case "jobHuntStatus": {
        trackUpdateDashboardJobHuntStatus(payload);
        break;
      }
    }
  }

  handleKeyboardDidShow = event => {
    const { height: windowHeight } = Dimensions.get("window");
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(
      currentlyFocusedField,
      (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
        if (gap >= 0) {
          return;
        }
        Animated.timing(this.state.shift, {
          toValue: gap + 40,
          duration: 1000,
          useNativeDriver: true
        }).start();
      }
    );
  };

  handleKeyboardDidHide = () => {
    Animated.timing(this.state.shift, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };

  renderInput = ({
    input,
    label,
    type,
    meta: { touched, error, warning },
    inputProps
  }) => {
    const eventColor = colors.grey;
    return (
      <View style={{ marginBottom: 10 }}>
        <Item
          floatingLabel
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: colors.grey
          }}
        >
          <Label style={{ fontSize: 15, color: eventColor }}>{label}</Label>
          <Input
            secureTextEntry={input.name === "password"}
            keyboardType={input.name === "email" ? "email-address" : "default"}
            style={styles.input}
            {...input}
          />
        </Item>
      </View>
    );
  };

  setUserAvatarToState = uri => {
    this.setState({ avatar: uri });
  };

  locationComponent = props => {
    const eventColor = colors.grey;
    onLocationChange = ({ ...result }) => {
      if (result.description) {
        this.setState({ homeLocationError: null });
        props.input.onChange({
          name: result.description,
          geoposition: [result.location.lng, result.location.lat]
        });
      } else {
        props.input.onChange(undefined);
      }
    };

    validateLocationSearch = text => {
      if (!props.input.value.name || text !== props.input.value.name) {
        this.setState({
          homeLocationError: "Please select a location from the list."
        });
      } else {
        this.setState({ homeLocationError: null });
      }
    };

    const locationProps = {
      onChange: onLocationChange,
      locationInput: props.input.value.name,
      validateLocationSearch: validateLocationSearch
    };

    return (
      <View style={{ marginBottom: 20 }}>
        <Label style={{ fontSize: 15, color: eventColor }}>{props.label}</Label>
        <LocationComponent {...locationProps} />
      </View>
    );
  };

  renderComponentWithSwitch = (type, userOptions, displayName) => {
    switch (type) {
      case "main":
        return (
          <View style={{ paddingBottom: 40 }}>
            <View>
              <Text style={{ textAlign: "center" }}>Profile Photo</Text>
              <AvatarWithImagePicker
                userImage={this.state.avatar}
                styles={styles}
                setUserAvatarToState={this.setUserAvatarToState}
              />
            </View>
            <Field
              name="fullName"
              label="Full Name"
              component={this.renderInput}
            />
            <Field
              name="introLine"
              label="Headline"
              placeholder="You in a sentence"
              component={Textarea}
            />
            <Field
              name="homeLocation"
              label="Town or Borough"
              component={this.locationComponent}
            />
          </View>
        );

      case "about":
        return (
          <View>
            <Field
              name="introduction"
              placeholder="Tell the community about you"
              label="Introduction"
              component={Textarea}
            />
          </View>
        );
      case "jobHuntStatus":
        return (
          <View>
            <Field
              name="jobHuntStatus"
              iosHeader="Select one"
              mode="dropdown"
              label="Job Hunt Status"
              component={Select}
              data={userOptions.jobHuntStatus}
            />
          </View>
        );
      case "sectorInterest":
      case "companyType":
      case "oppType":
      case "jobInterest":
        return (
          <View>
            <Field
              name={type}
              iosHeader="Select multiple"
              mode="dropdown"
              label={displayName}
              children={userOptions[type]}
              component={MultiSelect}
            />
          </View>
        );
      case "jobLocations":
        return (
          <View>
            <Field
              name={type}
              iosHeader="Select multiple"
              mode="dropdown"
              label={displayName}
              children={jobLocations.map(item => {
                return { name: item?.name };
              })}
              component={MultiSelect}
            />
          </View>
        );
      default:
        return null;
    }
  };

  render() {
    const { userOptions } = this.props;
    const { loading } = this.state;
    const { displayName } = this.props.navigation.state.params;
    return (
      <Container>
        <Content style={{ paddingHorizontal: 20, marginTop: 30 }}>
          {loading ? (
            <Spinner />
          ) : (
            <Animated.View>
              {this.renderComponentWithSwitch(
                this.state.type,
                userOptions,
                displayName
              )}
            </Animated.View>
          )}
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setUserStore: user => dispatch(setUserStore(user)),
    updateUser: (token, body, onSuccess) =>
      dispatch(updateUser(token, body, onSuccess)),
    trackUpdateDashboardSector: payload =>
      dispatch(trackUpdateDashboardSector(payload)),
    trackUpdateDashboardCompany: payload =>
      dispatch(trackUpdateDashboardCompany(payload)),
    trackUpdateDashboardJobType: payload =>
      dispatch(trackUpdateDashboardJobType(payload)),
    trackUpdateDashboardJobInterest: payload =>
      dispatch(trackUpdateDashboardJobInterest(payload)),
    trackUpdateDashboardJobHuntStatus: payload =>
      dispatch(trackUpdateDashboardJobHuntStatus(payload))
  };
}

const mapStateToProps = state => ({
  token: state.token.token,
  user: state.user.user,
  userOptions: state.userOptions.userOptionsList,
  initialValues: state.user.user
});

const EditIntroSwag = reduxForm({
  form: "EditIntro",
  enableReinitialize: true
})(EditIntro);

export default connect(
  mapStateToProps,
  bindAction
)(EditIntroSwag);
