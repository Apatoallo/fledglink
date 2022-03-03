import React, {Component} from 'react'
import {Icon, View} from 'native-base'
import {TouchableOpacity, Image} from 'react-native';
import {colors} from '../../configs/config'

export default class ImageShowComponent extends Component {
  render() {
    const {image, deletePhoto, showCanceling} = this.props;
    return (
      <View
        style={{
        flex: 1,
        alignSelf: 'stretch',
        position: 'relative',
        backgroundColor: colors.galleryOpacity
      }}>
        {!!showCanceling && <View
          style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 30,
          justifyContent: 'center',
          zIndex: 2,
          alignItems: 'flex-end'
        }}>
          <TouchableOpacity
            onPress={() => deletePhoto()}
            style={{
            backgroundColor: colors.greyOpacity
          }}>
            <Icon
              name='x'
              type='Feather'
              style={{
              color: colors.grey
            }}/>
          </TouchableOpacity>
        </View>
        }
        <Image
          source={{ uri: image }}
          resizeMode={'contain'}
          style={{
          height: 250,
          width: null
        }}/>
      </View>

    )
  }
};