import React, { Component } from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { isEqual } from "lodash";
import { View } from "native-base";
import PropTypes from "prop-types";
import { requestForEventsList } from "../../../actions/events";
import { trackEventView } from "../../../actions/analytics";
import FilterButton from "../../../shared/filters/FilterButton";
import EventComponent from "./EventComponent";

class Events extends Component {
  componentDidMount = () => {
    const { requestForEventsListAction, eventsList } = this.props;
    const eventsLength = eventsList.length;
    requestForEventsListAction(eventsLength);
  };

  componentWillReceiveProps = nextProps => {
    const { eventFilters, requestForEventsListAction } = this.props;
    if (!isEqual(eventFilters, nextProps.eventFilters)) {
      const eventLength = 0;
      requestForEventsListAction(eventLength);
    }
  };

  filterNav = () => {
    const { filterNav } = this.props;
    filterNav("FilterEvents");
  };

  render() {
    const {
      eventsList,
      loadingEvents,
      isEventsListFull,
      trackEventView,
      redirectToEvent,
      activeFiltersCounter,
      requestForEventsListAction
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FilterButton
          clickHandler={this.filterNav}
          activeFiltersCounter={activeFiltersCounter}
          title="Filter results"
        />
        {eventsList.length > 0 && (
          <FlatList
            onEndReached={() => {
              if (!loadingEvents && !isEventsListFull) {
                requestForEventsListAction(eventsList.length);
              }
            }}
            onEndReachedThreshold={0.1}
            onRefresh={requestForEventsListAction}
            refreshing={loadingEvents}
            data={eventsList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <EventComponent
                event={item}
                trackEventView={trackEventView}
                redirectToEvent={redirectToEvent}
              />
            )}
          />
        )}
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    requestForEventsListAction: eventsLength =>
      dispatch(requestForEventsList(eventsLength)),
    trackEventView: event => dispatch(trackEventView(event))
  };
}
const mapStateToProps = state => {
  const filterOptions = state.eventsStore.options;
  const activeFilters = filterOptions.filter(option => option.isActive);
  return {
    eventsList: state.eventsStore.eventsList,
    loadingEvents: state.eventsStore.loadingEvents,
    activeFiltersCounter: activeFilters.length,
    eventFilters: state.eventsStore.result,
    isEventsListFull: state.eventsStore.isEventsListFull
  };
};

export default connect(
  mapStateToProps,
  bindAction
)(Events);

Events.propTypes = {
  requestForEventsListAction: PropTypes.func.isRequired,
  redirectToEvent: PropTypes.func.isRequired,
  filterNav: PropTypes.func.isRequired,
  isEventsListFull: PropTypes.bool.isRequired,
  eventsList: PropTypes.instanceOf(Array).isRequired,
  loadingEvents: PropTypes.bool.isRequired,
  activeFiltersCounter: PropTypes.number.isRequired
};
