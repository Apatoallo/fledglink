import React, {Component} from "react";
import {Text} from "native-base";
import {TouchableOpacity} from 'react-native';
import {colors} from "../../configs/config";

export default class AddPostBanner extends Component {
  render() {
    const {onPress} = this.props;
    return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={{
        backgroundColor: 'white',
        height: 60,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10
      }}>
        <Text style={{
          fontSize: 20,
          color: colors.grey
        }}>Share an update or an idea:</Text>
      </TouchableOpacity>
    )
  }
}
