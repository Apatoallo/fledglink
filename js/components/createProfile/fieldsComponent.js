import React, { PureComponent } from "react";
import { View } from "native-base";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Keyboard
} from "react-native";
import PropTypes from "prop-types";
import ItemComponent from "../../shared/itemComponent";
import InputComponent from "../../shared/inputComponent";
import { colors } from "../../configs/config";

const undefinedUser = require("../../../images/no-profile-image.png");

const styles = StyleSheet.create({
  imageWrapper: {
    marginHorizontal: 30
  },
  image: {
    width: 194,
    height: 194,
    borderRadius: 97
  },
  imagePicker: {
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gallery
  },
  selectItemWrapper: {
    height: 40,
    backgroundColor: colors.gallery,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30
  },
  checkIcon: {
    fontSize: 18,
    color: colors.green
  }
});

export default class FieldsComponent extends PureComponent {
  render() {
    const { options, user, selectAction, fields, onChangeInput } = this.props;

    return (
      <View>
        {!!options.selectingPhoto && (
          <View style={styles.imageWrapper}>
            <TouchableOpacity onPress={selectAction} style={styles.imagePicker}>
              <Image
                resizeMode="cover"
                source={
                  user.userImage ? { uri: user.userImage } : undefinedUser
                }
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        )}
        {!!options.selectPicker && (
          <FlatList
            data={fields}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ItemComponent clickHandler={selectAction} {...item} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
        {options.inputField && (
          <View style={styles.imageWrapper}>
            <InputComponent
              activeColor={colors.black}
              inactiveColor={colors.grey}
              label="Name"
              returnKeyType="done"
              onBlur={() => Keyboard.dismiss()}
              value={options.inputValue}
              onChangeText={onChangeInput}
            />
          </View>
        )}
      </View>
    );
  }
}

FieldsComponent.propTypes = {
  options: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  selectAction: PropTypes.func.isRequired
};
