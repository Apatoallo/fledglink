import React, { Component } from "react";
import { View, Text } from "native-base";
import { StyleSheet, Keyboard } from "react-native";
import { SimpleAnimation } from "react-native-simple-animations";
import PropTypes from "prop-types";
import LoginInput from "../../../shared/validateInput";
import AuthButton from "../../../shared/authButton";
import { colors, fonts } from "../../../configs/config";

import inputWithIconComponent from "../../../components/HOCComponents/InputComponentWithIcon";
import ValidateInput from "../../../shared/validateInput";

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 20
  },
  statusBar: {
    alignItems: "stretch",
    marginBottom: 10,
    height: 12,
    backgroundColor: colors.gallery
  },
  terms: {
    marginTop: 20,
    marginBottom: 20
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 20,
    color: colors.grey,
    fontFamily: fonts.regular
  },
  link: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.violet
  },
  hint: {
    marginTop: 20,
    padding: 20,
    paddingBottom: 0,
    backgroundColor: colors.darkViolet
  },
  hintText: {
    marginBottom: 20,
    fontSize: 12,
    color: colors.white
  },
  smallHint: {
    marginVertical: 10,
    fontSize: 10,
    color: colors.violet
  }
});

const errors = {
  fullName: "Please enter a valid full name.",
  email: "Please enter a valid email address.",
  password: "Password must contain at least 8 characters.",
  referralCode: "Referral code must not contain spaces."
};

const Password = inputWithIconComponent(ValidateInput);

const config = {
  text: {
    type: "text",
    icon: "eye-off"
  },
  password: {
    type: "password",
    icon: "eye"
  }
};

export default class RegistrationForm extends Component {
  state = {
    fields: {
      email: {
        value: "",
        valid: false,
        focus: false
      },
      fullName: {
        value: "",
        valid: false,
        focus: false
      },
      password: {
        value: "",
        valid: false,
        focus: false
      },
      referralCode: {
        value: "",
        valid: true,
        focus: false
      }
    },
    passwordConfig: config.password
  };

  onChange = (key, value, valid) => {
    this.setState(state => {
      return {
        fields: {
          ...state.fields,
          [key]: {
            ...state.fields[key],
            value,
            valid
          }
        }
      };
    });
  };

  onChangePasswordType = () => {
    this.setState(state => {
      if (state.passwordConfig.type === "password") {
        return {
          passwordConfig: config.text
        };
      }

      return {
        passwordConfig: config.password
      };
    });
  };

  onFocus = key =>
    this.setState(state => {
      return {
        fields: {
          ...state.fields,
          [key]: {
            ...state.fields[key],
            focus: true
          }
        }
      };
    });

  onBlur = key =>
    this.setState(state => {
      return {
        fields: {
          ...state.fields,
          [key]: {
            ...state.fields[key],
            focus: false
          }
        }
      };
    });

  onPasswordFocus = () => this.setState({ passwordConfig: config.text });

  onPasswordBlur = () => this.setState({ passwordConfig: config.password });

  onSubmitEditing = field => this.inputs[field]._root.focus();

  getRef = (ref, field) => (this.inputs = { ...this.inputs, [field]: ref });

  showTerms = key => {
    const { navigate } = this.props;

    const options = {
      terms: {
        name: "Terms and Conditions",
        url:
          "https://fledglink-staging.ams3.digitaloceanspaces.com/terms_and_conditions/Fledglink%20-%20Consumer%20Terms.pdf"
      },
      data: {
        name: "Data Policy",
        url:
          "https://fledglink-staging.ams3.digitaloceanspaces.com/terms_and_conditions/Fledglink%20-%20App%20Privacy%20Notice.pdf"
      }
    };

    navigate("ResultPDF", { accessing: true, ...options[key] });
  };

  submit = () => {
    const { fields } = this.state;
    const { email, fullName, password, referralCode } = fields;
    const { registration } = this.props;

    registration(
      email.value,
      password.value,
      fullName.value,
      referralCode.value
    );
  };

