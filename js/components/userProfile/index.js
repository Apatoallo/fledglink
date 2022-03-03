import React, { PureComponent } from "react";
import { Container, Content, View, Tabs, Tab, Spinner } from "native-base";
import NameComponent from "./nameComponent";
import PublicDashboard from "./publicDashboard";
import QualitiesList from "./QualitiesList";
import Introduction from "./ProfileTabsContent/About/introduction";
import EducationTab from "./ProfileTabsContent/Education/EducationTab";
import ExperienceTab from "./ProfileTabsContent/Experience/ExperienceTab";
import ProfileHeader from "./Header/ProfileHeader";
import ProfileBody from "./ProfileBody/ProfileBody";
import styles from "../../styles/tabs";

export default class UserProfile extends PureComponent {
  navigationToEdit = viewName => {
    const routeName =
      viewName === "Education" ? "EditEducation" : "EditExperience";
    this.props.navigation.navigate(routeName, { name: viewName });
  };

  navigation = (screen = "EditIntro", type, displayName) => {
    this.props.navigation.navigate(screen, { type, displayName });
  };

  state = {
    enableScrollViewScroll: true
  };

  onEnableScroll = value => {
    this.setState({
      enableScrollViewScroll: value
    });
  };

  render() {
    const {
      user,
      myProfile,
      loading,
      fetchSendRequest,
      navigateToConnectionsList,
      navigation
    } = this.props;
    return (
      <Container
        style={{ backgroundColor: "#fff" }}
        onStartShouldSetResponderCapture={() => this.onEnableScroll(true)}
      >
        <Content scrollEnabled={this.state.enableScrollViewScroll}>
          {loading ? (
            <Spinner />
          ) : (
            <View style={{ flex: 1, width: "100%" }}>
              <ProfileHeader
                showEdit={myProfile}
                user={user}
                editButtonClickHandler={this.navigation}
              />
              <NameComponent
                sendRequest={fetchSendRequest}
                showButtonsConnections={!myProfile}
                fullName={user.fullName}
                education={user.education}
                introLine={user.introLine}
                navigation={this.props.navigation}
                userId={
                  this.props.navigation.state.params &&
                  this.props.navigation.state.params.userId
                }
                connectionStatus={this.props.connectionStatus}
              />
              <PublicDashboard
                connectionsCount={user.connectionsCount}
                profileScore={user.profileScore}
                navigateToConnectionsList={navigateToConnectionsList}
                userId={
                  this.props.navigation.state.params &&
                  this.props.navigation.state.params.userId
                }
              />
              <ProfileBody
                user={user}
                shouldShown={myProfile}
                navigationHandler={this.navigation}
              />
              <Tabs {...styles.tabsStyles}>
                <Tab heading="About" {...styles.tabStyles}>
                  <Introduction
                    showEdit={myProfile}
                    tabLabel="About"
                    name={this.props.name}
                    userName={user.fullName}
                    gender={user.gender}
                    about={user.introduction}
                    achievements={user.achievements}
                    hobbies={user.hobbies}
                    press={name => {
                      if (name === "EditIntro") {
                        this.navigation("EditIntro", "about");
                      } else {
                        this.props.navigation.navigate(name);
                      }
                    }}
                  />
                </Tab>
                <Tab heading="Education" {...styles.tabStyles}>
                  <EducationTab
                    showEdit={myProfile}
                    tabLabel="Education"
                    name="Education"
                    navigation={this.props.navigation}
                    press={() => this.navigationToEdit("Education")}
                    data={user.educationInstitutions}
                    onEnableScroll={this.onEnableScroll}
                    enableScrollViewScroll={this.state.enableScrollViewScroll}
                  />
                </Tab>
                <Tab heading="Experience" {...styles.tabStyles}>
                  <ExperienceTab
                    showEdit={myProfile}
                    name="Work Experience"
                    navigation={this.props.navigation}
                    press={() => this.navigationToEdit("Work Experience")}
                    data={user.workExperience}
                    onEnableScroll={this.onEnableScroll}
                    enableScrollViewScroll={this.state.enableScrollViewScroll}
                  />
                </Tab>
              </Tabs>
              <View style={{ padding: 10 }}>
                <QualitiesList
                  qualities={user.qualities}
                  userId={user.id}
                  navigation={navigation}
                  myProfile={myProfile}
                />
              </View>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}
