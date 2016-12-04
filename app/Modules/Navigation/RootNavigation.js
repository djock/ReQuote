import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackNavigation, TabNavigation, TabNavigationItem} from '@exponent/ex-navigation';
import {FontAwesome} from '@exponent/vector-icons';

import Colors from '../../Constants/Colors';

export default class RootNavigation extends React.Component {
    render() {
        return (
            <TabNavigation tabBarColor={Colors.backgroundColor} tabBarHeight={45} initialTab="quotesBrowser">
                <TabNavigationItem
                    id="quotesBrowser"
                    renderIcon=
                    {isSelected => this._renderIcon('home', isSelected)}>
                    <StackNavigation initialRoute="quotesBrowser"/>
                </TabNavigationItem>

                <TabNavigationItem
                    id="likes"
                    renderIcon=
                    {isSelected => this._renderIcon('heart', isSelected, true)}>
                    <StackNavigation initialRoute="likes"/>
                </TabNavigationItem>

                 <TabNavigationItem
                    id="selectCategories"
                    renderIcon=
                    {isSelected => this._renderIcon('cog', isSelected)}>
                    <StackNavigation initialRoute="selectCategories"/>
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
