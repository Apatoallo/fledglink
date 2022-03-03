import React, { PureComponent } from "react";
import { Text, View, Input } from "native-base";
import styles from "../EditIntro/styles";
import { colors } from "../../configs/config";

export default class Textarea extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
  }

  render() {
    const {
      input,
      label,
      placeholder,
      type,
      meta: { touched, error, warning },
      textareaProps
    } = this.props;
    const { height } = this.state;
    return (
      <View
        style={{
          borderBottomColor: colors.grey,
          borderBottomWidth: 0.5,
          marginBottom: 20,
          minHeight: 30,
          width: "100%",
          flexDirection: "column",
          alignSelf: "flex-start"
        }}
      >
        <Text
          style={{
            color: colors.grey,
            fontWeight: "100",
            marginTop: 5
          }}
        >
          {label}
        </Text>
        <Input
          multiline
          placeholder={placeholder}
          style={[styles.input, { height, minHeight: 70 }]}
          onContentSizeChange={event => {
            this.setState({ height: event.nativeEvent.contentSize.height });
          }}
          {...input}
        />
      </View>
    );
  }
}
