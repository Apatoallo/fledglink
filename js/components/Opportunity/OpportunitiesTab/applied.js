import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { Container, Spinner, View, Text } from "native-base";
import PropTypes from "prop-types";
import { stringify } from "query-string";
import FirebaseAnalytics from "../../../Services/FirebaseAnalytics";
import { serverUrl } from "../../../configs/config";
import OpportunityTabListItem from "../OpportunityTabListItem";

const pagination = {
  current: 0,
  size: 10
};

class Applied extends Component {
  static propTypes = {
    token: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      end_reached: false,
      page: pagination,
      data: []
    };
  }

  getOpportunities = async () => {
    const { page, loading, end_reached } = this.state;
    const { token } = this.props;

    if (loading || end_reached) {
      return;
    }

    this.setState({ loading: true });

    const start = page.current * page.size;
    const end = start + (page.size - 1);

    const query = {
      filter: JSON.stringify({
        isApplied: true
      }),
      range: JSON.stringify([start, end])
    };

    const results = await fetch(
      `${serverUrl}/users/me/opportunities?${stringify(query)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      });

    this.setState(state => {
      return {
        loading: false,
        end_reached: results.length < page.size,
        page: {
          ...state.page,
          current: state.page.current + 1
        },
        data: [...state.data, ...results]
      };
    });
  };

  componentDidMount = () => {
    FirebaseAnalytics.setCurrentScreen("Home", "Home");
    this.getOpportunities();
  };

  opportunityClick = id => {
    const { navigation } = this.props;
    navigation.navigate("OpportunityPage", { id });
  };

  render() {
    const { loading, data, end_reached } = this.state;
    return (
      <Container style={{ backgroundColor: "white" }}>
        {loading ? (
          <Spinner />
        ) : !loading && !data.length && end_reached ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>You have not applied for any opportunities</Text>
          </View>
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={data}
            renderItem={({ item }) => (
              <OpportunityTabListItem
                opportunity={item}
                clickHandler={this.opportunityClick}
              />
            )}
            onEndReached={() => this.getOpportunities()}
            onEndReachedThreshold={0.25}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token.token
});

export default connect(mapStateToProps)(Applied);
