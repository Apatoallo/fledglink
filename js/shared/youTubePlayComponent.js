import { YouTubeStandaloneAndroid, YouTubeStandaloneIOS } from 'react-native-youtube';
import { Platform } from 'react-native';

const videoOptions = {
    apiKey: 'AIzaSyBFENplgyZIvL1qy90o3lN-X_n8UMfwrn4',
    autoplay: true,
};

const YouTubeStandalonePlay = videoId => (
    Platform.OS === 'android' ? (
        YouTubeStandaloneAndroid.playVideo({ ...videoOptions, videoId })
            .then(() => console.log('Standalone Player Exited'))
            .catch(error => console.log(error))
    ) : (
        YouTubeStandaloneIOS.playVideo(videoId)
            .then(() => console.log('Standalone Player Exited'))
            .catch(error => console.log(error))
    )

);

export default YouTubeStandalonePlay;
