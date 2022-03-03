import React, { PureComponent } from "react";
import { Text, View } from "native-base";
import { FlatList, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import QualityComponent from "./QualityComponent";
import { colors, fonts } from "../../configs/config";

const rocketImage = require("../../../images/rocket.png");

const styles = {
  button: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 52,
    width: "100%",
    borderRadius: 40,
    borderColor: colors.violet,
    backgroundColor: colors.violet,
    marginRight: 10,
    marginTop: 18
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 16,
    fontFamily: fonts.bold
  },
  buttonIcon: {
    color: colors.violet,
    fontSize: 18,
    width: "100%",
    textAlign: "center"
  },
  image: {
    marginRight: 8,
    height: 30,
    width: 30
  },
  fillText: {
    color: colors.grey
  }
};

const emptyQualities = [
  {
    id: 0,
    name: null,
    count: 8
  },
  {
    id: 1,
    name: null,
    count: 7
  },
  {
    id: 2,
    name: null,
    count: 5
  },
  {
    id: 3,
    name: null,
    count: 4
  },
  {
    id: 4,
    name: null,
    count: 3
  }
];

export default class QualitiesList extends PureComponent {
  render() {
    const {
      qualities,
      navigation: { navigate },
      userId,
      myProfile
    } = this.props;
    const isEmpty = qualities.votesCount === 0;
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10
          }}
        >
          <Text style={{ fontSize: 18 }}>Top Qualities</Text>
          <Text note>As chosen by peers</Text>
        </View>
        {myProfile && isEmpty ? (
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.fillText}>
              You have no feedback yet on your top qualities. Invite your
              network to give you feedback and discover what makes you great.
            </Text>
          </View>
        ) : null}
        <FlatList
          data={!isEmpty ? qualities.values : emptyQualities}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <QualityComponent
              name={item.name}
              count={item.count}
              votesCount={!isEmpty ? qualities.votesCount : 10}
            />
          )}
        />
        {myProfile ? (
          <TouchableOpacity
            transparent
            onPress={() => navigate("BoostQualities", { userId })}
            style={styles.button}
          >
            <Image style={styles.image} source={rocketImage} />
            <Text style={styles.buttonText}>BOOST YOUR QUALITIES</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

QualitiesList.propTypes = {
  myProfile: PropTypes.bool.isRequired
};
