import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Text,
  Right,
  Body,
  View,
  Toast,
  Spinner
} from "native-base";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import MarkDownComponent from "../../shared/MarkDownComponent";
import { getResourceById } from "../../actions/resources";
import { colors } from "../../configs/config";
import { resourceShare } from "../../utils/shareResource";
import { getHeaderHeight } from "../../App";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";

const backgroundProfile = require("../../../images/headerImage.png");

const resourcePage = StyleSheet.create({
  parallaxBgImage: {
    width: null,
    height: 300
  },
  parallaxFixedHeader: {
    position: "absolute",
    bottom: 5,
    left: 5,
    right: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  titleText: {
    color: colors.violet,
    fontSize: 24,
    fontFamily: "OpenSans-Bold",
    fontWeight: "700"
  },
  tagsWrapper: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 12,
    paddingBottom: 8
  },
  tagName: {
    marginRight: 10,
    fontSize: 12,
    color: colors.grey
  }
});

class ResourceView extends Component {
  static navigationOptions = ({ navigation }) => {
    const externalShare = navigation.getParam("externalShare");
    return {
      headerRight: (
        <View style={{ flexDirection: "row", marginRight: 12 }}>
          <TouchableWithoutFeedback transparent onPress={externalShare}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 6
              }}
            >
              <Icon
                style={{ color: "white", fontSize: 24 }}
                name="share"
                type="Feather"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.props.navigation.state.params,
      resource: {},
      loading: true
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      externalShare: this.externalShared
    });
  }

  setResourceToState = resource => {
    this.setState({ resource, loading: false });
  };

  componentWillMount = () => {
    const { getResourceById, token } = this.props;
    FirebaseAnalytics.setCurrentScreen("Resource Detail", "Resources");
    getResourceById(token, this.state.id, this.setResourceToState);
  };

  externalShared = () => {
    const {
      resource: { id }
    } = this.state;
    resourceShare("resources", id);
  };

  parallaxBackground = () => (
    <Image
      source={
        this.state.resource.image
          ? { uri: this.state.resource.image }
          : backgroundProfile
      }
      style={resourcePage.parallaxBgImage}
    />
  );

  parallaxStickyHeader = () => (
    <ImageBackground
      source={backgroundProfile}
      style={{ height: getHeaderHeight(), width: null }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 100
          }}
        >
          <Title style={{ color: colors.white }}>
            {this.state.resource.title}
          </Title>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );

  render() {
    const { resource, loading } = this.state;
    return loading ? (
      <Spinner />
    ) : (
      <Container style={{ backgroundColor: "#fff" }}>
        <View style={{ flex: 1 }}>
          <ParallaxScrollView
            headerBackgroundColor="transparent"
            parallaxHeaderHeight={300}
            stickyHeaderHeight={getHeaderHeight()}
            backgroundSpeed={10}
            scrollIndicatorInsets={{ right: 1 }}
            renderBackground={this.parallaxBackground}
            renderStickyHeader={this.parallaxStickyHeader}
          >
            <View style={{ padding: 20 }}>
              <Text style={resourcePage.titleText}>{resource.title}</Text>
              <View style={resourcePage.tagsWrapper}>
                {resource.tags &&
                  resource.tags.map((item, i) => (
                    <Text uppercase key={i} style={resourcePage.tagName}>
                      {item.name}
                    </Text>
                  ))}
              </View>
              <MarkDownComponent
                navigation={this.props.navigation}
                content={resource.content}
              />
            </View>
          </ParallaxScrollView>
        </View>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    getResourceById: (token, resourceId, setResourceToState) =>
      dispatch(getResourceById(token, resourceId, setResourceToState))
  };
}

const mapStateToProps = state => ({
  token: state.token.token
});

export default connect(
  mapStateToProps,
  bindAction
)(ResourceView);
