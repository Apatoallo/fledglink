

import React from "react";
import { NativeBaseProvider } from "native-base";
import { Platform, Modal, Dimensions, ImageBackground } from "react-native";
import { View, Text, Spinner } from "native-base";

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import { authTypes } from "../configs/config";
import Landing from "../components/landing";
import Login from "../components/login";
import SignUp from "../components/signUp";
import DescriptionTest from "../components/descriptionTest";
import EditIntro from "../components/EditIntro/EditIntro";
import EditEducationPage from "../components/userProfile/ProfileTabsContent/Education/EditEducationPage";
import EditExperiencePage from "../components/userProfile/ProfileTabsContent/Experience/EditExperiencePage";
import { TabNav } from "./HomeDrawerRouter";
import PersonalityTest from "../components/personalityTest";
import ResultPage from "../components/resultPage";
import ResultPDF from "../components/resultPDF";
import PersonalityActivity from "../components/personalityActivity";
import CompanyProfile from "../components/companyProfile/CompanyProfile";
import DiversityCategories from "../components/DiversityCategories";
import ChangePassword from "../components/ChangePassword";
import OpportunityPage from "../components/OpportunityPage/OpportunityPage";
import Event from "../components/EventPage";
import CloseAccount from "../components/closeAccount";
import ApplicationComplete from "../components/Opportunity/OpportunitiesTab/ApplicationComplete";
import EditAchievementPage from "../components/userProfile/ProfileTabsContent/About/EditAchievementPage";
import AchievementsList from "../components/userProfile/ProfileTabsContent/About/AchievementsList";
import ForgotPassword from "../components/forgotPassword";
import EditHobbiesPage from "../components/userProfile/ProfileTabsContent/About/EditHobbiesPage";
import PostComponent from "../components/PostComponent/PostComponent";
import ResourceView from "../components/ResourceView/ResourceView";
import NotificationsScreen from "../components/notification";
import SettingsPage from "../components/SettingsPage";
import FilterNewsItems from "../components/FilterNewsItems";
import SearchPage from "../components/SearchPage/SearchPage";
import AddCompany from "../components/PostComponent/AddToPost/AddCompany";
import AddResource from "../components/PostComponent/AddToPost/AddResource";
import AddOpportunity from "../components/PostComponent/AddToPost/AddOpportunity";
import AddUserMention from "../components/PostComponent/AddToPost/AddUserMention";
import ConnectionsProfile from "../components/connectionsProfile";
import UserActionsPage from "../components/UserActionsPage/UserActionsPage";
import EditEducation from "../components/userProfile/ProfileTabsContent/Education/EditEducation";
import EditExperience from "../components/userProfile/ProfileTabsContent/Experience/EditExperience";
import ProfileSetup from "../components/profileSetup";
import CreateProfile from "../components/createProfile";
import FlAnnounceNotification from "../components/flAnnounceNotification";
import ConnectionCreate from "../components/connectionCreate";
import BoostQualities from "../components/BoostQualities";
import WebViewBrowser from "../shared/WebViewBrowser/WebViewBrowser";
import WorkDetailedInformation from "../shared/WorkDetailedInformation";
import { colors, fonts } from "../configs/config";

import Header from "./Headers";

const { height, width } = Dimensions.get("window");
const backgroundModal = require("../../images/loadingBG.png");

const screenInterpolator = props => {
  const { layout, position, scene } = props;

  const index = scene.index;

  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [layout.initWidth, 0, 0]
  });

  const opacity = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.3, 1, 0]
  });

  return {
    opacity,
    transform: [{ translateX }]
  };
};

const navigationOptions = {
  header: props => <Header.Default {...props} />,
  headerTitleStyle: { color: colors.white, fontFamily: fonts.bold },
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    elevation: 0
  },
  headerBackTitle: null
};



