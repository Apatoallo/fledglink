import React, { Component } from "react";
import { Text, View } from "native-base";
import styles from "./styles";

export default class PageThree extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>Who sees my Results?</Text>
        <Text style={styles.description}>
          Your results will only be visible to you in the app. The Fledglink team may use this information to help match you to careers and employers or if you attend any Fledglink workshops. We will only share the results with employers as part of a recruitment process with your permission.
        </Text>
      </View>
    );
  }
}
