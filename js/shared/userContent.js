import React, { PureComponent } from 'react';
import { Text, View } from 'native-base';
import PropTypes from 'prop-types';
import MentionComponent from './MentionComponent';
import formatMention from '../utils/formatMention';
import { colors } from '../configs/config';

class UserContent extends PureComponent {
    getUrl = (url) => {
        if (url.toLowerCase().includes('http://') || url.toLowerCase().includes('https://')) {
            return url;
        }
        return `http://${url}`;
    }

    checkIfMention = word => this.props.mentions.find(mention => word === `@${formatMention(mention.fullName)}`);

    mentionClick = (mention) => {
        const { user, navigation } = this.props;
        if (user.id === mention.id) {
            navigation.navigate('UserProfile');
        } else {
            navigation.navigate('ShowConnectionUserProfile', { userId: mention.id });
        }
    };

    linkableTextParser = (paragraph) => {
        const { navigation: { navigate } } = this.props;
        const reg = new RegExp(/[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/);
        const result = paragraph
            .split(' ')
            .map((contentWord) => {
                const isUrl = reg.test(contentWord);
                const inlineMention = this.checkIfMention(contentWord);
                if (inlineMention) {
                    return <MentionComponent mentionClickHandler={this.mentionClick} mention={inlineMention} />;
                }
                if (isUrl) {
                    return <Text onPress={() => navigate('WebViewBrowser', { url: this.getUrl(contentWord) })} style={{ color: 'blue' }}>{`${contentWord} `}</Text>;
                }
                return `${contentWord} `;
            });
        return result;
    };

    paragraphParse = (content) => {
        const result = [];
        content.split('\n').forEach((paragraph) => {
            result.push(this.linkableTextParser(paragraph));
            result.push('\n');
        });
        return <Text>{result}</Text>;
    }

    render() {
        const {
            content,
        } = this.props;
        return (
            <View>
                <Text selectable style={{ color: colors.grey }}>
                    { this.paragraphParse(content) }
                </Text>
            </View>
        );
    }
}

UserContent.defaultProps = {
    mentions: [],
};

UserContent.propTypes = {
    content: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string,
    }).isRequired,
    mentions: PropTypes.instanceOf(Object),
    navigation: PropTypes.instanceOf(Object).isRequired,
};

export default UserContent;
