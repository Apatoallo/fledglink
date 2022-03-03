import React, { Component } from "react";
import { connect } from "react-redux";
import { Title, Text, View, Tabs, Tab, Spinner } from "native-base";
import PropTypes from "prop-types";
import {
  Image,
  ImageBackground,
  Modal,
  Dimensions,
  StyleSheet,
  Platform,
  SafeAreaView
} from "react-native";
import { HeaderBackButton } from "react-navigation";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import {
  subscribeCompany,
  getCompanyById,
  clearCurrentCompany
} from "../../actions/company";
import { colors, fonts } from "../../configs/config";
import { getHeaderHeight } from "../../App";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";
import { getOpportunityListForCompany } from "../../actions/companyOpportunities";

import About from "./about";
import Info from "./info";
import OpportunityList from "./OpportunityList";
import FollowedButton from "./FollowedButton";
import Badge from "../Opportunity/Badge";
import styles from "../../styles/tabs";
import CompanyProfileBadge from "../modals/CompanyProfileBadge";
import FilterButton from "../../shared/filters/FilterButton";

const backgroundHeader = require("../../../images/HeaderBackground.png");
const undefinedUser = require("../../../images/no-company-image.png");
const backgroundProfile = require("../../../images/headerImage.png");

const { width } = Dimensions.get("window");

const companyProfile = StyleSheet.create({
  parallaxOverlay: {
    position: "absolute",
    top: 0,
    width,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    height: 170
  },
  parallaxImage: {
    width: null,
    height: 170
  },
  foregroundWrapper: {
    height: 170,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  foregroundImageWrapper: {
    alignSelf: "center",
    overflow: "visible",
    backgroundColor: colors.white,
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
  foregroundImage: {
    height: 88,
    width: 123
  },
  headerWrapper: {
    position: "absolute",
    bottom: 5,
    left: 5,
    right: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  bodyBlock: {
    alignItems: "center",
    zIndex: 0,
    marginLeft: 20,
    marginRight: 20,
    padding: 10
  },
  badgesBlock: {
    width: "100%",
    padding: 10,
    backgroundColor: colors.gallery
  },
  infoContainer: {
    paddingVertical: 10
  },
  titleBlock: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
    textAlign: "center"
  },
  badgeInfo: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.warmGrey,
    textAlign: "center",
    marginTop: 6
  },
  badgeWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 15
  }
});

class CompanyProfile extends Component {
  static propTypes = {
    token: PropTypes.string,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired
  };

  static navigationOptions = ({ navigation }) => {
    const back = navigation.getParam("back");
    return {
      headerLeft: <HeaderBackButton tintColor="#ffffff" onPress={back} />
    };
  };

