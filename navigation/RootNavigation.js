import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Notifications} from 'exponent';
import {StackNavigation, TabNavigation, TabNavigationItem} from '@exponent/ex-navigation';
import {Foundation} from '@exponent/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

export default class RootNavigation extends React.Component {
    componentDidMount() {
        // this._notificationSubscription = this._registerForPushNotifications();
    }

    componentWillUnmount() {
        // this._notificationSubscription && this._notificationSubscription.remove();
    }

    render() {
        return (
            <TabNavigation tabBarColor={Colors.mainColor}style={styles.navbar} tabBarHeight={45} initialTab="home">
                <TabNavigationItem
                    id="home"
                    renderIcon=
                    {isSelected => this._renderIcon('home', isSelected)}>
                    <StackNavigation initialRoute="home"/>
                </TabNavigationItem>

                <TabNavigationItem
                    id="links"
                    renderIcon=
                    {isSelected => this._renderIcon('anchor', isSelected)}>
                    <StackNavigation initialRoute="links"/>
                </TabNavigationItem>


            </TabNavigation>
        );
    }

    _renderIcon(name, isSelected) {
        return (< Foundation name = {
            name
        }
        size = {
            24
        }
        color = {
            isSelected
                ? Colors.tabIconSelected
                : Colors.tabIconDefault
        } />);
    }

    _registerForPushNotifications() {
        // Send our push token over to our backend so we can receive notifications You
        // can comment the following line out if you want to stop receiving a
        // notification every time you open the app. Check out the source for this
        // function in api/registerForPushNotificationsAsync.js
        registerForPushNotificationsAsync();

        // Watch for incoming notifications
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = ({origin, data}) => {
        this
            .props
            .navigator
            .showLocalAlert(`Push notification ${origin} with data: ${JSON.stringify(data)}`, Alerts.notice);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    selectedTab: {
        color: Colors.tabIconSelected
    }
});
