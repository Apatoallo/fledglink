import * as React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Header } from "react-navigation";
import { colors } from "../../configs/config";

const background = require("../../../images/HeaderBackground.png");

const StyledHeader = props => (
  <View style={{ backgroundColor: colors.gallery }}>
    <Image
      style={{
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null
      }}
      source={background}
      resizeMode="cover"
    />
    <Header
      {...props}
      style={{ backgroundColor: "transparent", borderBottomWidth: 0 }}
    />
  </View>
);

export default StyledHeader;
