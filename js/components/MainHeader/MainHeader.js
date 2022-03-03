import React from "react";
import {
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { Icon, Body, Right } from "native-base";
import PropTypes from "prop-types";
import { getHeaderHeight } from "../../App";
import { pushTypes } from "../../push/emitter/PushEmitter";
import HeaderSearch from "../../shared/HeaderSearch";
import BadgeIcon from "../../push/components/BadgeIcon";
import BrandIcon from "../BrandIcon";
import { colors } from "../../configs/config";

const headerImage = require("../../../images/HeaderBackground.png");

const MainHeader = ({ navigation, leftButton }) => (
  <ImageBackground
    source={headerImage}
    style={{ height: getHeaderHeight(), width: null }}
  >
    <SafeAreaView>
      <View style={{ flexDirection: "row", paddingLeft: 10, paddingRight: 10 }}>
        <Body style={{ flex: 3 }}>
          <HeaderSearch navigation={navigation} />
        </Body>

        <Right
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("NotificationsScreen");
            }}
          >
            <BadgeIcon badgeColor={colors.violet} pushTags={[pushTypes.all]}>
              <BrandIcon name="notifications" color={colors.white} />
            </BadgeIcon>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SettingsPage")}>
            <Icon
              style={{ color: colors.white, paddingTop: 5 }}
              type="MaterialCommunityIcons"
              name="dots-vertical"
            />
          </TouchableOpacity>
        </Right>
      </View>
    </SafeAreaView>
  </ImageBackground>
);

MainHeader.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  leftButton: PropTypes.element.isRequired
};

export default MainHeader;
