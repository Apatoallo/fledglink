import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Container, Text, Content, Spinner, Thumbnail } from "native-base";
import PropTypes from "prop-types";
import FirebaseAnalytics from "../../Services/FirebaseAnalytics";
import MarkDownComponent from "../../shared/MarkDownComponent";
import CardNotificationComponent from "../../shared/cardNotificationComponent";
import ThumbnailFledglink from "../../shared/thumbnailFledglink";

const flBird = require("../../../images/color-bird.png");

class FlAnnounceNotification extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.props.navigation.state.params
    };
  }

  renderBody = ({ navigation, title, fullText }) => (
    <Fragment>
      <Text style={{ fontSize: 20 }}>{title}</Text>
      <MarkDownComponent navigation={navigation} content={fullText} />
    </Fragment>
  );

  componentWillReceiveProps = nextProps => {
    const {
      notification,
      navigation: { goBack }
    } = this.props;
    if (notification !== nextProps.notification && !nextProps.notification) {
      goBack();
    }
  };

  componentDidMount = async () => {
    FirebaseAnalytics.setCurrentScreen("FlAnnounce", "FlAnnounce");
  };

  render() {
    const { navigation, notification = {} } = this.props;
    const { title, fullText, updatedAt } = notification;
    return (
      <Container
        style={{
          flex: 1
        }}
      >
        <Content>
          {!notification ? (
            <Spinner />
          ) : (
            <CardNotificationComponent
              bodyComponent={this.renderBody({ navigation, title, fullText })}
              thumbnailComponent={<ThumbnailFledglink />}
              updatedAt={updatedAt}
            />
          )}
        </Content>
      </Container>
    );
  }
}

FlAnnounceNotification.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  notification: PropTypes.shape({
    title: PropTypes.string,
    fullText: PropTypes.string
  }).isRequired
};

const mapStateToProps = (state, props) => {
  const { id } = props.navigation.state.params;
  const notification =
    state.notifications.notificationList.find(item => item.id === id) || {};
  return {
    token: state.token.token,
    notification
  };
};

export default connect(mapStateToProps)(FlAnnounceNotification);
