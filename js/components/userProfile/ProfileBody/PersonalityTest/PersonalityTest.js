import React, { PureComponent } from 'react';
import { View } from 'native-base';

import ResultPage from './ResultPage';
import DescriptionTest from './DescriptionTest';

export default class PersonalityTest extends PureComponent {
    renderTestComponentWithNavigation = () => {
        const { user, navigationHandler } = this.props;
        return user.sova && user.sova.testResultUrl
            ? <ResultPage navigationHandler={() => navigationHandler('ResultPage')} />
            : <DescriptionTest navigationHandler={() => navigationHandler('DescriptionTest')} />;
    };

    render() {
        return (
            <View>
                {this.renderTestComponentWithNavigation()}
            </View>
        );
    }
}
