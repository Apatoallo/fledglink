import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { connect } from "react-redux";
import { colors, fonts } from "../configs/config";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 2
  },
  details: {
    paddingLeft: 8
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.black
  },
  subheading: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.grey,
    overflow: "hidden"
  },
  circle: {
    height: 36,
    width: 36,
    borderRadius: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  initials: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.bold,
    textAlign: "center"
  }
});

const ChannelName = ({ name, channels, withToggle }) => {
  if (channels && channels.find(channel => channel.title === name)) {
    const { abbreviation, tagLine, color } = channels.find(
      channel => channel.title === name
    );
    return (
      <View style={styles.container}>
        <View
          style={[styles.circle, { backgroundColor: color.replace("0x", "#") }]}
        >
          <Text style={styles.initials}>{abbreviation}</Text>
        </View>
        <View
          style={[
            styles.details,
            {
              maxWidth:
                Dimensions.get("window").width * (withToggle ? 0.55 : 0.8)
            }
          ]}
        >
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subheading}>{tagLine}</Text>
        </View>
      </View>
    );
  } else return null;
};

const mapStateToProps = state => ({
  channels: state.userOptions.userOptionsList.newsChannels
});

export default connect(
  mapStateToProps,
  null
)(ChannelName);
