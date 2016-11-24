import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackNavigation, TabNavigation, TabNavigationItem} from '@exponent/ex-navigation';
import {Foundation} from '@exponent/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';

export default class RootNavigation extends React.Component {
    render() {
        return (
            <TabNavigation tabBarColor={Colors.mainColor}style={styles.navbar} tabBarHeight={45} initialTab="home">
                <TabNavigationItem
                    id="home"
                    renderIcon=
                    {isSelected => this._renderIcon('home', isSelected)}>
                    <StackNavigation initialRoute="cards"/>
                </TabNavigationItem>

                <TabNavigationItem
                    id="links"
                    renderIcon=
                    {isSelected => this._renderIcon('anchor', isSelected)}>
                    <StackNavigation initialRoute="likes"/>
                </TabNavigationItem>

                <TabNavigationItem
                    id="test"
                    renderIcon=
                    {isSelected => this._renderIcon('alert', isSelected)}>
                    <StackNavigation initialRoute="test"/>
                </TabNavigationItem>


            </TabNavigation>
        );
    }

    _renderIcon(name, isSelected) {
        return (<Foundation name = {
            name
        }
        size = {
            24
        }
        color = { isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}/>);
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
