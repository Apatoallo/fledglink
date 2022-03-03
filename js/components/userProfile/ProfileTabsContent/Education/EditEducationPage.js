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
import { Dimensions, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { addEducation, patchEducation } from "../../../../actions/user";
import {
  trackEducationAdded,
  trackEducationUpdated
} from "../../../../actions/analytics";
import { mapperSelect } from "../../../../utils/maper";
import { colors } from "../../../../configs/config";
import DatePicker from "../../../createProfile/datePicker";
import Select from "../../../FormComponents/Select";
import FirebaseAnalytics from "../../../../Services/FirebaseAnalytics";

const { width } = Dimensions.get("window");
const selector = formValueSelector("EditEducationPage");

class EditEducationPage extends Component {
  static navigationOptions = {
    header: null
  };

  static propTypes = {
    userOptions: PropTypes.object,
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
          <Text style={{ color: "#fff" }}>Save</Text>
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
      showEndDatePicker: false
    };
  }

  componentDidMount = () => {
    const { navigation, handleSubmit, submitting, invalid } = this.props;

    this.props.dispatch(change("EditEducationPage", "type", this.state.type));
    this.props.dispatch(
      change(
        "EditEducationPage",
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

  componentWillUnmount() {
    this.hideDatePickers();
  }

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
      <View style={{ marginBottom: 20 }}>
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
            <Text style={[styles.text, { fontSize: 15, color: colors.red }]}>
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
          width: width / 3,
          borderBottomWidth: 0.5,
          borderBottomColor: colors.grey,
          marginVertical: 10
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
      addEducation,
      patchEducation,
      trackEducationAdded,
      trackEducationUpdated
    } = this.props;
    const { data, key, present } = this.state;
    const body = {
      ...values.educationInstitutions[key],
      isEndDatePresent: present
    };

    if (data) {
      patchEducation(token, data.id, body, navigation.goBack);
      trackEducationUpdated(body);
    } else {
      addEducation(token, body, navigation.goBack);
      trackEducationAdded(body);
    }
  };

  render() {
    const { userOptions } = this.props;
    const { showStartDatePicker, showEndDatePicker } = this.state;
    return (
      <Container style={{ backgroundColor: "#fff", paddingBottom: 20 }}>
        <Content padder>
          <Form>
            <View>
              {Object.keys(userOptions).length > 0 ? (
                <View style={{ marginHorizontal: 10 }}>
                  <Field
                    name={`educationInstitutions[${this.state.key}].name`}
                    label="School / College / University"
                    component={this.renderInput}
                    onFocus={this.hideDatePickers}
                  />
                  <Field
                    name={`educationInstitutions[${this.state.key}].courses`}
                    label="Course(s)"
                    component={this.renderInput}
                    onFocus={this.hideDatePickers}
                  />
                  <Field
                    name={`educationInstitutions[${this.state.key}].studying`}
                    label="Studying"
                    component={Select}
                    data={userOptions.education.map(mapperSelect)}
                    onFocus={this.hideDatePickers}
                  />
                  <Field
                    name={`educationInstitutions[${this.state.key}].grade`}
                    label="Grade(s)"
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
                      name={`educationInstitutions[${this.state.key}].startDate`}
                      mode="past"
                      component={this.renderDatePicker({
                        key: "showStartDatePicker",
                        show: showStartDatePicker
                      })}
                      label="Start date"
                      startDate={this.getStartedValue()}
                      yearStep={50}
                    />
                    <Field
                      name={`educationInstitutions[${this.state.key}].endDate`}
                      mode="future"
                      component={this.renderDatePicker({
                        key: "showEndDatePicker",
                        show: showEndDatePicker
                      })}
                      label="End date"
                      startDate={
                        this.props.education &&
                        this.props.education[this.state.key]
                          ? this.getStartedValue(
                              this.props.education[this.state.key].startDate
                            )
                          : this.getStartedValue()
                      }
                      yearStep={50}
                    />
                  </View>
                </View>
              ) : (
                <Spinner />
              )}
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}
function bindAction(dispatch) {
  return {
    addEducation: (token, education, onSuccess) =>
      dispatch(addEducation(token, education, onSuccess)),
    patchEducation: (token, educationId, education, onSuccess) =>
      dispatch(patchEducation(token, educationId, education, onSuccess)),
    trackEducationAdded: payload => dispatch(trackEducationAdded(payload)),
    trackEducationUpdated: payload => dispatch(trackEducationUpdated(payload))
  };
}
const mapStateToProps = state => ({
  token: state.token.token,
  userOptions: state.userOptions.userOptionsList,
  initialValues: state.user.user,
  education: selector(state, "educationInstitutions")
});

const EditEducationSwag = reduxForm({
  form: "EditEducation",
  destroyOnUnmount: false,
  initialValues: {
    type: "",
    workExperienceAndEducationKey: null
  }
})(EditEducationPage);

export default connect(
  mapStateToProps,
  bindAction
)(EditEducationSwag);
