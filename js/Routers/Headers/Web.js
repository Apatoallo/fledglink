import * as React from "react";
import {
  Platform,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { Icon } from "native-base";
import { colors } from "../../configs/config";

const background = require("../../../images/HeaderBackground.png");

const APPBAR_HEIGHT = Platform.select({
  ios: 44,
  android: 56,
  default: 64
});

const StyledHeader = ({
  cancel,
  pageTitle,
  pageUrl,
  canGoBack,
  canGoForward,
  goForward,
  goBack
}) => (
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
        <View>
          <TouchableOpacity onPress={cancel}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 12
              }}
            >
              <Icon
                style={{ color: colors.white, fontSize: 24 }}
                name="x"
                type="Feather"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{ color: colors.white }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {pageTitle}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ color: colors.white, fontSize: 11, opacity: 0.8 }}
          >
            {pageUrl}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 6
          }}
        >
          <TouchableOpacity
            onPress={goBack}
            disabled={!canGoBack}
            style={{ paddingHorizontal: 12 }}
          >
            <Icon
              style={{
                fontSize: 24,
                color: colors.white,
                opacity: canGoBack ? 1 : 0.75
              }}
              type="Feather"
              name="arrow-left"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goForward}
            disabled={!canGoForward}
            style={{ paddingHorizontal: 12 }}
          >
            <Icon
              style={{
                fontSize: 24,
                color: colors.white,
                opacity: canGoForward ? 1 : 0.75
              }}
              type="Feather"
              name="arrow-right"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  </View>
);

export default StyledHeader;
