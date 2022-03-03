import React, { Component } from "react";
import { Text, View } from "native-base";
import styles from "./styles";

export default class PageOne extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>What is Personality?</Text>
        <Text style={styles.description}>
          Very simply, your personality is a collection of things that you enjoy
          doing and don’t really enjoy doing called ‘preferences’.
        </Text>
      </View>
    );
  }
}
