import React from 'react';
import {
  View,  
  StyleSheet, 
  Text,
  Dimensions
} from 'react-native';

import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors';
import Button from './Button';
import {FontAwesome} from '@exponent/vector-icons';

const width = Dimensions.get('window').width;

export default class Menu extends React.Component {
    componentWillReceiveProps() {
        if(this.props.localProps)
            this.renderMenu();
    }
    renderMenu() {
        return (
        <View style={styles.container}>
            <Button style={styles.button}  onPress={this._onPressHandler} localProps={this.props.localProps}
            />
        </View>
        )
    }
    _onPressHandler() {
        console.log("Touch");
    }
    render() {
        return this.renderMenu();
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor
    },
    categoryIcon: {
        width: 100
    }
});
