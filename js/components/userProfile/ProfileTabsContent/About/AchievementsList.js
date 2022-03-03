import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Content, List } from "native-base";
import { deleteAchievement } from "../../../../actions/user";
import PropTypes from "prop-types";
import ListComponent from "./ListComponent";
import AchievementsListComponentItem from "./AchievementsListComponentItem";
import withEdit from "../../../HOCComponents/WithEdit";
import withSwipeable from "../../../HOCComponents/WithSwipeable";
import AddNewItemButton from "../AddNewItemButton";

const mapStateToProps = state => ({
  token: state.token.token,
  userId: state.user.user.id,
  user: state.user.user
});

function bindAction(dispatch) {
  return {
    deleteItemHandler: (token, userId, achievementId) =>
      dispatch(deleteAchievement(token, userId, achievementId))
  };
}

const AchievementslistContainerItemWithEditAndSwipeable = connect(
  mapStateToProps,
  bindAction
)(withSwipeable(withEdit(AchievementsListComponentItem)));

class AchievementsList extends Component {
  static propTypes = {
    achievements: PropTypes.object
  };

  addAchievements = () => {
    const { user, navigation } = this.props;
    navigation.navigate("EditAchievementPage", {
      key: user.achievements.length,
      name: "Add achievements"
    });
  };

  editAchievement = routeParams => {
    const { navigation } = this.props;
    navigation.navigate("EditAchievementPage", {
      name: "Edit Achievement",
      ...routeParams
    });
  };

  render() {
    const { user, navigation } = this.props;
    return (
      <Container style={{ backgroundColor: "white" }}>
        <Content>
          <List>
            <ListComponent
              ListItemComponent={
                AchievementslistContainerItemWithEditAndSwipeable
              }
              editClickHandler={this.editAchievement}
              navigation={navigation}
              dataArray={user.achievements}
            />
          </List>
          <AddNewItemButton
            clickHandler={this.addAchievements}
            text="ADD NEW ACHIEVEMENT"
          />
        </Content>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  bindAction
)(AchievementsList);
