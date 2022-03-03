import React, { Component } from "react";
import { Text, View } from "native-base";
import { Image, ImageBackground } from "react-native";
import { colors } from "../../configs/config";

const background = require("../../../images/rotate-bg.jpg");
const yellowStar = require("../../../images/star/yellow.png");
const greyStar = require("../../../images/star/grey.png");

class ResultComponent extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
  }

  scoreComponent = scores => {
    let starsArray = [];
    for (let index = 0; index < 5; index++) {
      if (index <= scores - 1) {
        starsArray.push(yellowStar);
      } else {
        starsArray.push(greyStar);
      }
    }
    return (
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        {starsArray.map(item => {
          return (
            <Image
              source={item}
              style={{ width: 16, marginRight: 10, height: 16 }}
            />
          );
        })}
      </View>
    );
  };

  render() {
    const { result } = this.props;

    return (
      <View
        style={{
          marginBottom: 5,
          marginTop: 5,
          borderRadius: 10,
          overflow: "hidden"
        }}
      >
        <ImageBackground
          source={background}
          resizeMode="cover"
          borderRadius={5}
          style={{
            width: null,
            justifyContent: "space-between",
            flexDirection: "row",
            paddingTop: 5,
            paddingLeft: 10,
            height: 70
          }}
        >
          <View style={{ backgroundColor: "transparent" }}>
            <Text
              style={{
                color: colors.white,
                fontSize: 16,
                fontWeight: "bold"
              }}
            >
              {result.name}
            </Text>
            {this.scoreComponent(result.score)}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default ResultComponent;
