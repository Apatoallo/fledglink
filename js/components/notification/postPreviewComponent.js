import React, { PureComponent } from "react";
import { Text, View } from "native-base";
import { TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../configs/config";

export default class PostPreviewComponent extends PureComponent {
  render() {
    const { data, onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          borderColor: colors.black,
          borderWidth: 0.5,
          padding: 10,
          marginVertical: 10,
          flexDirection: "row",
          justifyContent: "flex-start"
        }}
      >
        {!!data.image && (
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: data.image }}
              style={{ width: "95%", height: 60, marginRight: 10 }}
            />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text note numberOfLines={8}>
            {data.content}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

PostPreviewComponent.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  onPress: PropTypes.func.isRequired
};
