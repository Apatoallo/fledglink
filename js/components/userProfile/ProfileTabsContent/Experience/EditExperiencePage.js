import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Text,
  View,
  Label,
  Item,
  Input,
  Form,
  Spinner
} from "native-base";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import {
  Dimensions,
  Platform,
  Switch,
  CheckBox,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { addExperience, patchExperience } from "../../../../actions/user";
import {
  trackWorkExperienceAdded,
  trackWorkExperienceUpdated
} from "../../../../actions/analytics";
import { colors } from "../../../../configs/config";
import DatePicker from "../../../createProfile/datePicker";
import Textarea from "../../../FormComponents/Textarea";
import FirebaseAnalytics from "../../../../Services/FirebaseAnalytics";

const { width } = Dimensions.get("window");
const selector = formValueSelector("EditExperiencePage");

validate = values => {
  const initError = idx => {
    const error = { workExperience: [] };
    error.workExperience[idx] = { company: { name: "" } };
    return error;
  };
  let error = {};
  const key = values.workExperienceAndEducationKey;
  if (values.type !== "education" && values.workExperience[key]) {
    const { title, isEndDatePresent, company } = values.workExperience[key] || {
      company: { name: "" }
    };
    if (!title) {
      if (typeof error.workExperience === "undefined") {
        error = initError(key);
      }
      error.workExperience[key].title = "Please, fill job title";
    }
    if (!company || !company.name) {
      if (typeof error.workExperience === "undefined") {
        error = initError(key);
      }
      error.workExperience[key].company.name = "Please, fill company name";
    }
    if (isEndDatePresent) {
      delete values.workExperience[key].endDate;
    }
  }

  return error;
};

class EditExperiencePage extends Component {
  static propTypes = {
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
      present: false,
      showStartDatePicker: false,
      showEndDatePicker: false,
      loading: false
    };
  }

  componentDidMount = () => {
    const { navigation, handleSubmit, submitting, invalid } = this.props;

    this.props.dispatch(change("EditExperiencePage", "type", this.state.type));
    this.props.dispatch(
      change(
        "EditExperiencePage",
        "workExperienceAndEducationKey",
        this.state.key
      )
    );
    FirebaseAnalytics.setCurrentScreen("ViewProfile", "Profile");
    navigation.setParams({
      save: handleSubmit(this.submit),
      submitting,
      invalid
    });
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
      <View style={{ paddingTop: 20 }}>
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
            <Text
              style={{
                fontSize: 15,
                color: colors.red,
                marginBottom: 15,
                alignItems: "center"
              }}
            >
              {error}
            </Text>
          ))}
      </View>
    );
  }

  getStartedValue = value => {
    return value ? new Date(value).getFullYear() : new Date().getFullYear();
  };

  hideDatePickers = () => {
    this.setState({
      showStartDatePicker: false,
      showEndDatePicker: false
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
          width: width / 3,
          borderBottomColor: colors.grey,
          marginTop: 25,
          borderBottomWidth: 0.5
        }}
      >
        {value ? <Text style={{ color: colors.grey }}>{label}</Text> : <Text />}
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

  submit = values => {
    const {
      navigation,
      token,
      addWorkExperience,
      patchWorkExperience,
      trackWorkExperienceAdded,
      trackWorkExperienceUpdated
    } = this.props;
    const { data, key, present } = this.state;
    const body = { ...values.workExperience[key], isEndDatePresent: present };
    const onSuccess = () => {
      this.setState({ loading: false });
      navigation.goBack();
    };

    this.setState({ loading: true });

    if (data) {
      patchWorkExperience(token, data.id, body, onSuccess);
      trackWorkExperienceUpdated(body);
    } else {
      addWorkExperience(token, body, onSuccess);
      trackWorkExperienceAdded(body);
    }
  };

  render() {
    const { showStartDatePicker, showEndDatePicker, loading } = this.state;
    return (
      <Container style={{ backgroundColor: "#fff", paddingBottom: 20 }}>
        <Content padder>
          {loading ? (
            <Spinner />
          ) : (
            <Form>
              <View style={{ marginHorizontal: 10 }}>
                <Field
                  name={`workExperience[${this.state.key}].title`}
                  label="Title"
                  component={this.renderInput}
                  onFocus={this.hideDatePickers}
                />
                <Field
                  name={`workExperience[${this.state.key}].company.name`}
                  label="Company"
                  component={this.renderInput}
                  onFocus={this.hideDatePickers}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Field
                    name={`workExperience[${this.state.key}].startDate`}
                    mode="past"
                    component={this.renderDatePicker({
                      key: "showStartDatePicker",
                      show: showStartDatePicker
                    })}
                    label="Start date"
                    startDate={this.getStartedValue()}
                    yearStep={50}
                  />
                  {!this.state.present ? (
                    <Field
                      name={`workExperience[${this.state.key}].endDate`}
                      mode="future"
                      component={this.renderDatePicker({
                        key: "showEndDatePicker",
                        show: showEndDatePicker
                      })}
                      label="End date"
                      startDate={
                        this.props.workExperience &&
                        this.props.workExperience[this.state.key]
                          ? this.getStartedValue(
                              this.props.workExperience[this.state.key]
                                .startDate
                            )
                          : this.getStartedValue()
                      }
                      yearStep={50}
                    />
                  ) : (
                    <View
                      style={{
                        justifyContent: "flex-end",
                        borderBottomWidth: 0.5,
                        borderBottomColor: colors.grey
                      }}
                    >
                      <Text
                        style={{ color: colors.darkBlack, marginBottom: 5 }}
                      >
                        Present time
                      </Text>
                    </View>
                  )}
                </View>
                {Platform.OS === "ios" ? (
                  <View
                    style={{
                      marginVertical: 20,
                      marginLeft: 10,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Switch
                      style={{ marginRight: 15 }}
                      onValueChange={() => {
                        this.props.dispatch(
                          change(
                            "EditExperiencePage",
                            `workExperience[${this.state.key}].isEndDatePresent`,
                            !this.state.present
                          )
                        );
                        this.setState({
                          present: !this.state.present
                        });
                      }}
                      value={this.state.present}
                    />
                    <Text style={{ color: colors.grey }}>Still working</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      marginVertical: 20,
                      marginLeft: 10,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <CheckBox
                      style={{ color: colors.white }}
                      onValueChange={() => {
                        this.props.dispatch(
                          change(
                            "EditExperiencePage",
                            `workExperience[${this.state.key}].isEndDatePresent`,
                            !this.state.present
                          )
                        );
                        this.setState({
                          present: !this.state.present
                        });
                      }}
                      value={this.state.present}
                    />
                    <Text style={{ color: colors.grey }}>Still working</Text>
                  </View>
                )}
                <Field
                  name={`workExperience[${this.state.key}].summary`}
                  label="Summary"
                  component={Textarea}
                  onFocus={this.hideDatePickers}
                />
              </View>
            </Form>
          )}
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    addWorkExperience: (token, work, onSuccess) =>
      dispatch(addExperience(token, work, onSuccess)),
    patchWorkExperience: (token, workId, work, onSuccess) =>
      dispatch(patchExperience(token, workId, work, onSuccess)),
    trackWorkExperienceAdded: payload =>
      dispatch(trackWorkExperienceAdded(payload)),
    trackWorkExperienceUpdated: payload =>
      dispatch(trackWorkExperienceUpdated(payload))
  };
}

const mapStateToProps = state => ({
  token: state.token.token,
  initialValues: state.user.user,
  workExperience: selector(state, "workExperience")
});

const EditExperienceSwag = reduxForm({
  form: "EditExperience",
  destroyOnUnmount: false,
  initialValues: {
    type: "",
    workExperienceAndEducationKey: null
  },
  validate
})(EditExperiencePage);

export default connect(
  mapStateToProps,
  bindAction
)(EditExperienceSwag);
