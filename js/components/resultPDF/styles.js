import { colors } from '../../configs/config';

const React = require('react-native');

const { StyleSheet, Platform, Dimensions } = React;
export default {
  container: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
  },
  pdf: {
    flex: 1,
    width:Dimensions.get('window').width
  }
};
