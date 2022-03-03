import React, { PureComponent } from 'react';
import { View, Text } from 'native-base';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';
import parseYouTubeId from '../../utils/youtubeParser';
import YouTubePlayComponent from '../../shared/youTubePlayComponent';
import { colors } from '../../configs/config';

class ExternalLinkComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ogImageHidden: false,
            isMainImageHidden: false,
        };
    }

    linkAction = (url) => {
        const videoId = parseYouTubeId(url);
        if (videoId instanceof Array) {
            const { navigation, preview } = this.props;
            navigation.navigate('WebViewBrowser', { url: preview.url });
        } else {
            YouTubePlayComponent(videoId);
        }
    };

    onMainImageError = () => {
        this.setState({ isMainImageHidden: true });
    };

    onOgImageHidden = () => {
        this.setState({ ogImageHidden: true });
    };

    render() {
        const { preview } = this.props;
        return (
            <TouchableOpacity
                onPress={() => this.linkAction(preview.url)}
                style={{
                    width: '100%',
                    alignSelf: 'center',
                    flex: 1,
                    backgroundColor: colors.gallery,
                    padding: 10,
                    borderLeftColor: colors.grey,
                    borderLeftWidth: 2,
                }}
            >
                {(~preview.contentType.indexOf('image')
                    || !!preview.url.match(/jpg|jpeg|png$/)) && !this.state.isMainImageHidden && (
                    <Image
                        resizeMode="contain"
                        source={{ uri: preview.url }}
                        style={{ maxWidth: '100%', height: 180 }}
                        onError={ this.onMainImageError }
                    />
                )}
                <Text
                    numberOfLines={1}
                    style={{
                        color: colors.black,
                    }}
                >
                    {preview.title}
                </Text>
                {preview.images && preview.images.length ? (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                    >
                        {(!this.state.ogImageHidden && <Image
                            resizeMode="contain"
                            source={{
                                uri: preview.images[0],
                            }}
                            style={{
                                flex: 0.3,
                                width: '40%',
                                height: 60,
                            }}
                            onError={ this.onOgImageHidden }
                        />)}
                        <View
                            style={{
                                flex: 0.1 - 0.1*this.state.ogImageHidden,
                            }}
                        />
                        <View
                            style={{
                                flex: 0.5 + 0.3 * this.state.ogImageHidden,
                            }}
                        >
                            <Text
                                numberOfLines={5}
                                style={{
                                    color: colors.black,
                                    fontSize: 12,
                                }}
                            >
                                {preview.description}
                            </Text>
                        </View>
                    </View>
                ) : (
                    <Text
                        style={{
                            color: colors.black,
                            fontSize: 12,
                        }}
                    >
                        {preview.description}
                    </Text>
                )}
                {!(
                    ~preview.contentType.indexOf('image')
                    || !!preview.url.match(/jpg|jpeg|png$/)
                ) && (
                    <Text
                        style={{
                            fontSize: 12,
                            marginVertical: 10,
                            textDecorationLine: 'underline',
                            color: 'blue',
                        }}
                    >
                        {preview.url}
                    </Text>
                )}
            </TouchableOpacity>
        );
    }
}

ExternalLinkComponent.propTypes = {
    preview: PropTypes.instanceOf(Object).isRequired,
    navigation: PropTypes.instanceOf(Object).isRequired,
};

export default ExternalLinkComponent;
