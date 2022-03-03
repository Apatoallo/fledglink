import React from "react";
import BrandIcon from "../components/BrandIcon";
import {
  createStackNavigator  
} from "react-navigation-stack";
import { createAppContainer } from "@react-navigation/native"
import {
  createBottomTabNavigator,
} from "react-navigation-tabs";

import mainHome from "../components/mainhome/mainHome";
import Grow from "../components/Grow/Grow";
import MyProfile from "../components/myProfile";
import Opportunity from "../components/Opportunity/Opportunity";
import ConnectionsProfile from "../components/connectionsProfile";
import Saved from "../components/Opportunity/OpportunitiesTab/saved";
import Applied from "../components/Opportunity/OpportunitiesTab/applied";
import MyNetwork from "../components/MyNetwork/Network";
import ConnectionsListSelf from "../components/connectionsListSelf";
import ConnectionsListOtherUser from "../components/connectionsListOtherUser";
import PendingConnectionList from "../components/pendingConnectionsList";
import FilterOpportunities from "../components/opportunityFilters/FilterOpportunities";
import FilterOptions from "../components/opportunityFilters/FilterOptions";
import FilterEvents from "../components/eventsFilters/FilterEvents";
import FilterEventsOptions from "../components/eventsFilters/FilterEventsOptions";
import UserSearch from "../components/addConnections";
import PeopleNear from "../components/MyNetwork/PeopleNear";
import { colors, fonts } from "../configs/config";

import Header from "./Headers";

const navigationOptions = {
  header: props => <Header.Default {...props} />,
  headerTitleStyle: { color: colors.white, fontFamily: fonts.bold },
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: "transparent"
  },
  headerBackTitle: null
};

const StackNav = createStackNavigator(
{
    Home: {
      screen: mainHome,
      navigationOptions: {
        header: props => <Header.Notification {...props} />,
        headerTitleStyle: { color: "#fff" },
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "transparent"
        },
        headerBackTitle: null
      },
      defaultParams: {
        visible: true
      }
    },
    UserProfile: {
      screen: MyProfile,
      navigationOptions: {
        header: null
      }
    },
    UserDetails: {
      screen: ConnectionsProfile,
      navigationOptions: {
        header: null
      }
    },
    ConnectionsListSelf: {
      screen: ConnectionsListSelf,
      navigationOptions: {
        title: "My Connections List",
        ...navigationOptions
      }
    },
    ConnectionsListOtherUser: {
      screen: ConnectionsListOtherUser,
      navigationOptions: {
        title: "Connections List",
        ...navigationOptions
      }
    },
    ShowConnectionUserProfile: {
      screen: ConnectionsProfile,
      navigationOptions: {
        header: null
      }
    },
    SearchInApp: {
      screen: UserSearch,
      navigationOptions: {
        title: "Connections Search",
        ...navigationOptions
      }
    }
  },
  {
    headerBackTitleVisible: false,
    headerMode: "screen"
  }
);

const NetworkStack = createStackNavigator(
  {
    Network: {
      screen: MyNetwork,
      navigationOptions: {
        header: props => <Header.Notification {...props} />,
        headerTitleStyle: { color: "#fff" },
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "transparent"
        },
        headerBackTitle: null
      },
      defaultParams: {
        visible: true
      }
    },
    UserDetails: {
      screen: ConnectionsProfile,
      navigationOptions: {
        title: "User Profile",
        ...navigationOptions
      }
    },
    ConnectionsListSelf: {
      screen: ConnectionsListSelf,
      navigationOptions: {
        title: "My Connections List",
        ...navigationOptions
      }
    },
    ConnectionsListOtherUser: {
      screen: ConnectionsListOtherUser,
      navigationOptions: {
        title: "Connections List",
        ...navigationOptions
      }
    },
    PendingConnections: {
      screen: PendingConnectionList,
      navigationOptions: {
        title: "Pending Invitations",
        ...navigationOptions
      }
    },
    PeopleNear: {
      screen: PeopleNear,
      navigationOptions: {
        title: "People Near Me",
        ...navigationOptions
      }
    },
    UserSearch: {
      screen: UserSearch,
      navigationOptions: {
        title: "Connections Search",
        ...navigationOptions
      }
    }
  },
  {
    headerBackTitleVisible: false,
    headerMode: "screen"
  }
);

const OpportunityStack = createStackNavigator(
  {
    Opportunity: {
      screen: Opportunity,
      navigationOptions: {
        header: props => <Header.Notification {...props} />,
        headerTitleStyle: { color: "#fff" },
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "transparent"
        },
        headerBackTitle: null
      },
      path: "opportunity/:tab"
    },
    Saved: {
      screen: Saved,
      navigationOptions: {
        title: "Saved",
        ...navigationOptions
      }
    },
    Applied: {
      screen: Applied,
      navigationOptions: {
        title: "Applied",
        ...navigationOptions
      }
    },
    FilterOpportunities: {
      screen: FilterOpportunities,
      navigationOptions: {
        title: "Filter Opportunities",
        ...navigationOptions
      }
    },
    FilterOptions: {
      screen: FilterOptions,
      navigationOptions: {
        title: "Add New Filter",
        ...navigationOptions
      }
    },
    FilterEvents: {
      screen: FilterEvents,
      navigationOptions: {
        title: "Filter Events",
        ...navigationOptions
      }
    },
    FilterEventsOptions: {
      screen: FilterEventsOptions,
      navigationOptions: {
        title: "Add New Filter",
        ...navigationOptions
      }
    }
  },
  {
    headerBackTitleVisible: false,
    headerMode: "screen"
  }
);

const GrowStack = createStackNavigator(
  {
    Grow: {
      screen: Grow,
      navigationOptions: {
        header: props => <Header.Notification {...props} />,
        headerTitleStyle: { color: "#fff" },
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "transparent"
        },
        headerBackTitle: null
      }
    }
  },
  {
    headerBackTitleVisible: false,
    headerMode: "screen"
  }
);

const ProfileStack = createStackNavigator(
  {
    MyProfile: {
      screen: MyProfile,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    headerBackTitleVisible: false,
    headerMode: "screen"
  }
);

const TabNav = createBottomTabNavigator(
  {
    Home: {
      screen: StackNav,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <BrandIcon name="home" color={tintColor} />
        )
      }
    },
    Network: {
      screen: NetworkStack,
      navigationOptions: () => ({
        header: null,
        tabBarLabel: "Network",
        tabBarIcon: ({ tintColor }) => (
          <BrandIcon name="network" color={tintColor} />
        )
      }),
      path: "network"
    },
    Opportunity: {
      screen: OpportunityStack,
      navigationOptions: {
        tabBarLabel: "Career",
        tabBarIcon: ({ tintColor }) => (
          <BrandIcon name="career" color={tintColor} />
        )
      },
      path: "career"
    },
    Grow: {
      screen: GrowStack,
      navigationOptions: {
        tabBarLabel: "Grow",
        tabBarIcon: ({ tintColor }) => (
          <BrandIcon name="grow" color={tintColor} />
        )
      }
    },
    CV: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: "My CV",
        tabBarIcon: ({ tintColor }) => <BrandIcon name="cv" color={tintColor} />
      },
      path: "cv"
    }
  },
  {
    tabBarOptions: {
      showLabel: true,
      activeTintColor: colors.black,
      inactiveTintColor: "#B6B6B6",
      style: {
        borderTopWidth: 0.5,
        borderTopColor: colors.grey,
        backgroundColor: colors.white
      }
    }
  }
);

// export { TabNav, StackNav };

export default createAppContainer (StackNav)