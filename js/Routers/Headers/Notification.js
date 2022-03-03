import * as React from "react";
import {
  Platform,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import { Icon } from "native-base";
import { pushTypes } from "../../push/emitter/PushEmitter";
import BadgeIcon from "../../push/components/BadgeIcon";
import BrandIcon from "../../components/BrandIcon";
import HeaderSearch from "../../shared/HeaderSearch";
import { colors } from "../../configs/config";

const background = require("../../../images/HeaderBackground.png");

const APPBAR_HEIGHT = Platform.select({
  ios: 44,
  android: 56,
  default: 64
});

const StyledHeader = ({ navigation }) => (
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
          <HeaderSearch navigation={navigation} />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 6
          }}
        >
          <TouchableOpacity
            style={{ paddingHorizontal: 12 }}
            onPress={() => navigation.navigate("NotificationsScreen")}
          >
            <BadgeIcon badgeColor={colors.violet} pushTags={[pushTypes.all]}>
              <BrandIcon name="notifications" color={colors.white} />
            </BadgeIcon>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ paddingHorizontal: 12 }}
            onPress={() => navigation.navigate("SettingsPage")}
          >
            <Icon
              style={{ color: colors.white, paddingTop: 3 }}
              type="MaterialCommunityIcons"
              name="dots-vertical"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  </View>
);

export default StyledHeader;
