import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { Container } from "native-base";
import PropTypes from "prop-types";
import { find } from "lodash";
import FirebaseAnalytics from "../../../Services/FirebaseAnalytics";
import ResourceListItem from "./ResourceListItem";
import ToastComponent from "../../../shared/ToastComponent";
import {
  getResources,
  resetResourcesRange,
  resetResources
} from "../../../actions/resources";
import { trackResourceView } from "../../../actions/analytics";
import PlaceholderComponent from "../../../shared/PlaceholderComponent";

class ResourcesList extends Component {
  static navigationOptions = {
    header: null
  };

  static propTypes = {
    token: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    return this.props.resources !== nextProps.resources;
  }

  componentDidMount = () => {
    const { getResources, token } = this.props;
    FirebaseAnalytics.setCurrentScreen("Resource List", "Resources");
    getResources(token);
  };

  resourceNavigate = resource => {
    const isLocked = find(resource.tags, ["name", "Locked"]);
    isLocked
      ? ToastComponent("It is locked for you")
      : this.viewResource(resource);
  };

  viewResource = resource => {
    const { navigation, trackResourceView } = this.props;

    trackResourceView(resource);
    navigation.navigate("ResourceView", { id: resource.id });
  };

  resourcesOnRefresh = () => {
    const {
      resetResources,
      resetResourcesRange,
      getResources,
      token
    } = this.props;
    resetResourcesRange();
    resetResources();
    getResources(token);
  };

  render() {
    const {
      navigation,
      user,
      resources,
      getResources,
      token,
      resourcesLoaded,
      allResourcesLoaded
    } = this.props;
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <FlatList
          data={resources}
          keyExtractor={item => item.id}
          onEndReached={() => {
            if (!resourcesLoaded || allResourcesLoaded) return;
            getResources(token);
          }}
          onRefresh={this.resourcesOnRefresh}
          refreshing={!resourcesLoaded}
          onEndReachedThreshold={0.3}
          ListEmptyComponent={
            <PlaceholderComponent
              count={4}
              onReady={resourcesLoaded}
              height={160}
            />
          }
          renderItem={({ item }) => (
            <ResourceListItem
              resource={item}
              resourceClickHandler={this.resourceNavigate}
            />
          )}
        />
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    getResources: token => dispatch(getResources(token)),
    resetResourcesRange: () => dispatch(resetResourcesRange()),
    resetResources: () => dispatch(resetResources()),
    trackResourceView: resource => dispatch(trackResourceView(resource))
  };
}
const mapStateToProps = state => ({
  token: state.token.token,
  user: state.user.user,
  resources: state.resources.resources,
  resourcesLoaded: state.resources.resourcesLoaded,
  allResourcesLoaded: state.resources.allResourcesLoaded
});

export default connect(
  mapStateToProps,
  bindAction
)(ResourcesList);
