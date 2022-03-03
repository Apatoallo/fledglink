import React, { Component } from "react";
import { Text, View } from "native-base";
import styles from "./styles";

export default class PageFour extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>Completing the Questionnaire</Text>
        <Text style={styles.description}>
          It takes about 20-25 minutes to complete a Personality Questionnaire.
        </Text>
        <Text style={styles.description}>
          Do it in your own quiet time. Don’t waste the opportunity to do it
          properly, but also don’t over analyse your answers! This could mean
          the difference between getting a job you will love and a job you
          won’t!
        </Text>
      </View>
    );
  }
}
