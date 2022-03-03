import React, { Component } from "react";
import { Button, Text, View } from "native-base";
import {
  Modal,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { colors, fonts } from "../../configs/config";

const images = [
  require("../../../images/walkthroughImage1.png"),
  require("../../../images/walkthroughImage2.png"),
  require("../../../images/walkthroughImage3.png"),
  require("../../../images/walkthroughImage4.png")
];

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 25
  },
  heading: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center",
    color: colors.white
  },
  intro: {
    fontFamily: fonts.regular,
    fontSize: 12,
    textAlign: "center",
    margin: 5,
    color: colors.white
  },
  image: {
    width: width - 50,
    height: (width - 50) * 1.5,
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10
  },
  button: {
    backgroundColor: colors.violet,
    borderRadius: 4,
    width: 120,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    margin: 15
  },
  buttonText: {
    textAlign: "center",
    color: colors.white,
    fontFamily: fonts.bold
  },
  indicatorContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 2
  }
});

class OnboardingScreen extends Component {
  renderItem = ({ item, index }) => {
    const { completeOnboarding } = this.props;
    return (
      <ImageBackground style={styles.image} source={images[index]}>
        <Button
          style={styles.button}
          onPress={() =>
            index < 3
              ? setTimeout(() => this._carousel.snapToNext(), 250)
              : completeOnboarding()
          }
        >
          <Text uppercase style={styles.buttonText}>
            Next
          </Text>
        </Button>
        <View style={styles.indicatorContainer}>
          {images.map((image, dotIndex) => (
            <TouchableOpacity
              key={dotIndex}
              style={[
                styles.indicator,
                {
                  backgroundColor:
                    index === dotIndex ? colors.grey : colors.gallery
                }
              ]}
              onPress={() =>
                setTimeout(() => this._carousel.snapToItem(dotIndex), 250)
              }
            />
          ))}
        </View>
      </ImageBackground>
    );
  };

  render() {
    return (
      <Modal transparent>
        <View style={styles.background}>
          <View>
            <Text style={styles.heading}>Welcome to Fledglink!</Text>
            <Text style={styles.intro}>
              This quick tour will give you an overview of what you can do and
              how...
            </Text>
          </View>
          <Carousel
            ref={c => (this._carousel = c)}
            data={images}
            firstItem={0}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={width}
            slideStyle={{ width: width }}
            containerCustomStyle={{ flexGrow: 0 }}
            removeClippedSubviews={false}
          />
        </View>
      </Modal>
    );
  }
}

export default OnboardingScreen;
