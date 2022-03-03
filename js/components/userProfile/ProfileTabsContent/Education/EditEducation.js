import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, List } from "native-base";
import { deleteEducation } from "../../../../actions/user";
import ListComponent from "../About/ListComponent";
import withSwipeable from "../../../HOCComponents/WithSwipeable";
import withEdit from "../../../HOCComponents/WithEdit";
import EducationListItem from "./EducationListItem";
import AddNewItemButton from "../AddNewItemButton";

function bindAction(dispatch) {
  return {
    deleteItemHandler: (token, userId, itemId) =>
      dispatch(deleteEducation(token, userId, itemId))
  };
}
const mapStateToProps = state => ({
  token: state.token.token,
  userId: state.user.user.id,
  user: state.user.user
});

const EducationListContainerItemWithEditAndSwipeable = connect(
  mapStateToProps,
  bindAction
)(withSwipeable(withEdit(EducationListItem)));

class EditEducation extends Component {
  editEducation = routeParams => {
    const { navigation } = this.props;
    navigation.navigate("EditEducationPage", {
      name: "Edit Education",
      type: "education",
      ...routeParams
    });
  };

  addEducation = () => {
    const { navigation, user } = this.props;
    navigation.navigate("EditEducationPage", {
      name: "Add Education",
      type: "education",
      key: user.educationInstitutions.length
    });
  };

  render() {
    const { navigation, user } = this.props;
    return (
      <Container style={{ backgroundColor: "#fff", paddingBottom: 20 }}>
        <Content>
          <List>
            <ListComponent
              ListItemComponent={EducationListContainerItemWithEditAndSwipeable}
              editClickHandler={this.editEducation}
              navigation={navigation}
              dataArray={user.educationInstitutions}
            />
          </List>
          <AddNewItemButton
            clickHandler={this.addEducation}
            text="ADD NEW DETAILS"
          />
        </Content>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  bindAction
)(EditEducation);
