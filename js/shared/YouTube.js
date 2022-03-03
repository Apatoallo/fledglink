import React, { PureComponent } from 'react';
import YouTube from 'react-native-youtube';
import PropTypes from 'prop-types';

export default class YouTubeComponent extends PureComponent {
    render() {
        const {
            videoId,
        } = this.props;
        return (
            <YouTube
                style={{ alignSelf: 'stretch', height: 300 }}
                videoId={videoId}
                play={true}
                apiKey='AIzaSyBFENplgyZIvL1qy90o3lN-X_n8UMfwrn4'
                fullscreen={true}
                loop={true}
                origin="https://www.youtube.com/"
                onReady={e => console.log('READY: ', e)}
                onChangeState={e => console.log(e)}
                onChangeQuality={e => console.log(e)}
                onError={e => console.log('ERROR: ', e)}
            />
        );
    }
}

YouTubeComponent.propTypes = {
    videoId: PropTypes.string.isRequired,
};