  render() {
    const { fields, passwordConfig } = this.state;
    const { loading } = this.props;
    const validateForm =
      fields.fullName.valid &&
      fields.email.valid &&
      fields.password.valid &&
      fields.referralCode.valid;

    return (
      <View>
        <View style={styles.inputWrapper}>
          <LoginInput
            getRef={ref => this.getRef(ref, "fullName")}
            error={errors.fullName}
            validateTest={new RegExp(/^([a-zA-Z0-9\-\_ ]{1,})$/)}
            onChangeText={(value, valid) =>
              this.onChange("fullName", value, valid)
            }
            onFocus={() => this.onFocus("fullName")}
            onBlur={() => this.onBlur("fullName")}
            activeColor="rgb(60, 3, 85)"
            onSubmitEditing={() => this.onSubmitEditing("email")}
            autoCapitalize="words"
            returnKeyType="next"
            inactiveColor="rgb(146, 146, 146)"
            label="Full Name"
          />
          {fields.fullName.focus && (
            <SimpleAnimation
              delay={150}
              duration={600}
              aim={"in"}
              fade
              movementType="slide"
            >
              <View style={styles.hint}>
                <Text style={styles.hintText}>
                  You are going to be introducing yourself to professional
                  contacts, so no nicknames.
                </Text>
              </View>
            </SimpleAnimation>
          )}
        </View>
        <View style={styles.inputWrapper}>
          <LoginInput
            getRef={ref => this.getRef(ref, "email")}
            error={errors.email}
            validateTest={
              new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/)
            }
            onChangeText={(value, valid) =>
              this.onChange("email", value, valid)
            }
            onFocus={() => this.onFocus("email")}
            onBlur={() => this.onBlur("email")}
            onSubmitEditing={() => this.onSubmitEditing("password")}
            returnKeyType="next"
            activeColor="rgb(60, 3, 85)"
            inactiveColor="rgb(146, 146, 146)"
            label="Email"
            type="email"
          />
          {fields.email.focus && (
            <SimpleAnimation
              delay={150}
              duration={600}
              aim={"in"}
              fade
              movementType="slide"
            >
              <View style={styles.hint}>
                <Text style={styles.hintText}>
                  Please use the email address you check most regularly so you
                  can reset your password later if needed
                </Text>
              </View>
            </SimpleAnimation>
          )}
        </View>
        <View style={styles.inputWrapper}>
          <Password
            getRef={ref => this.getRef(ref, "password")}
            error={errors.password}
            validateTest={new RegExp(/^(?=.{8,})/)}
            onChangeText={(value, valid) =>
              this.onChange("password", value, valid)
            }
            onChangeInputType={this.onChangePasswordType}
            onFocus={() => {
              this.onFocus("password");
              this.onPasswordFocus();
            }}
            onBlur={() => {
              this.onBlur("password");
              this.onPasswordBlur();
            }}
            onSubmitEditing={() => this.onSubmitEditing("password")}
            returnKeyType="done"
            activeColor="rgb(60, 3, 85)"
            inactiveColor="rgb(146, 146, 146)"
            label="Password"
            type={passwordConfig.type}
            iconName={passwordConfig.icon}
          />
          {fields.password.focus && (
            <SimpleAnimation
              delay={150}
              duration={300}
              aim={"in"}
              fade
              movementType="slide"
            >
              <View style={styles.hint}>
                <Text style={styles.hintText}>
                  Your password must be a minimum of 8 characters.{" "}
                </Text>
                <Text style={styles.hintText}>
                  Stay safe – we'd suggest using a mixture of numbers, capitals
                  and lowercase letters so it can't easily be guessed!
                </Text>
              </View>
            </SimpleAnimation>
          )}
        </View>
        <View style={styles.inputWrapper}>
          <LoginInput
            getRef={ref => this.getRef(ref, "referralCode")}
            error={errors.referralCode}
            validateTest={new RegExp(/^\S*$/)}
            onChangeText={(value, valid) =>
              this.onChange("referralCode", value, valid)
            }
            onFocus={() => this.onFocus("referralCode")}
            onBlur={() => this.onBlur("referralCode")}
            activeColor="rgb(60, 3, 85)"
            onSubmitEditing={Keyboard.dismiss}
            autoCapitalize="characters"
            returnKeyType="next"
            inactiveColor="rgb(146, 146, 146)"
            label="Referral code"
          />
          <Text style={styles.smallHint}>
            If you don’t have a code, leave this blank
          </Text>
        </View>
        <View style={styles.terms}>
          <Text style={styles.paragraph}>
            By clicking the button below you are confirming that you are over
            the age of 13, have read and accepted our{" "}
            <Text onPress={() => this.showTerms("terms")} style={styles.link}>
              terms and conditions
            </Text>{" "}
            and acknowledge our{" "}
            <Text onPress={() => this.showTerms("data")} style={styles.link}>
              privacy notice
            </Text>
            .
          </Text>
        </View>
        <View>
          <AuthButton
            loading={loading}
            textButton="Get started"
            isDisable={!validateForm}
            pressButton={this.submit}
          />
        </View>
      </View>
    );
  }
}

RegistrationForm.propTypes = {
  registration: PropTypes.func
};
