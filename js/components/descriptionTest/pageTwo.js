import React, { Component } from "react";
import {
  Text,
  View
} from "native-base";
import styles from "./styles";

export default class PageTwo extends Component {
  render() {
    return (
    <View style={styles.wrapper}>
        <Text style={styles.title}>Why does it matter for work?</Text>
        <Text style={styles.description}>Just like you, all companies are different. They like to see whether you’d suit the type of activities required in their job and fit well within their company based on these preferences. But it’s just as important for you to decide whether a company or a job is ‘right’ for you too.</Text>
    </View>
    );
  }
}
