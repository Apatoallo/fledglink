import React, { PureComponent } from "react";
import { List, ListItem, View, Text, Icon } from "native-base";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors, fonts } from "../../configs/config";

const styles = StyleSheet.create({
  listWrapper: {
    width: "100%",
    height: 50,
    marginLeft: 0,
    paddingRight: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  listTittleWrapper: {
    flex: 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  tittleText: {
    color: colors.darkViolet,
    fontSize: 18,
    marginLeft: 10
  },
  tittleIcon: {
    fontSize: 24,
    color: colors.violet
  },
  actionWrapper: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: 70,
    height: 30
  },
  actionText: {
    fontFamily: fonts.bold,
    color: colors.violet,
    fontSize: 12
  }
});

class ListInfo extends PureComponent {
  render() {
    const { connectionsCount, onPress, connectionRequestsCount } = this.props;
    return (
      <List style={{ marginVertical: 20 }}>
        <ListItem
          style={styles.listWrapper}
          onPress={() => onPress("ConnectionsListSelf")}
        >
          <View style={styles.listTittleWrapper}>
            <Icon name="user" type="Feather" style={styles.tittleIcon} />
            <Text style={styles.tittleText}>{`${connectionsCount ||
              0} Connections`}</Text>
          </View>
          <TouchableOpacity
            style={styles.actionWrapper}
            onPress={() => onPress("UserSearch")}
          >
            <Text uppercase style={styles.actionText}>
              add
            </Text>
          </TouchableOpacity>
        </ListItem>

        <ListItem
          style={styles.listWrapper}
          onPress={() => onPress("PendingConnections")}
        >
          <View style={styles.listTittleWrapper}>
            <Icon name="link" type="Feather" style={styles.tittleIcon} />
            <Text style={styles.tittleText}>
              {`${connectionRequestsCount || 0} Pending Invitations`}
            </Text>
          </View>
          <View style={styles.actionWrapper}>
            <Text uppercase style={styles.actionText}>
              manage
            </Text>
          </View>
        </ListItem>

        <ListItem
          style={styles.listWrapper}
          onPress={() => onPress("PeopleNear")}
        >
          <View style={styles.listTittleWrapper}>
            <Icon name="crosshair" type="Feather" style={styles.tittleIcon} />
            <Text style={styles.tittleText}>People near me</Text>
          </View>
          <View style={styles.actionWrapper}>
            <Text uppercase style={styles.actionText}>
              find
            </Text>
          </View>
        </ListItem>
      </List>
    );
  }
}

ListInfo.propTypes = {
  connectionsCount: PropTypes.number.isRequired,
  connectionRequestsCount: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired
};

export default ListInfo;
