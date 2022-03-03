import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Spinner,
  Title,
  Button,
  Icon,
  Text,
  View
} from "native-base";
import {
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { resourceShare } from "../../utils/shareResource";
import { formatDate } from "../../utils/formatDate";
import { findLocations } from "../../utils/findLocations";
import { getHeaderHeight } from "../../App";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";
import { colors } from "../../configs/config";
import {
  getOpportunityById,
  saveOpportunity,
  applyOpportunity
} from "../../actions/companyOpportunities";
import { trackOpportunityApplication } from "../../actions/analytics";
import MarkDownComponent from "../../shared/MarkDownComponent";

const { width } = Dimensions.get("window");
const undefinedUser = require("../../../images/no-company-image.png");
const backgroundProfile = require("../../../images/headerImage.png");

const fieldStyle = {
  paddingLeft: 5,
  paddingRight: 5,
  marginVertical: 5
};

const opportunityPage = StyleSheet.create({
  parallaxForeground: {
    height: 170,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  innerBlock: {
    alignSelf: "center",
    overflow: "visible",
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    elevation: 2,
    shadowColor: colors.grey,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    marginTop: Platform.OS === "ios" ? -54 : 10
  },
  image: {
    height: 88,
    width: 123
  },
  buttonWrapper: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: colors.violet,
    fontSize: 12,
    fontWeight: "bold"
  },
  buttonIcon: {
    color: colors.violet,
    fontSize: 12
  },
  parallaxBackgroundImage: {
    width: null,
    height: 170
  },
  parallaxBackgroundImageOverlay: {
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    height: 170
  },
  parallaxFixedHeader: {
    position: "absolute",
    bottom: 5,
    left: 5,
    right: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bodyTitleBlock: {
    alignItems: "center",
    zIndex: 0,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  jobTitle: {
    fontSize: 24,
    color: colors.darkViolet,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center"
  },
  keyInfo: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 9
  },
  buttonBlock: {
    flex: 1,
    paddingHorizontal: width / 10,
    justifyContent: "center",
    flexDirection: "row",
    height: 35,
    marginBottom: 28
  },
  button: {
    borderRadius: 4,
    flex: 0.5,
    justifyContent: "center",
    height: 35,
    marginHorizontal: 10
  },
  buttonViolet: {
    backgroundColor: colors.violet
  },
  buttonGrey: {
    backgroundColor: colors.lightGrey
  },
  contentWrapper: {
    marginHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10
  }
});

class OpportunityPage extends Component {
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
      opportunity: {},
      ...this.props.navigation.state.params,
      loading: true
    };
  }

  componentDidMount = () => {
    const { navigation, getOpportunityById, token } = this.props;
    const { id } = this.state;
    FirebaseAnalytics.setCurrentScreen("Opportunity Detail", "Opportunity");
    getOpportunityById(token, id, this.setOpportunityToState);
    navigation.setParams({
      externalShare: this.externalShared
    });
  };

  setOpportunityToState = opportunity => {
    this.setState({ opportunity, loading: false });
  };

  externalShared = () => {
    const {
      opportunity: { id }
    } = this.state;
    FirebaseAnalytics.setCurrentScreen("Share", "Opportunity");
    resourceShare("opportunities", id);
  };

  updateOpportunitySaveStatus = value => {
    this.setState({
      opportunity: { ...this.state.opportunity, isSaved: value }
    });
  };

  updateOpportunityApplyStatus = (value, link) => {
    const {
      navigation: { navigate }
    } = this.props;

    this.setState(
      {
        opportunity: { ...this.state.opportunity, isApplied: value }
      },
      () => (value ? this.trackApplicationStatus() : null)
    );

    if (value) {
      if (link) {
        navigate("WebViewBrowser", { url: link });
      } else {
        navigate("ApplicationComplete");
      }
    }
  };

  trackApplicationStatus = () => {
    const { opportunity } = this.state;
    const { trackOpportunityApplication } = this.props;

    trackOpportunityApplication(opportunity);
  };

  saveOpportunity = value => {
    const { saveOpportunity, token } = this.props;
    const { opportunity } = this.state;
    const body = { opportunityId: opportunity.id, isSaved: value };
    saveOpportunity(token, body, value, this.updateOpportunitySaveStatus);
  };

  applyOpportunity = (value, link) => {
    const { applyOpportunity, token } = this.props;
    const { opportunity } = this.state;
    const body = { opportunityId: opportunity.id, isApplied: value };

    applyOpportunity(
      token,
      body,
      value,
      link,
      this.updateOpportunityApplyStatus
    );
  };

  openCompanyProfile = () => {
    this.props.navigation.navigate("CompanyProfile", {
      corpId: this.state.opportunity.corporation.id
    });
  };

  parallaxForeground = () => (
    <View style={opportunityPage.parallaxForeground} />
  );

  parallaxBackground = () => (
    <View>
      <Image
        source={
          this.state.opportunity.corporation.backgroundTakeover
            ? { uri: this.state.opportunity.corporation.backgroundTakeover }
            : backgroundProfile
        }
        style={opportunityPage.parallaxBackgroundImage}
      />
      <View style={opportunityPage.parallaxBackgroundImageOverlay} />
    </View>
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
            {this.state.opportunity.jobTitle}
          </Title>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );

  render() {
    const { navigation } = this.props;
    const { opportunity, loading } = this.state;
    const {
      corporation,
      jobTitle,
      opportunityType,
      salary,
      applicationDeadline,
      startDate,
      isSaved,
      apply,
      isApplied,
      jobDescription,
      roleDescription,
      responsibilities,
      experienceAndInterests,
      jobType,
      candidateRequirements,
      sectors
    } = opportunity;
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        {(loading && <Spinner />) || (
          <ParallaxScrollView
            headerBackgroundColor="white"
            parallaxHeaderHeight={170}
            stickyHeaderHeight={getHeaderHeight()}
            backgroundSpeed={10}
            scrollIndicatorInsets={{ right: 1 }}
            renderForeground={this.parallaxForeground}
            renderBackground={this.parallaxBackground}
            renderStickyHeader={this.parallaxStickyHeader}
          >
            <View style={opportunityPage.innerBlock}>
              <Image
                source={
                  corporation.baseInfo.logo
                    ? { uri: corporation.baseInfo.logo }
                    : undefinedUser
                }
                resizeMode="contain"
                style={opportunityPage.image}
              />
            </View>
            <View style={opportunityPage.buttonWrapper}>
              <Button
                transparent
                style={{ alignSelf: "center" }}
                onPress={this.openCompanyProfile}
              >
                <Text uppercase style={opportunityPage.buttonText}>
                  view profile
                </Text>
                <Icon
                  name="arrow-right"
                  type="Feather"
                  style={opportunityPage.buttonIcon}
                />
              </Button>
            </View>
            <View style={{ overflow: "visible", paddingTop: 10 }}>
              <View style={opportunityPage.bodyTitleBlock}>
                <Text style={opportunityPage.jobTitle}>{jobTitle}</Text>
                {findLocations(opportunity).length > 0 && (
                  <Text style={opportunityPage.keyInfo}>
                    {findLocations(opportunity)
                      .map(location => location.name)
                      .join(", ")}
                  </Text>
                )}
                {opportunityType && (
                  <Text style={opportunityPage.keyInfo}>{opportunityType}</Text>
                )}
                {salary &&
                  salary.monetary &&
                  salary.monetary !== "Not disclosed" && (
                    <Text style={opportunityPage.keyInfo}>
                      {salary.monetary.trim()} per year
                    </Text>
                  )}
                {applicationDeadline && (
                  <Text style={opportunityPage.keyInfo}>
                    Closes: {formatDate(applicationDeadline)}
                  </Text>
                )}
                {startDate && (
                  <Text style={opportunityPage.keyInfo}>
                    Start date: {formatDate(startDate)}
                  </Text>
                )}
              </View>
              <View style={opportunityPage.buttonBlock}>
                <Button
                  onPress={() => this.saveOpportunity(!isSaved)}
                  style={[opportunityPage.button, opportunityPage.buttonGrey]}
                >
                  <Text
                    uppercase
                    style={{ color: colors.black, fontWeight: "bold" }}
                  >
                    {isSaved ? "saved" : "save"}
                  </Text>
                </Button>

                <Button
                  onPress={() => {
                    if (apply.action) {
                      const link = apply.action.url;
                      this.applyOpportunity(!isApplied, link);
                    } else {
                      this.applyOpportunity(!isApplied);
                    }
                  }}
                  style={[opportunityPage.button, opportunityPage.buttonViolet]}
                >
                  <Text uppercase style={{ fontWeight: "bold" }}>
                    {isApplied ? "applied" : "apply"}
                  </Text>
                </Button>
              </View>
              <View style={opportunityPage.contentWrapper}>
                {jobDescription && (
                  <View style={fieldStyle}>
                    <Text style={{ fontSize: 20 }}>Job Description</Text>
                    <MarkDownComponent
                      navigation={navigation}
                      content={jobDescription}
                    />
                  </View>
                )}
                {roleDescription && (
                  <View style={fieldStyle}>
                    <Text style={{ fontSize: 20 }}>The Role</Text>
                    <MarkDownComponent
                      navigation={navigation}
                      content={roleDescription}
                    />
                  </View>
                )}
                {responsibilities && (
                  <View style={fieldStyle}>
                    <Text style={{ fontSize: 20 }}>Key Responsibilities</Text>
                    <MarkDownComponent
                      navigation={navigation}
                      content={responsibilities}
                    />
                  </View>
                )}
                {experienceAndInterests && (
                  <View style={fieldStyle}>
                    <Text style={{ fontSize: 20 }}>
                      Ideal Experience And Interests
                    </Text>
                    <MarkDownComponent
                      navigation={navigation}
                      content={experienceAndInterests}
                    />
                  </View>
                )}
                {jobType && (
                  <View style={fieldStyle}>
                    <Text style={{ fontSize: 20 }}>Job Type</Text>
                    <MarkDownComponent
                      navigation={navigation}
                      content={jobType}
                    />
                  </View>
                )}
                {opportunityType && (
                  <View style={fieldStyle}>
                    <Text style={{ fontSize: 20 }}>Employment Type</Text>
                    <MarkDownComponent
                      navigation={navigation}
                      content={opportunityType}
                    />
                  </View>
                )}
                {candidateRequirements && (
                  <View style={fieldStyle}>
                    <Text style={{ fontSize: 20 }}>Candidate Level</Text>
                    <MarkDownComponent
                      navigation={navigation}
                      content={candidateRequirements}
                    />
                  </View>
                )}
                {sectors.length > 0 && (
                  <View style={fieldStyle}>
                    <Text style={{ fontSize: 20 }}>Industry</Text>
                    {sectors.map(sector => (
                      <MarkDownComponent
                        navigation={navigation}
                        content={sector}
                      />
                    ))}
                  </View>
                )}
              </View>
              <View style={opportunityPage.buttonBlock}>
                <Button
                  onPress={() => this.saveOpportunity(!isSaved)}
                  style={[opportunityPage.button, opportunityPage.buttonGrey]}
                >
                  <Text
                    uppercase
                    style={{ color: colors.black, fontWeight: "bold" }}
                  >
                    {isSaved ? "saved" : "save"}
                  </Text>
                </Button>

                <Button
                  onPress={() => {
                    if (apply.action) {
                      const link = apply.action.url;
                      this.applyOpportunity(!isApplied, link);
                    } else {
                      this.applyOpportunity(!isApplied);
                    }
                  }}
                  style={[opportunityPage.button, opportunityPage.buttonViolet]}
                >
                  <Text uppercase style={{ fontWeight: "bold" }}>
                    {isApplied ? "applied" : "apply"}
                  </Text>
                </Button>
              </View>
            </View>
          </ParallaxScrollView>
        )}
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    getOpportunityById: (token, opportunityId, setOpportunityToState) =>
      dispatch(getOpportunityById(token, opportunityId, setOpportunityToState)),
    saveOpportunity: (token, body, value, cb) =>
      dispatch(saveOpportunity(token, body, value, cb)),
    applyOpportunity: (token, body, value, link, cb) =>
      dispatch(applyOpportunity(token, body, value, link, cb)),
    trackOpportunityApplication: opportunity =>
      dispatch(trackOpportunityApplication(opportunity))
  };
}

const mapStateToProps = state => ({
  token: state.token.token
});

export default connect(
  mapStateToProps,
  bindActions
)(OpportunityPage);
