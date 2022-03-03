import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import AllOportunities from '../Opportunity/OpportunitiesTab/AllOportunities';
import { removeToken } from '../../actions/token';
import { setEmptyError } from '../../actions/user';
import { getOpportunityCounters } from '../../actions/companyOpportunities';
import MainHeaderIOs from '../MainHeader/HeaderIOs';

class IOSAllOpporunity extends Component {
    navigate = (route, data, key) => {
        const { navigation: { navigate } } = this.props;
        navigate(route, { [key]: data });
    };

    filterNav = (route) => {
        const { navigation: { navigate } } = this.props;
        navigate(route);
    };


    render() {
        const { navigation } = this.props;
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <MainHeaderIOs navigation={navigation} />
                <AllOportunities navigate={this.navigate} filterNav={this.filterNav} />
            </Container>
        );
    }
}

IOSAllOpporunity.propTypes = {
    navigation: PropTypes.instanceOf(Object).isRequired,
};

function bindAction(dispatch) {
    return {
        removeToken: () => dispatch(removeToken()),
        setEmptyError: error => dispatch(setEmptyError(error)),
        getOpportunityCounters: token => dispatch(getOpportunityCounters(token)),
    };
}
const mapStateToProps = state => ({
    token: state.token.token,
    error: state.user.error,
    user: state.user.user,
    appliedOpportunities: state.companyOpportunities.appliedOpportunities,
    savedOpportunities: state.companyOpportunities.savedOpportunities,
});

export default connect(
    mapStateToProps,
    bindAction,
)(IOSAllOpporunity);
