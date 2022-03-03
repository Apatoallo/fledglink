import React, { PureComponent } from 'react';
import { View, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import styles from '../EditIntro/styles';

export default function avatarWithImagePicker(AvatarComponent) {
    return class AvatarWithImagePicker extends PureComponent {
        selectPhotoTapped = () => {
            const options = {
                quality: 1.0,
                maxWidth: 500,
                maxHeight: 500,
                storageOptions: { skipBackup: true },
            };

            ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled photo picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const uri = `data:image/jpeg;base64,${response.data}`;
                    this.props.setUserAvatarToState(uri);
                }
            });
        };

        render() {
            return (
                <View style={styles.avatarContainer}>
                    <AvatarComponent {...this.props} />
                    <TouchableOpacity onPress={this.selectPhotoTapped} style={styles.iconContainer}>
                        <Icon
                            name="pencil"
                            elevation={5}
                            type="EvilIcons"
                            style={styles.pencilIcon}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
    };
};
