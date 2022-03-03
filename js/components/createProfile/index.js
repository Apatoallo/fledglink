import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, Spinner, Icon } from "native-base";
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import {
  updateUser,
  previousPage,
  selectItem,
  handlerInputChange,
  setProfileData
} from "../../actions/register";
import AuthButton from "../../shared/authButton";
import ProgressBarComponent from "../../shared/progressBar";
import WizardNavigationButton from "../../shared/wizardNavigationButton";
import HeaderRegistration from "../../shared/registrationHeader";
import { colors } from "../../configs/config";
import { setUserOptions } from "../../actions/userOptions";
import FieldsComponent from "./fieldsComponent";
import LocationFields from "./locationFields";
import DiversityFields from "./diversityFields";
import styles from "./styles";

const { height, width } = Dimensions.get("window");

class CreateProfile extends Component {
  state = {
    modalOpen: null,
    errors: {}
  };

  componentDidMount = () => {
    this.props.setUserOptions(this.props.token);
  };

  actionFunction = (value, checked) => {
    const { selectItem } = this.props;
    return selectItem(value, checked);
  };

  submitPage = () => {
    const handleErrors = errors => this.setState({ errors });
    this.props.updateUser(handleErrors);
  };

  render() {
    const {
      userOptions,
      previousPage,
      pageNumber,
      page,
      pagesLength,
      user,
      handlerInputChange,
      loading,
      setProfileData
    } = this.props;
    const { modalOpen, errors } = this.state;
    return (
      <View style={{ height, width, backgroundColor: "#f7f7f7" }}>
        {Object.keys(userOptions).length > 0 ? (
          <View style={{ flex: 1 }}>
            <WizardNavigationButton
              pressBack={
                page.disabledBackButton
                  ? () => this.props.navigation.goBack()
                  : previousPage
              }
            />
            <ProgressBarComponent
              pageNumber={pageNumber + 1}
              pageQuantity={pagesLength}
            />
            <View style={styles.headerWrapper}>
              <HeaderRegistration
                secondaryText={
                  pageNumber === 3
                    ? ""
                    : "Let’s get started with your dashboard"
                }
                primaryText={page.title}
                logo={false}
              />
            </View>

            {page.canMultiSelect && (
              <Text style={styles.hint}>
                You can select more than one
                {pageNumber === 2 &&
                  ". We’ll let you know about jobs in these locations +20 miles"}
              </Text>
            )}

            <SafeAreaView style={styles.scrollViewWrapper}>
              <KeyboardAwareScrollView
                style={styles.scrollView}
                keyboardShouldPersistTaps="handled"
              >
                {loading && (
                  <View style={styles.loadingWrapper}>
                    <Spinner color={colors.violet} />
                  </View>
                )}
                {pageNumber < 2 && (
                  <FieldsComponent
                    user={user}
                    options={page}
                    selectAction={this.actionFunction}
                    onChangeInput={handlerInputChange}
                    fields={page.selectData}
                  />
                )}
                {pageNumber === 2 && (
                  <LocationFields
                    fields={page.selectData}
                    data={user}
                    update={setProfileData}
                  />
                )}
                {pageNumber === 3 && (
                  <DiversityFields
                    options={userOptions}
                    openDiversityModal={() =>
                      this.setState({ modalOpen: "diversity" })
                    }
                    data={page.data}
                    update={setProfileData}
                    errors={errors}
                  />
                )}
              </KeyboardAwareScrollView>
            </SafeAreaView>

            <View style={styles.navigationWrapper}>
              <AuthButton
                textButton={page.mainButtonName}
                isDisable={loading || page.data === ""}
                pressButton={this.submitPage}
              />
              {pageNumber < pagesLength - 1 && (
                <TouchableOpacity
                  style={[styles.helpView, { marginTop: 15 }]}
                  onPress={() => this.setState({ modalOpen: "dashboard" })}
                >
                  <Text style={styles.helpText}>{"ⓘ"}</Text>
                  <Text style={[styles.helpText, styles.helpTextLink]}>
                    {"Your dashboard explained"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <Modal
              animationIn="slideInUp"
              isVisible={!!modalOpen}
              onBackdropPress={() => this.setState({ modalOpen: null })}
            >
              <ScrollView
                style={[styles.modalWrapper, { maxHeight: height * 0.8 }]}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ modalOpen: null })}
                >
                  <Icon name="ios-arrow-back" style={{ color: "white" }} />
                </TouchableOpacity>
                {modalOpen === "diversity" ? (
                  <>
                    <Text style={styles.modalHeading}>
                      ⓘ Why are we collecting this information?
                    </Text>
                    <Text style={styles.modalText}>
                      We collect this information from you to help us understand
                      the demographics of our app users and to help us take
                      positive action to support members of our community who
                      identify as being in groups which face barriers to
                      employment and socio-economic progression. You are not
                      forced to provide this information, but doing so helps us
                      provide you with a better service.
                    </Text>
                    <Text style={styles.modalText}>
                      We never share your personal data with third parties
                      unless you have given explicit consent e.g. as part of a
                      recruitment process.
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.modalHeading}>
                      ⓘ Your Dashboard Explained
                    </Text>
                    <Text style={styles.modalText}>
                      Set up your dashboard so that we know what your career
                      interests are. When completed you’ll be the first to hear
                      about opportunities when they go live on Fledglink.
                    </Text>
                    <Text style={styles.modalText}>
                      You can change your dashboard settings from your CV.
                    </Text>
                    <Image
                      style={styles.screenshot}
                      source={require("../../../images/Dashboard.png")}
                    />
                  </>
                )}
              </ScrollView>
            </Modal>
          </View>
        ) : (
          <Spinner />
        )}
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    selectItem: (value, checked) => dispatch(selectItem(value, checked)),
    updateUser: handleErrors => dispatch(updateUser(handleErrors)),
    setUserOptions: token => dispatch(setUserOptions(token)),
    previousPage: () => dispatch(previousPage()),
    handlerInputChange: data => dispatch(handlerInputChange(data)),
    setProfileData: data => dispatch(setProfileData(data))
  };
}

const mapStateToProps = state => {
  const currentPage = state.register.pageNumber;
  return {
    pages: state.register.pages,
    token: state.token.token,
    userOptions: state.userOptions.userOptionsList,
    page: state.register.pages[currentPage],
    pageNumber: currentPage,
    pagesLength: state.register.pages.length,
    loading: state.register.requestLoading,
    user: state.register.tempUser
  };
};

export default connect(
  mapStateToProps,
  bindAction
)(CreateProfile);
