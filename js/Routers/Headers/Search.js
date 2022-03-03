import * as React from "react";
import {
  Platform,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput
} from "react-native";
import { colors } from "../../configs/config";

const background = require("../../../images/HeaderBackground.png");

const APPBAR_HEIGHT = Platform.select({
  ios: 44,
  android: 56,
  default: 64
});

const StyledHeader = ({ navigation, onChange, cancel }) => (
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
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: APPBAR_HEIGHT
        }}
      >
        <View style={{ flex: 1, marginLeft: 12 }}>
          <TextInput
            autoFocus
            onChangeText={onChange}
            style={{
              backgroundColor: colors.white,
              borderRadius: 5,
              height: 30,
              width: "100%",
              borderWidth: 0,
              paddingHorizontal: 10,
              fontSize: 12,
              padding: 0,
              margin: 0
            }}
            placeholder="Search network"
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={{ paddingHorizontal: 12 }} onPress={cancel}>
            <Text style={{ color: colors.white }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  </View>
);

export default StyledHeader;
