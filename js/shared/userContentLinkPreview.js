import React, { PureComponent } from 'react';
import { View } from 'native-base';
import PropTypes from 'prop-types';
import ImageShowComponent from '../components/PostComponent/imageShowComponent';
import ExternalLinkComponent from '../components/PostComponent/externalLinkComponent';
import ResourceLinkComponent from '../components/PostComponent/resourceLinkComponent';

class UserContentLinkPreview extends PureComponent {
    render() {
        const {
            message,
            navigation,
            showCanceling,
            removeImageAction,
            removeResourceAction,
        } = this.props;
        return (
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
                { !!message.image && (
                    <ImageShowComponent
                        image={message.image}
                        showCanceling={showCanceling}
                        deletePhoto={removeImageAction}
                    />
                ) }
                { !!message.link && (
                    <ResourceLinkComponent
                        item={message.link}
                        showCanceling={showCanceling}
                        navigation={navigation}
                        cancelLink={removeResourceAction}
                        linkType={message.linkType ? message.linkType : message.link.resourceType}
                    />
                ) }
                { !!message.preview && (
                    <ExternalLinkComponent preview={message.preview} navigation={navigation} />
                ) }
            </View>
        );
    }
}

UserContentLinkPreview.defaultProps = {
    showCanceling: false,
};

UserContentLinkPreview.propTypes = {
    message: PropTypes.shape({
        image: PropTypes.string,
        link: PropTypes.instanceOf(Object),
        preview: PropTypes.instanceOf(Object),
        linkType: PropTypes.string,
    }).isRequired,
    navigation: PropTypes.instanceOf(Object).isRequired,
    showCanceling: PropTypes.bool,
    removeImageAction: PropTypes.func.isRequired,
    removeResourceAction: PropTypes.func.isRequired,
};

export default UserContentLinkPreview;
