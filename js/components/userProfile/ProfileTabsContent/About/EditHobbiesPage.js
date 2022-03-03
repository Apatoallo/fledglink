import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Content,
  Container,
  Text,
  Icon,
  Input,
  Item,
  Label
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Field, reduxForm, reset } from "redux-form";
import FirebaseAnalytics from "../../../../Services/FirebaseAnalytics";
import { addHobby, deleteHobby } from "../../../../actions/user";
import Chip from "./Chip";
import DeleteButton from "./ChipDeleteButton";

const editHobbiesPage = StyleSheet.create({
  chipsContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

class EditHobbiesPage extends Component {
  static propTypes = {
    submit: PropTypes.func
  };

  componentDidMount = () => {
    FirebaseAnalytics.setCurrentScreen("EditHobbiesPage", "Profile");
  };

  submit = values => {
    const { addHobby, token, resetForm } = this.props;
    addHobby(token, values);
    resetForm();
  };

  deleteHobbyHandler = hobbyId => {
    const { deleteHobby, token } = this.props;
    deleteHobby(token, hobbyId);
  };

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 30 }}>
        <Item
          style={{ borderBottomColor: "#929299", borderBottomWidth: 0.5 }}
          floatingLabel
        >
          <Label style={{ fontSize: 15, color: "#929299" }}>{label}</Label>
          <Input style={{ paddingLeft: 0 }} {...input} />
        </Item>
      </View>
    );
  }

  render() {
    const { handleSubmit, hobbies } = this.props;
    return (
      <Container style={{ backgroundColor: "white" }}>
        <Content>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <View style={{ width: "85%" }}>
              <Field
                name="name"
                label="Hobbies and Interests"
                component={this.renderInput}
              />
            </View>
            <TouchableOpacity
              onPress={handleSubmit(this.submit.bind(this))}
              style={{ width: "15%", alignItems: "center" }}
            >
              <Icon name="plus" type="Feather" style={{ color: "#929299" }} />
            </TouchableOpacity>
          </View>
          <View style={editHobbiesPage.chipsContainer}>
            {hobbies.length ? (
              hobbies.map(hobby => (
                <Chip
                  key={hobby.id}
                  hobbyId={hobby.id}
                  text={hobby.name}
                  deleteButtonHandler={this.deleteHobbyHandler}
                  DeleteButton={DeleteButton}
                />
              ))
            ) : (
              <Text>You have added no hobbies</Text>
            )}
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token.token,
  hobbies: state.user.user.hobbies
});

function bindAction(dispatch) {
  return {
    resetForm: () => dispatch(reset("EditHobbiesPage")),
    addHobby: (token, hobby) => dispatch(addHobby(token, hobby)),
    deleteHobby: (token, hobbyId) => dispatch(deleteHobby(token, hobbyId))
  };
}

const EditHobbiesSwag = reduxForm({
  form: "EditHobbiesPage"
})(EditHobbiesPage);

export default connect(
  mapStateToProps,
  bindAction
)(EditHobbiesSwag);
