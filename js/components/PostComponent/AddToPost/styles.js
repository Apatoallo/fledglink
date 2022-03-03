import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default {
    mainWrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchWrapper: {
        height: height - 60,
    },
};
