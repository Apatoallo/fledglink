import React, { Component } from "react";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  View,
  Item,
  Input,
  Label,
  Text,
  Form
} from "native-base";
import { Field, reduxForm, change } from "redux-form";
import PropTypes from "prop-types";
import FirebaseAnalytics from "../../../../Services/FirebaseAnalytics";
import { colors } from "../../../../configs/config";
import DatePicker from "../../../createProfile/datePicker";
import { addAchievement, patchAchievement } from "../../../../actions/user";

class EditAchievementPage extends Component {
  static propTypes = {
    userOptions: PropTypes.object,
    setUserOptions: PropTypes.func,
    setUserStore: PropTypes.func,
    token: PropTypes.string,
    openDrawer: PropTypes.func
  };

  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam("name");
    const save = navigation.getParam("save");
    const submitting = navigation.getParam("submitting");
    const invalid = navigation.getParam("invalid");

    return {
      headerTitle: name,
      headerRight: (
        <TouchableOpacity
          onPress={save}
          disabled={submitting}
          style={{ paddingHorizontal: 12, opacity: invalid ? 0.7 : 1 }}
        >
          <Text style={{ color: colors.white }}>Save</Text>
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.props.navigation.state.params,
      showAchievedDatePicker: false
    };
  }

  componentDidMount = () => {
    const { navigation, handleSubmit, submitting, invalid } = this.props;
    FirebaseAnalytics.setCurrentScreen("Edit Achievements", "Home");
    this.props.dispatch(
      change("EditAchievementPage", "achievementsKey", this.state.key)
    );

    navigation.setParams({
      save: handleSubmit(this.submit),
      submitting,
      invalid
    });
  };

  submit = values => {
    const {
      addAchievement,
      patchAchievement,
      token,
      user,
      navigation
    } = this.props;
    const { data, key } = this.state;
    !!data
      ? patchAchievement(
          token,
          user.id,
          data.id,
          values.achievements[key],
          navigation.goBack
        )
      : addAchievement(
          token,
          user.id,
          values.achievements[key],
          navigation.goBack
        );
  };

  renderInput({
    input,
    label,
    type,
    meta: { touched, error, warning },
    inputProps
  }) {
    let eventColor = colors.grey;
    if (input.value) {
      eventColor = colors.grey;
    }
    return (
      <View style={{ paddingHorizontal: 10, paddingTop: 20 }}>
        <Item
          floatingLabel
          style={{
            paddingLeft: 0,
            borderBottomColor: eventColor,
            borderBottomWidth: 0.5
          }}
        >
          <Label style={{ color: eventColor }}>{label}</Label>
          <Input
            secureTextEntry={input.name === "password"}
            keyboardType={input.name === "email" ? "email-address" : "default"}
            style={{ color: colors.darkBlack, paddingLeft: 0 }}
            {...input}
          />
        </Item>
        {touched &&
          (error && (
            <Text style={{ fontSize: 15, color: colors.red }}>{error}</Text>
          ))}
      </View>
    );
  }

  hideDatePickers = () => {
    this.setState({
      showAchievedDatePicker: false
    });
  };

  renderDatePicker = ({ key, show }) => ({
    label,
    mode,
    startDate,
    yearStep,
    input: { onChange, value, ...inputProps }
  }) => {
    const baseColor = value ? colors.darkBlack : colors.grey;
    return (
      <View
        style={{
          paddingTop: 5,
          paddingBottom: 5,
          marginHorizontal: 10,
          borderBottomColor: colors.grey,
          marginTop: 25,
          borderBottomWidth: 0.5
        }}
      >
        {value ? (
          <Text style={{ color: colors.grey }}>{label}</Text>
        ) : (
          <Text>{` `}</Text>
        )}
        <DatePicker
          startDate={startDate}
          yearStep={yearStep}
          showPicker={show}
          onChange={val => onChange(val)}
          onPress={() => {
            this.setState({ [key]: !show });
          }}
          value={value}
          mode={mode}
          colorText={baseColor}
          label={label}
        />
      </View>
    );
  };

  render() {
    const { showAchievedDatePicker } = this.state;
    return (
      <Container style={{ backgroundColor: "#FBFAFA" }}>
        <Content>
          <Form>
            <Field
              name={`achievements[${this.state.key}].name`}
              label="Achievement"
              component={this.renderInput}
              onFocus={this.hideDatePickers}
            />
            <Field
              name={`achievements[${this.state.key}].grade`}
              label="Grade"
              component={this.renderInput}
              onFocus={this.hideDatePickers}
            />
            <Field
              mode="past"
              name={`achievements[${this.state.key}].achievedDate`}
              component={this.renderDatePicker({
                key: "showAchievedDatePicker",
                show: showAchievedDatePicker
              })}
              label="Date of achievement"
              startDate={new Date().getFullYear()}
              yearStep={50}
            />
          </Form>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    addAchievement: (token, userId, achievement, onSuccess) =>
      dispatch(addAchievement(token, userId, achievement, onSuccess)),
    patchAchievement: (token, userId, achievementId, achievement, onSuccess) =>
      dispatch(
        patchAchievement(token, userId, achievementId, achievement, onSuccess)
      )
  };
}

const mapStateToProps = (state, props) => {
  return {
    token: state.token.token,
    initialValues: state.user.user,
    error: state.user.error,
    user: state.user.user
  };
};

const EditAchievementsSwag = reduxForm({
  form: "EditAchievements",
  destroyOnUnmount: false,
  initialValues: {
    achievementsKey: null
  }
})(EditAchievementPage);

export default connect(
  mapStateToProps,
  bindAction
)(EditAchievementsSwag);
