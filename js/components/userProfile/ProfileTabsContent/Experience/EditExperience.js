import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, Text, List } from "native-base";
import { deleteExperience } from "../../../../actions/user";
import ListComponent from "../About/ListComponent";
import withSwipeable from "../../../HOCComponents/WithSwipeable";
import withEdit from "../../../HOCComponents/WithEdit";
import ExperienceListItem from "./ExperienceListItem";
import AddNewItemButton from "../AddNewItemButton";

function bindAction(dispatch) {
  return {
    deleteItemHandler: (token, userId, itemId) =>
      dispatch(deleteExperience(token, userId, itemId))
  };
}
const mapStateToProps = state => ({
  token: state.token.token,
  userId: state.user.user.id,
  user: state.user.user
});

const ExperienceListContainerItemWithEditAndSwipeable = connect(
  mapStateToProps,
  bindAction
)(withSwipeable(withEdit(ExperienceListItem)));

class EditExperience extends Component {
  editExperience = routeParams => {
    const { navigation } = this.props;
    navigation.navigate("EditExperiencePage", {
      name: "Edit Work Experience",
      type: "experience",
      ...routeParams
    });
  };

  addExperience = () => {
    const { navigation, user } = this.props;
    navigation.navigate("EditExperiencePage", {
      name: "Add Work Experience",
      type: "experience",
      key: user.workExperience.length
    });
  };

  render() {
    const { navigation, user } = this.props;
    return (
      <Container style={{ backgroundColor: "#fff", paddingBottom: 20 }}>
        <Content>
          <Text style={{ margin: 15 }}>
            To delete an item, swipe it to the left
          </Text>
          <List>
            <ListComponent
              ListItemComponent={
                ExperienceListContainerItemWithEditAndSwipeable
              }
              editClickHandler={this.editExperience}
              navigation={navigation}
              dataArray={user.workExperience}
            />
          </List>
          <AddNewItemButton
            clickHandler={this.addExperience}
            text="ADD NEW ROLE"
          />
        </Content>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  bindAction
)(EditExperience);
