import React, { Component } from "react";
import { View, FlatList, Dimensions, Platform } from "react-native";

export default class ListComponent extends Component {
  render() {
    const {
      dataArray,
      ListItemComponent,
      navigation,
      editClickHandler,
      onEnableScroll,
      enableScrollViewScroll
    } = this.props;
    return (
      <View
        style={{
          maxHeight: Dimensions.get("window").height * 0.6
        }}
        onStartShouldSetResponderCapture={() => {
          if (onEnableScroll) {
            onEnableScroll(false);
            if (
              this.flatlist._listRef._scrollMetrics.offset === 0 &&
              enableScrollViewScroll === false
            ) {
              onEnableScroll(true);
            }
          }
        }}
      >
        <FlatList
          data={dataArray}
          extraData={this.props}
          keyExtractor={item => item.id}
          ref={ref => (this.flatlist = ref)}
          renderItem={({ item, index }) => (
            <ListItemComponent
              key={item.id}
              elementIndex={index}
              editClickHandler={editClickHandler}
              navigation={navigation}
              item={item}
            />
          )}
        />
      </View>
    );
  }
}
