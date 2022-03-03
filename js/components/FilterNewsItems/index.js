import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { toggleChannel } from "../../actions/channels";
import { updateFeedChannels, refreshUserFeed } from "../../actions/feed";
import { trackNewsFeeds } from "../../actions/analytics";
import ChannelName from "../../shared/ChannelName";
import Toggle from "../../shared/Toggle";
import { colors, fonts } from "../../configs/config";

const styles = StyleSheet.create({
  intro: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
    marginBottom: 20
  },
  section: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingVertical: 3,
    marginVertical: 2,
    backgroundColor: colors.lighterGrey
  },
  details: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  name: {
    fontWeight: "bold"
  },
  heading: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.darkViolet,
    marginBottom: 7
  }
});

class FilterNewsItems extends Component {
  componentDidMount = () => {
    const { navigation } = this.props;
    navigation.setParams({ onSave: this.onSave });
  };

  static navigationOptions = ({ navigation }) => {
    const onSave = navigation.getParam("onSave");
    return {
      headerRight: (
        <TouchableOpacity onPress={onSave} style={{ paddingHorizontal: 12 }}>
          <Text style={{ color: "#fff" }}>Save</Text>
        </TouchableOpacity>
      )
    };
  };

  onSave = () => {
    const {
      navigation,
      token,
      inactive,
      refreshUserFeedAction,
      updateFeedChannelsAction,
      trackNewsFeeds
    } = this.props;

    const channels = this.props.channels
      .filter(
        channel => channel.title !== "News" && !inactive.includes(channel.title)
      )
      .map(channel => channel.title);

    updateFeedChannelsAction(inactive);
    refreshUserFeedAction(token);
    trackNewsFeeds([...channels]);
    navigation.goBack();
  };

  render() {
    const { channels, inactive, toggleChannelAction } = this.props;

    return (
      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.intro}>
          Select the sections you’d like to turn on and off in your discovery
          feed.
        </Text>
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.heading}>News Feeds</Text>
          {channels
            .filter(channel => channel.title !== "News")
            .map((channel, index) => (
              <View key={index} style={styles.section}>
                <ChannelName name={channel.title} withToggle />
                <Toggle
                  value={!inactive.includes(channel.title)}
                  onValueChange={() => toggleChannelAction(channel.title)}
                />
              </View>
            ))}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token.token,
  channels: state.userOptions.userOptionsList.newsChannels,
  inactive: state.channels.inactive
});

function bindActions(dispatch) {
  return {
    toggleChannelAction: name => dispatch(toggleChannel(name)),
    updateFeedChannelsAction: inactive =>
      dispatch(updateFeedChannels(inactive)),
    refreshUserFeedAction: token => dispatch(refreshUserFeed(token)),
    trackNewsFeeds: payload => dispatch(trackNewsFeeds(payload))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(FilterNewsItems);