const StackNav = props => {
    const ProfileSetupStackNav = createStackNavigator({
      ProfileSetUp: {
        screen: ProfileSetup,
        navigationOptions: {
          header: null
        }
      },
      CreateProfile: {
        screen: CreateProfile,
        navigationOptions: {
          header: null
        }
      }
    });
  
    const MainStackNav = createStackNavigator(
      {
        Home: {
          screen: TabNav,
          key: "tabs",
          navigationOptions: {
            header: null
          },
          path: "tabs"
        },
        EditIntro: {
          screen: EditIntro,
          navigationOptions: {
            title: "Edit Profile",
            ...navigationOptions
          }
        },
        EditAchievementPage: {
          screen: EditAchievementPage,
          navigationOptions: {
            ...navigationOptions
          }
        },
        PostComponent: {
          screen: PostComponent,
          navigationOptions: {
            title: "Share an update or idea",
            ...navigationOptions
          }
        },
        AchievementsList: {
          screen: AchievementsList,
          navigationOptions: {
            title: "Achievements",
            ...navigationOptions
          }
        },
        NotificationsScreen: {
          screen: NotificationStack,
          navigationOptions: {
            header: null
          }
        },
        SettingsPage: {
          screen: SettingsPage,
          navigationOptions: {
            title: "Settings",
            ...navigationOptions
          }
        },
        FilterNewsItems: {
          screen: FilterNewsItems,
          navigationOptions: {
            title: "Feed Settings",
            ...navigationOptions
          },
          path: "feed-settings"
        },
        ResourceView: {
          screen: ResourceView,
          path: "res/:id",
          navigationOptions: {
            headerTransparent: true,
            headerTintColor: "#fff",
            headerStyle: {
              borderBottomColor: "transparent",
              elevation: 0,
              backgroundColor: "transparent"
            }
          }
        },
        EditEducationPage: {
          screen: EditEducationPage,
          navigationOptions: {
            ...navigationOptions
          }
        },
        EditExperiencePage: {
          screen: EditExperiencePage,
          navigationOptions: {
            ...navigationOptions
          }
        },
        EditExperience: {
          screen: EditExperience,
          navigationOptions: {
            title: "Experience",
            ...navigationOptions
          }
        },
        EditEducation: {
          screen: EditEducation,
          navigationOptions: {
            title: "Education",
            ...navigationOptions
          }
        },
        DescriptionTest: {
          screen: DescriptionTest,
          path: "assessment/personality-questionnaire"
          // Header is controlled inline
        },
        PersonalityTest: {
          screen: PersonalityTest,
          navigationOptions: {
            header: null
          }
        },
        EditHobbiesPage: {
          screen: EditHobbiesPage,
          navigationOptions: {
            title: "Edit Hobbies",
            ...navigationOptions
          }
        },
        WorkDetailedInformation: {
          screen: WorkDetailedInformation,
          navigationOptions: {
            ...navigationOptions
          }
        },
        AddCompany: {
          screen: AddCompany,
          navigationOptions: {
            title: "Corporations",
            ...navigationOptions
          }
        },
        AddResource: {
          screen: AddResource,
          navigationOptions: {
            title: "Resources",
            ...navigationOptions
          }
        },
        AddOpportunity: {
          screen: AddOpportunity,
          navigationOptions: {
            title: "Opportunities",
            ...navigationOptions
          }
        },
        AddUserMention: {
          screen: AddUserMention,
          navigationOptions: {
            title: "Mentions",
            ...navigationOptions
          }
        },
        CloseAccount: {
          screen: CloseAccount,
          navigationOptions: {
            title: "Close Account",
            ...navigationOptions
          }
        },
        ResultPage: {
          screen: ResultPage,
          navigationOptions: {
            title: "Your Score"
          }
        },
        ChangePassword: {
          screen: ChangePassword,
          navigationOptions: {
            title: "Update Password",
            ...navigationOptions
          }
        },
        ApplicationComplete: {
          screen: ApplicationComplete,
          navigationOptions: {
            header: null
          }
        },
        ResultPDF: {
          screen: ResultPDF,
          navigationOptions: {
            ...navigationOptions
          }
        },
        PersonalityActivity: {
          screen: PersonalityActivity
        },
        OpportunityPage: {
          screen: OpportunityPage,
          path: "opportunity/:id",
          navigationOptions: {
            headerTransparent: true,
            headerTintColor: "#fff",
            headerStyle: {
              borderBottomColor: "transparent",
              elevation: 0,
              backgroundColor: "transparent"
            }
          }
        },
        Event: {
          screen: Event,
          path: "event/:id",
          navigationOptions: {
            headerTransparent: true,
            headerTintColor: "#fff",
            headerStyle: {
              borderBottomColor: "transparent",
              elevation: 0,
              backgroundColor: "transparent"
            }
          }
        },
        CompanyProfile: {
          screen: CompanyProfile,
          path: "company/:id",
          navigationOptions: {
            headerTransparent: true,
            headerTintColor: "#fff",
            headerStyle: {
              borderBottomColor: "transparent",
              elevation: 0,
              backgroundColor: "transparent"
            }
          }
        },
        DiversityCategories: {
          screen: DiversityCategories,
          navigationOptions: {
            title: "Diversity Categories",
            ...navigationOptions
          }
        },
        WebViewBrowser: {
          screen: WebViewBrowser
          // Header is controlled inline
        },
        SearchPage: {
          screen: SearchPage,
          navigationOptions: {
            headerTitleStyle: { color: "#fff" },
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "transparent"
            },
            headerBackTitle: null
          }
        },
        ConnectionCreate: {
          screen: ConnectionStack,
          navigationOptions: {
            header: null
          }
        },
        UserActionsPage: {
          screen: UserActionsPage,
          navigationOptions: {
            ...navigationOptions
          }
        },
        BoostQualities: {
          screen: BoostQualities,
          navigationOptions: {
            title: "Boost Your Qualities",
            ...navigationOptions
          }
        }
      },
      {
        mode: "card",
        headerMode: "screen",
        headerBackTitleVisible: false,
        initialRouteName: props.initialRoute,
        cardStyle: { backgroundColor: "transparent", shadowColor: "transparent" },
        transitionConfig: () => ({
          containerStyle: {
            backgroundColor: "transparent"
          },
          screenInterpolator: props => screenInterpolator(props)
        })
      }
    );
    return props.profileSetUp ? <MainStackNav /> : <ProfileSetupStackNav />;
  };
  