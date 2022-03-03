import React, { PureComponent } from 'react';
import { TouchableWithoutFeedback, Linking, TouchableHighlight, Image } from 'react-native';
import { Text, View } from 'native-base';
import Markdown, { getUniqueID } from 'react-native-markdown-renderer';
import FitImage from 'react-native-fit-image';
import PropTypes from 'prop-types';
import styles from '../styles/default';
import { checkIfDeepLink, getDeepLinkClickHandler, checkIfYouTubeLink } from '../utils/deepLinkParser';
import parseYouTubeId from '../utils/youtubeParser';
import YouTubePlayComponent from './youTubePlayComponent';
import { Button, Container, Icon } from '../components/signUp';

class MarkDownComponent extends PureComponent {

    changeLink = (link) => {
        const array = link.split('/');
        if (array[0] === 'http:') {
            return link.replace(array[0], 'https:');
        }
        return link;
    }

    render() {
        const { content, navigation } = this.props;
        const rules = {
            link: (node, children) => {
                if (checkIfDeepLink(node.attributes.href)) {
                    return (
                        <TouchableWithoutFeedback
                            key={getUniqueID()}
                            onPress={() => getDeepLinkClickHandler(node.attributes.href)(navigation)}
                        >
                            <Text style={styles.markdown.link}>{ children }</Text>
                        </TouchableWithoutFeedback>
                    );
                }
                return (
                    <Text key={getUniqueID()} style={styles.markdown.link} onPress={() => navigation.navigate('WebViewBrowser', { url: node.attributes.href })}>
                        {children}
                    </Text>
                );
            },
            image: (node, children, parent, styles) => {
                if (checkIfYouTubeLink(node.attributes.src)) {
                    const youTubeId = parseYouTubeId(node.attributes.src);
                    return (
                        <TouchableHighlight
                            key={getUniqueID()}
                            onPress={() => YouTubePlayComponent(youTubeId)}
                        >
                            <Image
                                style={{ height: 300 }}
                                source={{ uri: this.changeLink(node.attributes.src) }}
                            />
                        </TouchableHighlight>
                    );
                }
                return <FitImage indicator={true} key={node.key} style={styles.image} source={{ uri: node.attributes.src }} />;
            },
        };

        return (
            <View>
                <Markdown rules={rules} style={styles.markdown}>{content}</Markdown>
            </View>
        );
    }
}

MarkDownComponent.propTypes = {
    content: PropTypes.string.isRequired,
    navigation: PropTypes.instanceOf(Object).isRequired,
};

export default MarkDownComponent;
