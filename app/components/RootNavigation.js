import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackNavigation, TabNavigation, TabNavigationItem} from '@exponent/ex-navigation';
import {FontAwesome} from '@exponent/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';

export default class RootNavigation extends React.Component {
    render() {
        return (
            <TabNavigation tabBarColor={Colors.backgroundColor} tabBarHeight={45} initialTab="home">
                <TabNavigationItem
                    id="home"
                    renderIcon=
                    {isSelected => this._renderIcon('home', isSelected)}>
                    <StackNavigation initialRoute="cards"/>
                </TabNavigationItem>

                <TabNavigationItem
                    id="links"
                    renderIcon=
                    {isSelected => this._renderIcon('heart', isSelected, true)}>
                    <StackNavigation initialRoute="likes"/>
                </TabNavigationItem>
            </TabNavigation>
        );
    }

    _renderIcon(name, isSelected, isLikeMenu = false) {
        return (
            <FontAwesome name = { name }
                size = { isLikeMenu ? 23 : 27 }
                color = { isSelected ?  ( isLikeMenu ? Colors.likeColor : Colors.tabIconSelected) : Colors.tabIconDefault}
            />);
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
