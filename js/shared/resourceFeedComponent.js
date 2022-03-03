import React, { PureComponent } from "react";
import { View, Text } from "native-base";
import {
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import PropTypes from "prop-types";
import ChannelName from "../shared/ChannelName";
import { colors, fonts } from "../configs/config";

const styles = StyleSheet.create({
  tile: {
    marginHorizontal: 10,
    marginBottom: 10
  },
  image: {
    padding: 20,
    minHeight: 154,
    justifyContent: "center"
  },
  textContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  },
  titleText: {
    fontSize: 24,
    fontFamily: fonts.bold,
    textAlign: "center",
    color: colors.white
  },
  introText: {
    fontStyle: "italic",
    textAlign: "center",
    color: colors.white
  },
  button: {
    marginTop: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
    maxWidth: 150,
    backgroundColor: colors.gold
  },
  buttonText: {
    color: colors.darkViolet,
    fontFamily: fonts.bold,
    textAlign: "center"
  },
  smallImageTile: {
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
    backgroundColor: colors.white
  },
  resourceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10
  },
  squareImage: {
    height: 85,
    width: 85
  },
  titleContainer: {
    marginLeft: 10,
    flex: 1
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: fonts.bold,
    color: colors.black
  }
});
class ResourceFeedComponent extends PureComponent {
  render() {
    const { item, isSharedLink, onPress } = this.props;
    if (item.rectangularImage || item.squareImage) {
      return (
        <TouchableWithoutFeedback disabled={isSharedLink} onPress={onPress}>
          {item.imageType === "large" ? (
            <View style={styles.tile}>
              <ImageBackground
                resizeMode="cover"
                style={styles.image}
                source={{ uri: item.rectangularImage }}
                borderRadius={4}
              >
                <View>
                  {(!item.hideTitle || item.introCopy) && (
                    <View style={styles.textContainer}>
                      {!item.hideTitle && (
                        <Text numberOfLines={4} style={styles.titleText}>
                          {item.title}
                        </Text>
                      )}
                      {item.introCopy && (
                        <Text style={styles.introText}>{item.introCopy}</Text>
                      )}
                    </View>
                  )}
                  {isSharedLink ? (
                    <TouchableOpacity onPress={onPress} style={styles.button}>
                      <Text style={styles.buttonText}>{"SHARE NOW"}</Text>
                    </TouchableOpacity>
                  ) : (
                    item.CTA && (
                      <TouchableOpacity onPress={onPress} style={styles.button}>
                        <Text style={styles.buttonText}>{item.CTA}</Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              </ImageBackground>
            </View>
          ) : (
            <View style={styles.smallImageTile}>
              <ChannelName name={item.channel} />
              <View style={styles.resourceContainer}>
                <Image
                  source={{ uri: item.squareImage }}
                  style={styles.squareImage}
                />
                <View style={styles.titleContainer}>
                  <Text numberOfLines={4} style={styles.title}>
                    {item.title}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </TouchableWithoutFeedback>
      );
    } else return null;
  }
}

ResourceFeedComponent.propTypes = {
  item: PropTypes.object,
  isSharedLink: PropTypes.bool,
  onPress: PropTypes.func.isRequired
};

ResourceFeedComponent.defaultProps = {
  item: {},
  isSharedLink: false
};

export default ResourceFeedComponent;
