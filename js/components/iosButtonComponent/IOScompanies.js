import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import { removeToken } from '../../actions/token';
import { setEmptyError } from '../../actions/user';
import Companies from '../Opportunity/CompaniesTab/Companies';
import MainHeaderIOs from '../MainHeader/HeaderIOs';

class IOSCompanies extends Component {
    static navigationOptions = {
        header: null,
    };

    navigate = (route, data, key) => {
        const { navigation: { navigate } } = this.props;
        navigate(route, { [key]: data });
    };

    render() {
        const { navigation } = this.props;
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <MainHeaderIOs navigation={navigation} />
                <Companies navigate={this.navigate} />
            </Container>
        );
    }
}

IOSCompanies.propTypes = {
    navigation: PropTypes.instanceOf(Object).isRequired,
};

function bindAction(dispatch) {
    return {
        removeToken: () => dispatch(removeToken()),
        setEmptyError: error => dispatch(setEmptyError(error)),
    };
}
const mapStateToProps = state => ({
    token: state.token.token,
    error: state.user.error,
    user: state.user.user,
});

export default connect(
    mapStateToProps,
    bindAction,
)(IOSCompanies);
