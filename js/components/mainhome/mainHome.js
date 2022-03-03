import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform, Linking, FlatList, RefreshControl } from "react-native";
import { View, Spinner } from "native-base";
import PropTypes from "prop-types";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";
import { removeToken } from "../../actions/token";
import { setEmptyError, clearUser } from "../../actions/user";
import { getUserFeed, refreshUserFeed } from "../../actions/feed";
import { trackNewsItemInteraction } from "../../actions/analytics";
import { completeOnboarding } from "../../actions/register";
import styles from "./styles";
import OnboardingScreen from "../modals/OnboardingScreen";
import OpportunityCard from "../../shared/OpportunityCard";
import EventCard from "../../shared/EventCard";
import ResourceFeedComponent from "../../shared/resourceFeedComponent";
import debounce from "../../utils/debounce";
import LocationService from "../../geolocation/LocationService";
import FilterButton from "../../shared/filters/FilterButton";

const sharedText =
  "invites you to join Fledglink \nApp Store: https://itunes.apple.com/us/app/fledglink-build-your-career/id1380878530?mt=8 \nPlay Market: https://play.google.com/store/apps/details?id=com.Fledglink";

class mainHome extends Component {
  
  componentDidMount = () => {
    const { watchingGeoPosition, token } = this.props;
    FirebaseAnalytics.setCurrentScreen("mainHome", "mainHome");
    if (watchingGeoPosition) {
      LocationService.instance.startTimer(token);
    }
  };

  onResourcePress = resource => {
    const { navigation, trackNewsItemInteraction } = this.props;
    const url = resource.URL;

    trackNewsItemInteraction("resource", resource);

    if (url?.startsWith("fledglink://") && Platform.OS === "android") {
      return Linking.openURL(url);
    }

    if (url) {
      navigation.navigate("WebViewBrowser", { url });
    }

    return null;
  };

  onOpportunityPress = opportunity => {
    const {
      navigation: { navigate },
      trackNewsItemInteraction
    } = this.props;

    trackNewsItemInteraction("opportunity", opportunity);
    navigate("OpportunityPage", { id: opportunity.id });
  };

  onEventPress = event => {
    const {
      navigation: { navigate },
      trackNewsItemInteraction
    } = this.props;

    trackNewsItemInteraction("event", event);
    navigate("Event", { id: event.id });
  };

  renderFeedByType = item => {
    const {
      navigation,
      disabledLike,
      user: { fullName }
    } = this.props;
    switch (item.subType) {
      case "NewsItem":
        return (
          <ResourceFeedComponent
            item={item}
            onPress={() => this.onResourcePress(item)}
          />
        );
      case "Opportunity":
        return (
          <OpportunityCard
            opportunity={item.linkedEntity}
            onPress={() => this.onOpportunityPress(item.linkedEntity)}
          />
        );
      case "Event":
        return (
          <EventCard
            event={item.linkedEntity}
            onPress={() => this.onEventPress(item.linkedEntity)}
          />
        );
      default:
        return null;
    }
  };

  userProfileNavigate = () => {
    this.props.navigation.navigate("UserProfile");
  };

  userProfileNavigateWithDebounce = () =>
    debounce(this.userProfileNavigate.bind(this), 1000, true);

  render() {
    const {
      user,
      navigation,
      loading,
      getUserFeedAction,
      refreshUserFeedAction,
      isFeedFetchingDisabled,
      feed,
      token,
      onboardingCompleted,
      completeOnboardingAction
    } = this.props;
    return (
      <View style={{ flex: 1, paddingBottom: 0, ...styles.container }}>
        <FilterButton
          clickHandler={() => this.props.navigation.navigate("FilterNewsItems")}
          title="Personalise your discovery feed"
        />
        {feed.length ? (
          <View style={{ flex: 1 }}>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => refreshUserFeedAction(token)}
                />
              }
              data={feed}
              keyExtractor={item => item.id}
              renderItem={({ item }) => this.renderFeedByType(item)}
              onEndReached={() => {
                if (isFeedFetchingDisabled || loading) return;
                getUserFeedAction(token);
              }}
              onEndReachedThreshold={0.1}
            />
          </View>
        ) : (
          <Spinner />
        )}
        
      </View>
    );
  }
}

mainHome.propTypes = {
  token: PropTypes.string,
  user: PropTypes.instanceOf(Object),
  navigation: PropTypes.instanceOf(Object).isRequired,
  feed: PropTypes.instanceOf(Array),
  disabledLike: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  getUserFeedAction: PropTypes.func.isRequired,
  watchingGeoPosition: PropTypes.bool.isRequired
};

mainHome.defaultProps = {
  token: "",
  user: {},
  feed: [],
  disabledLike: false
};

function bindAction(dispatch) {
  return {
    clearUser: () => dispatch(clearUser()),
    removeToken: () => dispatch(removeToken()),
    setEmptyError: error => dispatch(setEmptyError(error)),
    getUserFeedAction: token => dispatch(getUserFeed(token)),
    refreshUserFeedAction: token => dispatch(refreshUserFeed(token)),
    trackNewsItemInteraction: (key, payload) =>
      dispatch(trackNewsItemInteraction(key, payload)),
    completeOnboardingAction: () => dispatch(completeOnboarding())
  };
}
const mapStateToProps = state => ({
  token: state.token.token,
  feed: state.feed.feed,
  isFeedFetchingDisabled: state.feed.isFeedFetchingDisabled,
  error: state.user.error,
  user: state.user.user,
  disabledLike: state.feed.disabledLikeAction,
  watchingGeoPosition: state.nearPeople.watchingGeoPosition,
  loading: state.feed.loading,
  onboardingCompleted: state.register.onboardingCompleted
});

export default connect(
  mapStateToProps,
  bindAction
)(mainHome);





// import React, { Component } from "react";

// import { Platform, Linking, FlatList, RefreshControl, Text } from "react-native";

// export default class Home extends React.Component {
  
//   render() {
//     return (
//       <Text>asdads</Text>
//     );
//   }
// }

