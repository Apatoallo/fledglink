import React, { Component } from 'react';
import { Text, Icon } from 'native-base';
import { View } from 'react-native';
import AboutMe from './AboutMe';
import Hobbies from './Hobbies';
import Achievements from './Achievements';

export default class Introduction extends Component {
    render() {
        const {
            achievements,
            press,
            about,
            hobbies,
            showEdit,
            name,
            userName,
            gender,
        } = this.props;
        return (
            <View>
                <AboutMe
                    about={about}
                    name={name}
                    userName={userName}
                    gender={gender}
                    showEdit={showEdit}
                    press={() => press('EditIntro')}
                />
                <Hobbies
                    hobbies={hobbies}
                    name={name}
                    userName={userName}
                    showEdit={showEdit}
                    press={() => press('EditHobbiesPage')}
                />
                <Achievements
                    name={name}
                    userName={userName}
                    achievements={achievements}
                    showEdit={showEdit}
                    press={() => press('AchievementsList')}
                />
            </View>
        );
    }
}
