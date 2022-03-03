import React, { Component } from "react";
import {
  Animated,
  Easing,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Image,
  Text,
  ImageBackground
} from "react-native";
import PropTypes from "prop-types";
import { Icon } from "native-base";
import ViewOverflow from "react-native-view-overflow";
import { transform } from "../utils/anim";
import { colors } from "../configs/config";

const AnimatedViewOverflow = Animated.createAnimatedComponent(ViewOverflow);

const imageButton = require("../../images/BackgroundBold.png");
const bird = require("../../images/bird_120x120.png");

const { width } = Dimensions.get("window");

const SIZE = width / 4.5;
const durationIn = 300;
const durationOut = 200;

export default class OppButton extends Component {
  mode = new Animated.Value(0);

  icon1 = new Animated.Value(0);

  icon2 = new Animated.Value(0);

  icon3 = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      showAllButton: false
    };
  }

  toggleView = () => {
    if (this.mode._value) {
      Animated.parallel(
        [this.mode, this.icon1, this.icon2, this.icon3].map(item =>
          Animated.timing(item, {
            toValue: 0,
            duration: durationIn,
            easing: Easing.cubic
          })
        )
      ).start();
    } else {
      Animated.parallel([
        Animated.timing(this.mode, {
          toValue: 1,
          duration: durationOut,
          easing: Easing.cubic
        }),
        Animated.sequence([
          ...[this.icon1, this.icon2, this.icon3].map(item =>
            Animated.timing(item, {
              toValue: 1,
              duration: durationOut,
              easing: Easing.elastic(1)
            })
          )
        ])
      ]).start();
    }
    this.setState({
      showAllButton: !this.state.showAllButton
    });
  };

  render() {
    const firstX = this.icon1.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -50]
    });
    const firstY = this.icon1.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -50]
    });
    const firstZ = this.icon1.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const secondX = this.icon2.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0]
    });
    const secondY = this.icon2.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -70]
    });
    const secondZ = this.icon2.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const thirdX = this.icon3.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50]
    });
    const thirdY = this.icon3.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -50]
    });
    const thirdZ = this.icon3.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const rotation = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "315deg"]
    });

    return (
      <ViewOverflow
        style={{
          // position: 'absolute',
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <SubAddButton
          style={{ transform: transform(firstX, firstY, firstZ) }}
          icon="briefcase"
          toggle={this.toggleView}
          onPress={() => this.props.navigation.navigate("Companies")}
        />
        <SubAddButton
          style={{ transform: transform(secondX, secondY, secondZ) }}
          icon="search"
          toggle={this.toggleView}
          onPress={() => {
            this.props.navigation.navigate("OpporunityView");
          }}
        />
        <SubAddButton
          style={{ transform: transform(thirdX, thirdY, thirdZ) }}
          icon="calendar"
          toggle={this.toggleView}
          onPress={() => {
            this.props.navigation.navigate("Events");
          }}
        />

        <TouchableWithoutFeedback onPress={this.toggleView} activeOpacity={1}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
              borderColor: "white",
              borderWidth: 0.5,
              backgroundColor: colors.pink,
              overflow: "hidden"
            }}
          >
            <ImageBackground
              source={imageButton}
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <AnimatedViewOverflow
                style={{
                  transform: [{ rotate: rotation }]
                }}
              >
                {this.state.showAllButton ? (
                  <Icon
                    name="plus"
                    type="Feather"
                    style={{ color: colors.white }}
                  />
                ) : (
                  <Image source={bird} style={{ height: 30, width: 30 }} />
                )}
              </AnimatedViewOverflow>
              <Text style={{ fontSize: 12, color: colors.white }}>careers</Text>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      </ViewOverflow>
    );
  }
}

class SubAddButton extends Component {
  render() {
    const { style, icon, onPress, toggle } = this.props;

    return (
      <AnimatedViewOverflow
        style={{
          position: "absolute",
          width: SIZE / 1.5,
          height: SIZE / 1.5,
          ...style
        }}
      >
        <TouchableHighlight
          underlayColor="white"
          onPress={() => {
            this.props.onPress();
            this.props.toggle();
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: SIZE / 1.5,
            height: SIZE / 1.5,
            borderWidth: 0.5,
            borderRadius: SIZE / 3,
            backgroundColor: "white"
          }}
        >
          <Icon name={icon} type="Feather" style={{ fontSize: 16 }} />
        </TouchableHighlight>
      </AnimatedViewOverflow>
    );
  }
}

SubAddButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func
};