  constructor(props) {
    super(props);
    this.oldItemIndex = 0;
    this.state = {
      showModal: false,
      titleModal: "",
      textModal: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ back: this.goBack, share: this.sharedCompany });
  }

  componentWillMount = () => {
    const {
      token,
      navigation,
      getCompanyById,
      getOpportunityListForCompany
    } = this.props;
    FirebaseAnalytics.setCurrentScreen("Company Detail", "Company");
    getCompanyById(token, navigation.state.params.corpId);
    getOpportunityListForCompany(token, navigation.state.params.corpId, 0);
  };

  badgeClick = (textModal, titleModal) => {
    this.setState({ showModal: true, textModal, titleModal });
  };

  subscribeCompany = () => {
    const { subscribeCompany, company } = this.props;
    subscribeCompany(company.id, company.isSubscribed);
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  goBack = () => {
    const { clearCurrentCompany, navigation } = this.props;
    clearCurrentCompany();
    navigation.goBack(null);
  };

  parallaxForeground = () => <View style={companyProfile.foregroundWrapper} />;

  parallaxBackground = () => (
    <View>
      <Image
        source={
          this.props.company.backgroundTakeover
            ? { uri: this.props.company.backgroundTakeover }
            : backgroundProfile
        }
        style={companyProfile.parallaxImage}
      />
      <View style={companyProfile.parallaxOverlay} />
    </View>
  );

  parallaxStickyHeader = () => (
    <ImageBackground
      source={backgroundHeader}
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
            {this.props.company.baseInfo.name}
          </Title>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );

  opportunityClickHandler = itemId => {
    this.props.navigation.navigate("OpportunityPage", { id: itemId });
  };

  handleScroll = event => {
    const {
      token,
      getOpportunityListForCompany,
      navigation,
      opportunities
    } = this.props;
    const itemHeight = 100;
    const currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
    const currentItemIndex = Math.ceil(currentOffset / itemHeight);
    const remainder = currentItemIndex % 5;
    if (!remainder && this.oldItemIndex < currentItemIndex) {
      this.oldItemIndex = currentItemIndex;
      getOpportunityListForCompany(
        token,
        navigation.state.params.corpId,
        opportunities.length
      );
    }
  };

  render() {
    const {
      company,
      disabledButton,
      opportunitiesLoaded,
      getOpportunityListForCompany,
      token,
      navigation
    } = this.props;
    const { titleModal, textModal, showModal } = this.state;
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        {company && company.baseInfo ? (
          <ParallaxScrollView
            onScroll={this.handleScroll}
            scrollEventThrottle={170}
            headerBackgroundColor="white"
            parallaxHeaderHeight={170}
            stickyHeaderHeight={getHeaderHeight()}
            backgroundSpeed={10}
            scrollIndicatorInsets={{ right: 1 }}
            renderBackground={this.parallaxBackground}
            renderForeground={this.parallaxForeground}
            renderStickyHeader={this.parallaxStickyHeader}
          >
            <View style={companyProfile.foregroundImageWrapper}>
              <Image
                source={
                  company.baseInfo.logo
                    ? { uri: company.baseInfo.logo }
                    : undefinedUser
                }
                resizeMode="contain"
                style={companyProfile.foregroundImage}
              />
            </View>
            <View style={companyProfile.bodyBlock}>
              <Text
                style={{
                  fontSize: 24,
                  color: colors.darkViolet,
                  fontFamily: fonts.bold,
                  marginBottom: 4
                }}
              >
                {company.baseInfo.name}
              </Text>
              {company.industry && (
                <Text style={{ fontSize: 18, marginBottom: 4 }}>
                  {company.industry}
                </Text>
              )}
              {company.locations &&
                company.locations.find(location => location.isHeadquarters) && (
                  <Text style={{ fontSize: 18, marginBottom: 4 }}>
                    {
                      company.locations.find(
                        location => location.isHeadquarters
                      ).name
                    }
                  </Text>
                )}
            </View>
            <FollowedButton
              text={company.isSubscribed ? "unfollow" : "follow"}
              onPress={this.subscribeCompany}
              disabledButton={disabledButton}
            />
            {company.badges.length > 0 && (
              <View style={companyProfile.badgesBlock}>
                <View style={companyProfile.infoContainer}>
                  <Text style={companyProfile.titleBlock}>
                    Diversity & Inclusivity
                  </Text>
                  <Text style={companyProfile.badgeInfo}>
                    These badges give you insights into a company’s diversity
                    and inclusivity policies, click each badge to discover more.
                  </Text>
                </View>
                <View style={companyProfile.badgeWrapper}>
                  {company.badges.map(badge => (
                    <Badge
                      onClickHandler={this.badgeClick}
                      badge={badge}
                      key={badge.id}
                      text={badge.title}
                      centre
                    />
                  ))}
                </View>
                <FilterButton
                  title="Learn more about the categories"
                  clickHandler={() =>
                    navigation.navigate("DiversityCategories")
                  }
                />
              </View>
            )}
            <Tabs {...styles.tabsStyles}>
              <Tab heading="Overview" {...styles.tabStyles}>
                <About
                  tabLabel="Overview"
                  about={company.overview}
                  companyValues={company.companyValues}
                  earlyCareers={company.earlyCareers}
                  additionalInfo={company.additionalInfo}
                  companyName={company.baseInfo.name}
                  navigation={navigation}
                />
              </Tab>
              <Tab heading="Info" {...styles.tabStyles}>
                <Info
                  tabLabel="Info"
                  website={company.website}
                  headquarter={
                    company.headquarter
                      ? `${company.headquarter.name}, ${company.headquarter.description}`
                      : null
                  }
                  industry={company.industry}
                  companyType={company.companyType}
                  specialties={company.sectors}
                  founded={company.founded}
                  locations={company.locations}
                  navigation={navigation}
                />
              </Tab>
              <Tab heading="Opportunities" {...styles.tabStyles}>
                <OpportunityList
                  loaded={opportunitiesLoaded}
                  loadMore={length =>
                    getOpportunityListForCompany(
                      token,
                      this.props.navigation.state.params.corpId,
                      length
                    )
                  }
                  tabLabel="Opportunities"
                  company={this.props.company}
                  opportunities={this.props.opportunities}
                  opportunitiesLoaded={this.props.opportunitiesLoaded}
                  onPress={this.opportunityClickHandler}
                />
              </Tab>
            </Tabs>
          </ParallaxScrollView>
        ) : (
          <Spinner />
        )}

        <Modal
          animationType="slide"
          transparent
          visible={showModal}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <CompanyProfileBadge
            titleModal={titleModal}
            textModal={textModal}
            closeModalHandler={this.closeModal}
          />
        </Modal>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    subscribeCompany: (companyId, isSubscribed) =>
      dispatch(subscribeCompany(companyId, isSubscribed)),
    getOpportunityListForCompany: (token, id, length) =>
      dispatch(getOpportunityListForCompany(token, id, length)),
    getCompanyById: (token, id) => dispatch(getCompanyById(token, id)),
    clearCurrentCompany: () => dispatch(clearCurrentCompany())
  };
}

const mapStateToProps = (state, props) => ({
  token: state.token.token,
  company: state.company.company
    ? state.company.company
    : state.company.companies.filter(
        ({ id }) => id === props.navigation.state.params.corpId
      )[0],
  opportunities: state.companyOpportunities.opportunities,
  disabledButton: state.company.disabledButton,
  opportunitiesLoaded: state.companyOpportunities.opportunitiesLoaded
});

export default connect(
  mapStateToProps,
  bindAction
)(CompanyProfile);
